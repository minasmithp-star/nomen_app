// periodic-table.js — Tabla periódica interactiva para Nomen

// Categorías: h, alkali, alkaline, transition, post, metalloid, nonmetal, halogen, noble, lanthanide, actinide
const PT_ELEMENTS = [
  // row 1
  { n:1,  s:'H',  name:'Hidrógeno',   cat:'h',          col:1,  row:1 },
  { n:2,  s:'He', name:'Helio',        cat:'noble',       col:18, row:1 },
  // row 2
  { n:3,  s:'Li', name:'Litio',        cat:'alkali',      col:1,  row:2 },
  { n:4,  s:'Be', name:'Berilio',      cat:'alkaline',    col:2,  row:2 },
  { n:5,  s:'B',  name:'Boro',         cat:'metalloid',   col:13, row:2 },
  { n:6,  s:'C',  name:'Carbono',      cat:'nonmetal',    col:14, row:2 },
  { n:7,  s:'N',  name:'Nitrógeno',    cat:'nonmetal',    col:15, row:2 },
  { n:8,  s:'O',  name:'Oxígeno',      cat:'nonmetal',    col:16, row:2 },
  { n:9,  s:'F',  name:'Flúor',        cat:'halogen',     col:17, row:2 },
  { n:10, s:'Ne', name:'Neón',         cat:'noble',       col:18, row:2 },
  // row 3
  { n:11, s:'Na', name:'Sodio',        cat:'alkali',      col:1,  row:3 },
  { n:12, s:'Mg', name:'Magnesio',     cat:'alkaline',    col:2,  row:3 },
  { n:13, s:'Al', name:'Aluminio',     cat:'post',        col:13, row:3 },
  { n:14, s:'Si', name:'Silicio',      cat:'metalloid',   col:14, row:3 },
  { n:15, s:'P',  name:'Fósforo',      cat:'nonmetal',    col:15, row:3 },
  { n:16, s:'S',  name:'Azufre',       cat:'nonmetal',    col:16, row:3 },
  { n:17, s:'Cl', name:'Cloro',        cat:'halogen',     col:17, row:3 },
  { n:18, s:'Ar', name:'Argón',        cat:'noble',       col:18, row:3 },
  // row 4
  { n:19, s:'K',  name:'Potasio',      cat:'alkali',      col:1,  row:4 },
  { n:20, s:'Ca', name:'Calcio',       cat:'alkaline',    col:2,  row:4 },
  { n:21, s:'Sc', name:'Escandio',     cat:'transition',  col:3,  row:4 },
  { n:22, s:'Ti', name:'Titanio',      cat:'transition',  col:4,  row:4 },
  { n:23, s:'V',  name:'Vanadio',      cat:'transition',  col:5,  row:4 },
  { n:24, s:'Cr', name:'Cromo',        cat:'transition',  col:6,  row:4 },
  { n:25, s:'Mn', name:'Manganeso',    cat:'transition',  col:7,  row:4 },
  { n:26, s:'Fe', name:'Hierro',       cat:'transition',  col:8,  row:4 },
  { n:27, s:'Co', name:'Cobalto',      cat:'transition',  col:9,  row:4 },
  { n:28, s:'Ni', name:'Níquel',       cat:'transition',  col:10, row:4 },
  { n:29, s:'Cu', name:'Cobre',        cat:'transition',  col:11, row:4 },
  { n:30, s:'Zn', name:'Zinc',         cat:'transition',  col:12, row:4 },
  { n:31, s:'Ga', name:'Galio',        cat:'post',        col:13, row:4 },
  { n:32, s:'Ge', name:'Germanio',     cat:'metalloid',   col:14, row:4 },
  { n:33, s:'As', name:'Arsénico',     cat:'metalloid',   col:15, row:4 },
  { n:34, s:'Se', name:'Selenio',      cat:'nonmetal',    col:16, row:4 },
  { n:35, s:'Br', name:'Bromo',        cat:'halogen',     col:17, row:4 },
  { n:36, s:'Kr', name:'Kriptón',      cat:'noble',       col:18, row:4 },
  // row 5
  { n:37, s:'Rb', name:'Rubidio',      cat:'alkali',      col:1,  row:5 },
  { n:38, s:'Sr', name:'Estroncio',    cat:'alkaline',    col:2,  row:5 },
  { n:39, s:'Y',  name:'Itrio',        cat:'transition',  col:3,  row:5 },
  { n:40, s:'Zr', name:'Circonio',     cat:'transition',  col:4,  row:5 },
  { n:41, s:'Nb', name:'Niobio',       cat:'transition',  col:5,  row:5 },
  { n:42, s:'Mo', name:'Molibdeno',    cat:'transition',  col:6,  row:5 },
  { n:43, s:'Tc', name:'Tecnecio',     cat:'transition',  col:7,  row:5 },
  { n:44, s:'Ru', name:'Rutenio',      cat:'transition',  col:8,  row:5 },
  { n:45, s:'Rh', name:'Rodio',        cat:'transition',  col:9,  row:5 },
  { n:46, s:'Pd', name:'Paladio',      cat:'transition',  col:10, row:5 },
  { n:47, s:'Ag', name:'Plata',        cat:'transition',  col:11, row:5 },
  { n:48, s:'Cd', name:'Cadmio',       cat:'transition',  col:12, row:5 },
  { n:49, s:'In', name:'Indio',        cat:'post',        col:13, row:5 },
  { n:50, s:'Sn', name:'Estaño',       cat:'post',        col:14, row:5 },
  { n:51, s:'Sb', name:'Antimonio',    cat:'metalloid',   col:15, row:5 },
  { n:52, s:'Te', name:'Teluro',       cat:'metalloid',   col:16, row:5 },
  { n:53, s:'I',  name:'Yodo',         cat:'halogen',     col:17, row:5 },
  { n:54, s:'Xe', name:'Xenón',        cat:'noble',       col:18, row:5 },
  // row 6
  { n:55, s:'Cs', name:'Cesio',        cat:'alkali',      col:1,  row:6 },
  { n:56, s:'Ba', name:'Bario',        cat:'alkaline',    col:2,  row:6 },
  { n:57, s:'La', name:'Lantano',      cat:'lanthanide',  col:3,  row:6 },
  { n:72, s:'Hf', name:'Hafnio',       cat:'transition',  col:4,  row:6 },
  { n:73, s:'Ta', name:'Tantalio',     cat:'transition',  col:5,  row:6 },
  { n:74, s:'W',  name:'Wolframio',    cat:'transition',  col:6,  row:6 },
  { n:75, s:'Re', name:'Renio',        cat:'transition',  col:7,  row:6 },
  { n:76, s:'Os', name:'Osmio',        cat:'transition',  col:8,  row:6 },
  { n:77, s:'Ir', name:'Iridio',       cat:'transition',  col:9,  row:6 },
  { n:78, s:'Pt', name:'Platino',      cat:'transition',  col:10, row:6 },
  { n:79, s:'Au', name:'Oro',          cat:'transition',  col:11, row:6 },
  { n:80, s:'Hg', name:'Mercurio',     cat:'transition',  col:12, row:6 },
  { n:81, s:'Tl', name:'Talio',        cat:'post',        col:13, row:6 },
  { n:82, s:'Pb', name:'Plomo',        cat:'post',        col:14, row:6 },
  { n:83, s:'Bi', name:'Bismuto',      cat:'post',        col:15, row:6 },
  { n:84, s:'Po', name:'Polonio',      cat:'metalloid',   col:16, row:6 },
  { n:85, s:'At', name:'Ástato',       cat:'halogen',     col:17, row:6 },
  { n:86, s:'Rn', name:'Radón',        cat:'noble',       col:18, row:6 },
  // row 7
  { n:87, s:'Fr', name:'Francio',      cat:'alkali',      col:1,  row:7 },
  { n:88, s:'Ra', name:'Radio',        cat:'alkaline',    col:2,  row:7 },
  { n:89, s:'Ac', name:'Actinio',      cat:'actinide',    col:3,  row:7 },
  { n:104,s:'Rf', name:'Rutherfordio', cat:'transition',  col:4,  row:7 },
  { n:105,s:'Db', name:'Dubnio',       cat:'transition',  col:5,  row:7 },
  { n:106,s:'Sg', name:'Seaborgio',    cat:'transition',  col:6,  row:7 },
  { n:107,s:'Bh', name:'Bohrio',       cat:'transition',  col:7,  row:7 },
  { n:108,s:'Hs', name:'Hasio',        cat:'transition',  col:8,  row:7 },
  { n:109,s:'Mt', name:'Meitnerio',    cat:'transition',  col:9,  row:7 },
  { n:110,s:'Ds', name:'Darmstadtio',  cat:'transition',  col:10, row:7 },
  { n:111,s:'Rg', name:'Roentgenio',   cat:'transition',  col:11, row:7 },
  { n:112,s:'Cn', name:'Copernicio',   cat:'transition',  col:12, row:7 },
  { n:113,s:'Nh', name:'Nihonio',      cat:'post',        col:13, row:7 },
  { n:114,s:'Fl', name:'Flerovio',     cat:'post',        col:14, row:7 },
  { n:115,s:'Mc', name:'Moscovio',     cat:'post',        col:15, row:7 },
  { n:116,s:'Lv', name:'Livermorio',   cat:'post',        col:16, row:7 },
  { n:117,s:'Ts', name:'Teneso',       cat:'halogen',     col:17, row:7 },
  { n:118,s:'Og', name:'Oganesón',     cat:'noble',       col:18, row:7 },

  // Lantánidos (row 9, cols 4-17)
  { n:58, s:'Ce', name:'Cerio',        cat:'lanthanide',  col:4,  row:9 },
  { n:59, s:'Pr', name:'Praseodimio',  cat:'lanthanide',  col:5,  row:9 },
  { n:60, s:'Nd', name:'Neodimio',     cat:'lanthanide',  col:6,  row:9 },
  { n:61, s:'Pm', name:'Prometio',     cat:'lanthanide',  col:7,  row:9 },
  { n:62, s:'Sm', name:'Samario',      cat:'lanthanide',  col:8,  row:9 },
  { n:63, s:'Eu', name:'Europio',      cat:'lanthanide',  col:9,  row:9 },
  { n:64, s:'Gd', name:'Gadolinio',    cat:'lanthanide',  col:10, row:9 },
  { n:65, s:'Tb', name:'Terbio',       cat:'lanthanide',  col:11, row:9 },
  { n:66, s:'Dy', name:'Disprosio',    cat:'lanthanide',  col:12, row:9 },
  { n:67, s:'Ho', name:'Holmio',       cat:'lanthanide',  col:13, row:9 },
  { n:68, s:'Er', name:'Erbio',        cat:'lanthanide',  col:14, row:9 },
  { n:69, s:'Tm', name:'Tulio',        cat:'lanthanide',  col:15, row:9 },
  { n:70, s:'Yb', name:'Iterbio',      cat:'lanthanide',  col:16, row:9 },
  { n:71, s:'Lu', name:'Lutecio',      cat:'lanthanide',  col:17, row:9 },

  // Actínidos (row 10, cols 4-17)
  { n:90, s:'Th', name:'Torio',        cat:'actinide',    col:4,  row:10 },
  { n:91, s:'Pa', name:'Protactinio',  cat:'actinide',    col:5,  row:10 },
  { n:92, s:'U',  name:'Uranio',       cat:'actinide',    col:6,  row:10 },
  { n:93, s:'Np', name:'Neptunio',     cat:'actinide',    col:7,  row:10 },
  { n:94, s:'Pu', name:'Plutonio',     cat:'actinide',    col:8,  row:10 },
  { n:95, s:'Am', name:'Americio',     cat:'actinide',    col:9,  row:10 },
  { n:96, s:'Cm', name:'Curio',        cat:'actinide',    col:10, row:10 },
  { n:97, s:'Bk', name:'Berkelio',     cat:'actinide',    col:11, row:10 },
  { n:98, s:'Cf', name:'Californio',   cat:'actinide',    col:12, row:10 },
  { n:99, s:'Es', name:'Einsteinio',   cat:'actinide',    col:13, row:10 },
  { n:100,s:'Fm', name:'Fermio',       cat:'actinide',    col:14, row:10 },
  { n:101,s:'Md', name:'Mendelevio',   cat:'actinide',    col:15, row:10 },
  { n:102,s:'No', name:'Nobelio',      cat:'actinide',    col:16, row:10 },
  { n:103,s:'Lr', name:'Laurencio',    cat:'actinide',    col:17, row:10 },
];

