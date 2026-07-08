const API_BASE = "https://v3.football.api-sports.io";
const TIMEZONE = "America/Sao_Paulo";

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
    const matches = fixtures
      .filter((item) => item?.fixture?.id && item?.teams?.home?.name && item?.teams?.away?.name)
      .map(mapFixture)
      .sort((a, b) => a.timestamp - b.timestamp);

    return jsonResponse(200, {
      ok: true,
      source: "api-football",
      date,
      timezone: TIMEZONE,
      count: matches.length,
      matches
    }, {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800"
    });
  } catch (error) {
    return jsonResponse(error.status || 502, {
      ok: false,
      error: error.message || "Falha ao buscar jogos reais."
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

function extractApiError(payload) {
  if (!payload?.errors) return "";
  if (typeof payload.errors === "string") return payload.errors;
  const values = Object.values(payload.errors).flat().filter(Boolean);
  return values.length ? values.join(" ") : "";
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
