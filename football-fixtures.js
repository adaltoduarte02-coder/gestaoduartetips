const API_BASE = "https://v3.football.api-sports.io";
const TIMEZONE = "America/Sao_Paulo";
const MAX_MATCHES = 80;
const COUNTRY_PRIORITY = new Map([
  ["Brazil", 120],
  ["World", 110],
  ["England", 105],
  ["Spain", 105],
  ["Italy", 104],
  ["Germany", 104],
  ["France", 103],
  ["Portugal", 96],
  ["Netherlands", 94],
  ["Argentina", 92],
  ["USA", 88],
  ["Mexico", 84],
  ["Saudi-Arabia", 80],
  ["Colombia", 78],
  ["Chile", 76],
  ["Uruguay", 76],
  ["Paraguay", 72],
  ["Peru", 72]
]);
const LEAGUE_BOOSTS = [
  { test: /serie a|brasileiro|copa do brasil|libertadores|sul-americana/i, score: 80 },
  { test: /world cup|champions league|europa league|conference league/i, score: 78 },
  { test: /premier league|la liga|serie a|bundesliga|ligue 1/i, score: 72 },
  { test: /championship|fa cup|copa del rey|coppa italia|dfb pokal/i, score: 48 },
  { test: /friendlies clubs|friendly|u20|u21|u19|women|reserve|youth/i, score: -45 },
  { test: /league two|third|regional|amateur/i, score: -25 }
];

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

  const today = toLocalDateKey(new Date());
  const date = event.queryStringParameters?.date || today;

  try {
    const data = await apiGet("/fixtures", { date, timezone: TIMEZONE }, apiKey);
    const fixtures = Array.isArray(data.response) ? data.response : [];
    const allMatches = fixtures
      .filter((item) => item?.fixture?.id && item?.teams?.home?.name && item?.teams?.away?.name)
      .map(mapFixture)
      .map(addPriority)
      .sort((a, b) => {
        if (b.priority !== a.priority) return b.priority - a.priority;
        return a.timestamp - b.timestamp;
      });
    const matches = allMatches.slice(0, MAX_MATCHES).sort((a, b) => a.timestamp - b.timestamp);

    return jsonResponse(200, {
      ok: true,
      source: "api-football",
      date,
      timezone: TIMEZONE,
      count: matches.length,
      total: allMatches.length,
      matches
    }, {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800"
    });
  } catch (error) {
    return jsonResponse(error.status || 502, {
      ok: false,
      error: friendlyError(error.message) || "Falha ao buscar jogos reais."
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

function mapFixture(item) {
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
    timestamp: item.fixture.timestamp || Math.floor(date.getTime() / 1000),
    date: toLocalDateKey(date),
    time: `Hoje ${formatTime(date)}`,
    kickoff: formatTime(date),
    status: item.fixture.status?.short || "NS",
    statusLong: item.fixture.status?.long || "Not Started"
  };
}

function addPriority(match) {
  const countryScore = COUNTRY_PRIORITY.get(match.country) || 38;
  const leagueText = `${match.country} ${match.league} ${match.round}`;
  const leagueScore = LEAGUE_BOOSTS.reduce((score, rule) => (
    rule.test.test(leagueText) ? score + rule.score : score
  ), 0);
  const statusScore = ["NS", "TBD"].includes(match.status) ? 12 : 0;
  const venueScore = match.venue && match.venue !== "Estadio nao informado" ? 4 : 0;

  return {
    ...match,
    priority: countryScore + leagueScore + statusScore + venueScore
  };
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
