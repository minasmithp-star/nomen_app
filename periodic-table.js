// periodic-table.js — Tabla periódica interactiva para Nomen

const PT_FLASHCARDS = {
  'Li': { cargas: '+1',                sub: 'alkali' },
  'Na': { cargas: '+1',                sub: 'alkali' },
  'K':  { cargas: '+1',                sub: 'alkali' },
  'Rb': { cargas: '+1',                sub: 'alkali' },
  'Cs': { cargas: '+1',                sub: 'alkali' },
  'Be': { cargas: '+2',                sub: 'alkaline' },
  'Mg': { cargas: '+2',                sub: 'alkaline' },
  'Ca': { cargas: '+2',                sub: 'alkaline' },
  'Sr': { cargas: '+2',                sub: 'alkaline' },
  'Ba': { cargas: '+2',                sub: 'alkaline' },
  'Fe': { cargas: '+2 · +3',           sub: 'transition' },
  'Cu': { cargas: '+1 · +2',           sub: 'transition' },
  'Zn': { cargas: '+2',                sub: 'transition' },
  'Cr': { cargas: '+2 · +3',           sub: 'transition' },
  'Mn': { cargas: '+2 · +3 · +4',      sub: 'transition' },
  'Co': { cargas: '+2 · +3',           sub: 'transition' },
  'Ni': { cargas: '+2',                sub: 'transition' },
  'Ag': { cargas: '+1',                sub: 'transition' },
  'Au': { cargas: '+1 · +3',           sub: 'transition' },
  'Cd': { cargas: '+2',                sub: 'transition' },
  'Hg': { cargas: '+1 · +2',           sub: 'transition' },
  'Pb': { cargas: '+2 · +4',           sub: 'transition' },
  'Ti': { cargas: '+2 · +3 · +4',      sub: 'transition' },
  'V':  { cargas: '+2 · +3 · +4 · +5', sub: 'transition' },
  'Al': { cargas: '+3',                sub: 'post' },
  'Ga': { cargas: '+3',                sub: 'post' },
  'In': { cargas: '+3',                sub: 'post' },
  'Tl': { cargas: '+1 · +3',           sub: 'post' },
  'La': { cargas: '+3',                sub: 'lanthanide' },
  'Ce': { cargas: '+3 · +4',           sub: 'lanthanide' },
  'U':  { cargas: '+4 · +6',           sub: 'lanthanide' },
  'F':  { cargas: '−1',                sub: 'halogen' },
  'Cl': { cargas: '−1',                sub: 'halogen' },
  'Br': { cargas: '−1',                sub: 'halogen' },
  'I':  { cargas: '−1',                sub: 'halogen' },
  'H':  { cargas: '+1',                sub: 'h' },
  'N':  { cargas: '−3',                sub: 'nonmetal' },
  'O':  { cargas: '−2',                sub: 'nonmetal' },
  'P':  { cargas: '−3',                sub: 'nonmetal' },
  'S':  { cargas: '−2',                sub: 'nonmetal' },
  'C':  { cargas: 'en CO₃²⁻, CN⁻',    sub: 'nonmetal' },
  'B':  { cargas: 'en BO₃³⁻',         sub: 'nonmetal' },
  'As': { cargas: 'en HAsO₄²⁻',       sub: 'nonmetal' },
};

const PT_COLORS = {
  alkali:     { bg: '#e2eaf5', color: '#5a7aaa', border: '#b8cce8' },
  alkaline:   { bg: '#dff0ee', color: '#4a8c85', border: '#b0d8d4' },
  transition: { bg: '#ede8f5', color: '#8060a0', border: '#c8b8e0' },
  post:       { bg: '#f2e8d4', color: '#9a7840', border: '#d4c090' },
  lanthanide: { bg: '#f5e0ea', color: '#b06080', border: '#e0b8cc' },
  halogen:    { bg: '#f5e0ea', color: '#b06080', border: '#e0b8cc' },
  nonmetal:   { bg: '#f5e2de', color: '#c4685a', border: '#ddb0a8' },
  h:          { bg: '#f5e2de', color: '#c4685a', border: '#ddb0a8' },
  grey:       { bg: '#f0eeea', color: '#a8a39c', border: '#d8d4ce' },
};

