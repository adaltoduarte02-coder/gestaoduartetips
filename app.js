const SIGNUP_URL = "https://go.aff.bravo.bet.br/m5j77ywh?btag=021715_AD66M&utm_source=app";
const STORAGE_KEY = "gestao-banca-exclusiva-v1";
const FOOTBALL_FIXTURES_ENDPOINT = "/api/football-fixtures";
const FOOTBALL_ANALYSIS_ENDPOINT = "/api/football-analysis";
const MAX_MATCHES_VISIBLE = 60;
const PRELIVE_MATCHES = [
  {
    id: "corinthians-flamengo",
    league: "Brasil Serie A",
    time: "Hoje 20:30",
    home: "Corinthians",
    away: "Flamengo",
    venue: "Neo Quimica Arena",
    confidence: "Leitura moderada",
    summary: "Confronto com Flamengo chegando mais forte em volume ofensivo, mas Corinthians costuma baixar o ritmo em casa no primeiro tempo. O mercado de gols pede protecao, enquanto cantos ganha valor se o visitante mantiver pressao pelos lados.",
    tags: ["HT protegido", "FT gols", "Cantos"],
    score: { home: "12o", away: "3o" },
    kpis: [
      { label: "Gols FT", value: "2.35", note: "media combinada" },
      { label: "Gols HT", value: "0.85", note: "primeiro tempo" },
      { label: "Cantos", value: "10.1", note: "media total" },
      { label: "Cartoes", value: "5.2", note: "jogo fisico" }
    ],
    homeStats: {
      form: "2V 2E 1D",
      goalsFor: 1.20,
      goalsAgainst: 0.90,
      htGoals: 0.40,
      corners: 5.1,
      cards: 2.7,
      cleanSheets: "40%",
      btts: "45%",
      over15: "70%",
      over25: "40%"
    },
    awayStats: {
      form: "4V 1E 0D",
      goalsFor: 1.80,
      goalsAgainst: 0.80,
      htGoals: 0.55,
      corners: 5.8,
      cards: 2.4,
      cleanSheets: "50%",
      btts: "55%",
      over15: "80%",
      over25: "55%"
    },
    h2h: {
      games: 10,
      homeWins: 3,
      draws: 3,
      awayWins: 4,
      avgGoals: 2.10,
      avgCorners: 9.4,
      avgCards: 5.7,
      over15: "70%",
      over25: "30%",
      btts: "50%"
    },
    suggestions: [
      { market: "Mais de 1.5 gols FT", edge: "Boa frequencia nas amostras recentes", confidence: "Media", odd: 1.42 },
      { market: "Flamengo mais de 4.5 cantos", edge: "Volume alto fora e laterais ativos", confidence: "Media", odd: 1.72 },
      { market: "Menos de 1.5 gols HT", edge: "Mandante inicia mais travado em casa", confidence: "Alta", odd: 1.35 }
    ]
  },
  {
    id: "palmeiras-cruzeiro",
    league: "Brasil Serie A",
    time: "Hoje 19:00",
    home: "Palmeiras",
    away: "Cruzeiro",
    venue: "Allianz Parque",
    confidence: "Leitura forte",
    summary: "Palmeiras tem consistencia defensiva em casa e costuma controlar territorio. Cruzeiro compete bem, mas cede cantos quando enfrenta times de pressao. O melhor caminho pre-live fica entre protecao no mandante e cantos do Palmeiras.",
    tags: ["Mandante", "Cantos", "Under visitante"],
    score: { home: "2o", away: "7o" },
    kpis: [
      { label: "Gols FT", value: "2.20", note: "media combinada" },
      { label: "Gols HT", value: "0.75", note: "primeiro tempo" },
      { label: "Cantos", value: "10.8", note: "media total" },
      { label: "Cartoes", value: "4.6", note: "perfil medio" }
    ],
    homeStats: {
      form: "4V 1E 0D",
      goalsFor: 1.70,
      goalsAgainst: 0.60,
      htGoals: 0.50,
      corners: 6.4,
      cards: 2.1,
      cleanSheets: "60%",
      btts: "35%",
      over15: "75%",
      over25: "45%"
    },
    awayStats: {
      form: "2V 2E 1D",
      goalsFor: 1.10,
      goalsAgainst: 1.00,
      htGoals: 0.35,
      corners: 4.2,
      cards: 2.5,
      cleanSheets: "30%",
      btts: "50%",
      over15: "65%",
      over25: "35%"
    },
    h2h: {
      games: 10,
      homeWins: 5,
      draws: 3,
      awayWins: 2,
      avgGoals: 2.00,
      avgCorners: 10.2,
      avgCards: 4.9,
      over15: "60%",
      over25: "30%",
      btts: "40%"
    },
    suggestions: [
      { market: "Palmeiras empate anula", edge: "Mandante consistente e menor exposicao", confidence: "Alta", odd: 1.48 },
      { market: "Palmeiras mais de 5.5 cantos", edge: "Pressao territorial e media alta em casa", confidence: "Media", odd: 1.82 },
      { market: "Cruzeiro menos de 1.5 gols", edge: "Visitante enfrenta defesa de baixa concessao", confidence: "Alta", odd: 1.36 }
    ]
  },
  {
    id: "uruguai-espanha",
    league: "Internacional",
    time: "Hoje 21:00",
    home: "Uruguai",
    away: "Espanha",
    venue: "Campo neutro",
    confidence: "Leitura moderada",
    summary: "Jogo com selecoes de estilos diferentes: Uruguai mais direto e fisico, Espanha com posse e volume. A tendencia de cartoes e cantos pode ser mais interessante do que buscar placar alto sem protecao.",
    tags: ["Selecoes", "Cartoes", "Cantos"],
    score: { home: "Top 15 FIFA", away: "Top 10 FIFA" },
    kpis: [
      { label: "Gols FT", value: "2.15", note: "media combinada" },
      { label: "Gols HT", value: "0.70", note: "primeiro tempo" },
      { label: "Cantos", value: "9.6", note: "media total" },
      { label: "Cartoes", value: "4.8", note: "duelos fortes" }
    ],
    homeStats: {
      form: "3V 1E 1D",
      goalsFor: 1.40,
      goalsAgainst: 0.90,
      htGoals: 0.45,
      corners: 4.8,
      cards: 2.8,
      cleanSheets: "40%",
      btts: "45%",
      over15: "70%",
      over25: "35%"
    },
    awayStats: {
      form: "4V 0E 1D",
      goalsFor: 1.90,
      goalsAgainst: 0.70,
      htGoals: 0.60,
      corners: 5.7,
      cards: 1.9,
      cleanSheets: "55%",
      btts: "40%",
      over15: "75%",
      over25: "45%"
    },
    h2h: {
      games: 6,
      homeWins: 1,
      draws: 2,
      awayWins: 3,
      avgGoals: 2.00,
      avgCorners: 8.9,
      avgCards: 4.5,
      over15: "67%",
      over25: "33%",
      btts: "50%"
    },
    suggestions: [
      { market: "Mais de 3.5 cartoes", edge: "Perfil fisico e confronto de selecoes fortes", confidence: "Media", odd: 1.62 },
      { market: "Espanha mais de 4.5 cantos", edge: "Posse alta gera volume ofensivo", confidence: "Media", odd: 1.70 },
      { market: "Menos de 1.5 gols HT", edge: "Amostra aponta estudo inicial", confidence: "Alta", odd: 1.38 }
    ]
  },
  {
    id: "sao-paulo-santos",
    league: "Brasil Serie A",
    time: "Hoje 18:30",
    home: "Sao Paulo",
    away: "Santos",
    venue: "Morumbi",
    confidence: "Leitura moderada",
    summary: "Classico com tendencia de jogo estudado no inicio e crescimento de volume no segundo tempo. O mandante costuma finalizar mais em casa, enquanto o visitante oferece espacos quando precisa sair.",
    tags: ["Classico", "HT travado", "Cantos casa"],
    score: { home: "6o", away: "14o" },
    kpis: [
      { label: "Gols FT", value: "2.05", note: "media combinada" },
      { label: "Gols HT", value: "0.68", note: "primeiro tempo" },
      { label: "Cantos", value: "10.4", note: "media total" },
      { label: "Cartoes", value: "5.4", note: "classico fisico" }
    ],
    homeStats: {
      form: "3V 1E 1D",
      goalsFor: 1.55,
      goalsAgainst: 0.85,
      htGoals: 0.42,
      corners: 6.1,
      cards: 2.5,
      cleanSheets: "45%",
      btts: "48%",
      over15: "68%",
      over25: "38%"
    },
    awayStats: {
      form: "1V 2E 2D",
      goalsFor: 1.00,
      goalsAgainst: 1.35,
      htGoals: 0.33,
      corners: 4.6,
      cards: 2.9,
      cleanSheets: "25%",
      btts: "52%",
      over15: "64%",
      over25: "42%"
    },
    h2h: {
      games: 10,
      homeWins: 4,
      draws: 3,
      awayWins: 3,
      avgGoals: 2.00,
      avgCorners: 10.0,
      avgCards: 5.8,
      over15: "60%",
      over25: "30%",
      btts: "50%"
    },
    suggestions: [
      { market: "Menos de 1.5 gols HT", edge: "Classico tende a iniciar mais amarrado", confidence: "Alta", odd: 1.36 },
      { market: "Sao Paulo mais de 5.5 cantos", edge: "Mandante sustenta volume alto no Morumbi", confidence: "Media", odd: 1.78 },
      { market: "Mais de 3.5 cartoes", edge: "Historico direto com disputa forte", confidence: "Media", odd: 1.55 }
    ]
  },
  {
    id: "botafogo-vasco",
    league: "Brasil Serie A",
    time: "Hoje 20:00",
    home: "Botafogo",
    away: "Vasco",
    venue: "Nilton Santos",
    confidence: "Leitura forte",
    summary: "Botafogo chega com boa chegada por corredor e pressao territorial em casa. Vasco costuma baixar linhas fora, o que aumenta chance de cantos e reduz exposicao para gols altos no primeiro tempo.",
    tags: ["Mandante", "Cantos", "HT seguro"],
    score: { home: "4o", away: "13o" },
    kpis: [
      { label: "Gols FT", value: "2.28", note: "media combinada" },
      { label: "Gols HT", value: "0.78", note: "primeiro tempo" },
      { label: "Cantos", value: "10.9", note: "media total" },
      { label: "Cartoes", value: "5.1", note: "duelo intenso" }
    ],
    homeStats: {
      form: "4V 0E 1D",
      goalsFor: 1.65,
      goalsAgainst: 0.75,
      htGoals: 0.52,
      corners: 6.3,
      cards: 2.3,
      cleanSheets: "55%",
      btts: "42%",
      over15: "76%",
      over25: "46%"
    },
    awayStats: {
      form: "1V 1E 3D",
      goalsFor: 0.95,
      goalsAgainst: 1.45,
      htGoals: 0.30,
      corners: 4.0,
      cards: 2.8,
      cleanSheets: "20%",
      btts: "50%",
      over15: "66%",
      over25: "44%"
    },
    h2h: {
      games: 10,
      homeWins: 5,
      draws: 2,
      awayWins: 3,
      avgGoals: 2.20,
      avgCorners: 10.5,
      avgCards: 5.5,
      over15: "70%",
      over25: "40%",
      btts: "50%"
    },
    suggestions: [
      { market: "Botafogo empate anula", edge: "Mandante mais consistente e menos exposto", confidence: "Alta", odd: 1.44 },
      { market: "Botafogo mais de 5.5 cantos", edge: "Pressao alta contra visitante recuado", confidence: "Media", odd: 1.80 },
      { market: "Menos de 1.5 gols HT", edge: "Vasco tende a fechar linhas no inicio", confidence: "Media", odd: 1.40 }
    ]
  },
  {
    id: "gremio-internacional",
    league: "Brasil Serie A",
    time: "Hoje 17:00",
    home: "Gremio",
    away: "Internacional",
    venue: "Arena do Gremio",
    confidence: "Leitura cautelosa",
    summary: "Grenal costuma ter ritmo quebrado, muita disputa e valor maior em cartoes do que em linhas agressivas de gols. Para gols, a leitura pede protecao no HT.",
    tags: ["Classico", "Cartoes", "Under HT"],
    score: { home: "9o", away: "8o" },
    kpis: [
      { label: "Gols FT", value: "1.92", note: "media combinada" },
      { label: "Gols HT", value: "0.62", note: "primeiro tempo" },
      { label: "Cantos", value: "9.3", note: "media total" },
      { label: "Cartoes", value: "6.4", note: "alta tensao" }
    ],
    homeStats: {
      form: "2V 2E 1D",
      goalsFor: 1.20,
      goalsAgainst: 1.00,
      htGoals: 0.35,
      corners: 5.0,
      cards: 3.0,
      cleanSheets: "35%",
      btts: "46%",
      over15: "58%",
      over25: "28%"
    },
    awayStats: {
      form: "2V 1E 2D",
      goalsFor: 1.15,
      goalsAgainst: 1.05,
      htGoals: 0.38,
      corners: 4.8,
      cards: 3.1,
      cleanSheets: "30%",
      btts: "48%",
      over15: "60%",
      over25: "32%"
    },
    h2h: {
      games: 10,
      homeWins: 3,
      draws: 4,
      awayWins: 3,
      avgGoals: 1.80,
      avgCorners: 9.1,
      avgCards: 6.8,
      over15: "50%",
      over25: "20%",
      btts: "40%"
    },
    suggestions: [
      { market: "Mais de 4.5 cartoes", edge: "Classico com historico disciplinar alto", confidence: "Alta", odd: 1.52 },
      { market: "Menos de 1.5 gols HT", edge: "Primeiro tempo geralmente travado", confidence: "Alta", odd: 1.34 },
      { market: "Menos de 3.5 gols FT", edge: "Amostra direta raramente vira placar largo", confidence: "Media", odd: 1.30 }
    ]
  },
  {
    id: "bahia-fortaleza",
    league: "Brasil Serie A",
    time: "Hoje 19:30",
    home: "Bahia",
    away: "Fortaleza",
    venue: "Fonte Nova",
    confidence: "Leitura moderada",
    summary: "Bahia costuma aumentar volume ofensivo em casa, enquanto Fortaleza e perigoso em transicao. O confronto favorece leitura de gols protegidos e cantos do mandante.",
    tags: ["Casa forte", "BTTS", "Cantos"],
    score: { home: "5o", away: "10o" },
    kpis: [
      { label: "Gols FT", value: "2.42", note: "media combinada" },
      { label: "Gols HT", value: "0.82", note: "primeiro tempo" },
      { label: "Cantos", value: "10.6", note: "media total" },
      { label: "Cartoes", value: "4.7", note: "media estavel" }
    ],
    homeStats: {
      form: "3V 1E 1D",
      goalsFor: 1.75,
      goalsAgainst: 1.05,
      htGoals: 0.54,
      corners: 6.0,
      cards: 2.2,
      cleanSheets: "35%",
      btts: "58%",
      over15: "78%",
      over25: "52%"
    },
    awayStats: {
      form: "2V 2E 1D",
      goalsFor: 1.25,
      goalsAgainst: 1.10,
      htGoals: 0.42,
      corners: 4.9,
      cards: 2.4,
      cleanSheets: "30%",
      btts: "55%",
      over15: "70%",
      over25: "42%"
    },
    h2h: {
      games: 10,
      homeWins: 4,
      draws: 2,
      awayWins: 4,
      avgGoals: 2.30,
      avgCorners: 10.4,
      avgCards: 4.8,
      over15: "70%",
      over25: "40%",
      btts: "60%"
    },
    suggestions: [
      { market: "Mais de 1.5 gols FT", edge: "Boa frequencia combinada de over", confidence: "Alta", odd: 1.38 },
      { market: "Bahia mais de 5.5 cantos", edge: "Mandante tem pressao alta na Fonte Nova", confidence: "Media", odd: 1.76 },
      { market: "Ambas marcam sim", edge: "Dois ataques com boa chegada recente", confidence: "Media", odd: 1.82 }
    ]
  },
  {
    id: "atletico-mg-fluminense",
    league: "Brasil Serie A",
    time: "Hoje 21:30",
    home: "Atletico-MG",
    away: "Fluminense",
    venue: "Arena MRV",
    confidence: "Leitura moderada",
    summary: "Atletico-MG tende a empurrar o jogo em casa e gerar cantos. Fluminense valoriza posse, mas pode sofrer em bolas laterais. A leitura favorece mercado de cantos e gol mandante protegido.",
    tags: ["Cantos casa", "Posse", "Gol mandante"],
    score: { home: "7o", away: "11o" },
    kpis: [
      { label: "Gols FT", value: "2.26", note: "media combinada" },
      { label: "Gols HT", value: "0.76", note: "primeiro tempo" },
      { label: "Cantos", value: "10.7", note: "media total" },
      { label: "Cartoes", value: "4.9", note: "jogo tecnico" }
    ],
    homeStats: {
      form: "3V 0E 2D",
      goalsFor: 1.60,
      goalsAgainst: 0.95,
      htGoals: 0.48,
      corners: 6.2,
      cards: 2.4,
      cleanSheets: "40%",
      btts: "50%",
      over15: "72%",
      over25: "44%"
    },
    awayStats: {
      form: "2V 1E 2D",
      goalsFor: 1.10,
      goalsAgainst: 1.20,
      htGoals: 0.36,
      corners: 4.7,
      cards: 2.3,
      cleanSheets: "28%",
      btts: "52%",
      over15: "68%",
      over25: "38%"
    },
    h2h: {
      games: 10,
      homeWins: 5,
      draws: 2,
      awayWins: 3,
      avgGoals: 2.20,
      avgCorners: 10.6,
      avgCards: 5.0,
      over15: "70%",
      over25: "40%",
      btts: "50%"
    },
    suggestions: [
      { market: "Atletico-MG mais de 4.5 cantos", edge: "Mandante com volume pelos lados", confidence: "Media", odd: 1.62 },
      { market: "Atletico-MG mais de 0.5 gol", edge: "Boa media ofensiva em casa", confidence: "Alta", odd: 1.28 },
      { market: "Mais de 1.5 gols FT", edge: "Amostras recentes sustentam linha baixa", confidence: "Media", odd: 1.42 }
    ]
  }
];

