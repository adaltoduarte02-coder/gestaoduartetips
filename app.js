const SIGNUP_URL = "https://go.aff.bravo.bet.br/m5j77ywh?btag=021715_AD66M&utm_source=app";
const STORAGE_KEY = "gestao-banca-exclusiva-v1";
const DEFAULT_TIPS = [
  {
    id: "demo-over-15",
    title: "Time A x Time B",
    market: "Over 1.5 gols",
    odd: 1.72,
    confidence: "Entrada moderada",
    time: "Hoje",
    note: "Modelo de sinal. Depois isso vem do Telegram/backend.",
    link: SIGNUP_URL
  },
  {
    id: "demo-dupla",
    title: "Time C x Time D",
    market: "Dupla chance mandante",
    odd: 1.55,
    confidence: "Entrada protegida",
    time: "Hoje",
    note: "Use como exemplo para testar o botao de fazer aposta.",
    link: SIGNUP_URL
  }
];

const defaults = {
  access: {
    unlocked: false,
    name: "",
    bookUser: ""
  },
  settings: {
    bankroll: 500,
    stakePercent: 2,
    stopGainPercent: 6,
    stopLossPercent: 4
  },
  bets: []
};

const state = loadState();
let tipsFeed = DEFAULT_TIPS;
const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const els = {
  gateScreen: document.querySelector("#gateScreen"),
  mainApp: document.querySelector("#mainApp"),
  unlockForm: document.querySelector("#unlockForm"),
  leadName: document.querySelector("#leadName"),
  bookUser: document.querySelector("#bookUser"),
  confirmSignup: document.querySelector("#confirmSignup"),
  signupLink: document.querySelector("#signupLink"),
  lockButton: document.querySelector("#lockButton"),
  welcomeTitle: document.querySelector("#welcomeTitle"),
  bankrollForm: document.querySelector("#bankrollForm"),
  bankrollInput: document.querySelector("#bankrollInput"),
  stakePercentInput: document.querySelector("#stakePercentInput"),
  stopGainInput: document.querySelector("#stopGainInput"),
  stopLossInput: document.querySelector("#stopLossInput"),
  profileBadge: document.querySelector("#profileBadge"),
  currentBankroll: document.querySelector("#currentBankroll"),
  bankrollDelta: document.querySelector("#bankrollDelta"),
  profitTotal: document.querySelector("#profitTotal"),
  roiTotal: document.querySelector("#roiTotal"),
  greenRate: document.querySelector("#greenRate"),
  greenCount: document.querySelector("#greenCount"),
  redRate: document.querySelector("#redRate"),
  redCount: document.querySelector("#redCount"),
  entryCount: document.querySelector("#entryCount"),
  profitChart: document.querySelector("#profitChart"),
  emptyBets: document.querySelector("#emptyBets"),
  betList: document.querySelector("#betList"),
  clearBetsButton: document.querySelector("#clearBetsButton"),
  recommendedStake: document.querySelector("#recommendedStake"),
  recommendedPercent: document.querySelector("#recommendedPercent"),
  recommendedStop: document.querySelector("#recommendedStop"),
  recommendedUnits: document.querySelector("#recommendedUnits"),
  customStake: document.querySelector("#customStake"),
  dailyGoal: document.querySelector("#dailyGoal"),
  dailyLoss: document.querySelector("#dailyLoss"),
  projectedBankroll: document.querySelector("#projectedBankroll"),
  manualStake: document.querySelector("#manualStake"),
  compoundForm: document.querySelector("#compoundForm"),
  compoundBankroll: document.querySelector("#compoundBankroll"),
  compoundOdd: document.querySelector("#compoundOdd"),
  compoundStake: document.querySelector("#compoundStake"),
  compoundRounds: document.querySelector("#compoundRounds"),
  compoundHitRate: document.querySelector("#compoundHitRate"),
  compoundResult: document.querySelector("#compoundResult"),
  cycleCount: document.querySelector("#cycleCount"),
  cycleList: document.querySelector("#cycleList"),
  signalCount: document.querySelector("#signalCount"),
  signalList: document.querySelector("#signalList"),
  betForm: document.querySelector("#betForm"),
  betTitle: document.querySelector("#betTitle"),
  betOdd: document.querySelector("#betOdd"),
  betStake: document.querySelector("#betStake"),
  betDate: document.querySelector("#betDate"),
  betResult: document.querySelector("#betResult"),
  betNote: document.querySelector("#betNote"),
  todayLabel: document.querySelector("#todayLabel"),
  navItems: [...document.querySelectorAll(".nav-item")],
  views: [...document.querySelectorAll(".tab-view")]
};

