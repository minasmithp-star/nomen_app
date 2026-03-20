// app.js — Nomen · lógica principal con flip 3D y colores por sección

const STATE_KEY = 'nomen-v2';

// Color por tipo de ion — se aplica a --accent en cada tarjeta
const SECTION_COLORS = {
  poliatómicos: '#8b5cf6',  // violeta
  monoatómicos: '#06b6d4',  // cyan
  cationes:     '#f97316',  // naranja
  hidrácido:    '#10b981',  // verde esmeralda
  oxoácido:     '#f59e0b',  // ámbar
  // subgrupos especiales
  halógenos:    '#ec4899',  // rosa
  azufre:       '#84cc16',  // lima
  nitrógeno:    '#6366f1',  // indigo
  fósforo:      '#14b8a6',  // teal
  cromo:        '#ef4444',  // rojo
  manganeso:    '#a855f7',  // púrpura
  oxígeno:      '#3b82f6',  // azul
  carbono:      '#64748b',  // slate
  arsénico:     '#d97706',  // ocre
  boro:         '#22c55e',  // verde
  default:      '#4f7cff',  // azul base
};

function getAccent(card) {
  if (card.subgrupo && SECTION_COLORS[card.subgrupo]) return SECTION_COLORS[card.subgrupo];
  if (card.tipo && SECTION_COLORS[card.tipo]) return SECTION_COLORS[card.tipo];
  return SECTION_COLORS.default;
}

// ── Estado ─────────────────────────────────────────────
let state = { learned: {}, streak: 0, bestStreak: 0 };

let session = {
  mode: 'nombre-formula',
  queue: [], index: 0,
  correct: 0, wrong: 0, ok: 0,
  hardCards: [],
  isFlipped: false,
};

function saveState() { try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {} }
function loadState() {
  try { const s = localStorage.getItem(STATE_KEY); if (s) state = { ...state, ...JSON.parse(s) }; } catch {}
}

// ── DOM ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const screens = { home: $('screen-home'), quiz: $('screen-quiz'), results: $('screen-results') };

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Home ───────────────────────────────────────────────
function updateHomeStats() {
  $('stat-total').textContent   = TODOS.length;
  $('stat-learned').textContent = Object.keys(state.learned).length;
  $('stat-streak').textContent  = state.streak;
}

// Mode selection
let selectedMode = 'nombre-formula';
document.querySelectorAll('.mode-card').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMode = btn.dataset.mode;
  });
});

// Section + subtab selection
let selectedSet = 'all';
let selectedSection = 'aniones';

document.querySelectorAll('.section-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    selectedSection = tab.dataset.section;
    ['aniones','cationes','acidos','todo'].forEach(s => {
      const el = document.getElementById(`subtabs-${s}`);
      if (el) el.classList.toggle('hidden', s !== selectedSection);
    });
    const first = document.querySelector(`#subtabs-${selectedSection} .set-tab`);
    if (first) {
      document.querySelectorAll(`#subtabs-${selectedSection} .set-tab`).forEach(t => t.classList.remove('active'));
      first.classList.add('active');
      selectedSet = first.dataset.set;
    }
  });
});

document.querySelectorAll('.set-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    tab.closest('.set-tabs').querySelectorAll('.set-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    selectedSet = tab.dataset.set;
  });
});

$('btn-start').addEventListener('click', () => {
  const pool = GRUPOS[selectedSet] || TODOS;
  startSession(selectedMode, pool);
});

$('btn-reset').addEventListener('click', () => {
  if (confirm('¿Reiniciar todo el progreso?')) {
    state = { learned: {}, streak: 0, bestStreak: 0 };
    saveState(); updateHomeStats();
  }
});

// ── Session ────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startSession(mode, pool) {
  session = { mode, queue: shuffle(pool), index: 0, correct: 0, wrong: 0, ok: 0, hardCards: [], isFlipped: false };
  showScreen('quiz');
  renderCard();
}

// ── Card render ────────────────────────────────────────
function renderCard() {
  const card = session.queue[session.index];
  if (!card) { showResults(); return; }

  // Reset flip
  session.isFlipped = false;
  const flip = $('card-flip');
  flip.classList.remove('flipped');
  $('rating-row').classList.remove('visible');

  // Accent color
  const accent = getAccent(card);
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-bg',
    accent + '18'); // ~10% opacity hex trick

  // Progress
  const pct = (session.index / session.queue.length) * 100;
  $('progress-fill').style.width = pct + '%';
  $('progress-label').textContent = `${session.index + 1} / ${session.queue.length}`;
  $('streak-badge').textContent = `❤︎ ${state.streak}`;

  // Group labels
  const groupText = buildGroupLabel(card);
  $('card-group-label').textContent = groupText;
  $('card-group-label-back').textContent = groupText;

  // Question & answer
  const q = buildQuestion(card, session.mode);
  $('card-question').textContent = q.question;
  $('card-answer').textContent   = q.answer;

  // Details on back
  buildDetails(card, session.mode);

  // Re-trigger animation
  const scene = $('card-scene');
  scene.style.animation = 'none';
  scene.offsetHeight;
  scene.style.animation = '';
}

function buildGroupLabel(card) {
  const isCation = card.tipo === 'cationes';
  const isAcido  = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';
  if (isCation) return 'CATIÓN · ' + (card.subgrupo || '').toUpperCase();
  if (isAcido)  return 'ÁCIDO · ' + card.tipo.toUpperCase();
  return card.tipo.toUpperCase() + (card.subgrupo ? ' · ' + card.subgrupo.toUpperCase() : '');
}