const DAILY_MATCH_GROUPS = [
  ["corinthians-flamengo", "palmeiras-cruzeiro", "uruguai-espanha"],
  ["sao-paulo-santos", "botafogo-vasco", "bahia-fortaleza"],
  ["gremio-internacional", "atletico-mg-fluminense", "corinthians-flamengo"],
  ["palmeiras-cruzeiro", "sao-paulo-santos", "botafogo-vasco"],
  ["uruguai-espanha", "bahia-fortaleza", "atletico-mg-fluminense"],
  ["corinthians-flamengo", "gremio-internacional", "sao-paulo-santos"],
  ["palmeiras-cruzeiro", "botafogo-vasco", "atletico-mg-fluminense"]
];

const DAILY_KICKOFFS = ["16:00", "18:30", "20:00", "21:30"];

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
let selectedAnalysisId = "";
const footballState = {
  status: "loading",
  error: "",
  date: getLocalDateKey(new Date()),
  matches: [],
  totalCount: 0,
  details: {}
};
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
  mentorForm: document.querySelector("#mentorForm"),
  mentorQuestion: document.querySelector("#mentorQuestion"),
  mentorOdd: document.querySelector("#mentorOdd"),
  mentorConfidence: document.querySelector("#mentorConfidence"),
  mentorEntries: document.querySelector("#mentorEntries"),
  mentorStake: document.querySelector("#mentorStake"),
  mentorMarket: document.querySelector("#mentorMarket"),
  mentorAnswer: document.querySelector("#mentorAnswer"),
  mentorBankroll: document.querySelector("#mentorBankroll"),
  mentorRecommendedStake: document.querySelector("#mentorRecommendedStake"),
  mentorRiskBadge: document.querySelector("#mentorRiskBadge"),
  mentorQuickActions: document.querySelector("#mentorQuickActions"),
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

  els.mentorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    answerMentor();
  });

  els.mentorQuickActions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-mentor-prompt]");
    if (!button) return;
    els.mentorQuestion.value = button.dataset.mentorPrompt;
    answerMentor();
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
  renderMentor();
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