init();

function init() {
  els.signupLink.href = SIGNUP_URL;
  els.betDate.valueAsDate = new Date();
  els.todayLabel.textContent = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date());
  hydrateForms();
  bindEvents();
  renderAccess();
  renderAll();
  calculateCompound();
  loadTipsFeed();
}

function bindEvents() {
  els.unlockForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.access = {
      unlocked: true,
      name: els.leadName.value.trim(),
      bookUser: els.bookUser.value.trim()
    };
    saveState();
    renderAccess();
  });

  els.lockButton.addEventListener("click", () => {
    state.access.unlocked = false;
    saveState();
    renderAccess();
  });

  els.navItems.forEach((item) => {
    item.addEventListener("click", () => showView(item.dataset.view));
  });

  els.bankrollForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.settings.bankroll = getNumber(els.bankrollInput, state.settings.bankroll);
    state.settings.stakePercent = getNumber(els.stakePercentInput, state.settings.stakePercent);
    state.settings.stopGainPercent = getNumber(els.stopGainInput, state.settings.stopGainPercent);
    state.settings.stopLossPercent = getNumber(els.stopLossInput, state.settings.stopLossPercent);
    saveState();
    renderAll();
  });

  els.compoundForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateCompound();
  });

  [els.compoundBankroll, els.compoundOdd, els.compoundStake, els.compoundRounds, els.compoundHitRate].forEach((input) => {
    input.addEventListener("input", calculateCompound);
  });

  els.betForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const bet = buildBet();
    state.bets.unshift(bet);
    saveState();
    els.betForm.reset();
    els.betDate.valueAsDate = new Date();
    els.betOdd.value = "1.80";
    els.betStake.value = getRecommendedManagement(state.settings.bankroll).stake.toFixed(2);
    renderAll();
    showView("dashboard");
  });

  els.clearBetsButton.addEventListener("click", () => {
    if (!state.bets.length) return;
    const confirmed = window.confirm("Limpar todas as entradas registradas?");
    if (!confirmed) return;
    state.bets = [];
    saveState();
    renderAll();
  });

  els.signalList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-signal-id]");
    if (!button) return;
    const tip = tipsFeed.find((item) => item.id === button.dataset.signalId);
    if (!tip) return;
    takeSignal(tip);
  });
}

function renderAccess() {
  const unlocked = state.access.unlocked;
  els.gateScreen.classList.toggle("is-hidden", unlocked);
  els.mainApp.classList.toggle("is-hidden", !unlocked);
  els.welcomeTitle.textContent = state.access.name ? "Gest\u00e3o liberada" : "Gest\u00e3o de banca";
}

function renderAll() {
  hydrateForms();
  renderManagement();
  renderDashboard();
  renderBetList();
  renderSignals();
  drawChart();
}

function hydrateForms() {
  els.leadName.value = state.access.name || "";
  els.bookUser.value = state.access.bookUser || "";
  els.bankrollInput.value = cleanNumber(state.settings.bankroll);
  els.stakePercentInput.value = cleanNumber(state.settings.stakePercent);
  els.stopGainInput.value = cleanNumber(state.settings.stopGainPercent);
  els.stopLossInput.value = cleanNumber(state.settings.stopLossPercent);
  els.compoundBankroll.value = cleanNumber(state.settings.bankroll);
  if (!els.betStake.value) {
    els.betStake.value = getRecommendedManagement(state.settings.bankroll).stake.toFixed(2);
  }
}

function renderManagement() {
  const bankroll = getProjectedBankroll();
  const settings = state.settings;
  const recommended = getRecommendedManagement(bankroll);
  const customStake = bankroll * (settings.stakePercent / 100);
  const dailyGoal = bankroll * (settings.stopGainPercent / 100);
  const dailyLoss = bankroll * (settings.stopLossPercent / 100);

  els.profileBadge.textContent = recommended.profile;
  els.recommendedStake.textContent = `${formatMoney(recommended.stake)} por entrada`;
  els.recommendedPercent.textContent = `${formatPercent(recommended.percent)} da banca`;
  els.recommendedStop.textContent = `Gain ${formatPercent(recommended.stopGain)} / Loss ${formatPercent(recommended.stopLoss)}`;
  els.recommendedUnits.textContent = `${recommended.units} unidades`;
  els.customStake.textContent = formatMoney(customStake);
  els.dailyGoal.textContent = formatMoney(dailyGoal);
  els.dailyLoss.textContent = formatMoney(dailyLoss);
  els.projectedBankroll.textContent = formatMoney(bankroll);
  els.manualStake.textContent = formatMoney(customStake);
}

