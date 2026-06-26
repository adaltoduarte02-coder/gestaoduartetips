const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Access-Control-Allow-Origin": "*"
};

const DEMO_TIPS = [
  {
    id: "duarte-demo-001",
    title: "Time A x Time B",
    market: "Over 1.5 gols",
    odd: 1.72,
    stakePercent: 2,
    confidence: "Entrada moderada",
    time: "Hoje",
    note: "Exemplo de sinal. Quando o Telegram estiver conectado, os sinais reais aparecem aqui.",
    link: "https://go.aff.bravo.bet.br/m5j77ywh?btag=021715_AD66M&utm_source=app"
  }
];

let getStore = null;

try {
  ({ getStore } = require("@netlify/blobs"));
} catch (error) {
  getStore = null;
}

exports.handler = async () => {
  try {
    if (!getStore) {
      throw new Error("storage_unavailable");
    }

    const store = getStore("duarte-tips");
    const feed = await store.get("feed.json", { type: "json" });
    const tips = feed && Array.isArray(feed.tips) ? feed.tips : DEMO_TIPS;

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        ok: true,
        updatedAt: feed ? feed.updatedAt : null,
        tips
      })
    };
  } catch (error) {
    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({
        ok: true,
        fallback: true,
        tips: DEMO_TIPS
      })
    };
  }
};
