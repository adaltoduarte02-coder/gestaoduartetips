const API_BASE = "https://v3.football.api-sports.io";
const TIMEZONE = "America/Sao_Paulo";
const FINISHED = new Set(["FT", "AET", "PEN"]);

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { ok: false, error: "Metodo nao permitido." });
  }

  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) {
    return jsonResponse(500, {
      ok: false,
      code: "MISSING_API_KEY",
      error: "API_FOOTBALL_KEY nao configurada no Netlify."
    });
  }

  const fixtureId = Number(event.queryStringParameters?.fixture);
  if (!fixtureId) {
    return jsonResponse(400, { ok: false, error: "Fixture nao informado." });
  }

  try {
    const query = event.queryStringParameters || {};
    let fixture = buildFixtureFromQuery(query, fixtureId);

    if (!fixture) {
      const fixturePayload = await apiGet("/fixtures", { id: fixtureId, timezone: TIMEZONE }, apiKey);
      fixture = fixturePayload.response?.[0];
    }

    if (!fixture) {
      return jsonResponse(404, { ok: false, error: "Jogo nao encontrado na API." });
    }

    const homeId = fixture.teams.home.id;
    const awayId = fixture.teams.away.id;
    const [homePayload, awayPayload, h2hPayload] = await Promise.all([
      apiGet("/fixtures", { team: homeId, last: 10, timezone: TIMEZONE }, apiKey),
      apiGet("/fixtures", { team: awayId, last: 10, timezone: TIMEZONE }, apiKey),
      apiGet("/fixtures/headtohead", { h2h: `${homeId}-${awayId}`, last: 10, timezone: TIMEZONE }, apiKey).catch(() => ({ response: [] }))
    ]);

    const home = summarizeTeam(homePayload.response || [], homeId);
    const away = summarizeTeam(awayPayload.response || [], awayId);
    const h2h = summarizeH2h(h2hPayload.response || [], homeId, awayId);
    const standings = { home: null, away: null };
    const summary = buildSummary(fixture, home, away, h2h);
    const suggestions = buildSuggestions(fixture, home, away, h2h);

    return jsonResponse(200, {
      ok: true,
      source: "api-football",
      match: mapFixture(fixture, standings),
      kpis: [
        { label: "BTTS", value: percent(avg(home.btts, away.btts, h2h.btts)), note: "ambas marcam" },
        { label: "Over 1.5 FT", value: percent(avg(home.over15, away.over15, h2h.over15)), note: "gols no jogo" },
        { label: "Over 2.5 FT", value: percent(avg(home.over25, away.over25, h2h.over25)), note: "linha principal" },
        { label: "Over 0.5 HT", value: percent(avg(home.htOver05, away.htOver05, h2h.htOver05)), note: "primeiro tempo" }
      ],
      summary,
      homeStats: home,
      awayStats: away,
      h2h,
      suggestions,
      unavailable: ["Cantos historicos", "Cartoes historicos"],
      generatedAt: new Date().toISOString()
    }, {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600"
    });
  } catch (error) {
    return jsonResponse(error.status || 502, {
      ok: false,
      error: friendlyError(error.message) || "Falha ao montar analise do jogo."
    });
  }
};

