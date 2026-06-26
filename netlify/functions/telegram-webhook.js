const SIGNUP_URL = "https://go.aff.bravo.bet.br/m5j77ywh?btag=021715_AD66M&utm_source=app";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-cache, no-store, must-revalidate"
};

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET || "";
  const receivedSecret = event.headers["x-telegram-bot-api-secret-token"] || event.headers["X-Telegram-Bot-Api-Secret-Token"] || "";
  if (expectedSecret && receivedSecret !== expectedSecret) {
    return json(401, { ok: false, error: "invalid_secret" });
  }

  let update;
  try {
    update = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(200, { ok: true, ignored: "invalid_json" });
  }

  const post = update.channel_post || update.message || update.edited_channel_post || update.edited_message;
  const text = post && (post.text || post.caption || "");
  const allowedChatId = process.env.TELEGRAM_ALLOWED_CHAT_ID || "";
  const chatId = post && post.chat ? String(post.chat.id) : "";

  if (allowedChatId && chatId !== allowedChatId) {
    return json(200, { ok: true, ignored: "chat_not_allowed", chatId });
  }

  if (!text.trim()) {
    return json(200, { ok: true, ignored: "empty_message" });
  }

  const tip = parseSignal(text, post, chatId);
  if (!tip) {
    return json(200, { ok: true, ignored: "not_a_signal" });
  }

  const { getStore } = await import("@netlify/blobs");
  const store = getStore("duarte-tips");
  const current = await store.get("feed.json", { type: "json" }).catch(() => null);
  const existing = current && Array.isArray(current.tips) ? current.tips : [];
  const withoutDuplicate = existing.filter((item) => item.id !== tip.id);
  const tips = [tip, ...withoutDuplicate].slice(0, 80);

  await store.setJSON("feed.json", {
    updatedAt: new Date().toISOString(),
    tips
  });

  return json(200, { ok: true, saved: tip });
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body)
  };
}

function parseSignal(text, post, chatId) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const fields = {};
  const loose = [];

  for (const line of lines) {
    const match = line.match(/^([a-zA-ZÀ-ÿ0-9_ /-]{2,24})\s*[:=-]\s*(.+)$/);
    if (!match) {
      loose.push(line);
      continue;
    }

    const key = normalizeKey(match[1]);
    fields[key] = match[2].trim();
  }

  const title = fields.jogo || fields.evento || fields.partida || loose[0] || "";
  const market = fields.mercado || fields.entrada || fields.aposta || loose[1] || "";
  const odd = parseNumber(fields.odd || fields.odds || fields.cotacao || "");
  const stakeRaw = fields.stake || fields.mao || fields.unidade || fields.gestao || "";
  const stakePercent = stakeRaw.includes("%") ? parseNumber(stakeRaw) : 0;
  const stakeValue = stakeRaw && !stakeRaw.includes("%") ? parseNumber(stakeRaw.replace(/r\$/i, "")) : 0;

  if (!title || !market || !odd) {
    return null;
  }

  const messageId = post && post.message_id ? post.message_id : Date.now();
  const createdAt = post && post.date ? new Date(post.date * 1000).toISOString() : new Date().toISOString();

  return {
    id: `tg-${chatId || "chat"}-${messageId}`,
    title,
    market,
    odd,
    stakePercent,
    stakeValue,
    confidence: fields.confianca || fields.risco || fields.perfil || "Sinal Duarte Tips",
    time: fields.horario || fields.hora || fields.data || "Agora",
    note: fields.obs || fields.observacao || fields.info || "Entrada enviada pelo Telegram",
    link: fields.link || SIGNUP_URL,
    source: "telegram",
    telegramChatId: chatId,
    telegramMessageId: messageId,
    createdAt
  };
}

function normalizeKey(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function parseNumber(value) {
  const match = String(value).replace(",", ".").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
}