function buildPT() {
  const container = document.getElementById('pt-table');
  if (!container || container.children.length > 0) return;

  // 10 rows x 18 cols grid (rows 8 = spacer between main table and lanthanides)
  const ROWS = 10, COLS = 18;
  const cells = {};
  PT_ELEMENTS.forEach(e => { cells[`${e.row}-${e.col}`] = e; });

  for (let r = 1; r <= ROWS; r++) {
    for (let c = 1; c <= COLS; c++) {
      const div = document.createElement('div');
      const el  = cells[`${r}-${c}`];

      if (r === 8) {
        // Spacer row
        div.className = 'pt-cell empty';
        container.appendChild(div);
        continue;
      }

      if (!el) {
        div.className = 'pt-cell empty';
        container.appendChild(div);
        continue;
      }

      div.className = `pt-cell pt-${el.cat}`;
      div.innerHTML = `
        <span class="pt-num">${el.n}</span>
        <span class="pt-sym">${el.s}</span>
        <span class="pt-name">${el.name}</span>`;
      container.appendChild(div);
    }
  }
}

window.openPT = function() {
  buildPT();
  document.getElementById('pt-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closePT = function(e) {
  if (e && e.target !== document.getElementById('pt-overlay')) return;
  document.getElementById('pt-overlay').classList.add('hidden');
  document.body.style.overflow = '';
};
