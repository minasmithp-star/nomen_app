// app.js — Nomen · v3 · racha por días, progreso, mensajes personalizados

const STATE_KEY = 'nomen-v3';

// ── Colores HexNote por subgrupo ───────────────────────
// Cada color define accent, accent-bg y accent-b (borde)
const SECTION_COLORS = {
  // Aniones — por subgrupo
  halógenos:    { a: '#7d6fb0', bg: '#ebe7f5', b: '#c8c0e8' }, // lavanda
  azufre:       { a: '#c4685a', bg: '#f5e2de', b: '#ddb0a8' }, // coral
  nitrógeno:    { a: '#4a8c85', bg: '#dff0ee', b: '#b0d8d4' }, // teal
  fósforo:      { a: '#5c8a65', bg: '#e8f0e9', b: '#b8d4bc' }, // sage
  oxígeno:      { a: '#5a7aaa', bg: '#e2eaf5', b: '#b8cce8' }, // azul slate
  cromo:        { a: '#9a7840', bg: '#f2e8d4', b: '#d4c090' }, // ochre
  manganeso:    { a: '#8060a0', bg: '#ede8f5', b: '#c8b8e0' }, // púrpura
  carbono:      { a: '#5a6a7a', bg: '#e2e8ee', b: '#b8c8d8' }, // slate
  arsénico:     { a: '#9a6848', bg: '#f2e4d8', b: '#d4b8a0' }, // terracota
  boro:         { a: '#4a8860', bg: '#dff0e8', b: '#a8d4b8' }, // verde esmeralda
  // Poliatómicos / monoatómicos sin subgrupo especial
  poliatómicos: { a: '#7d6fb0', bg: '#ebe7f5', b: '#c8c0e8' },
  monoatómicos: { a: '#4a8c85', bg: '#dff0ee', b: '#b0d8d4' },
  // Cationes
  cationes:         { a: '#b8883a', bg: '#f5ead4', b: '#d4b878' }, // ámbar
  'poliatómicos-c': { a: '#b8883a', bg: '#f5ead4', b: '#d4b878' },
  alcalinos:        { a: '#5a7aaa', bg: '#e2eaf5', b: '#b8cce8' }, // azul slate
  alcalinotérreos:  { a: '#4a8c85', bg: '#dff0ee', b: '#b0d8d4' }, // teal
  transición:       { a: '#8060a0', bg: '#ede8f5', b: '#c8b8e0' }, // púrpura
  principales:      { a: '#9a7840', bg: '#f2e8d4', b: '#d4c090' }, // ochre
  lantánidos:       { a: '#b06080', bg: '#f5e0ea', b: '#e0b8cc' }, // rosa
  hidrógeno:        { a: '#5c8a65', bg: '#e8f0e9', b: '#b8d4bc' }, // sage
  // Ácidos
  hidrácido:    { a: '#b06080', bg: '#f5e0ea', b: '#e0b8cc' }, // rosa
  oxoácido:     { a: '#b06080', bg: '#f5e0ea', b: '#e0b8cc' }, // rosa
  // Default
  default:      { a: '#5c8a65', bg: '#e8f0e9', b: '#b8d4bc' },
};

function getAccent(card) {
  const key = (card.subgrupo && SECTION_COLORS[card.subgrupo])
    ? card.subgrupo
    : (card.tipo && SECTION_COLORS[card.tipo])
    ? card.tipo
    : 'default';
  return SECTION_COLORS[key];
}

// ── Estado persistente ─────────────────────────────────
// streak: días consecutivos (se rompe si pasan >28h sin sesión)
// lastSessionDate: 'YYYY-MM-DD' del último día con sesión
// history: últimas 10 sesiones [{ date, pct, correct, total }]
// learned: { id: true }
let state = {
  learned: {},
  streak: 0,
  bestStreak: 0,
  lastSessionDate: null,
  history: [],
};

let session = {
  mode: 'nombre-formula',
  queue: [], index: 0,
  correct: 0, wrong: 0, ok: 0,
  hardCards: [],
  isFlipped: false,
};

// ── Firebase sync ──────────────────────────────────────

let cloudSyncEnabled = false;
let unsubscribeCloud = null;

function saveState() {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {}
  if (cloudSyncEnabled && window._saveToCloud) {
    window._saveToCloud(state).catch(() => {});
  }
}