function renderDashboard() {
  const stats = getStats();
  const projected = getProjectedBankroll();

  els.currentBankroll.textContent = formatMoney(projected);
  els.bankrollDelta.textContent = `${stats.profit >= 0 ? "+" : ""}${formatMoney(stats.profit)} desde o inicio`;
  els.profitTotal.textContent = formatMoney(stats.profit);
  els.profitTotal.classList.toggle("profit-positive", stats.profit > 0);
  els.profitTotal.classList.toggle("profit-negative", stats.profit < 0);
  els.roiTotal.textContent = `ROI ${formatPercent(stats.roi)}`;
  els.greenRate.textContent = `${formatPercent(stats.greenRate)}`;
  els.greenCount.textContent = `${stats.greens} greens`;
  els.redRate.textContent = `${formatPercent(stats.redRate)}`;
  els.redCount.textContent = `${stats.reds} reds`;
  els.entryCount.textContent = `${stats.total} ${stats.total === 1 ? "entrada" : "entradas"}`;
}

function renderBetList() {
  els.emptyBets.classList.toggle("is-hidden", state.bets.length > 0);
  els.betList.innerHTML = state.bets.slice(0, 12).map((bet) => {
    const resultClass = bet.result.includes("green") ? "green" : bet.result.includes("red") ? "red" : "void";
    return `
      <article class="bet-row">
        <div class="bet-row-top">
          <strong class="bet-title">${escapeHtml(bet.title)}</strong>
          <span class="result-pill ${resultClass}">${resultLabel(bet.result)}</span>
        </div>
        <div class="bet-row-bottom">
          <span class="bet-meta">${formatDate(bet.date)} | Odd ${formatDecimal(bet.odd)} | ${formatMoney(bet.stake)}</span>
          <strong class="${bet.profit >= 0 ? "profit-positive" : "profit-negative"}">${formatMoney(bet.profit)}</strong>
        </div>
        ${bet.note ? `<span class="bet-meta">${escapeHtml(bet.note)}</span>` : ""}
      </article>
    `;
  }).join("");
}

function renderSignals() {
  els.signalCount.textContent = `${tipsFeed.length} ${tipsFeed.length === 1 ? "ativo" : "ativos"}`;
  els.signalList.innerHTML = tipsFeed.map((tip) => {
    const signalStake = getSignalStake(tip);
    return `
      <article class="signal-card">
        <div class="signal-top">
          <strong class="signal-title">${escapeHtml(tip.title)}</strong>
          <span class="signal-odd">Odd ${formatDecimal(tip.odd)}</span>
        </div>
        <p class="signal-meta">${escapeHtml(tip.market)} | ${escapeHtml(tip.confidence || "Entrada")}</p>
        <p class="signal-meta">${escapeHtml(tip.time || "Agora")} - ${escapeHtml(tip.note || "")}</p>
        <div class="signal-actions">
          <button class="signal-action" type="button" data-signal-id="${escapeHtml(tip.id)}">Fazer aposta</button>
          <span class="signal-secondary">${getSignalStakeLabel(tip, signalStake)}</span>
        </div>
      </article>
    `;
  }).join("");
}