function renderMentor() {
  const bankroll = getProjectedBankroll();
  const recommended = getRecommendedManagement(bankroll);
  const stats = getStats();
  const today = getTodayStats();
  const riskTone = today.profit <= -(bankroll * (state.settings.stopLossPercent / 100))
    ? "Pausar"
    : today.profit > 0 ? "Dia positivo" : "Gestao ativa";

  els.mentorBankroll.textContent = `Banca ${formatMoney(bankroll)}`;
  els.mentorRecommendedStake.textContent = formatMoney(recommended.stake);
  els.mentorRiskBadge.textContent = riskTone;

  if (!els.mentorAnswer.innerHTML.trim()) {
    els.mentorAnswer.innerHTML = renderMentorWelcome(recommended, stats, today);
  }
}

function renderMentorWelcome(recommended, stats, today) {
  return `
    <div class="mentor-answer-card mentor-empty">
      <span class="mentor-label">IA pronta</span>
      <h2>Me diga a entrada antes de apostar.</h2>
      <p>Eu vou analisar stake, odd, risco, stop do dia e disciplina de banca. A ideia aqui e proteger sua banca antes de pensar em lucro.</p>
      <div class="mentor-kpi-grid">
        <div><span>Stake base</span><strong>${formatMoney(recommended.stake)}</strong></div>
        <div><span>Perfil</span><strong>${escapeHtml(recommended.profile)}</strong></div>
        <div><span>Entradas hoje</span><strong>${today.count}</strong></div>
        <div><span>Taxa green</span><strong>${formatPercent(stats.greenRate)}</strong></div>
      </div>
    </div>
  `;
}

