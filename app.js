// app.js — Aniones Quiz · lógica principal

const STATE_KEY = 'anion-quiz-v1';

// ── Estado global ──────────────────────────────────────
let state = {
  learned: {},      // { id: true }
  streak: 0,
  bestStreak: 0,
};

let session = {
  mode: 'nombre-formula',
  set: 'all',
  queue: [],
  index: 0,
  correct: 0,
  wrong: 0,
  wrongCards: [],
  reviewMode: false,
};

// ── Persistencia ────────────────────────────────────────
function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {}
}
function loadState() {
  try {
    const s = localStorage.getItem(STATE_KEY);
    if (s) state = { ...state, ...JSON.parse(s) };
  } catch {}
}

// ── DOM helpers ─────────────────────────────────────────
const $ = id => document.getElementById(id);
const screens = {
  home:    $('screen-home'),
  quiz:    $('screen-quiz'),
  results: $('screen-results'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Home ────────────────────────────────────────────────
function updateHomeStats() {
  const total = TODOS.length;
  const learned = Object.keys(state.learned).length;
  $('stat-total').textContent = total;
  $('stat-learned').textContent = learned;
  $('stat-streak').textContent = state.streak;
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
// default selected
document.querySelector('[data-mode="nombre-formula"]').classList.add('selected');

// Set tabs — section selector
let selectedSet = 'all';
let selectedSection = 'aniones';

document.querySelectorAll('.section-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    selectedSection = tab.dataset.section;

    // Show/hide subtab groups
    ['aniones','cationes','acidos','todo'].forEach(s => {
      const el = document.getElementById(`subtabs-${s}`);
      if (el) el.classList.toggle('hidden', s !== selectedSection);
    });

    // Auto-select first subtab of active section
    const active = document.querySelector(`#subtabs-${selectedSection} .set-tab`);
    if (active) {
      document.querySelectorAll(`#subtabs-${selectedSection} .set-tab`)
        .forEach(t => t.classList.remove('active'));
      active.classList.add('active');
      selectedSet = active.dataset.set;
    }
  });
});

document.querySelectorAll('.set-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Only deactivate siblings in same subtabs group
    tab.closest('.set-tabs').querySelectorAll('.set-tab')
      .forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    selectedSet = tab.dataset.set;
  });
});

$('btn-start').addEventListener('click', () => {
  const pool = GRUPOS[selectedSet] || ANIONES;
  startSession(selectedMode, pool, false);
});

$('btn-reset').addEventListener('click', () => {
  if (confirm('¿Reiniciar todo el progreso?')) {
    state = { learned: {}, streak: 0, bestStreak: 0 };
    saveState();
    updateHomeStats();
  }
});

// ── Quiz session ────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startSession(mode, pool, reviewMode) {
  session = {
    mode,
    set: selectedSet,
    queue: shuffle(pool),
    index: 0,
    correct: 0,
    wrong: 0,
    wrongCards: [],
    reviewMode,
  };
  showScreen('quiz');
  renderCard();
}

function renderCard() {
  const card = session.queue[session.index];
  if (!card) { showResults(); return; }

  // Progress
  const pct = (session.index / session.queue.length) * 100;
  $('progress-fill').style.width = pct + '%';
  $('progress-label').textContent = `${session.index + 1} / ${session.queue.length}`;
  $('streak-badge').textContent = `🔥 ${state.streak}`;

  // Reset card display
  $('card-front').style.display = '';
  $('card-back').classList.add('hidden');

  // Group label
  const sectionLabel = card.tipo === 'cationes' ? 'CATIÓN' :
    (card.tipo === 'hidrácido' || card.tipo === 'oxoácido') ? 'ÁCIDO · ' + card.tipo.toUpperCase() :
    card.tipo.toUpperCase();
  $('card-group-label').textContent = sectionLabel + ' · ' + (card.subgrupo || '').toUpperCase();

  // Question & hint per mode
  const q = buildQuestion(card, session.mode);
  $('card-question').textContent = q.question;
  $('card-hint').textContent = q.hint;

  // Answer & details
  $('card-answer').textContent = q.answer;
  buildDetails(card, session.mode);

  // Animate
  const cardEl = $('flashcard');
  cardEl.style.animation = 'none';
  cardEl.offsetHeight; // reflow
  cardEl.style.animation = '';
}

function buildQuestion(card, mode) {
  const isCation = card.tipo === 'cationes';
  const isAcido  = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';

  switch (mode) {
    case 'nombre-formula':
      return {
        question: card.nombre,
        hint: isCation ? `Catión · ${card.subgrupo}` : isAcido ? `Ácido · ${card.tipo}` : `Tipo: ${card.tipo}`,
        answer: card.formula,
      };
    case 'formula-nombre':
      return {
        question: card.formula,
        hint: isCation ? `Catión · ${card.subgrupo}` : isAcido ? `Ácido · ${card.tipo}` : `${card.tipo} · ${card.subgrupo}`,
        answer: card.nombre,
      };
    case 'carga':
      if (isAcido) {
        return {
          question: card.nombre + '\n' + card.formula,
          hint: '¿Cuál es el anión que libera?',
          answer: card.anion,
        };
      }
      return {
        question: card.nombre + '\n' + card.formula,
        hint: isCation ? '¿Cuál es la carga del catión?' : '¿Cuál es la carga del anión?',
        answer: `Carga: ${card.carga > 0 ? '+' : ''}${card.carga}`,
      };
    case 'sales':
      if (isAcido) {
        return {
          question: card.nombre + '\n' + card.formula,
          hint: '¿Qué sales forma?',
          answer: card.sales,
        };
      }
      return {
        question: card.nombre + '\n' + card.formula,
        hint: isCation ? '¿Qué sales forma?' : '¿Cómo se llaman las sales que forma?',
        answer: card.sales,
      };
    default:
      return { question: card.nombre, hint: '', answer: card.formula };
  }
}