function loadState() {
  try {
    const s = localStorage.getItem(STATE_KEY);
    if (s) state = { ...state, ...JSON.parse(s) };
    if (!state.history) state.history = [];
    if (!state.lastSessionDate) state.lastSessionDate = null;
  } catch {}
}

async function initCloudSync() {
  try {
    // Import dinámico — si falla no rompe el resto de la app
    const fb = await import('./firebase.js');
    const { saveToCloud, loadFromCloud, subscribeToCloud } = fb;

    const cloudState = await loadFromCloud();
    if (cloudState) {
      const localDate = state.lastSessionDate || '';
      const cloudDate = cloudState.lastSessionDate || '';
      if (cloudDate >= localDate) {
        state = { ...state, ...cloudState };
        if (!state.history) state.history = [];
        try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {}
        updateHomeStats();
      }
    }
    cloudSyncEnabled = true;

    // Sobreescribir saveState para que también guarde en cloud
    const _saveLocal = saveState;
    window._saveToCloud = saveToCloud;

    subscribeToCloud((cloudState) => {
      const localDate = state.lastSessionDate || '';
      const cloudDate = cloudState.lastSessionDate || '';
      if (cloudDate > localDate) {
        state = { ...state, ...cloudState };
        if (!state.history) state.history = [];
        try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {}
        updateHomeStats();
        showSyncBadge();
      }
    });

    showSyncStatus('connected');
  } catch (e) {
    console.warn('Cloud sync unavailable:', e);
    showSyncStatus('offline');
  }
}

function showSyncBadge() {
  const badge = document.createElement('div');
  badge.className = 'sync-badge';
  badge.textContent = '↓ Sincronizado';
  document.body.appendChild(badge);
  setTimeout(() => badge.remove(), 2500);
}

function showSyncStatus(status) {
  const el = $('sync-status');
  if (!el) return;
  el.textContent = status === 'connected' ? '● sincronizado' : '○ sin conexión';
  el.style.color  = status === 'connected' ? 'var(--sage)' : 'var(--muted)';
}

// ── Racha por días consecutivos ────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function updateStreak() {
  const today = todayStr();
  if (state.lastSessionDate === today) return; // ya hiciste sesión hoy

  if (state.lastSessionDate) {
    const last = new Date(state.lastSessionDate);
    const now  = new Date(today);
    const diffDays = Math.round((now - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      state.streak++;                          // día consecutivo ✓
    } else {
      state.streak = 1;                        // se rompió la racha
    }
  } else {
    state.streak = 1;                          // primera sesión
  }

  state.lastSessionDate = today;
  if (state.streak > state.bestStreak) state.bestStreak = state.streak;
}

// ── DOM ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const screens = { home: $('screen-home'), quiz: $('screen-quiz'), results: $('screen-results') };

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ── Home stats ─────────────────────────────────────────
function updateHomeStats() {
  $('stat-total').textContent   = TODOS.length;
  $('stat-learned').textContent = Object.keys(state.learned).length;
  $('stat-streak').textContent  = state.streak;
  $('stat-best').textContent    = state.bestStreak;
  $('streak-badge').textContent = `❤︎ ${state.streak}`;
}

// ── Mode selection ─────────────────────────────────────
let selectedMode = 'nombre-formula';
document.querySelectorAll('.mode-card').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-card').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedMode = btn.dataset.mode;
  });
});

// ── Section + subtab selection ─────────────────────────
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

// ── Count selector ─────────────────────────────────────
let selectedCount = 'all';

document.querySelectorAll('.count-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.count-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    selectedCount = tab.dataset.count;
  });
});

$('btn-start').addEventListener('click', () => {
  let pool = GRUPOS[selectedSet] || TODOS;
  // Aplicar límite de cantidad
  if (selectedCount !== 'all') {
    const n = parseInt(selectedCount);
    pool = shuffle([...pool]).slice(0, n);
  }
  startSession(selectedMode, pool);
});