function answerMentor() {
  const context = getMentorContext();
  const advice = buildMentorAdvice(context);
  els.mentorAnswer.innerHTML = renderMentorAdvice(advice, context);
}

function getMentorContext() {
  const bankroll = getProjectedBankroll();
  const recommended = getRecommendedManagement(bankroll);
  const question = els.mentorQuestion.value.trim();
  const odd = getNumber(els.mentorOdd, 1.8);
  const entries = Math.max(0, Math.round(getNumber(els.mentorEntries, 0)));
  const confidence = els.mentorConfidence.value;
  const market = els.mentorMarket.value.trim();
  const plannedStake = getNumber(els.mentorStake, 0);
  const today = getTodayStats();
  const stopGainValue = bankroll * (state.settings.stopGainPercent / 100);
  const stopLossValue = bankroll * (state.settings.stopLossPercent / 100);

  return {
    question,
    odd,
    entries,
    confidence,
    market,
    plannedStake,
    bankroll,
    recommended,
    today,
    stopGainValue,
    stopLossValue
  };
}

function buildMentorAdvice(context) {
  const lower = context.question.toLowerCase();
  const confidenceMultiplier = {
    baixa: 0.5,
    media: 1,
    alta: 1.15
  }[context.confidence] || 1;
  const baseStake = context.recommended.stake * confidenceMultiplier;
  const isRecoverMode = /recuper|dobr|all.?in|ir pesado|perdi|red/i.test(lower);
  const asksStats = /media|gols|ht|ft|cantos|cartoes|flamengo|corinthians|time|historico|ranking/i.test(lower);
  const riskReasons = [];

  if (context.odd >= 2.5) riskReasons.push("Odd alta aumenta variancia. Use stake menor ou pule se nao houver valor muito claro.");
  if (context.entries >= 4) riskReasons.push("Muitas entradas no mesmo dia aumentam chance de decisao emocional.");
  if (context.confidence === "baixa") riskReasons.push("Confianca baixa nao combina com stake cheia.");
  if (context.plannedStake && context.plannedStake > context.recommended.stake * 1.35) riskReasons.push("Stake pensada esta acima da gestao recomendada.");
  if (context.today.profit <= -context.stopLossValue) riskReasons.push("Stop loss do dia ja foi atingido. O correto e pausar.");
  if (context.today.profit >= context.stopGainValue) riskReasons.push("Stop gain do dia ja foi atingido. Proteja o lucro.");
  if (isRecoverMode) riskReasons.push("Modo recuperacao detectado. Nao aumente stake para buscar prejuizo.");

  let suggestedStake = baseStake;
  if (context.odd >= 2.5) suggestedStake *= 0.65;
  if (context.entries >= 4) suggestedStake *= 0.7;
  if (isRecoverMode || context.today.profit <= -context.stopLossValue) suggestedStake = 0;
  if (context.plannedStake && context.plannedStake < suggestedStake) suggestedStake = context.plannedStake;
  suggestedStake = Math.max(0, Math.min(suggestedStake, context.recommended.stake * 1.2));

  const riskLevel = riskReasons.length >= 4 || suggestedStake === 0
    ? "Alto"
    : riskReasons.length >= 2 ? "Moderado" : "Controlado";
  const decision = suggestedStake === 0
    ? "Pular entrada e proteger a banca"
    : riskLevel === "Alto" ? "So considerar com stake minima"
    : riskLevel === "Moderado" ? "Reduzir stake e confirmar valor"
    : "Dentro da gestao";

  const checklist = [
    "A entrada respeita a stake indicada?",
    "Voce aceitaria perder essa stake sem tentar recuperar?",
    "A odd tem valor real ou e so ansiedade?",
    "O stop do dia continua protegido?"
  ];

  if (asksStats) {
    riskReasons.push("Esta versao rapida nao consulta estatistica real de times. Use o mentor para stake, risco e disciplina; dados de jogo precisam de fonte externa confiavel.");
  }

  return {
    decision,
    riskLevel,
    suggestedStake,
    stakePercent: context.bankroll ? (suggestedStake / context.bankroll) * 100 : 0,
    maxLoss: suggestedStake,
    possibleProfit: suggestedStake * Math.max(0, context.odd - 1),
    reasons: riskReasons.length ? riskReasons : ["Entrada dentro dos limites de banca informados."],
    checklist
  };
}

