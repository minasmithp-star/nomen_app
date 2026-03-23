// data.js — Tabla de nomenclatura QI completa (Fac. Química, Uruguay)
// Contiene: aniones poliatómicos, aniones monoatómicos, cationes poliatómicos, ácidos

const ANIONES = [
  // ─── POLIATÓMICOS ────────────────────────────────────────────────────────────
  // Azufre
  { id: 1,  nombre: "sulfato",                    formula: "SO₄²⁻",  carga: -2, tipo: "poliatómicos", subgrupo: "azufre",
    oxoacido: "ácido sulfúrico (H₂SO₄)",
    sales: "sulfatos (ej: Na₂SO₄, CaSO₄)",
    reaccion: "SO₄²⁻ + Ba²⁺ → BaSO₄↓ (precipitado blanco insoluble)" },

  { id: 2,  nombre: "sulfato ácido",               formula: "HSO₄⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "azufre",
    oxoacido: "ácido sulfúrico (disociación parcial)",
    sales: "sulfatos ácidos (bisulfatos) — ej: NaHSO₄",
    reaccion: "HSO₄⁻ ⇌ H⁺ + SO₄²⁻ (ácido fuerte en 2ª disociación)" },

  { id: 3,  nombre: "sulfito",                     formula: "SO₃²⁻",  carga: -2, tipo: "poliatómicos", subgrupo: "azufre",
    oxoacido: "ácido sulfuroso (H₂SO₃)",
    sales: "sulfitos — ej: Na₂SO₃ (conservante E221)",
    reaccion: "SO₃²⁻ + 2H⁺ → SO₂↑ + H₂O (gas con olor penetrante)" },

  { id: 4,  nombre: "bisulfito",                   formula: "HSO₃⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "azufre",
    oxoacido: "ácido sulfuroso (1ª disociación)",
    sales: "bisulfitos — ej: NaHSO₃",
    reaccion: "HSO₃⁻ + H⁺ → SO₂↑ + H₂O" },

  { id: 5,  nombre: "sulfuro ácido",               formula: "HS⁻",    carga: -1, tipo: "poliatómicos", subgrupo: "azufre",
    oxoacido: "ácido sulfhídrico (H₂S)",
    sales: "hidrosulfuros (bisulfuros) — ej: NaHS",
    reaccion: "HS⁻ + H⁺ → H₂S↑ (gas tóxico, olor a huevo podrido)" },

  { id: 6,  nombre: "tiocianato (sulfocianuro)",   formula: "SCN⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "azufre",
    oxoacido: "ácido tiociánico (HSCN)",
    sales: "tiocianatos — ej: KSCN",
    reaccion: "SCN⁻ + Fe³⁺ → [Fe(SCN)]²⁺ (rojo sangre — reacción de identificación)" },

  // Nitrógeno
  { id: 7,  nombre: "nitrato",                     formula: "NO₃⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "nitrógeno",
    oxoacido: "ácido nítrico (HNO₃)",
    sales: "nitratos — ej: KNO₃ (salitre), NaNO₃",
    reaccion: "NO₃⁻ + Cu + 4H⁺ → Cu²⁺ + 2NO₂↑ + 2H₂O (med. ácido)" },

  { id: 8,  nombre: "nitrito",                     formula: "NO₂⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "nitrógeno",
    oxoacido: "ácido nitroso (HNO₂)",
    sales: "nitritos — ej: NaNO₂ (conservante E250)",
    reaccion: "NO₂⁻ + H⁺ → HNO₂ (ácido débil, inestable)" },

  // Carbono
  { id: 9,  nombre: "carbonato",                   formula: "CO₃²⁻",  carga: -2, tipo: "poliatómicos", subgrupo: "carbono",
    oxoacido: "ácido carbónico (H₂CO₃)",
    sales: "carbonatos — ej: CaCO₃ (caliza), Na₂CO₃ (soda)",
    reaccion: "CO₃²⁻ + 2H⁺ → CO₂↑ + H₂O (burbujeo efervescente)" },

  { id: 10, nombre: "hidrógenocarbonato (bicarbonato)", formula: "HCO₃⁻", carga: -1, tipo: "poliatómicos", subgrupo: "carbono",
    oxoacido: "ácido carbónico (1ª disociación)",
    sales: "bicarbonatos — ej: NaHCO₃ (bicarbonato de sodio)",
    reaccion: "HCO₃⁻ + H⁺ → CO₂↑ + H₂O" },

  // Oxígeno
  { id: 11, nombre: "hidróxido",                   formula: "OH⁻",    carga: -1, tipo: "poliatómicos", subgrupo: "oxígeno",
    oxoacido: "agua (H₂O)",
    sales: "hidróxidos (bases) — ej: NaOH, Ca(OH)₂",
    reaccion: "OH⁻ + H⁺ → H₂O (neutralización)" },

  { id: 12, nombre: "peróxido",                    formula: "O₂²⁻",   carga: -2, tipo: "poliatómicos", subgrupo: "oxígeno",
    oxoacido: "agua oxigenada (H₂O₂)",
    sales: "peróxidos — ej: Na₂O₂, BaO₂",
    reaccion: "O₂²⁻ + 2H₂O → 4OH⁻ + O₂↑ (en medio acuoso)" },

  { id: 13, nombre: "superóxido",                  formula: "O₂⁻",    carga: -1, tipo: "poliatómicos", subgrupo: "oxígeno",
    oxoacido: "—",
    sales: "superóxidos — ej: KO₂",
    reaccion: "4KO₂ + 2H₂O → 4KOH + 3O₂↑" },

  // Cromo
  { id: 14, nombre: "dicromato",                   formula: "Cr₂O₇²⁻", carga: -2, tipo: "poliatómicos", subgrupo: "cromo",
    oxoacido: "ácido dicrómico (H₂Cr₂O₇)",
    sales: "dicromatos — ej: K₂Cr₂O₇ (anaranjado)",
    reaccion: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (oxidante fuerte)" },

  { id: 15, nombre: "cromato",                     formula: "CrO₄²⁻",  carga: -2, tipo: "poliatómicos", subgrupo: "cromo",
    oxoacido: "ácido crómico (H₂CrO₄)",
    sales: "cromatos — ej: K₂CrO₄ (amarillo)",
    reaccion: "CrO₄²⁻ + Ba²⁺ → BaCrO₄↓ (precipitado amarillo)" },

  // Nitruro
  { id: 16, nombre: "azida",                       formula: "N₃⁻",    carga: -1, tipo: "poliatómicos", subgrupo: "nitrógeno",
    oxoacido: "ácido hidrazoico (HN₃)",
    sales: "azidas — ej: NaN₃ (airbags)",
    reaccion: "2NaN₃ → 2Na + 3N₂↑ (explosión controlada)" },

  // Boro
  { id: 17, nombre: "borato",                      formula: "BO₃³⁻",  carga: -3, tipo: "poliatómicos", subgrupo: "boro",
    oxoacido: "ácido bórico (H₃BO₃)",
    sales: "boratos — ej: Na₃BO₃, bórax (Na₂B₄O₇·10H₂O)",
    reaccion: "BO₃³⁻ + 3H⁺ → H₃BO₃ (ácido débil)" },

  // Cianatos
  { id: 18, nombre: "cianato",                     formula: "NCO⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "carbono",
    oxoacido: "ácido ciánico (HNCO)",
    sales: "cianatos — ej: KNCO",
    reaccion: "NCO⁻ + H₂O → NH₃ + CO₂ (hidrólisis)" },

  { id: 19, nombre: "cianuro",                     formula: "CN⁻",    carga: -1, tipo: "poliatómicos", subgrupo: "carbono",
    oxoacido: "ácido cianhídrico (HCN)",
    sales: "cianuros — ej: KCN, NaCN (muy tóxicos)",
    reaccion: "CN⁻ + Fe²⁺/Fe³⁺ → complejos azul de Prusia [Fe₄[Fe(CN)₆]₃]" },

  // Fósforo
  { id: 20, nombre: "fosfato",                     formula: "PO₄³⁻",  carga: -3, tipo: "poliatómicos", subgrupo: "fósforo",
    oxoacido: "ácido fosfórico (H₃PO₄)",
    sales: "fosfatos — ej: Ca₃(PO₄)₂ (huesos), Na₃PO₄",
    reaccion: "PO₄³⁻ + 3Ag⁺ → Ag₃PO₄↓ (amarillo)" },

  { id: 21, nombre: "hidrógenofosfato",             formula: "HPO₄²⁻", carga: -2, tipo: "poliatómicos", subgrupo: "fósforo",
    oxoacido: "ácido fosfórico (2ª disociación)",
    sales: "hidrogenofosfatos — ej: Na₂HPO₄",
    reaccion: "HPO₄²⁻ ⇌ H⁺ + PO₄³⁻ (pKa = 12.4)" },

  { id: 22, nombre: "dihidrógenofosfato",           formula: "H₂PO₄⁻", carga: -1, tipo: "poliatómicos", subgrupo: "fósforo",
    oxoacido: "ácido fosfórico (1ª disociación)",
    sales: "dihidrogenofosfatos — ej: NaH₂PO₄",
    reaccion: "H₂PO₄⁻ ⇌ H⁺ + HPO₄²⁻ (pKa = 7.2, buffer fisiológico)" },

  // Manganeso
  { id: 23, nombre: "permanganato",                 formula: "MnO₄⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "manganeso",
    oxoacido: "ácido permangánico (HMnO₄)",
    sales: "permanganatos — ej: KMnO₄ (violeta)",
    reaccion: "MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O (ox. fuerte)" },

  // Bromo
  { id: 24, nombre: "perbromato",                   formula: "BrO₄⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido perbrómico (HBrO₄)",
    sales: "perbromatos — ej: KBrO₄",
    reaccion: "Br en estado de oxidación +7 (máximo)" },

  { id: 25, nombre: "bromato",                      formula: "BrO₃⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido brómico (HBrO₃)",
    sales: "bromatos — ej: KBrO₃ (oxidante)",
    reaccion: "BrO₃⁻ + 6H⁺ + 6e⁻ → Br⁻ + 3H₂O" },

  { id: 26, nombre: "bromito",                      formula: "BrO₂⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido bromoso (HBrO₂)",
    sales: "bromitos — ej: NaBrO₂",
    reaccion: "Br en estado de oxidación +3" },

  { id: 27, nombre: "hipobromito",                  formula: "BrO⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido hipobromoso (HBrO)",
    sales: "hipobromitos — ej: NaBrO",
    reaccion: "Br₂ + 2OH⁻ → BrO⁻ + Br⁻ + H₂O (dismutación)" },

  // Yodo
  { id: 28, nombre: "periodato",                    formula: "IO₄⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido peryódico (HIO₄)",
    sales: "periodatos — ej: KIO₄",
    reaccion: "I en estado de oxidación +7" },

  { id: 29, nombre: "iodato",                       formula: "IO₃⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido iódico (HIO₃)",
    sales: "iodatos — ej: KIO₃ (sal de mesa yodada)",
    reaccion: "2IO₃⁻ + 5HSO₃⁻ → I₂ + 5SO₄²⁻ + H₂O + 3H⁺" },

  { id: 30, nombre: "iodito",                       formula: "IO₂⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido iodoso (HIO₂)",
    sales: "ioditos — ej: NaIO₂",
    reaccion: "I en estado de oxidación +3" },

  { id: 31, nombre: "hipoiodito",                   formula: "IO⁻",    carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido hipoiodoso (HIO)",
    sales: "hipoioditos — ej: NaIO",
    reaccion: "I₂ + 2OH⁻ → IO⁻ + I⁻ + H₂O" },

  // Cloro
  { id: 32, nombre: "perclorato",                   formula: "ClO₄⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido perclórico (HClO₄)",
    sales: "percloratos — ej: KClO₄ (pirotecnia)",
    reaccion: "Cl en estado de oxidación +7 (máximo, oxidante potente)" },

  { id: 33, nombre: "clorato",                      formula: "ClO₃⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido clórico (HClO₃)",
    sales: "cloratos — ej: KClO₃ (explosivo, herbicida)",
    reaccion: "2KClO₃ →(MnO₂, Δ) 2KCl + 3O₂↑" },

  { id: 34, nombre: "clorito",                      formula: "ClO₂⁻",  carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido cloroso (HClO₂)",
    sales: "cloritos — ej: NaClO₂ (blanqueador)",
    reaccion: "Cl en estado de oxidación +3" },

  { id: 35, nombre: "hipoclorito",                  formula: "ClO⁻",   carga: -1, tipo: "poliatómicos", subgrupo: "halógenos",
    oxoacido: "ácido hipocloroso (HClO)",
    sales: "hipocloritos — ej: NaClO (lavandina/cloro)",
    reaccion: "Cl₂ + 2NaOH → NaClO + NaCl + H₂O" },

  // Arsénico
  { id: 36, nombre: "arseniato dibásico (arseniato ácido)", formula: "HAsO₄²⁻", carga: -2, tipo: "poliatómicos", subgrupo: "arsénico",
    oxoacido: "ácido arsénico (H₃AsO₄)",
    sales: "arsenatos ácidos — ej: Na₂HAsO₄",
    reaccion: "Similar al fosfato (isoelectrónico), muy tóxico" },

  { id: 37, nombre: "arseniato monobásico (arseniato diácido)", formula: "H₂AsO₄⁻", carga: -1, tipo: "poliatómicos", subgrupo: "arsénico",
    oxoacido: "ácido arsénico (1ª disociación)",
    sales: "dihidrogenoarseniatos — ej: NaH₂AsO₄",
    reaccion: "As en estado de oxidación +5" },

  // ─── MONOATÓMICOS ────────────────────────────────────────────────────────────
  { id: 38, nombre: "fluoruro",  formula: "F⁻",   carga: -1, tipo: "monoatómicos", subgrupo: "halógenos",
    oxoacido: "ácido fluorhídrico (HF)",
    sales: "fluoruros — ej: CaF₂ (fluorita), NaF (pasta dental)",
    reaccion: "F⁻ + Ca²⁺ → CaF₂↓ (precipitado blanco insoluble)" },

  { id: 39, nombre: "cloruro",   formula: "Cl⁻",  carga: -1, tipo: "monoatómicos", subgrupo: "halógenos",
    oxoacido: "ácido clorhídrico (HCl)",
    sales: "cloruros — ej: NaCl (sal de mesa), KCl",
    reaccion: "Cl⁻ + Ag⁺ → AgCl↓ (precipitado blanco, insoluble en HNO₃)" },

  { id: 40, nombre: "bromuro",   formula: "Br⁻",  carga: -1, tipo: "monoatómicos", subgrupo: "halógenos",
    oxoacido: "ácido bromhídrico (HBr)",
    sales: "bromuros — ej: NaBr, AgBr (fotografía)",
    reaccion: "Br⁻ + Ag⁺ → AgBr↓ (amarillo pálido)" },

  { id: 41, nombre: "ioduro",    formula: "I⁻",   carga: -1, tipo: "monoatómicos", subgrupo: "halógenos",
    oxoacido: "ácido yodhídrico (HI)",
    sales: "ioduros — ej: NaI, KI",
    reaccion: "I⁻ + Ag⁺ → AgI↓ (amarillo intenso, insoluble en NH₃)" },

  { id: 42, nombre: "hidruro",   formula: "H⁻",   carga: -1, tipo: "monoatómicos", subgrupo: "hidrógeno",
    oxoacido: "—",
    sales: "hidruros — ej: NaH, CaH₂",
    reaccion: "H⁻ + H₂O → H₂↑ + OH⁻ (reacción violenta)" },

  { id: 43, nombre: "nitruro",   formula: "N³⁻",  carga: -3, tipo: "monoatómicos", subgrupo: "nitrógeno",
    oxoacido: "—",
    sales: "nitruros — ej: Li₃N, Mg₃N₂",
    reaccion: "N³⁻ + 3H₂O → NH₃↑ + 3OH⁻" },

  { id: 44, nombre: "óxido",     formula: "O²⁻",  carga: -2, tipo: "monoatómicos", subgrupo: "oxígeno",
    oxoacido: "agua (H₂O)",
    sales: "óxidos — ej: Na₂O, CaO (cal viva)",
    reaccion: "O²⁻ + H₂O → 2OH⁻" },

  { id: 45, nombre: "fosfuro",   formula: "P³⁻",  carga: -3, tipo: "monoatómicos", subgrupo: "fósforo",
    oxoacido: "—",
    sales: "fosfuros — ej: Ca₃P₂",
    reaccion: "Ca₃P₂ + 6H₂O → 3Ca(OH)₂ + 2PH₃↑ (fosfina, tóxica)" },

  { id: 46, nombre: "sulfuro",   formula: "S²⁻",  carga: -2, tipo: "monoatómicos", subgrupo: "azufre",
    oxoacido: "ácido sulfhídrico (H₂S)",
    sales: "sulfuros — ej: Na₂S, FeS, CuS",
    reaccion: "S²⁻ + Pb²⁺ → PbS↓ (negro, reacción de identificación)" },
];

// ─── CATIONES ─────────────────────────────────────────────────────────────────
const CATIONES = [
  // ── Poliatómicos ──
  { id: 101, nombre: "amonio",   formula: "NH₄⁺",  carga: +1, tipo: "cationes", subgrupo: "poliatómicos",
    elemento: "amonio", estadosOxidacion: ["+1"],
    origen: "NH₃ + H⁺", sales: "NH₄Cl, (NH₄)₂SO₄",
    reaccion: "NH₄⁺ + OH⁻ → NH₃↑ + H₂O" },
  { id: 102, nombre: "fosfonio", formula: "PH₄⁺",  carga: +1, tipo: "cationes", subgrupo: "poliatómicos",
    elemento: "fosfonio", estadosOxidacion: ["+1"],
    origen: "PH₃ + H⁺", sales: "PH₄I",
    reaccion: "Análogo al NH₄⁺, menos estable en agua" },
  { id: 103, nombre: "arsonio",  formula: "AsH₄⁺", carga: +1, tipo: "cationes", subgrupo: "poliatómicos",
    elemento: "arsonio", estadosOxidacion: ["+1"],
    origen: "AsH₃ + H⁺", sales: "muy inestables",
    reaccion: "Extremadamente inestable en agua" },
  { id: 104, nombre: "oxonio",   formula: "H₃O⁺",  carga: +1, tipo: "cationes", subgrupo: "poliatómicos",
    elemento: "oxonio", estadosOxidacion: ["+1"],
    origen: "H₂O + H⁺", sales: "representa H⁺(aq) en solución ácida",
    reaccion: "H₃O⁺ + OH⁻ → 2H₂O" },

  // ── Hidrógeno ──
  { id: 105, nombre: "hidrógeno", formula: "H⁺", carga: +1, tipo: "cationes", subgrupo: "hidrógeno",
    elemento: "hidrógeno", estadosOxidacion: ["+1"],
    origen: "ionización de ácidos", sales: "todos los ácidos",
    reaccion: "H⁺ + OH⁻ → H₂O; en agua existe como H₃O⁺" },

  // ── Alcalinos ──
  { id: 106, nombre: "litio",    formula: "Li⁺", carga: +1, tipo: "cationes", subgrupo: "alcalinos",
    elemento: "litio", estadosOxidacion: ["+1"],
    origen: "Li + H₂O", sales: "LiCl, Li₂CO₃, LiOH",
    reaccion: "2Li + 2H₂O → 2LiOH + H₂↑" },
  { id: 107, nombre: "sodio",    formula: "Na⁺", carga: +1, tipo: "cationes", subgrupo: "alcalinos",
    elemento: "sodio", estadosOxidacion: ["+1"],
    origen: "Na + H₂O", sales: "NaCl, Na₂SO₄, NaOH",
    reaccion: "2Na + 2H₂O → 2NaOH + H₂↑ (violenta)" },
  { id: 108, nombre: "potasio",  formula: "K⁺",  carga: +1, tipo: "cationes", subgrupo: "alcalinos",
    elemento: "potasio", estadosOxidacion: ["+1"],
    origen: "K + H₂O", sales: "KCl, KNO₃, KOH",
    reaccion: "2K + 2H₂O → 2KOH + H₂↑ (muy violenta)" },
  { id: 109, nombre: "rubidio",  formula: "Rb⁺", carga: +1, tipo: "cationes", subgrupo: "alcalinos",
    elemento: "rubidio", estadosOxidacion: ["+1"],
    origen: "Rb + H₂O", sales: "RbCl, RbOH",
    reaccion: "Reacciona violentamente con agua" },
  { id: 110, nombre: "cesio",    formula: "Cs⁺", carga: +1, tipo: "cationes", subgrupo: "alcalinos",
    elemento: "cesio", estadosOxidacion: ["+1"],
    origen: "Cs + H₂O", sales: "CsCl, CsOH",
    reaccion: "Reacción explosiva con agua" },

  // ── Alcalinotérreos ──
  { id: 111, nombre: "berilio",   formula: "Be²⁺", carga: +2, tipo: "cationes", subgrupo: "alcalinotérreos",
    elemento: "berilio", estadosOxidacion: ["+2"],
    origen: "Be + ácido", sales: "BeCl₂, BeSO₄",
    reaccion: "Be²⁺ anfótero: Be(OH)₂ se disuelve en NaOH" },
  { id: 112, nombre: "magnesio",  formula: "Mg²⁺", carga: +2, tipo: "cationes", subgrupo: "alcalinotérreos",
    elemento: "magnesio", estadosOxidacion: ["+2"],
    origen: "Mg + HCl", sales: "MgCl₂, MgSO₄, Mg(OH)₂",
    reaccion: "Mg + 2HCl → MgCl₂ + H₂↑" },
  { id: 113, nombre: "calcio",    formula: "Ca²⁺", carga: +2, tipo: "cationes", subgrupo: "alcalinotérreos",
    elemento: "calcio", estadosOxidacion: ["+2"],
    origen: "Ca + H₂O", sales: "CaCl₂, CaSO₄, CaCO₃",
    reaccion: "Ca²⁺ + CO₃²⁻ → CaCO₃↓ blanco" },
  { id: 114, nombre: "estroncio", formula: "Sr²⁺", carga: +2, tipo: "cationes", subgrupo: "alcalinotérreos",
    elemento: "estroncio", estadosOxidacion: ["+2"],
    origen: "Sr + ácido", sales: "SrCl₂, SrSO₄",
    reaccion: "Llama roja carmín — pirotecnia" },
  { id: 115, nombre: "bario",     formula: "Ba²⁺", carga: +2, tipo: "cationes", subgrupo: "alcalinotérreos",
    elemento: "bario", estadosOxidacion: ["+2"],
    origen: "Ba + ácido", sales: "BaCl₂, BaSO₄",
    reaccion: "Ba²⁺ + SO₄²⁻ → BaSO₄↓ blanco" },

  // ── Transición (agrupados por elemento) ──
  { id: 116, nombre: "hierro",    formula: "Fe", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "hierro", estadosOxidacion: ["+2", "+3"],
    origen: "Fe + ácido", sales: "FeSO₄ (+2), FeCl₃ (+3)",
    reaccion: "Fe²⁺ → Fe(OH)₂↓ verde; Fe³⁺ + SCN⁻ → rojo sangre" },

  // Tarjetas separadas con nombre propio (ferroso/férrico)
  { id: 116.1, nombre: "ferroso",  formula: "Fe²⁺", carga: +2, tipo: "cationes", subgrupo: "transición",
    elemento: "hierro", estadosOxidacion: ["+2"], nombrePropio: true,
    origen: "Fe + H₂SO₄ diluido", sales: "FeSO₄, FeCl₂",
    reaccion: "Fe²⁺ + 2OH⁻ → Fe(OH)₂↓ verde; se oxida a Fe³⁺ con O₂" },
  { id: 116.2, nombre: "férrico",  formula: "Fe³⁺", carga: +3, tipo: "cationes", subgrupo: "transición",
    elemento: "hierro", estadosOxidacion: ["+3"], nombrePropio: true,
    origen: "Fe + HNO₃ o H₂SO₄ conc.", sales: "Fe₂(SO₄)₃, FeCl₃",
    reaccion: "Fe³⁺ + SCN⁻ → [Fe(SCN)]²⁺ rojo sangre (identif.)" },

  { id: 117, nombre: "cobre",     formula: "Cu", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "cobre", estadosOxidacion: ["+1", "+2"],
    origen: "Cu + HNO₃", sales: "Cu₂SO₄ (+1), CuSO₄ (+2)",
    reaccion: "Cu²⁺ + 2OH⁻ → Cu(OH)₂↓ azul; con NH₃ → [Cu(NH₃)₄]²⁺" },

  // Tarjetas separadas con nombre propio (cuproso/cúprico)
  { id: 117.1, nombre: "cuproso", formula: "Cu⁺",  carga: +1, tipo: "cationes", subgrupo: "transición",
    elemento: "cobre", estadosOxidacion: ["+1"], nombrePropio: true,
    origen: "Cu₂O + HCl", sales: "CuCl, Cu₂SO₄",
    reaccion: "2Cu⁺ → Cu⁰ + Cu²⁺ (dismutación en agua)" },
  { id: 117.2, nombre: "cúprico", formula: "Cu²⁺", carga: +2, tipo: "cationes", subgrupo: "transición",
    elemento: "cobre", estadosOxidacion: ["+2"], nombrePropio: true,
    origen: "Cu + HNO₃", sales: "CuSO₄, CuCl₂",
    reaccion: "Cu²⁺ + 2OH⁻ → Cu(OH)₂↓ azul; con NH₃ → [Cu(NH₃)₄]²⁺" },
  { id: 118, nombre: "zinc",      formula: "Zn", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "zinc", estadosOxidacion: ["+2"],
    origen: "Zn + HCl", sales: "ZnCl₂, ZnSO₄",
    reaccion: "Zn²⁺ + 2OH⁻ → Zn(OH)₂↓ blanco; anfótero" },
  { id: 119, nombre: "cromo",     formula: "Cr", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "cromo", estadosOxidacion: ["+2", "+3"],
    origen: "Cr₂O₃ + ácido", sales: "CrCl₂ (+2), CrCl₃ (+3)",
    reaccion: "Cr³⁺ + 3OH⁻ → Cr(OH)₃↓ verde; anfótero en NaOH" },
  { id: 120, nombre: "manganeso", formula: "Mn", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "manganeso", estadosOxidacion: ["+2", "+3", "+4"],
    origen: "MnO + HCl, oxidación progresiva", sales: "MnCl₂ (+2), MnO₂ (+4)",
    reaccion: "Mn²⁺ → Mn(OH)₂↓ blanco → MnO₂ pardo con O₂" },
  { id: 121, nombre: "cobalto",   formula: "Co", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "cobalto", estadosOxidacion: ["+2", "+3"],
    origen: "Co + HCl", sales: "CoCl₂ (+2), CoCl₃ (+3)",
    reaccion: "Co²⁺ + 2OH⁻ → Co(OH)₂↓ rosado; Co³⁺ estable en complejos" },
  { id: 122, nombre: "níquel",    formula: "Ni", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "níquel", estadosOxidacion: ["+2"],
    origen: "Ni + HCl", sales: "NiCl₂, NiSO₄",
    reaccion: "Ni²⁺ + dimetilglioxima → precipitado rojo" },
  { id: 123, nombre: "plata",     formula: "Ag", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "plata", estadosOxidacion: ["+1"],
    origen: "Ag + HNO₃", sales: "AgNO₃, AgCl, AgBr",
    reaccion: "Ag⁺ + Cl⁻ → AgCl↓ blanco" },
  { id: 124, nombre: "oro",       formula: "Au", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "oro", estadosOxidacion: ["+1", "+3"],
    origen: "Au + agua regia", sales: "AuCl (+1), AuCl₃ (+3)",
    reaccion: "3Au⁺ → 2Au⁰ + Au³⁺ (dismutación)" },
  { id: 125, nombre: "cadmio",    formula: "Cd", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "cadmio", estadosOxidacion: ["+2"],
    origen: "Cd + HCl", sales: "CdCl₂, CdSO₄",
    reaccion: "Cd²⁺ + S²⁻ → CdS↓ amarillo" },
  { id: 126, nombre: "mercurio",  formula: "Hg", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "mercurio", estadosOxidacion: ["+1", "+2"],
    origen: "Hg + HNO₃", sales: "Hg₂Cl₂ (+1), HgCl₂ (+2)",
    reaccion: "Hg₂²⁺ + 2Cl⁻ → Hg₂Cl₂↓ blanco; Hg²⁺ + 2I⁻ → HgI₂↓ rojo" },
  { id: 127, nombre: "plomo",     formula: "Pb", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "plomo", estadosOxidacion: ["+2", "+4"],
    origen: "Pb + HNO₃", sales: "PbCl₂ (+2), PbO₂ (+4)",
    reaccion: "Pb²⁺ + S²⁻ → PbS↓ negro; PbO₂ oxidante fuerte" },
  { id: 128, nombre: "titanio",   formula: "Ti", carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "titanio", estadosOxidacion: ["+2", "+3", "+4"],
    origen: "TiO₂ + ácido", sales: "TiCl₂, TiCl₃, TiCl₄",
    reaccion: "Ti⁴⁺ + H₂O₂ → color naranja (reacción característica)" },
  { id: 129, nombre: "vanadio",   formula: "V",  carga: null, tipo: "cationes", subgrupo: "transición",
    elemento: "vanadio", estadosOxidacion: ["+2", "+3", "+4", "+5"],
    origen: "V₂O₅ + reductor", sales: "VCl₂, VCl₃, VOSO₄, VO₂Cl",
    reaccion: "V²⁺ violeta → V³⁺ verde → VO²⁺ azul → VO₂⁺ amarillo" },

  // ── Grupo principal ──
  { id: 130, nombre: "aluminio",  formula: "Al", carga: null, tipo: "cationes", subgrupo: "principales",
    elemento: "aluminio", estadosOxidacion: ["+3"],
    origen: "Al + HCl", sales: "AlCl₃, Al₂(SO₄)₃",
    reaccion: "Al³⁺ + 3OH⁻ → Al(OH)₃↓ blanco gelatinoso; anfótero" },
  { id: 131, nombre: "galio",     formula: "Ga", carga: null, tipo: "cationes", subgrupo: "principales",
    elemento: "galio", estadosOxidacion: ["+3"],
    origen: "Ga + HCl", sales: "GaCl₃, Ga₂(SO₄)₃",
    reaccion: "Anfótero similar al Al" },
  { id: 132, nombre: "indio",     formula: "In", carga: null, tipo: "cationes", subgrupo: "principales",
    elemento: "indio", estadosOxidacion: ["+3"],
    origen: "In + HCl", sales: "InCl₃, In₂(SO₄)₃",
    reaccion: "In³⁺ + 3OH⁻ → In(OH)₃↓ blanco" },
  { id: 133, nombre: "talio",     formula: "Tl", carga: null, tipo: "cationes", subgrupo: "principales",
    elemento: "talio", estadosOxidacion: ["+1", "+3"],
    origen: "Tl + HCl", sales: "TlCl (+1), TlCl₃ (+3)",
    reaccion: "Tl³⁺ oxidante fuerte; se reduce a Tl⁺ fácilmente" },

  // ── Lantánidos / actínidos ──
  { id: 134, nombre: "lantano",   formula: "La", carga: null, tipo: "cationes", subgrupo: "lantánidos",
    elemento: "lantano", estadosOxidacion: ["+3"],
    origen: "La₂O₃ + HCl", sales: "LaCl₃, La₂(SO₄)₃",
    reaccion: "La³⁺ + 3OH⁻ → La(OH)₃↓ blanco" },
  { id: 135, nombre: "cerio",     formula: "Ce", carga: null, tipo: "cationes", subgrupo: "lantánidos",
    elemento: "cerio", estadosOxidacion: ["+3", "+4"],
    origen: "Ce₂O₃ + HCl (Ce³⁺); oxidación de Ce³⁺ (Ce⁴⁺)", sales: "CeCl₃, Ce(SO₄)₂",
    reaccion: "Ce⁴⁺ oxidante fuerte (E° = +1.72V); usado en volumetría" },
  { id: 136, nombre: "uranio",    formula: "U",  carga: null, tipo: "cationes", subgrupo: "lantánidos",
    elemento: "uranio", estadosOxidacion: ["+4", "+6 (UO₂²⁺)"],
    origen: "UO₂ + H₂SO₄ (U⁴⁺); UO₃ + HNO₃ (UO₂²⁺)", sales: "UCl₄, UO₂(NO₃)₂",
    reaccion: "UO₂²⁺ fluorescencia verde bajo UV" },
];

// ─── ÁCIDOS ───────────────────────────────────────────────────────────────────
const ACIDOS = [
  // Sulfhídrico / sin oxígeno
  { id: 201, nombre: "ácido sulfhídrico",  formula: "H₂S",    tipo: "hidrácido", subgrupo: "azufre",
    anion: "S²⁻ (sulfuro)", ka: "Ka₁ ≈ 9×10⁻⁸ (ácido débil)",
    sales: "sulfuros — Na₂S, FeS, CuS",
    reaccion: "H₂S + Pb²⁺ → PbS↓ negro + 2H⁺ (identif. de sulfuros)" },

  { id: 202, nombre: "ácido clorhídrico", formula: "HCl",    tipo: "hidrácido", subgrupo: "halógenos",
    anion: "Cl⁻ (cloruro)", ka: "Ka >> 1 (ácido fuerte)",
    sales: "cloruros — NaCl, KCl, CaCl₂",
    reaccion: "HCl + NaOH → NaCl + H₂O; Cl⁻ + Ag⁺ → AgCl↓ blanco" },

  { id: 203, nombre: "ácido fluorhídrico", formula: "HF",    tipo: "hidrácido", subgrupo: "halógenos",
    anion: "F⁻ (fluoruro)", ka: "Ka ≈ 6.6×10⁻⁴ (ácido débil por enlace H–F fuerte)",
    sales: "fluoruros — NaF, CaF₂ (fluorita)",
    reaccion: "HF + SiO₂ → SiF₄↑ + H₂O (corroe el vidrio — único ácido que lo hace)" },

  { id: 204, nombre: "ácido yodhídrico",  formula: "HI",     tipo: "hidrácido", subgrupo: "halógenos",
    anion: "I⁻ (ioduro)", ka: "Ka >> 1 (ácido fuerte)",
    sales: "ioduros — NaI, KI",
    reaccion: "I⁻ + Ag⁺ → AgI↓ amarillo intenso (insoluble en NH₃)" },

  { id: 205, nombre: "ácido bromhídrico", formula: "HBr",    tipo: "hidrácido", subgrupo: "halógenos",
    anion: "Br⁻ (bromuro)", ka: "Ka >> 1 (ácido fuerte)",
    sales: "bromuros — NaBr, AgBr",
    reaccion: "Br⁻ + Ag⁺ → AgBr↓ amarillo pálido" },

  // Oxoácidos del cloro
  { id: 206, nombre: "ácido perclórico",  formula: "HClO₄",  tipo: "oxoácido", subgrupo: "halógenos",
    anion: "ClO₄⁻ (perclorato)", ka: "Ka >> 1 (ácido fuerte, más fuerte de los oxoácidos del Cl)",
    sales: "percloratos — KClO₄",
    reaccion: "HClO₄ es el ácido más fuerte de los oxoácidos del cloro; Cl en +7" },

  { id: 207, nombre: "ácido clórico",     formula: "HClO₃",  tipo: "oxoácido", subgrupo: "halógenos",
    anion: "ClO₃⁻ (clorato)", ka: "Ka >> 1 (ácido fuerte)",
    sales: "cloratos — KClO₃",
    reaccion: "2KClO₃ →(MnO₂, Δ) 2KCl + 3O₂↑; Cl en +5" },

  { id: 208, nombre: "ácido cloroso",     formula: "HClO₂",  tipo: "oxoácido", subgrupo: "halógenos",
    anion: "ClO₂⁻ (clorito)", ka: "Ka ≈ 1.1×10⁻² (ácido débil-moderado)",
    sales: "cloritos — NaClO₂",
    reaccion: "Cl en estado de oxidación +3; inestable, se descompone" },

  { id: 209, nombre: "ácido hipocloroso", formula: "HClO",   tipo: "oxoácido", subgrupo: "halógenos",
    anion: "ClO⁻ (hipoclorito)", ka: "Ka ≈ 3×10⁻⁸ (ácido muy débil)",
    sales: "hipocloritos — NaClO (lavandina)",
    reaccion: "Cl₂ + H₂O ⇌ HClO + HCl; Cl en +1" },

  // Oxoácidos del azufre
  { id: 210, nombre: "ácido sulfúrico",   formula: "H₂SO₄",  tipo: "oxoácido", subgrupo: "azufre",
    anion: "SO₄²⁻ (sulfato) / HSO₄⁻ (sulfato ácido)", ka: "Ka₁ >> 1; Ka₂ = 0.012 (diácido)",
    sales: "sulfatos — Na₂SO₄, CaSO₄ (yeso), Al₂(SO₄)₃",
    reaccion: "H₂SO₄(conc) + Cu → CuSO₄ + SO₂↑ + H₂O; SO₄²⁻ + Ba²⁺ → BaSO₄↓" },

  { id: 211, nombre: "ácido sulfuroso",   formula: "H₂SO₃",  tipo: "oxoácido", subgrupo: "azufre",
    anion: "SO₃²⁻ (sulfito) / HSO₃⁻ (bisulfito)", ka: "Ka₁ ≈ 1.5×10⁻² (ácido débil-moderado)",
    sales: "sulfitos — Na₂SO₃, NaHSO₃",
    reaccion: "SO₂ + H₂O ⇌ H₂SO₃; se descompone fácilmente liberando SO₂↑" },

  // Oxoácidos del nitrógeno
  { id: 212, nombre: "ácido nítrico",     formula: "HNO₃",   tipo: "oxoácido", subgrupo: "nitrógeno",
    anion: "NO₃⁻ (nitrato)", ka: "Ka >> 1 (ácido fuerte)",
    sales: "nitratos — KNO₃ (salitre), NaNO₃, Cu(NO₃)₂",
    reaccion: "3Cu + 8HNO₃(dil) → 3Cu(NO₃)₂ + 2NO↑ + 4H₂O" },

  { id: 213, nombre: "ácido nitroso",     formula: "HNO₂",   tipo: "oxoácido", subgrupo: "nitrógeno",
    anion: "NO₂⁻ (nitrito)", ka: "Ka ≈ 4.5×10⁻⁴ (ácido débil)",
    sales: "nitritos — NaNO₂, KNO₂",
    reaccion: "3HNO₂ → HNO₃ + 2NO↑ + H₂O (dismutación en caliente)" },

  // Oxoácidos del fósforo
  { id: 214, nombre: "ácido fosforoso",   formula: "H₃PO₃",  tipo: "oxoácido", subgrupo: "fósforo",
    anion: "HPO₃²⁻ — solo 2 H ionizables (diácido, no triácido)", ka: "Ka₁ ≈ 1×10⁻² ",
    sales: "fosfonatos — Na₂HPO₃",
    reaccion: "H₃PO₃ es reductor; se oxida a H₃PO₄ en presencia de oxidantes" },

  { id: 215, nombre: "ácido fosfórico",   formula: "H₃PO₄",  tipo: "oxoácido", subgrupo: "fósforo",
    anion: "PO₄³⁻ / HPO₄²⁻ / H₂PO₄⁻ (triácido)", ka: "Ka₁=7.5×10⁻³; Ka₂=6.2×10⁻⁸; Ka₃=4.8×10⁻¹³",
    sales: "fosfatos — Ca₃(PO₄)₂, Na₃PO₄, NaH₂PO₄",
    reaccion: "PO₄³⁻ + 3Ag⁺ → Ag₃PO₄↓ amarillo; sistema buffer fisiológico H₂PO₄⁻/HPO₄²⁻" },
];

// ─── Índice global (todos los iones) ─────────────────────────────────────────
const TODOS = [...ANIONES, ...CATIONES, ...ACIDOS];

// Grupos disponibles — organizados por sección
const GRUPOS = {
  // Aniones
  all:              ANIONES,
  poliatómicos:     ANIONES.filter(a => a.tipo === "poliatómicos"),
  monoatómicos:     ANIONES.filter(a => a.tipo === "monoatómicos"),
  oxo:              ANIONES.filter(a => a.formula.includes("O") && a.tipo === "poliatómicos"),
  halógenos:        ANIONES.filter(a => a.subgrupo === "halógenos"),
  // Cationes — todos y por subgrupo
  cationes:         CATIONES,
  'cat-poliatómicos': CATIONES.filter(c => c.subgrupo === "poliatómicos"),
  'cat-alcalinos':    CATIONES.filter(c => c.subgrupo === "alcalinos"),
  'cat-alcalinotérreos': CATIONES.filter(c => c.subgrupo === "alcalinotérreos"),
  'cat-transición':   CATIONES.filter(c => c.subgrupo === "transición"),
  'cat-principales':  CATIONES.filter(c => c.subgrupo === "principales"),
  'cat-lantánidos':   CATIONES.filter(c => c.subgrupo === "lantánidos"),
  // Ácidos
  acidos:           ACIDOS,
  hidrácidos:       ACIDOS.filter(a => a.tipo === "hidrácido"),
  oxoácidos:        ACIDOS.filter(a => a.tipo === "oxoácido"),
  // Mixtos
  todo:             TODOS,
};