const PT_ELEMENTS = [
  { n:1,   s:'H',  name:'Hidrógeno',    cat:'h',          col:1,  row:1 },
  { n:2,   s:'He', name:'Helio',        cat:'noble',       col:18, row:1 },
  { n:3,   s:'Li', name:'Litio',        cat:'alkali',      col:1,  row:2 },
  { n:4,   s:'Be', name:'Berilio',      cat:'alkaline',    col:2,  row:2 },
  { n:5,   s:'B',  name:'Boro',         cat:'metalloid',   col:13, row:2 },
  { n:6,   s:'C',  name:'Carbono',      cat:'nonmetal',    col:14, row:2 },
  { n:7,   s:'N',  name:'Nitrógeno',    cat:'nonmetal',    col:15, row:2 },
  { n:8,   s:'O',  name:'Oxígeno',      cat:'nonmetal',    col:16, row:2 },
  { n:9,   s:'F',  name:'Flúor',        cat:'halogen',     col:17, row:2 },
  { n:10,  s:'Ne', name:'Neón',         cat:'noble',       col:18, row:2 },
  { n:11,  s:'Na', name:'Sodio',        cat:'alkali',      col:1,  row:3 },
  { n:12,  s:'Mg', name:'Magnesio',     cat:'alkaline',    col:2,  row:3 },
  { n:13,  s:'Al', name:'Aluminio',     cat:'post',        col:13, row:3 },
  { n:14,  s:'Si', name:'Silicio',      cat:'metalloid',   col:14, row:3 },
  { n:15,  s:'P',  name:'Fósforo',      cat:'nonmetal',    col:15, row:3 },
  { n:16,  s:'S',  name:'Azufre',       cat:'nonmetal',    col:16, row:3 },
  { n:17,  s:'Cl', name:'Cloro',        cat:'halogen',     col:17, row:3 },
  { n:18,  s:'Ar', name:'Argón',        cat:'noble',       col:18, row:3 },
  { n:19,  s:'K',  name:'Potasio',      cat:'alkali',      col:1,  row:4 },
  { n:20,  s:'Ca', name:'Calcio',       cat:'alkaline',    col:2,  row:4 },
  { n:21,  s:'Sc', name:'Escandio',     cat:'transition',  col:3,  row:4 },
  { n:22,  s:'Ti', name:'Titanio',      cat:'transition',  col:4,  row:4 },
  { n:23,  s:'V',  name:'Vanadio',      cat:'transition',  col:5,  row:4 },
  { n:24,  s:'Cr', name:'Cromo',        cat:'transition',  col:6,  row:4 },
  { n:25,  s:'Mn', name:'Manganeso',    cat:'transition',  col:7,  row:4 },
  { n:26,  s:'Fe', name:'Hierro',       cat:'transition',  col:8,  row:4 },
  { n:27,  s:'Co', name:'Cobalto',      cat:'transition',  col:9,  row:4 },
  { n:28,  s:'Ni', name:'Níquel',       cat:'transition',  col:10, row:4 },
  { n:29,  s:'Cu', name:'Cobre',        cat:'transition',  col:11, row:4 },
  { n:30,  s:'Zn', name:'Zinc',         cat:'transition',  col:12, row:4 },
  { n:31,  s:'Ga', name:'Galio',        cat:'post',        col:13, row:4 },
  { n:32,  s:'Ge', name:'Germanio',     cat:'metalloid',   col:14, row:4 },
  { n:33,  s:'As', name:'Arsénico',     cat:'metalloid',   col:15, row:4 },
  { n:34,  s:'Se', name:'Selenio',      cat:'nonmetal',    col:16, row:4 },
  { n:35,  s:'Br', name:'Bromo',        cat:'halogen',     col:17, row:4 },
  { n:36,  s:'Kr', name:'Kriptón',      cat:'noble',       col:18, row:4 },
  { n:37,  s:'Rb', name:'Rubidio',      cat:'alkali',      col:1,  row:5 },
  { n:38,  s:'Sr', name:'Estroncio',    cat:'alkaline',    col:2,  row:5 },
  { n:39,  s:'Y',  name:'Itrio',        cat:'transition',  col:3,  row:5 },
  { n:40,  s:'Zr', name:'Circonio',     cat:'transition',  col:4,  row:5 },
  { n:41,  s:'Nb', name:'Niobio',       cat:'transition',  col:5,  row:5 },
  { n:42,  s:'Mo', name:'Molibdeno',    cat:'transition',  col:6,  row:5 },
  { n:43,  s:'Tc', name:'Tecnecio',     cat:'transition',  col:7,  row:5 },
  { n:44,  s:'Ru', name:'Rutenio',      cat:'transition',  col:8,  row:5 },
  { n:45,  s:'Rh', name:'Rodio',        cat:'transition',  col:9,  row:5 },
  { n:46,  s:'Pd', name:'Paladio',      cat:'transition',  col:10, row:5 },
  { n:47,  s:'Ag', name:'Plata',        cat:'transition',  col:11, row:5 },
  { n:48,  s:'Cd', name:'Cadmio',       cat:'transition',  col:12, row:5 },
  { n:49,  s:'In', name:'Indio',        cat:'post',        col:13, row:5 },
  { n:50,  s:'Sn', name:'Estaño',       cat:'post',        col:14, row:5 },
  { n:51,  s:'Sb', name:'Antimonio',    cat:'metalloid',   col:15, row:5 },
  { n:52,  s:'Te', name:'Teluro',       cat:'metalloid',   col:16, row:5 },
  { n:53,  s:'I',  name:'Yodo',         cat:'halogen',     col:17, row:5 },
  { n:54,  s:'Xe', name:'Xenón',        cat:'noble',       col:18, row:5 },
  { n:55,  s:'Cs', name:'Cesio',        cat:'alkali',      col:1,  row:6 },
  { n:56,  s:'Ba', name:'Bario',        cat:'alkaline',    col:2,  row:6 },
  { n:57,  s:'La', name:'Lantano',      cat:'lanthanide',  col:3,  row:6 },
  { n:72,  s:'Hf', name:'Hafnio',       cat:'transition',  col:4,  row:6 },
  { n:73,  s:'Ta', name:'Tantalio',     cat:'transition',  col:5,  row:6 },
  { n:74,  s:'W',  name:'Wolframio',    cat:'transition',  col:6,  row:6 },
  { n:75,  s:'Re', name:'Renio',        cat:'transition',  col:7,  row:6 },
  { n:76,  s:'Os', name:'Osmio',        cat:'transition',  col:8,  row:6 },
  { n:77,  s:'Ir', name:'Iridio',       cat:'transition',  col:9,  row:6 },
  { n:78,  s:'Pt', name:'Platino',      cat:'transition',  col:10, row:6 },
  { n:79,  s:'Au', name:'Oro',          cat:'transition',  col:11, row:6 },
  { n:80,  s:'Hg', name:'Mercurio',     cat:'transition',  col:12, row:6 },
  { n:81,  s:'Tl', name:'Talio',        cat:'post',        col:13, row:6 },
  { n:82,  s:'Pb', name:'Plomo',        cat:'post',        col:14, row:6 },
  { n:83,  s:'Bi', name:'Bismuto',      cat:'post',        col:15, row:6 },
  { n:84,  s:'Po', name:'Polonio',      cat:'metalloid',   col:16, row:6 },
  { n:85,  s:'At', name:'Ástato',       cat:'halogen',     col:17, row:6 },
  { n:86,  s:'Rn', name:'Radón',        cat:'noble',       col:18, row:6 },
  { n:87,  s:'Fr', name:'Francio',      cat:'alkali',      col:1,  row:7 },
  { n:88,  s:'Ra', name:'Radio',        cat:'alkaline',    col:2,  row:7 },
  { n:89,  s:'Ac', name:'Actinio',      cat:'actinide',    col:3,  row:7 },
  { n:104, s:'Rf', name:'Rutherfordio', cat:'transition',  col:4,  row:7 },
  { n:105, s:'Db', name:'Dubnio',       cat:'transition',  col:5,  row:7 },
  { n:106, s:'Sg', name:'Seaborgio',    cat:'transition',  col:6,  row:7 },
  { n:107, s:'Bh', name:'Bohrio',       cat:'transition',  col:7,  row:7 },
  { n:108, s:'Hs', name:'Hasio',        cat:'transition',  col:8,  row:7 },
  { n:109, s:'Mt', name:'Meitnerio',    cat:'transition',  col:9,  row:7 },
  { n:110, s:'Ds', name:'Darmstadtio',  cat:'transition',  col:10, row:7 },
  { n:111, s:'Rg', name:'Roentgenio',   cat:'transition',  col:11, row:7 },
  { n:112, s:'Cn', name:'Copernicio',   cat:'transition',  col:12, row:7 },
  { n:113, s:'Nh', name:'Nihonio',      cat:'post',        col:13, row:7 },
  { n:114, s:'Fl', name:'Flerovio',     cat:'post',        col:14, row:7 },
  { n:115, s:'Mc', name:'Moscovio',     cat:'post',        col:15, row:7 },
  { n:116, s:'Lv', name:'Livermorio',   cat:'post',        col:16, row:7 },
  { n:117, s:'Ts', name:'Teneso',       cat:'halogen',     col:17, row:7 },
  { n:118, s:'Og', name:'Oganesón',     cat:'noble',       col:18, row:7 },
  { n:58,  s:'Ce', name:'Cerio',        cat:'lanthanide',  col:4,  row:9  },
  { n:59,  s:'Pr', name:'Praseodimio',  cat:'lanthanide',  col:5,  row:9  },
  { n:60,  s:'Nd', name:'Neodimio',     cat:'lanthanide',  col:6,  row:9  },
  { n:61,  s:'Pm', name:'Prometio',     cat:'lanthanide',  col:7,  row:9  },
  { n:62,  s:'Sm', name:'Samario',      cat:'lanthanide',  col:8,  row:9  },
  { n:63,  s:'Eu', name:'Europio',      cat:'lanthanide',  col:9,  row:9  },
  { n:64,  s:'Gd', name:'Gadolinio',    cat:'lanthanide',  col:10, row:9  },
  { n:65,  s:'Tb', name:'Terbio',       cat:'lanthanide',  col:11, row:9  },
  { n:66,  s:'Dy', name:'Disprosio',    cat:'lanthanide',  col:12, row:9  },
  { n:67,  s:'Ho', name:'Holmio',       cat:'lanthanide',  col:13, row:9  },
  { n:68,  s:'Er', name:'Erbio',        cat:'lanthanide',  col:14, row:9  },
  { n:69,  s:'Tm', name:'Tulio',        cat:'lanthanide',  col:15, row:9  },
  { n:70,  s:'Yb', name:'Iterbio',      cat:'lanthanide',  col:16, row:9  },
  { n:71,  s:'Lu', name:'Lutecio',      cat:'lanthanide',  col:17, row:9  },
  { n:90,  s:'Th', name:'Torio',        cat:'actinide',    col:4,  row:10 },
  { n:91,  s:'Pa', name:'Protactinio',  cat:'actinide',    col:5,  row:10 },
  { n:92,  s:'U',  name:'Uranio',       cat:'actinide',    col:6,  row:10 },
  { n:93,  s:'Np', name:'Neptunio',     cat:'actinide',    col:7,  row:10 },
  { n:94,  s:'Pu', name:'Plutonio',     cat:'actinide',    col:8,  row:10 },
  { n:95,  s:'Am', name:'Americio',     cat:'actinide',    col:9,  row:10 },
  { n:96,  s:'Cm', name:'Curio',        cat:'actinide',    col:10, row:10 },
  { n:97,  s:'Bk', name:'Berkelio',     cat:'actinide',    col:11, row:10 },
  { n:98,  s:'Cf', name:'Californio',   cat:'actinide',    col:12, row:10 },
  { n:99,  s:'Es', name:'Einsteinio',   cat:'actinide',    col:13, row:10 },
  { n:100, s:'Fm', name:'Fermio',       cat:'actinide',    col:14, row:10 },
  { n:101, s:'Md', name:'Mendelevio',   cat:'actinide',    col:15, row:10 },
  { n:102, s:'No', name:'Nobelio',      cat:'actinide',    col:16, row:10 },
  { n:103, s:'Lr', name:'Laurencio',    cat:'actinide',    col:17, row:10 },
];