function buildDetails(card, mode) {
  const container = $('card-details');
  container.innerHTML = '';

  const isCation = card.tipo === 'cationes';
  const isAcido  = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';
  const rows = [];

  if (mode !== 'nombre-formula') rows.push({ label: 'Nombre', value: card.nombre });
  if (mode !== 'formula-nombre') rows.push({ label: 'Fórmula', value: card.formula });

  if (isAcido) {
    if (mode !== 'carga') rows.push({ label: 'Anión que libera', value: card.anion, highlight: true });
    rows.push({ label: 'Constante de acidez', value: card.ka });
    if (mode !== 'sales') rows.push({ label: 'Sales que forma', value: card.sales, highlight: true });
  } else if (isCation) {
    rows.push({ label: 'Carga', value: `+${card.carga}`, highlight: true });
    rows.push({ label: 'Origen', value: card.origen });
    if (mode !== 'sales') rows.push({ label: 'Sales que forma', value: card.sales, highlight: true });
  } else {
    if (mode !== 'carga') rows.push({ label: 'Carga', value: `${card.carga}`, highlight: true });
    if (card.oxoacido && card.oxoacido !== '—') rows.push({ label: 'Oxoácido de origen', value: card.oxoacido });
    if (mode !== 'sales') rows.push({ label: 'Sales que forma', value: card.sales, highlight: true });
  }

  rows.push({ label: 'Reacción característica', value: card.reaccion });

  rows.forEach(r => {
    const div = document.createElement('div');
    div.className = 'detail-row' + (r.highlight ? ' highlight' : '');
    div.innerHTML = `
      <span class="detail-label">${r.label}</span>
      <span class="detail-value">${r.value}</span>`;
    container.appendChild(div);
  });
}

$('btn-reveal').addEventListener('click', () => {
  $('card-back').classList.remove('hidden');
  $('card-front').style.display = 'none';
});

$('btn-right').addEventListener('click', () => {
  const card = session.queue[session.index];
  session.correct++;
  state.learned[card.id] = true;
  state.streak++;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;
  saveState();
  session.index++;
  renderCard();
});

$('btn-wrong').addEventListener('click', () => {
  const card = session.queue[session.index];
  session.wrong++;
  state.streak = 0;
  delete state.learned[card.id];
  session.wrongCards.push(card);
  saveState();
  session.index++;
  renderCard();
});

$('btn-back').addEventListener('click', () => {
  showScreen('home');
  updateHomeStats();
});

// ── Results ─────────────────────────────────────────────
function showResults() {
  const total = session.correct + session.wrong;
  const pct = total > 0 ? Math.round((session.correct / total) * 100) : 0;

  $('r-correct').textContent = session.correct;
  $('r-wrong').textContent = session.wrong;
  $('r-pct').textContent = pct + '%';

  let icon = '🎯', title = 'Sesión completa', msg = '';
  if (pct === 100) { icon = '🏆'; title = '¡Perfecto!'; msg = 'Dominás todos los aniones de esta sesión.'; }
  else if (pct >= 80) { icon = '✅'; title = '¡Muy bien!'; msg = `Respondiste correctamente el ${pct}% de las tarjetas.`; }
  else if (pct >= 50) { icon = '📖'; title = 'Sigue practicando'; msg = `Aún hay ${session.wrong} aniones para reforzar.`; }
  else { icon = '🔬'; title = 'A repasar'; msg = 'Repasá los aniones que fallaste antes de avanzar.'; }

  $('results-icon').textContent = icon;
  $('results-title').textContent = title;
  $('results-msg').textContent = msg || `${session.correct} correctas · ${session.wrong} a repasar`;

  $('btn-review').style.display = session.wrongCards.length > 0 ? '' : 'none';

  showScreen('results');
  updateHomeStats();
}

$('btn-review').addEventListener('click', () => {
  if (session.wrongCards.length > 0) {
    startSession(session.mode, session.wrongCards, true);
  }
});

$('btn-home').addEventListener('click', () => {
  showScreen('home');
  updateHomeStats();
});

// ── Init ────────────────────────────────────────────────
loadState();
updateHomeStats();
showScreen('home');

// Notificaciones — pedir permiso y avisar al SW que la app fue abierta
async function initNotifications() {
  if (!('serviceWorker' in navigator) || !('Notification' in window)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    if (Notification.permission === 'default') {
      // Mostrar banner suave antes de pedir permiso del sistema
      showNotifBanner(reg);
    } else if (Notification.permission === 'granted') {
      reg.active?.postMessage('app-opened');
    }
  } catch {}
}

function showNotifBanner(reg) {
  // Solo mostrar si no lo rechazaron antes
  if (localStorage.getItem('notif-dismissed')) return;

  const banner = document.createElement('div');
  banner.id = 'notif-banner';
  banner.innerHTML = `
    <span>🔔 ¿Activar recordatorios de racha?</span>
    <div class="notif-actions">
      <button id="notif-yes">Sí</button>
      <button id="notif-no">No</button>
    </div>`;
  document.getElementById('screen-home').appendChild(banner);

  document.getElementById('notif-yes').addEventListener('click', async () => {
    banner.remove();
    const perm = await Notification.requestPermission();
    if (perm === 'granted') reg.active?.postMessage('app-opened');
  });
  document.getElementById('notif-no').addEventListener('click', () => {
    banner.remove();
    localStorage.setItem('notif-dismissed', '1');
  });
}

initNotifications();