$('btn-reset').addEventListener('click', () => {
  if (confirm('¿Reiniciar todo el progreso?')) {
    state = { learned: {}, streak: 0, bestStreak: 0, lastSessionDate: null, history: [] };
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
  session.isFlipped = false;
  const flip = $('card-flip');
  flip.style.transition = 'none';
  flip.style.transform  = 'rotateY(0deg)';
  $('rating-row').classList.remove('visible');
  _fillCard(card);
}

function _fillCard(card) {
  if (!card) { showResults(); return; }

  const c = getAccent(card);
  document.documentElement.style.setProperty('--accent',    c.a);
  document.documentElement.style.setProperty('--accent-bg', c.bg);
  document.documentElement.style.setProperty('--accent-b',  c.b);

  const pct = (session.index / session.queue.length) * 100;
  $('progress-fill').style.width = pct + '%';
  $('progress-label').textContent = `${session.index + 1} / ${session.queue.length}`;
  $('streak-badge').textContent = `❤︎ ${state.streak}`;

  const groupText = buildGroupLabel(card);
  $('card-group-label').textContent = groupText;
  $('card-group-label-back').textContent = groupText;

  const q = buildQuestion(card, session.mode);
  const parts = q.question.split('\n');
  const mainQ = parts[0];
  const hintQ = parts[1] || '';
  setCardQuestion($('card-question'), mainQ, hintQ);
  $('card-answer').innerHTML = `<span class="card-formula-bold">${q.answer}</span>`;
  buildDetails(card, session.mode);
}

function buildGroupLabel(card) {
  const isCation = card.tipo === 'cationes';
  const isAcido  = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';
  if (isCation) return 'CATIÓN · ' + (card.subgrupo || '').toUpperCase();
  if (isAcido)  return 'ÁCIDO · ' + card.tipo.toUpperCase();
  return card.tipo.toUpperCase() + (card.subgrupo ? ' · ' + card.subgrupo.toUpperCase() : '');
}

function buildQuestion(card, mode) {
  const isCation     = card.tipo === 'cationes';
  const isAcido      = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';
  const nombrePropio = card.nombrePropio || card.subgrupo === 'poliatómicos';
  const nombre       = capitalize(card.nombre);

  switch (mode) {
    case 'nombre-formula': return { question: nombre, answer: card.formula };
    case 'formula-nombre': return { question: card.formula, answer: nombre };

    case 'carga':
      if (isAcido) return { question: nombre, answer: card.anion };

      if (isCation) {
        const n = card.estadosOxidacion ? card.estadosOxidacion.length : 1;
        const pista = n === 1 ? 'tiene 1 estado de oxidación' : `tiene ${n} estados de oxidación`;
        // Fórmula desnuda (sin carga)
        const formulaDesnuda = stripCarga(card.formula);
        return {
          question: `${nombre}  ${formulaDesnuda}\n${pista}`,
          answer: nombrePropio
            ? `Carga: +${card.carga}`
            : card.estadosOxidacion.join('  ·  '),
        };
      }

      // Aniones: fórmula desnuda
      return {
        question: `${nombre}  ${stripCarga(card.formula)}`,
        answer: `Carga: ${card.carga > 0 ? '+' : ''}${card.carga}`,
      };

    case 'sales':
      return { question: nombre, answer: card.sales };
    default:
      return { question: nombre, answer: card.formula };
  }
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Quita toda la carga de la fórmula (número superíndice + signo)
// SO₄²⁻ → SO₄   NH₄⁺ → NH₄   Fe²⁺ → Fe
function stripCarga(formula) {
  return formula.replace(/[²³⁴⁵⁶⁷⁸⁹]?[⁺⁻]/, '');
}

function setCardQuestion(el, mainQ, hintQ) {
  const parts = mainQ.split('  ');
  let html;
  if (parts.length >= 2) {
    const name    = parts[0];
    const formula = parts.slice(1).join('  ');
    html = `${name} — <span class="card-formula-bold">${formula}</span>`;
  } else {
    html = mainQ;
  }
  if (hintQ) html += `<br><span class="card-question-hint">${hintQ}</span>`;
  el.innerHTML = html;
}

function buildDetails(card, mode) {
  const container = $('card-details');
  container.innerHTML = '';
  const isCation     = card.tipo === 'cationes';
  const isAcido      = card.tipo === 'hidrácido' || card.tipo === 'oxoácido';
  const nombrePropio = card.nombrePropio || card.subgrupo === 'poliatómicos';
  const rows = [];

  if (mode === 'carga' && isCation) {
    // Reverso modo carga — solo estados de oxidación, sin sales
    if (!nombrePropio && card.estadosOxidacion && card.estadosOxidacion.length > 1) {
      // Para agrupados ya está en la respuesta principal, agregamos fórmulas
      rows.push({ l: 'Fórmulas', v: card.estadosOxidacion.map((e,i) => `${card.formula}${['⁺','²⁺','³⁺','⁴⁺'][parseInt(e)-1] || e}`).join('  ') });
    }
    rows.push({ l: 'Reacción', v: card.reaccion });
  } else {
    if (mode !== 'nombre-formula') rows.push({ l: 'Nombre',  v: capitalize(card.nombre) });
    if (mode !== 'formula-nombre') rows.push({ l: 'Fórmula', v: card.formula, isFormula: true });
    if (isAcido) {
      if (mode !== 'carga') rows.push({ l: 'Anión', v: card.anion });
      rows.push({ l: 'Ka', v: card.ka });
    } else if (isCation) {
      if (card.carga !== null) rows.push({ l: 'Carga', v: `+${card.carga}` });
      rows.push({ l: 'Origen', v: card.origen });
    } else {
      if (mode !== 'carga') rows.push({ l: 'Carga', v: `${card.carga}` });
      if (card.oxoacido && card.oxoacido !== '—') rows.push({ l: 'Oxoácido', v: card.oxoacido });
    }
  }

  rows.slice(0, 2).forEach(r => {
    const div = document.createElement('div');
    div.className = 'detail-pill';
    const valHtml = r.isFormula
      ? `<span class="card-formula-bold" style="font-size:.85rem">${r.v}</span>`
      : r.v;
    div.innerHTML = `<span class="dpill-label">${r.l}</span><span class="dpill-val">${valHtml}</span>`;
    container.appendChild(div);
  });
}

// ── Flip manual (toca la tarjeta) ──────────────────────
function handleFlip() {
  const flip = $('card-flip');
  session.isFlipped = !session.isFlipped;
  flip.style.transition = 'transform .55s cubic-bezier(.6,0,.2,1)';
  flip.style.transform  = session.isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)';
  if (session.isFlipped) $('rating-row').classList.add('visible');
  else $('rating-row').classList.remove('visible');
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
  saveState();

  // Ocultar botones
  $('rating-row').classList.remove('visible');

  const flip  = $('card-flip');
  const back  = flip.querySelector('.card-face-back');
  const front = flip.querySelector('.card-face-front');

  // Flip continuo -180° → -360°
  // Curva: arranca rápido (sale el reverso) y desacelera al llegar al frente nuevo
  flip.style.transition = 'transform .55s cubic-bezier(.6,0,.2,1)';
  flip.style.transform  = 'rotateY(-360deg)';

  // A los 220ms la tarjeta está de canto — swap invisible
  setTimeout(() => {
    session.index++;
    const next = session.queue[session.index];
    if (!next) return;

    back.style.visibility  = 'hidden';
    front.style.visibility = 'visible';

    const c = getAccent(next);
    document.documentElement.style.setProperty('--accent',    c.a);
    document.documentElement.style.setProperty('--accent-bg', c.bg);
    document.documentElement.style.setProperty('--accent-b',  c.b);

    const groupText = buildGroupLabel(next);
    $('card-group-label').textContent      = groupText;
    $('card-group-label-back').textContent = groupText;
    const q = buildQuestion(next, session.mode);
    const parts = q.question.split('\n');
    const mainQ = parts[0];
    const hintQ = parts[1] || '';
    setCardQuestion($('card-question'), mainQ, hintQ);
    $('card-answer').innerHTML = `<span class="card-formula-bold">${q.answer}</span>`;
    buildDetails(next, session.mode);

    const pct = (session.index / session.queue.length) * 100;
    $('progress-fill').style.width  = pct + '%';
    $('progress-label').textContent = `${session.index + 1} / ${session.queue.length}`;
    $('streak-badge').textContent   = `❤︎ ${state.streak}`;
  }, 220);

  // Usamos transitionend para el reset — más confiable en móvil que setTimeout
  flip.addEventListener('transitionend', function onEnd() {
    flip.removeEventListener('transitionend', onEnd);
    if (!session.queue[session.index]) { showResults(); return; }
    // Desactivar transición ANTES de resetear — evita que el browser anime el reset
    flip.style.transition = 'none';
    flip.style.transform  = 'rotateY(0deg)';
    back.style.visibility = 'visible';
    session.isFlipped = false;
    // Reactivar transición en el siguiente frame de render
    requestAnimationFrame(() => requestAnimationFrame(() => {
      flip.style.transition = 'transform .55s cubic-bezier(.6,0,.2,1)';
    }));
  });
}

$('btn-back').addEventListener('click', () => { showScreen('home'); updateHomeStats(); });

// ── Results ────────────────────────────────────────────
function showResults() {
  const total = session.correct + session.wrong + session.ok;
  const pct   = total > 0 ? Math.round((session.correct / total) * 100) : 0;

  // Guardar sesión en historial
  const prevSession = state.history.length > 0 ? state.history[state.history.length - 1] : null;
  state.history.push({ date: todayStr(), pct, correct: session.correct, total });
  if (state.history.length > 10) state.history.shift(); // máx 10 sesiones

  // Actualizar racha de días
  updateStreak();
  saveState();

  // Mensaje personalizado comparando con sesión anterior
  const msg = buildPersonalizedMsg(pct, prevSession, session.correct, total);

  // Símbolo según rendimiento
  const symbol = pct === 100 ? '◈◈◈' : pct >= 80 ? '◈◈' : pct >= 50 ? '◈' : '◇';
  const title  = pct === 100 ? 'Perfecto' : pct >= 80 ? 'Muy bien' : pct >= 50 ? 'Sigue así' : 'A repasar';

  $('results-icon').textContent  = symbol;
  $('results-title').textContent = title;
  $('results-msg').textContent   = msg;
  $('r-correct').textContent     = session.correct;
  $('r-wrong').textContent       = session.wrong;
  $('r-pct').textContent         = pct + '%';
  $('btn-review').style.display  = session.hardCards.length > 0 ? '' : 'none';

  // Racha en resultados
  $('results-streak').textContent   = `❤︎ ${state.streak} día${state.streak !== 1 ? 's' : ''}`;
  $('results-learned').textContent  = Object.keys(state.learned).length;
  $('results-best').textContent     = `mejor: ${state.bestStreak}`;

  // Gráfico de barras
  renderHistoryChart();

  const def = SECTION_COLORS.default;
  document.documentElement.style.setProperty('--accent',    def.a);
  document.documentElement.style.setProperty('--accent-bg', def.bg);
  document.documentElement.style.setProperty('--accent-b',  def.b);
  showScreen('results');
  updateHomeStats();
}

function buildPersonalizedMsg(pct, prev, correct, total) {
  const learned = Object.keys(state.learned).length;

  if (!prev) return `Completaste tu primera sesión con ${correct} de ${total} aciertos. ¡Buen comienzo!`;

  const diff = pct - prev.pct;
  if (diff > 15)  return `¡Mejoraste ${diff}% respecto a tu sesión anterior! Vas muy bien.`;
  if (diff > 0)   return `Subiste ${diff}% desde la última vez. Cada sesión suma.`;
  if (diff === 0) return `Mismo rendimiento que ayer. Constancia es clave — llevás ${learned} iones aprendidos.`;
  if (diff > -10) return `Bajaste un poco respecto a la sesión anterior, pero está bien. Ya tenés ${learned} iones dominados.`;
  return `Hoy fue más difícil, pero lo terminaste. Repasá los ${session.wrong} que fallaste.`;
}

function renderHistoryChart() {
  const container = $('history-chart');
  if (!container) return;
  container.innerHTML = '';

  if (state.history.length < 2) {
    container.innerHTML = '<span class="chart-empty">Completá más sesiones para ver tu progreso</span>';
    return;
  }

  state.history.forEach((s, i) => {
    const bar = document.createElement('div');
    bar.className = 'chart-bar-wrap';
    const height = Math.max(8, s.pct);
    const color = s.pct >= 80 ? '#a8c8ac' : s.pct >= 50 ? '#c8bce0' : '#ddb0a8';
    bar.innerHTML = `
      <div class="chart-bar" style="height:${height}%; background:${color};" title="${s.pct}%"></div>
      <span class="chart-label">${s.pct}%</span>`;
    container.appendChild(bar);
  });
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
initCloudSync();

// Exponer funciones al scope global (necesario con type="module")
window.handleFlip = handleFlip;
window.rate       = rate;