let activeTooltip = null;

function buildPT() {
  const container = document.getElementById('pt-table');
  if (!container || container.children.length > 0) return;

  const ROWS = 10, COLS = 18;
  const cells = {};
  PT_ELEMENTS.forEach(e => { cells[`${e.row}-${e.col}`] = e; });

  for (let r = 1; r <= ROWS; r++) {
    for (let c = 1; c <= COLS; c++) {
      const div = document.createElement('div');
      const el  = cells[`${r}-${c}`];

      if (r === 8) { div.className = 'pt-cell empty'; container.appendChild(div); continue; }
      if (!el)     { div.className = 'pt-cell empty'; container.appendChild(div); continue; }

      const fc     = PT_FLASHCARDS[el.s];
      const colors = fc ? (PT_COLORS[fc.sub] || PT_COLORS.grey) : PT_COLORS.grey;

      div.className = `pt-cell${fc ? ' pt-in-flash' : ' pt-grey'}`;
      div.style.background  = colors.bg;
      div.style.color       = colors.color;
      div.style.borderColor = colors.border;
      div.innerHTML = `
        <span class="pt-num">${el.n}</span>
        <span class="pt-sym">${el.s}</span>
        <span class="pt-name">${el.name}</span>`;

      if (fc) {
        div.addEventListener('click',      (e) => { e.stopPropagation(); showPTTooltip(div, el, fc); });
        div.addEventListener('mouseenter', ()  => showPTTooltip(div, el, fc));
        div.addEventListener('mouseleave', ()  => hidePTTooltip());
      }

      container.appendChild(div);
    }
  }

  document.getElementById('pt-modal').addEventListener('click', hidePTTooltip);
}