async function apiGet(path, params, apiKey) {
  const url = new URL(`${API_BASE}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: {
      "x-apisports-key": apiKey
    }
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.errors?.token || payload.errors?.requests) {
    const error = new Error(extractApiError(payload) || `API respondeu ${response.status}.`);
    error.status = response.status || 502;
    throw error;
  }

  return payload;
}

function summarizeTeam(fixtures, teamId) {
  const played = fixtures.filter(hasScore).slice(0, 10);
  const rows = played.map((match) => extractTeamResult(match, teamId)).filter(Boolean);
  const total = rows.length || 1;

  return {
    games: rows.length,
    form: rows.slice(0, 5).map((row) => row.result).join(" ") || "-",
    goalsFor: round(sum(rows, "gf") / total),
    goalsAgainst: round(sum(rows, "ga") / total),
    htGoals: round(sum(rows, "htTotal") / total),
    btts: ratio(rows, (row) => row.gf > 0 && row.ga > 0),
    over05: ratio(rows, (row) => row.totalGoals > 0),
    over15: ratio(rows, (row) => row.totalGoals > 1),
    over25: ratio(rows, (row) => row.totalGoals > 2),
    over35: ratio(rows, (row) => row.totalGoals > 3),
    htOver05: ratio(rows, (row) => row.htTotal > 0),
    htOver15: ratio(rows, (row) => row.htTotal > 1),
    cleanSheets: ratio(rows, (row) => row.ga === 0),
    corners: null,
    cards: null
  };
}

function summarizeH2h(fixtures, homeId, awayId) {
  const played = fixtures.filter(hasScore).slice(0, 10);
  const rows = played.map((match) => {
    const homeGoals = Number(match.goals?.home ?? 0);
    const awayGoals = Number(match.goals?.away ?? 0);
    const htHome = Number(match.score?.halftime?.home ?? 0);
    const htAway = Number(match.score?.halftime?.away ?? 0);
    const selectedHomeIsHome = match.teams?.home?.id === homeId;
    const selectedAwayIsAway = match.teams?.away?.id === awayId;
    let homeTeamGoals = selectedHomeIsHome ? homeGoals : awayGoals;
    let awayTeamGoals = selectedAwayIsAway ? awayGoals : homeGoals;

    if (!selectedHomeIsHome && !selectedAwayIsAway) {
      homeTeamGoals = match.teams?.home?.id === homeId ? homeGoals : awayGoals;
      awayTeamGoals = match.teams?.home?.id === awayId ? homeGoals : awayGoals;
    }

    return {
      totalGoals: homeGoals + awayGoals,
      htTotal: htHome + htAway,
      homeWin: homeTeamGoals > awayTeamGoals,
      draw: homeTeamGoals === awayTeamGoals,
      awayWin: awayTeamGoals > homeTeamGoals,
      btts: homeGoals > 0 && awayGoals > 0
    };
  });
  const total = rows.length || 1;

  return {
    games: rows.length,
    homeWins: rows.filter((row) => row.homeWin).length,
    draws: rows.filter((row) => row.draw).length,
    awayWins: rows.filter((row) => row.awayWin).length,
    avgGoals: round(sum(rows, "totalGoals") / total),
    avgCorners: null,
    avgCards: null,
    btts: ratio(rows, (row) => row.btts),
    over05: ratio(rows, (row) => row.totalGoals > 0),
    over15: ratio(rows, (row) => row.totalGoals > 1),
    over25: ratio(rows, (row) => row.totalGoals > 2),
    over35: ratio(rows, (row) => row.totalGoals > 3),
    htOver05: ratio(rows, (row) => row.htTotal > 0),
    htOver15: ratio(rows, (row) => row.htTotal > 1)
  };
}

function extractTeamResult(match, teamId) {
  const isHome = match.teams?.home?.id === teamId;
  const isAway = match.teams?.away?.id === teamId;
  if (!isHome && !isAway) return null;

  const homeGoals = Number(match.goals?.home ?? 0);
  const awayGoals = Number(match.goals?.away ?? 0);
  const htHome = Number(match.score?.halftime?.home ?? 0);
  const htAway = Number(match.score?.halftime?.away ?? 0);
  const gf = isHome ? homeGoals : awayGoals;
  const ga = isHome ? awayGoals : homeGoals;

  return {
    gf,
    ga,
    totalGoals: homeGoals + awayGoals,
    htTotal: htHome + htAway,
    result: gf > ga ? "V" : gf === ga ? "E" : "D"
  };
}

function mapFixture(item, standings) {
  const date = new Date(item.fixture.date);
  return {
    id: String(item.fixture.id),
    fixtureId: item.fixture.id,
    leagueId: item.league?.id || null,
    season: item.league?.season || null,
    league: item.league?.name || "Liga nao informada",
    country: item.league?.country || "",
    round: item.league?.round || "",
    home: item.teams.home.name,
    away: item.teams.away.name,
    homeId: item.teams.home.id,
    awayId: item.teams.away.id,
    venue: item.fixture.venue?.name || "Estadio nao informado",
    city: item.fixture.venue?.city || "",
    date: toLocalDateKey(date),
    time: item.fixture.customTime || `Hoje ${formatTime(date)}`,
    kickoff: item.fixture.customKickoff || formatTime(date),
    score: {
      home: standings.home ? `${standings.home}o` : "-",
      away: standings.away ? `${standings.away}o` : "-"
    }
  };
}

function buildFixtureFromQuery(query, fixtureId) {
  const homeId = Number(query.home);
  const awayId = Number(query.away);
  if (!homeId || !awayId || !query.homeName || !query.awayName) return null;

  const time = String(query.time || "").trim();
  const kickoff = time.replace(/^Hoje\s+/i, "") || "";

  return {
    fixture: {
      id: fixtureId,
      date: new Date().toISOString(),
      customTime: time || "Hoje",
      customKickoff: kickoff,
      venue: {
        name: query.venue || "Estadio nao informado",
        city: ""
      }
    },
    teams: {
      home: { id: homeId, name: query.homeName },
      away: { id: awayId, name: query.awayName }
    },
    league: {
      id: Number(query.league) || null,
      season: Number(query.season) || null,
      name: query.leagueName || "Liga nao informada",
      country: query.country || "",
      round: ""
    }
  };
}

function extractStandings(payload, homeId, awayId) {
  const rows = payload?.response?.[0]?.league?.standings?.flat?.() || [];
  return {
    home: rows.find((row) => row.team?.id === homeId)?.rank || null,
    away: rows.find((row) => row.team?.id === awayId)?.rank || null
  };
}

function buildSummary(fixture, home, away, h2h) {
  const over15 = avg(home.over15, away.over15, h2h.over15);
  const btts = avg(home.btts, away.btts, h2h.btts);
  const ht = avg(home.htOver05, away.htOver05, h2h.htOver05);
  const parts = [];

  parts.push(`${fixture.teams.home.name} x ${fixture.teams.away.name} pela ${fixture.league?.name || "liga informada"}.`);
  parts.push(`A linha de Over 1.5 FT aparece em ${percent(over15)} da amostra recente combinada.`);
  parts.push(`BTTS fica em ${percent(btts)} e Over 0.5 HT em ${percent(ht)}.`);
  parts.push("Cantos e cartoes nao foram inventados: so aparecem quando a API entregar historico confiavel para esses mercados.");

  return parts.join(" ");
}

function buildSuggestions(fixture, home, away, h2h) {
  const suggestions = [];
  const over15 = avg(home.over15, away.over15, h2h.over15);
  const over25 = avg(home.over25, away.over25, h2h.over25);
  const btts = avg(home.btts, away.btts, h2h.btts);
  const htOver05 = avg(home.htOver05, away.htOver05, h2h.htOver05);

  if (over15 >= 62) {
    suggestions.push({
      market: "Mais de 1.5 gols FT",
      edge: `Amostra recente combinada em ${percent(over15)}.`,
      confidence: over15 >= 72 ? "Alta" : "Media",
      odd: null
    });
  }

  if (btts >= 55) {
    suggestions.push({
      market: "Ambas marcam",
      edge: `BTTS combinado em ${percent(btts)}.`,
      confidence: btts >= 65 ? "Alta" : "Media",
      odd: null
    });
  }

  if (over25 >= 48) {
    suggestions.push({
      market: "Mais de 2.5 gols FT",
      edge: `Over 2.5 aparece em ${percent(over25)} da amostra.`,
      confidence: over25 >= 58 ? "Alta" : "Media",
      odd: null
    });
  }

  if (htOver05 >= 58) {
    suggestions.push({
      market: "Mais de 0.5 gol HT",
      edge: `Primeiro tempo com gol em ${percent(htOver05)} da amostra.`,
      confidence: htOver05 >= 68 ? "Alta" : "Media",
      odd: null
    });
  }

  if (!suggestions.length) {
    suggestions.push({
      market: "Aguardar live",
      edge: "A amostra pre-live nao mostrou vantagem forte sem forcar mercado.",
      confidence: "Cautela",
      odd: null
    });
  }

  return suggestions.slice(0, 4);
}

function hasScore(match) {
  return FINISHED.has(match.fixture?.status?.short) && match.goals?.home !== null && match.goals?.away !== null;
}

function ratio(rows, predicate) {
  if (!rows.length) return null;
  return Math.round((rows.filter(predicate).length / rows.length) * 100);
}

function avg(...values) {
  const valid = values.filter((value) => Number.isFinite(Number(value)));
  if (!valid.length) return null;
  return Math.round(valid.reduce((sumValue, value) => sumValue + Number(value), 0) / valid.length);
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + (Number(row[key]) || 0), 0);
}

function round(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function percent(value) {
  return Number.isFinite(Number(value)) ? `${Math.round(Number(value))}%` : "-";
}

function extractApiError(payload) {
  if (!payload?.errors) return "";
  if (typeof payload.errors === "string") return payload.errors;
  const values = Object.values(payload.errors).flat().filter(Boolean);
  return values.length ? values.join(" ") : "";
}

function friendlyError(message = "") {
  if (/request|quota|limit|daily/i.test(message)) {
    return "Limite diario da API gratuita atingido. Aguarde renovar ou use uma chave/plano com mais requisicoes.";
  }
  if (/token|key|subscription/i.test(message)) {
    return "A chave da API-Football precisa ser conferida no Netlify.";
  }
  return message;
}

function toLocalDateKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function jsonResponse(statusCode, body, headers = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers
    },
    body: JSON.stringify(body)
  };
}