function renderMentorAdvice(advice, context) {
  return `
    <div class="mentor-answer-card">
      <span class="mentor-label">Resposta do mentor</span>
      <h2>${escapeHtml(advice.decision)}</h2>
      <p>${escapeHtml(buildMentorIntro(advice, context))}</p>

      <div class="mentor-decision-band ${advice.riskLevel.toLowerCase()}">
        <div>
          <span>Risco</span>
          <strong>${escapeHtml(advice.riskLevel)}</strong>
        </div>
        <div>
          <span>Stake indicada</span>
          <strong>${formatMoney(advice.suggestedStake)}</strong>
        </div>
        <div>
          <span>% da banca</span>
          <strong>${formatPercent(advice.stakePercent)}</strong>
        </div>
      </div>

      <div class="mentor-kpi-grid">
        <div><span>Odd</span><strong>${formatDecimal(context.odd)}</strong></div>
        <div><span>Lucro possivel</span><strong>${formatMoney(advice.possibleProfit)}</strong></div>
        <div><span>Perda maxima</span><strong>${formatMoney(advice.maxLoss)}</strong></div>
        <div><span>Entradas hoje</span><strong>${context.entries}</strong></div>
      </div>

      <div class="mentor-section">
        <strong>Por que essa leitura?</strong>
        <ul>
          ${advice.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}
        </ul>
      </div>

      <div class="mentor-section">
        <strong>Checklist antes de entrar</strong>
        <ul>
          ${advice.checklist.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function buildMentorIntro(advice, context) {
  if (advice.suggestedStake <= 0) {
    return "Minha leitura e pausar. Quando a gestao manda parar, insistir costuma transformar uma perda pequena em problema grande.";
  }

  if (context.market) {
    return `Para ${context.market}, eu manteria a decisao pela gestao: stake controlada, sem dobrar e sem passar do stop.`;
  }

  return "Sem depender de palpite de jogo, a decisao mais importante aqui e controlar tamanho da entrada e preservar sua banca.";
}

function getTodayStats() {
  const today = getLocalDateKey(new Date());
  const bets = state.bets.filter((bet) => bet.date === today);
  const profit = bets.reduce((sum, bet) => sum + bet.profit, 0);
  return {
    count: bets.length,
    profit
  };
}

async function loadFootballFixtures() {
  footballState.status = "loading";
  footballState.error = "";
  footballState.date = getLocalDateKey(new Date());
  renderAnalysis();

  try {
    const response = await fetch(`${FOOTBALL_FIXTURES_ENDPOINT}?date=${encodeURIComponent(footballState.date)}`, {
      headers: { Accept: "application/json" }
    });
    const payload = await readJsonResponse(response);
    if (!response.ok || !payload.ok) {
      throw new Error(payload.error || "API nao retornou jogos.");
    }

    footballState.status = "ready";
    footballState.totalCount = Number(payload.total || payload.count || 0);
    footballState.matches = normalizeMatches(Array.isArray(payload.matches) ? payload.matches : []);
    footballState.error = "";
    selectedAnalysisId = "";
  } catch (error) {
    footballState.status = "error";
    footballState.matches = [];
    footballState.totalCount = 0;
    footballState.error = error.message || "Falha ao buscar os jogos reais.";
  }

  renderAnalysis();
}

function normalizeMatches(matches) {
  return matches
    .map((match) => ({
      ...match,
      priority: Number(match.priority || 0)
    }))
    .sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return Number(a.timestamp || 0) - Number(b.timestamp || 0);
    })
    .slice(0, MAX_MATCHES_VISIBLE);
}

async function loadFootballAnalysis(matchId) {
  const match = footballState.matches.find((item) => item.id === matchId);
  if (!match) return;

  const current = footballState.details[matchId];
  if (current?.status === "ready" || current?.status === "loading") return;

  footballState.details[matchId] = { status: "loading" };
  renderAnalysis();

  try {
    const params = new URLSearchParams({
      fixture: match.fixtureId || match.id,
      home: match.homeId || "",
      away: match.awayId || "",
      league: match.leagueId || "",
      season: match.season || "",
      homeName: match.home || "",
      awayName: match.away || "",
      leagueName: match.league || "",
      country: match.country || "",
      venue: match.venue || "",
      time: match.time || ""
    });
    const response = await fetch(`${FOOTBALL_ANALYSIS_ENDPOINT}?${params.toString()}`, {
      headers: { Accept: "application/json" }
    });
    const payload = await readJsonResponse(response);
    if (!response.ok || !payload.ok) {
      throw new Error(payload.error || "API nao retornou analise.");
    }
    footballState.details[matchId] = { status: "ready", data: payload };
  } catch (error) {
    footballState.details[matchId] = {
      status: "error",
      error: error.message || "Falha ao montar analise."
    };
  }

  renderAnalysis();
}

async function readJsonResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    const isHtml = text.trim().startsWith("<");
    if (isHtml) {
      throw new Error("A rota /api caiu na capa do app. Suba tambem o arquivo _redirects e confirme no deploy: 3 redirect rules processed e 2 functions deployed.");
    }
    throw new Error("A API respondeu em formato invalido. Tente republicar o deploy.");
  }
}

function renderAnalysisTable(matches, selected) {
  return `
    <div class="analysis-table-wrap">
      <table class="analysis-table">
        <thead>
          <tr>
            <th>Casa x Visitante</th>
            <th>Liga</th>
            <th>Data Hora</th>
            <th>BTTS</th>
            <th>0.5g HT</th>
            <th>1.5g FT</th>
            <th>2.5g FT</th>
            <th>Analise</th>
          </tr>
        </thead>
        <tbody>
          ${matches.map((match) => {
            const detail = footballState.details[match.id];
            const kpis = detail?.data?.kpis || [];
            return `
              <tr class="${selected && selected.id === match.id ? "active" : ""}" data-analysis-id="${escapeHtml(match.id)}">
                <td>
                  <div class="fixture-cell">
                    <span class="fixture-star">★</span>
                    <div>
                      <strong>${escapeHtml(match.home)}</strong>
                      <em>${escapeHtml(match.away)}</em>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="league-cell">${escapeHtml(match.country ? `${match.country} | ${match.league}` : match.league)}</span>
                </td>
                <td>
                  <strong class="time-cell">${escapeHtml(match.time.replace("Hoje ", "Hoje "))}</strong>
                </td>
                <td>${renderMetricPill(getKpiValue(kpis, "BTTS"))}</td>
                <td>${renderMetricPill(getKpiValue(kpis, "Over 0.5 HT"))}</td>
                <td>${renderMetricPill(getKpiValue(kpis, "Over 1.5 FT"))}</td>
                <td>${renderMetricPill(getKpiValue(kpis, "Over 2.5 FT"))}</td>
                <td><span class="open-analysis-pill">${detail?.status === "ready" ? "Abrir" : "Carregar"}</span></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAnalysisState(title, message) {
  return `
    <div class="analysis-state">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

function getKpiValue(kpis, label) {
  return kpis.find((kpi) => kpi.label === label)?.value || "";
}

function renderMetricPill(value) {
  if (!value || value === "-") return `<span class="metric-pill empty">--</span>`;
  const number = Number(String(value).replace("%", ""));
  const tone = number >= 65 ? "good" : number >= 45 ? "mid" : "low";
  return `<span class="metric-pill ${tone}">${escapeHtml(value)}</span>`;
}

function renderAnalysisTable(matches, selected) {
  return `
    <div class="analysis-list-grid">
      ${matches.map((match) => {
        const detail = footballState.details[match.id];
        const kpis = detail?.data?.kpis || [];
        const statusLabel = detail?.status === "loading"
          ? "Carregando"
          : detail?.status === "ready" ? "Abrir analise" : detail?.status === "error" ? "Tentar de novo" : "Analisar";
        return `
          <article class="fixture-card ${selected && selected.id === match.id ? "active" : ""}" data-analysis-id="${escapeHtml(match.id)}">
            <div class="fixture-card-main">
              <div class="fixture-time">
                <strong>${escapeHtml(match.kickoff || match.time || "Hoje")}</strong>
                <span>${escapeHtml(match.statusLong || "Pre-live")}</span>
              </div>
              <div class="fixture-teams">
                <strong>${escapeHtml(match.home)}</strong>
                <em>x</em>
                <strong>${escapeHtml(match.away)}</strong>
              </div>
              <span class="fixture-league">${escapeHtml(match.country ? `${match.country} | ${match.league}` : match.league)}</span>
            </div>
            <div class="fixture-card-side">
              <div class="fixture-mini-kpis">
                <span>BTTS ${escapeHtml(getKpiValue(kpis, "BTTS") || "--")}</span>
                <span>O1.5 ${escapeHtml(getKpiValue(kpis, "Over 1.5 FT") || "--")}</span>
                <span>HT ${escapeHtml(getKpiValue(kpis, "Over 0.5 HT") || "--")}</span>
              </div>
              <button class="open-analysis-pill" type="button">${escapeHtml(statusLabel)}</button>
            </div>
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function renderAnalysis() {
  const matches = footballState.matches;
  const selected = getSelectedAnalysis();
  const today = new Date();
  const total = footballState.totalCount || matches.length;
  const countLabel = footballState.status === "loading"
    ? "Carregando"
    : total > matches.length ? `${matches.length} de ${total} jogos` : matches.length === 1 ? "1 jogo hoje" : `${matches.length} jogos hoje`;

  els.analysisDate.textContent = formatAnalysisDate(today);
  els.analysisCount.textContent = countLabel;

  if (footballState.status === "loading") {
    els.analysisList.innerHTML = renderAnalysisState("Carregando jogos reais do dia...", "A busca vem direto da API-Football.");
  } else if (footballState.status === "error") {
    els.analysisList.innerHTML = renderAnalysisState("Nao foi possivel carregar os jogos reais.", footballState.error || "Confira a chave da API no Netlify.");
  } else if (!matches.length) {
    els.analysisList.innerHTML = renderAnalysisState("Nenhum jogo encontrado para hoje.", "A API nao retornou confrontos para esta data.");
  } else {
    els.analysisList.innerHTML = renderAnalysisTable(matches, selected);
  }

  els.analysisDetail.classList.toggle("is-hidden", !selected);
  if (!selected) {
    els.analysisDetail.innerHTML = "";
    return;
  }

  const detail = footballState.details[selected.id];
  if (!detail || detail.status === "loading") {
    els.analysisDetail.innerHTML = renderAnalysisState("Montando analise real...", "Buscando ultimos jogos, confronto direto e classificacao.");
    return;
  }

  if (detail.status === "error") {
    els.analysisDetail.innerHTML = `
      <div class="analysis-detail-top">
        <button class="ghost-action" type="button" data-close-analysis>Voltar</button>
        <span>${escapeHtml(selected.time)}</span>
      </div>
      ${renderAnalysisState("Nao foi possivel montar a analise.", detail.error || "Tente novamente em alguns minutos.")}
    `;
    return;
  }

  const analysis = detail.data;
  const selectedMatch = analysis.match || selected;
  const h2h = analysis.h2h || {};

  els.analysisDetail.innerHTML = `
    <div class="analysis-detail-top">
      <button class="ghost-action" type="button" data-close-analysis>Voltar</button>
      <span>${escapeHtml(selectedMatch.time)}</span>
    </div>

    <div class="analysis-hero">
      <p class="eyebrow">${escapeHtml(selectedMatch.league)}</p>
      <div class="match-title-grid">
        <div>
          <span>Casa | ${escapeHtml(selectedMatch.score?.home || "-")}</span>
          <strong>${escapeHtml(selectedMatch.home)}</strong>
        </div>
        <em>x</em>
        <div>
          <span>Fora | ${escapeHtml(selectedMatch.score?.away || "-")}</span>
          <strong>${escapeHtml(selectedMatch.away)}</strong>
        </div>
      </div>
      <span>${escapeHtml(selectedMatch.venue)} | ${escapeHtml(formatAnalysisDate(new Date()))}</span>
      <div class="analysis-tags">
        <span>Dados reais</span>
        <span>API-Football</span>
        <span>Sem jogos inventados</span>
      </div>
    </div>

    <div class="analysis-kpi-grid">
      ${(analysis.kpis || []).map((kpi) => `
        <div class="analysis-kpi">
          <span>${escapeHtml(kpi.label)}</span>
          <strong>${escapeHtml(kpi.value)}</strong>
          <small>${escapeHtml(kpi.note)}</small>
        </div>
      `).join("")}
    </div>

    <div class="analysis-summary">
      <strong>Leitura rapida</strong>
      <p>${escapeHtml(analysis.summary || "A API nao retornou amostra suficiente para leitura detalhada.")}</p>
    </div>

    ${(analysis.unavailable || []).length ? `
      <div class="analysis-warning">
        <strong>Sem chute</strong>
        <p>${escapeHtml((analysis.unavailable || []).join(" e "))} nao foram preenchidos porque a API nao entregou esses historicos de forma confiavel nesta consulta.</p>
      </div>
    ` : ""}

    <div class="split-analysis">
      ${renderTeamBlock(selectedMatch.home, "Casa", selectedMatch.score?.home || "-", analysis.homeStats)}
      ${renderTeamBlock(selectedMatch.away, "Fora", selectedMatch.score?.away || "-", analysis.awayStats)}
    </div>

    <div class="h2h-panel">
      <div class="panel-head compact">
        <h2>Confronto direto</h2>
        <span>${safeValue(h2h.games)} jogos</span>
      </div>
      <div class="h2h-grid">
        <div><span>Vitorias ${escapeHtml(selectedMatch.home)}</span><strong>${safeValue(h2h.homeWins)}</strong></div>
        <div><span>Empates</span><strong>${safeValue(h2h.draws)}</strong></div>
        <div><span>Vitorias ${escapeHtml(selectedMatch.away)}</span><strong>${safeValue(h2h.awayWins)}</strong></div>
        <div><span>Gols FT</span><strong>${formatOptionalDecimal(h2h.avgGoals)}</strong></div>
        <div><span>Over 1.5</span><strong>${formatOptionalPercent(h2h.over15)}</strong></div>
        <div><span>Over 2.5</span><strong>${formatOptionalPercent(h2h.over25)}</strong></div>
        <div><span>Over 0.5 HT</span><strong>${formatOptionalPercent(h2h.htOver05)}</strong></div>
        <div><span>BTTS</span><strong>${formatOptionalPercent(h2h.btts)}</strong></div>
        <div><span>Cantos/cartoes</span><strong>Sem dado</strong></div>
      </div>
    </div>

    <div class="suggestion-panel">
      <div class="panel-head compact">
        <h2>Sugestoes pre-live</h2>
        <span>pre-live</span>
      </div>
      <div class="suggestion-list">
        ${(analysis.suggestions || []).map((suggestion, index) => `
          <article class="suggestion-card">
            <div>
              <strong>${escapeHtml(suggestion.market)}</strong>
              <p>${escapeHtml(suggestion.edge)}</p>
              <span>${escapeHtml(suggestion.confidence)} | Conferir odd na BRAVOBET</span>
            </div>
            <button class="signal-action" type="button" data-prelive-bet="${index}">Registrar</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
}

function renderTeamBlock(team, context, standing, stats) {
  const safeStats = stats || {};
  return `
    <article class="team-analysis">
      <div class="team-analysis-head">
        <div>
          <span>${escapeHtml(context)} | ${escapeHtml(standing)}</span>
          <strong>${escapeHtml(team)}</strong>
        </div>
        <small>${escapeHtml(safeStats.form || "-")}</small>
      </div>
      <div class="team-stat-grid">
        <div><span>Jogos usados</span><strong>${safeValue(safeStats.games)}</strong></div>
        <div><span>Gols pro</span><strong>${formatOptionalDecimal(safeStats.goalsFor)}</strong></div>
        <div><span>Gols contra</span><strong>${formatOptionalDecimal(safeStats.goalsAgainst)}</strong></div>
        <div><span>Gols HT</span><strong>${formatOptionalDecimal(safeStats.htGoals)}</strong></div>
        <div><span>BTTS</span><strong>${formatOptionalPercent(safeStats.btts)}</strong></div>
        <div><span>Over 0.5 HT</span><strong>${formatOptionalPercent(safeStats.htOver05)}</strong></div>
        <div><span>Over 1.5</span><strong>${formatOptionalPercent(safeStats.over15)}</strong></div>
        <div><span>Over 2.5</span><strong>${formatOptionalPercent(safeStats.over25)}</strong></div>
        <div><span>Cantos/cartoes</span><strong>Sem dado</strong></div>
      </div>
    </article>
  `;
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

function registerPreliveSuggestion(indexValue) {
  const match = getSelectedAnalysis();
  if (!match) return;
  const analysis = footballState.details[match.id]?.data;
  const suggestion = analysis?.suggestions?.[Number(indexValue)];
  if (!suggestion) return;

  const stake = getRecommendedManagement(getProjectedBankroll()).stake;
  const today = new Date().toISOString().slice(0, 10);
  state.bets.unshift({
    id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    title: `${match.home} x ${match.away} - ${suggestion.market}`,
    odd: Number(suggestion.odd) || 1,
    stake,
    result: "pending",
    date: today,
    note: `Analise API-Football: ${suggestion.confidence}. Conferir odd na BRAVOBET.`,
    profit: 0
  });
  saveState();
  renderAll();
  showView("dashboard");
}

function getSelectedAnalysis() {
  return footballState.matches.find((match) => match.id === selectedAnalysisId) || null;
}

function getDailyMatches(date = new Date()) {
  return footballState.matches;
}

function getDayIndex(date) {
  const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const start = new Date(2026, 0, 1);
  const dayMs = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((current - start) / dayMs));
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatAnalysisDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  }).format(date);
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

function formatOptionalDecimal(value) {
  if (!Number.isFinite(Number(value))) return "-";
  return percentFormatter.format(Number(value));
}

function formatOptionalPercent(value) {
  if (!Number.isFinite(Number(value))) return "-";
  return `${Math.round(Number(value))}%`;
}

function safeValue(value) {
  return value === null || value === undefined || value === "" ? "-" : escapeHtml(value);
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