function showPTTooltip(cell, el, fc) {
  hidePTTooltip();
  const tip = document.createElement('div');
  tip.className = 'pt-tooltip';
  const label = fc.cargas.includes('·') ? 'Cargas' : 'Carga';
  tip.innerHTML = `<strong>${el.name}</strong><span>${label}: ${fc.cargas}</span>`;
  document.getElementById('pt-modal').appendChild(tip);
  activeTooltip = tip;

  const cellRect  = cell.getBoundingClientRect();
  const modalRect = document.getElementById('pt-modal').getBoundingClientRect();
  let top  = cellRect.bottom - modalRect.top + 6;
  let left = cellRect.left   - modalRect.left;
  tip.style.top  = top  + 'px';
  tip.style.left = left + 'px';

  requestAnimationFrame(() => {
    const tipW   = tip.offsetWidth;
    const modalW = modalRect.width;
    if (left + tipW > modalW - 8) left = modalW - tipW - 8;
    if (left < 8) left = 8;
    tip.style.left = left + 'px';
  });
}

function hidePTTooltip() {
  if (activeTooltip) { activeTooltip.remove(); activeTooltip = null; }
}

window.openPT = function() {
  const container = document.getElementById('pt-table');
  if (container) container.innerHTML = '';
  buildPT();
  document.getElementById('pt-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closePT = function(e) {
  if (e && e.target !== document.getElementById('pt-overlay')) return;
  hidePTTooltip();
  document.getElementById('pt-overlay').classList.add('hidden');
  document.body.style.overflow = '';
};