function drawChart() {
  const canvas = els.profitChart;
  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const points = [...state.bets].reverse().reduce((acc, bet) => {
    const previous = acc.length ? acc[acc.length - 1] : 0;
    acc.push(previous + bet.profit);
    return acc;
  }, []);

  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(255, 255, 255, 0.035)";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(220, 228, 223, 0.11)";
  context.lineWidth = 1;
  for (let i = 1; i <= 4; i += 1) {
    const y = (height / 5) * i;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  if (!points.length) {
    context.fillStyle = "#a9b3ad";
    context.font = "18px system-ui";
    context.textAlign = "center";
    context.fillText("Registre entradas para ver a evolu\u00e7\u00e3o", width / 2, height / 2);
    return;
  }

  const min = Math.min(0, ...points);
  const max = Math.max(0, ...points);
  const range = max - min || 1;
  const stepX = points.length > 1 ? width / (points.length - 1) : width;

  const getY = (value) => height - ((value - min) / range) * (height - 28) - 14;
  const zeroY = getY(0);

  context.strokeStyle = "rgba(241, 201, 106, 0.6)";
  context.beginPath();
  context.moveTo(0, zeroY);
  context.lineTo(width, zeroY);
  context.stroke();

  context.strokeStyle = points[points.length - 1] >= 0 ? "#32ff4f" : "#ff5d6c";
  context.lineWidth = 4;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.beginPath();
  points.forEach((point, index) => {
    const x = points.length === 1 ? width / 2 : index * stepX;
    const y = getY(point);
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
}

function calculateCompound() {
  const base = getNumber(els.compoundBankroll, state.settings.bankroll);
  const odd = getNumber(els.compoundOdd, 1.8);
  const stakePercent = getNumber(els.compoundStake, state.settings.stakePercent);
  const rounds = Math.max(1, Math.round(getNumber(els.compoundRounds, 10)));
  const hitRate = Math.min(100, Math.max(0, getNumber(els.compoundHitRate, 70))) / 100;
  let bankroll = base;
  const cycles = [];

  for (let i = 1; i <= rounds; i += 1) {
    const stake = bankroll * (stakePercent / 100);
    const expectedProfit = stake * ((odd - 1) * hitRate - (1 - hitRate));
    bankroll += expectedProfit;
    if (i <= 12 || i === rounds) {
      cycles.push({
        cycle: i,
        stake,
        profit: expectedProfit,
        bankroll
      });
    }
  }

  const profit = bankroll - base;
  const resultStrong = els.compoundResult.querySelector("strong");
  const resultSmall = els.compoundResult.querySelector("small");
  resultStrong.textContent = formatMoney(bankroll);
  resultStrong.classList.toggle("profit-positive", profit > 0);
  resultStrong.classList.toggle("profit-negative", profit < 0);
  resultSmall.textContent = `${profit >= 0 ? "Lucro" : "Prejuizo"} estimado de ${formatMoney(profit)} em ${rounds} entradas.`;
  els.cycleCount.textContent = `${rounds} ciclos`;
  els.cycleList.innerHTML = cycles.map((cycle) => `
    <div class="cycle-row">
      <span>Ciclo ${cycle.cycle} | Stake ${formatMoney(cycle.stake)}</span>
      <strong class="${cycle.profit >= 0 ? "profit-positive" : "profit-negative"}">${formatMoney(cycle.bankroll)}</strong>
    </div>
  `).join("");
}

function buildBet() {
  const odd = getNumber(els.betOdd, 1.8);
  const stake = getNumber(els.betStake, 0);
  const result = els.betResult.value;
  return {
    id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    title: els.betTitle.value.trim(),
    odd,
    stake,
    result,
    date: els.betDate.value,
    note: els.betNote.value.trim(),
    profit: calculateBetProfit(stake, odd, result)
  };
}

function takeSignal(tip) {
  const stake = getSignalStake(tip);
  const today = new Date().toISOString().slice(0, 10);
  state.bets.unshift({
    id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    title: `${tip.title} - ${tip.market}`,
    odd: Number(tip.odd) || 1,
    stake,
    result: "pending",
    date: today,
    note: "Entrada salva a partir dos Sinais Duarte Tips",
    profit: 0
  });
  saveState();
  renderAll();
  window.open(tip.link || SIGNUP_URL, "_blank", "noopener");
  showView("dashboard");
}

function getSignalStake(tip) {
  const bankroll = getProjectedBankroll();
  const stakeValue = Number(tip.stakeValue) || 0;
  const stakePercent = Number(tip.stakePercent) || 0;

  if (stakeValue > 0) return stakeValue;
  if (stakePercent > 0) return bankroll * (stakePercent / 100);
  return getRecommendedManagement(bankroll).stake || bankroll * 0.02;
}

function getSignalStakeLabel(tip, stake) {
  const stakePercent = Number(tip.stakePercent) || 0;
  if (stakePercent > 0) return `Stake ${formatPercent(stakePercent)} | ${formatMoney(stake)}`;
  return `Stake sugerida ${formatMoney(stake)}`;
}

function calculateBetProfit(stake, odd, result) {
  const fullProfit = stake * (odd - 1);
  const outcomes = {
    pending: 0,
    green: fullProfit,
    red: -stake,
    void: 0,
    halfGreen: fullProfit / 2,
    halfRed: -stake / 2
  };
  return outcomes[result] ?? 0;
}

function getStats() {
  const total = state.bets.length;
  const settled = state.bets.filter((bet) => bet.result !== "void" && bet.result !== "pending");
  const greens = state.bets.filter((bet) => bet.result === "green" || bet.result === "halfGreen").length;
  const reds = state.bets.filter((bet) => bet.result === "red" || bet.result === "halfRed").length;
  const profit = state.bets.reduce((sum, bet) => sum + bet.profit, 0);
  const totalStaked = state.bets.reduce((sum, bet) => sum + bet.stake, 0);
  const greenRate = settled.length ? (greens / settled.length) * 100 : 0;
  const redRate = settled.length ? (reds / settled.length) * 100 : 0;
  const roi = totalStaked ? (profit / totalStaked) * 100 : 0;

  return { total, greens, reds, profit, totalStaked, greenRate, redRate, roi };
}

function getProjectedBankroll() {
  return state.settings.bankroll + state.bets.reduce((sum, bet) => sum + bet.profit, 0);
}

function getRecommendedManagement(bankroll) {
  if (bankroll <= 0) {
    return { percent: 0, stake: 0, stopGain: 0, stopLoss: 0, units: 0, profile: "Defina a banca" };
  }

  if (bankroll < 100) {
    return {
      percent: 1,
      stake: bankroll * 0.01,
      stopGain: 3,
      stopLoss: 2,
      units: 100,
      profile: "Perfil protecao"
    };
  }

  if (bankroll < 500) {
    return {
      percent: 1.5,
      stake: bankroll * 0.015,
      stopGain: 4.5,
      stopLoss: 3,
      units: 67,
      profile: "Perfil conservador"
    };
  }

  if (bankroll < 2000) {
    return {
      percent: 2,
      stake: bankroll * 0.02,
      stopGain: 6,
      stopLoss: 4,
      units: 50,
      profile: "Perfil equilibrado"
    };
  }

  return {
    percent: 1.25,
    stake: bankroll * 0.0125,
    stopGain: 4,
    stopLoss: 2.5,
    units: 80,
    profile: "Perfil profissional"
  };
}

function showView(name) {
  els.views.forEach((view) => {
    view.classList.toggle("active", view.id === `view-${name}`);
  });
  els.navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.view === name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      ...defaults,
      ...parsed,
      access: { ...defaults.access, ...(parsed.access || {}) },
      settings: { ...defaults.settings, ...(parsed.settings || {}) },
      bets: Array.isArray(parsed.bets) ? parsed.bets : []
    };
  } catch (error) {
    return structuredClone(defaults);
  }
}

function loadTipsFeed() {
  if (!location.protocol.startsWith("http")) {
    renderSignals();
    return;
  }

  fetchTipsFrom(["/api/tips", "tips.json"]);
}

function fetchTipsFrom(sources) {
  const [source, ...rest] = sources;
  if (!source) {
    renderSignals();
    return;
  }

  fetch(source, { cache: "no-store" })
    .then((response) => response.ok ? response.json() : null)
    .then((data) => {
      const incoming = Array.isArray(data) ? data : data && Array.isArray(data.tips) ? data.tips : null;
      if (incoming && incoming.length) {
        tipsFeed = incoming;
        renderSignals();
        return;
      }
      fetchTipsFrom(rest);
    })
    .catch(() => fetchTipsFrom(rest));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getNumber(input, fallback) {
  const value = Number(String(input.value).replace(",", "."));
  return Number.isFinite(value) ? value : fallback;
}

function cleanNumber(value) {
  return Number(value || 0).toString();
}

function formatMoney(value) {
  return moneyFormatter.format(Number(value) || 0);
}

function formatPercent(value) {
  return `${percentFormatter.format(Number(value) || 0)}%`;
}

function formatDecimal(value) {
  return percentFormatter.format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) return "Sem data";
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(date);
}

function resultLabel(result) {
  const labels = {
    pending: "Pendente",
    green: "Green",
    red: "Red",
    void: "Void",
    halfGreen: "Meio green",
    halfRed: "Meio red"
  };
  return labels[result] || result;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