function buildQuestion(card, mode) {
  const isCation = card.tipo === 'cationes';
  const isAcido  = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';
  switch (mode) {
    case 'nombre-formula': return { question: card.nombre, answer: card.formula };
    case 'formula-nombre': return { question: card.formula, answer: card.nombre };
    case 'carga':
      // Solo nombre — la fórmula ya contiene la carga y revela la respuesta
      if (isAcido) return { question: card.nombre, answer: card.anion };
      return { question: card.nombre, answer: `Carga: ${card.carga > 0 ? '+' : ''}${card.carga}` };
    case 'sales':
      return { question: card.nombre, answer: card.sales };
    default: return { question: card.nombre, answer: card.formula };
  }
}

function buildDetails(card, mode) {
  const container = $('card-details');
  container.innerHTML = '';
  const isCation = card.tipo === 'cationes';
  const isAcido  = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';
  const rows = [];

  if (mode !== 'nombre-formula') rows.push({ l: 'Nombre',   v: card.nombre });
  if (mode !== 'formula-nombre') rows.push({ l: 'Fórmula',  v: card.formula });

  if (isAcido) {
    if (mode !== 'carga') rows.push({ l: 'Anión',  v: card.anion });
    rows.push({ l: 'Ka', v: card.ka });
  } else if (isCation) {
    rows.push({ l: 'Carga',   v: `+${card.carga}` });
    rows.push({ l: 'Origen',  v: card.origen });
  } else {
    if (mode !== 'carga') rows.push({ l: 'Carga', v: `${card.carga}` });
    if (card.oxoacido && card.oxoacido !== '—') rows.push({ l: 'Oxoácido', v: card.oxoacido });
  }

  // Limit to 2 rows to avoid overflow on back of card
  rows.slice(0, 2).forEach(r => {
    const div = document.createElement('div');
    div.className = 'detail-pill';
    div.innerHTML = `<span class="dpill-label">${r.l}</span><span class="dpill-val">${r.v}</span>`;
    container.appendChild(div);
  });
}

// ── Flip ───────────────────────────────────────────────
function handleFlip() {
  session.isFlipped = !session.isFlipped;
  $('card-flip').classList.toggle('flipped', session.isFlipped);
  if (session.isFlipped) $('rating-row').classList.add('visible');
}

// ── Rating ─────────────────────────────────────────────
function rate(level) {
  const card = session.queue[session.index];
  if (level === 'easy') {
    session.correct++;
    state.learned[card.id] = true;
  } else if (level === 'ok') {
    session.ok++;
  } else {
    session.wrong++;
    delete state.learned[card.id];
    session.hardCards.push(card);
  }
  // La racha NO se toca aquí — solo se incrementa al completar una sesión
  saveState();
  session.index++;
  renderCard();
}

$('btn-back').addEventListener('click', () => { showScreen('home'); updateHomeStats(); });

// ── Results ────────────────────────────────────────────
function showResults() {
  const total = session.correct + session.wrong;
  const pct   = total > 0 ? Math.round((session.correct / total) * 100) : 0;

  // Racha: se incrementa por completar la sesión, sin importar cuánto te equivocaste
  state.streak++;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  saveState();

  $('r-correct').textContent = session.correct;
  $('r-wrong').textContent   = session.wrong;
  $('r-pct').textContent     = pct + '%';

  let icon = '—', title = 'Sesión completa', msg = '';
  if (pct === 100) { icon = '◆◆◆'; title = 'Perfecto'; msg = 'Dominás todos los iones de esta sesión.'; }
  else if (pct >= 80) { icon = '◆◆'; title = 'Muy bien'; msg = `Respondiste correctamente el ${pct}% de las tarjetas.`; }
  else if (pct >= 50) { icon = '◆'; title = 'Sigue practicando'; msg = `Hay ${session.wrong} iones para reforzar.`; }
  else { icon = '○'; title = 'A repasar'; msg = 'Repasá los iones difíciles antes de avanzar.'; }

  $('results-icon').textContent  = icon;
  $('results-title').textContent = title;
  $('results-msg').textContent   = msg;
  $('btn-review').style.display  = session.hardCards.length > 0 ? '' : 'none';

  // Reset accent to default for results screen
  document.documentElement.style.setProperty('--accent', '#4f7cff');

  showScreen('results');
  updateHomeStats();
}

$('btn-review').addEventListener('click', () => {
  if (session.hardCards.length > 0) startSession(session.mode, session.hardCards);
});
$('btn-home').addEventListener('click', () => { showScreen('home'); updateHomeStats(); });

// ── Notifications ──────────────────────────────────────
async function initNotifications() {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (Notification.permission === 'default') showNotifBanner(reg);
    else if (Notification.permission === 'granted') reg.active?.postMessage('app-opened');
  } catch {}
}

function showNotifBanner(reg) {
  if (localStorage.getItem('notif-dismissed')) return;
  const banner = document.createElement('div');
  banner.id = 'notif-banner';
  banner.innerHTML = `
    <span>🕭 Activar recordatorios de racha</span>
    <div class="notif-actions">
      <button id="notif-yes">Sí</button>
      <button id="notif-no">No</button>
    </div>`;
  $('screen-home').appendChild(banner);
  $('notif-yes').addEventListener('click', async () => {
    banner.remove();
    const perm = await Notification.requestPermission();
    if (perm === 'granted') reg.active?.postMessage('app-opened');
  });
  $('notif-no').addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('notif-dismissed', '1');
  });
}

// ── Init ───────────────────────────────────────────────
loadState();
updateHomeStats();
showScreen('home');
initNotifications();
