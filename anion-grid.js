// anion-grid.js — Grilla de aniones para Nomen

const AG_POLY = [
  { group: 'Cloro', items: [
    { nombre: 'Perclorato',  formula: 'ClO₄⁻' },
    { nombre: 'Clorato',     formula: 'ClO₃⁻' },
    { nombre: 'Clorito',     formula: 'ClO₂⁻' },
    { nombre: 'Hipoclorito', formula: 'ClO⁻'  },
  ]},
  { group: 'Bromo', items: [
    { nombre: 'Perbromato',  formula: 'BrO₄⁻' },
    { nombre: 'Bromato',     formula: 'BrO₃⁻' },
    { nombre: 'Bromito',     formula: 'BrO₂⁻' },
    { nombre: 'Hipobromito', formula: 'BrO⁻'  },
  ]},
  { group: 'Yodo', items: [
    { nombre: 'Periodato',  formula: 'IO₄⁻' },
    { nombre: 'Iodato',     formula: 'IO₃⁻' },
    { nombre: 'Iodito',     formula: 'IO₂⁻' },
    { nombre: 'Hipoiodito', formula: 'IO⁻'  },
  ]},
  { group: 'Azufre', items: [
    { nombre: 'Sulfato',       formula: 'SO₄²⁻' },
    { nombre: 'Sulfato ácido', formula: 'HSO₄⁻' },
    { nombre: 'Sulfito',       formula: 'SO₃²⁻' },
    { nombre: 'Bisulfito',     formula: 'HSO₃⁻' },
    { nombre: 'Sulfuro ácido', formula: 'HS⁻'   },
    { nombre: 'Tiocianato',    formula: 'SCN⁻'  },
  ]},
  { group: 'Nitrógeno', items: [
    { nombre: 'Nitrato', formula: 'NO₃⁻' },
    { nombre: 'Nitrito', formula: 'NO₂⁻' },
    { nombre: 'Azida',   formula: 'N₃⁻'  },
  ]},
  { group: 'Fósforo', items: [
    { nombre: 'Fosfato',            formula: 'PO₄³⁻'  },
    { nombre: 'Hidrógenofosfato',   formula: 'HPO₄²⁻' },
    { nombre: 'Dihidrógenofosfato', formula: 'H₂PO₄⁻' },
  ]},
  { group: 'Carbono', items: [
    { nombre: 'Carbonato',   formula: 'CO₃²⁻' },
    { nombre: 'Bicarbonato', formula: 'HCO₃⁻' },
    { nombre: 'Cianato',     formula: 'NCO⁻'  },
    { nombre: 'Cianuro',     formula: 'CN⁻'   },
  ]},
  { group: 'Otros', items: [
    { nombre: 'Hidróxido',         formula: 'OH⁻'      },
    { nombre: 'Peróxido',          formula: 'O₂²⁻'     },
    { nombre: 'Superóxido',        formula: 'O₂⁻'      },
    { nombre: 'Permanganato',      formula: 'MnO₄⁻'    },
    { nombre: 'Dicromato',         formula: 'Cr₂O₇²⁻'  },
    { nombre: 'Cromato',           formula: 'CrO₄²⁻'   },
    { nombre: 'Borato',            formula: 'BO₃³⁻'    },
    { nombre: 'Arseniato ácido',   formula: 'HAsO₄²⁻'  },
    { nombre: 'Arseniato diácido', formula: 'H₂AsO₄⁻'  },
  ]},
];

const AG_MONO = [
  { group: 'Carga −1', items: [
    { nombre: 'Hidruro',  formula: 'H⁻'  },
    { nombre: 'Fluoruro', formula: 'F⁻'  },
    { nombre: 'Cloruro',  formula: 'Cl⁻' },
    { nombre: 'Bromuro',  formula: 'Br⁻' },
    { nombre: 'Ioduro',   formula: 'I⁻'  },
  ]},
  { group: 'Carga −2', items: [
    { nombre: 'Óxido',   formula: 'O²⁻' },
    { nombre: 'Sulfuro', formula: 'S²⁻' },
  ]},
  { group: 'Carga −3', items: [
    { nombre: 'Nitruro', formula: 'N³⁻' },
    { nombre: 'Fosfuro', formula: 'P³⁻' },
  ]},
];

let agTab = 'all';

function buildAGSection(groups, cellClass) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < groups.length; i += 2) {
    const row = document.createElement('div');
    row.className = 'ag-row';
    [groups[i], groups[i+1]].forEach(grp => {
      if (!grp) return;
      const col = document.createElement('div');
      col.className = 'ag-col';
      const t = document.createElement('div');
      t.className = 'ag-group-title';
      t.textContent = grp.group;
      col.appendChild(t);
      grp.items.forEach(item => {
        const cell = document.createElement('div');
        cell.className = cellClass;
        cell.innerHTML = `<span class="ag-nombre">${item.nombre}</span><span class="ag-formula">${item.formula}</span>`;
        col.appendChild(cell);
      });
      row.appendChild(col);
    });
    frag.appendChild(row);
  }
  return frag;
}

function buildAG(tab) {
  const body = document.getElementById('ag-body');
  body.innerHTML = '';

  if (tab === 'mono') {
    body.appendChild(buildAGSection(AG_MONO, 'ag-cell-mono'));
  } else if (tab === 'poly') {
    body.appendChild(buildAGSection(AG_POLY, 'ag-cell-poly'));
  } else {
    // Todos: monoatómicos primero, luego poliatómicos
    body.appendChild(buildAGSection(AG_MONO, 'ag-cell-mono'));
    const sep = document.createElement('hr');
    sep.style.cssText = 'border:none;border-top:1px solid var(--border);margin:4px 0 10px';
    body.appendChild(sep);
    body.appendChild(buildAGSection(AG_POLY, 'ag-cell-poly'));
  }
}

window.openAG = function() {
  buildAG(agTab);
  document.getElementById('ag-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeAG = function(e) {
  if (e && e.target !== document.getElementById('ag-overlay')) return;
  document.getElementById('ag-overlay').classList.add('hidden');
  document.body.style.overflow = '';
};

window.switchAGTab = function(tab, btn) {
  agTab = tab;
  document.querySelectorAll('.ag-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  buildAG(tab);
};
