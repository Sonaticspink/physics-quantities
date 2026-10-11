import { QUANTITIES, CATEGORIES, byId, colliding } from "../data/quantities.js";
import { CONFUSION_QUESTIONS } from "../data/confusions.js";

/* ---------- helpers ---------- */
export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const symText = (q) => q.symbols.join(", ");

// สัญลักษณ์ที่หน้าตาใกล้กัน — ใช้สร้างตัวเลือกหลอกให้ "ต้องแยกให้ออก" จริง ๆ
const LOOKALIKE = [
  ["v⃗", "v", "ν", "V", "u"],
  ["m", "M", "μ"],
  ["T", "t", "τ", "Θ", "θ"],
  ["p", "P", "ρ"],
  ["a", "α", "A"],
  ["I", "l", "x"],
  ["E", "Y", "ε", "e"],
  ["γ", "σ", "s", "y"],
  ["ω", "W", "w"],
  ["θ", "φ", "Θ"],
  ["f", "ν", "F"],
  ["c", "Q", "C"],
  ["U", "u", "V"],
];
const lookGroup = (() => {
  const m = new Map();
  LOOKALIKE.forEach((g, i) => g.forEach((s) => m.set(s, i)));
  return m;
})();
const sharesLookalike = (a, b) => {
  const ga = new Set(a.symbols.map((s) => lookGroup.get(s)).filter((x) => x !== undefined));
  return b.symbols.some((s) => ga.has(lookGroup.get(s)));
};

/* ---------- question sources ---------- */
export const MODES = [
  { id: "mixed", label: "ผสมทุกแบบ", desc: "สุ่มจากทุกหมวด — ครอบคลุมที่สุด" },
  { id: "meaning", label: "ความหมายไทย → ชื่อปริมาณ", desc: "อ่านนิยามภาษาไทย แล้วเลือกชื่อปริมาณภาษาอังกฤษ" },
  { id: "symbol", label: "ชื่อปริมาณ → สัญลักษณ์", desc: "ตัวหลอกเป็นสัญลักษณ์ที่ใช้ซ้ำ/หน้าตาใกล้กัน" },
  { id: "unit", label: "ชื่อปริมาณ → หน่วย SI", desc: "ตัวหลอกเป็นหน่วยกลุ่มเดียวกัน เช่น J, Pa, N·m" },
  { id: "dim", label: "ชื่อปริมาณ → มิติ", desc: "มิติ MLTΘ (ข้อมูลที่เพิ่มจากไฟล์ต้นฉบับ)" },
  { id: "confusion", label: "จุดที่มักสับสน", desc: "ชุดคำถามจากหัวข้อท้ายไฟล์ต้นฉบับ + สัญลักษณ์ที่ซ้ำกัน" },
];
const KINDS = { meaning: QUANTITIES, symbol: QUANTITIES, unit: QUANTITIES, dim: QUANTITIES };

export function buildPool(mode) {
  if (mode === "confusion") return CONFUSION_QUESTIONS.map((c) => ({ kind: "confusion", qid: c.id }));
  const kinds = mode === "mixed" ? ["meaning", "symbol", "unit", "dim", "confusion"] : [mode];
  const specs = [];
  for (const kind of kinds) {
    if (kind === "confusion") CONFUSION_QUESTIONS.forEach((c) => specs.push({ kind, qid: c.id }));
    else KINDS[kind].forEach((q) => specs.push({ kind, qid: q.id }));
  }
  return specs;
}

/* ---------- distractor selection ---------- */
function pickDistractors(correct, n, rng, { sameKey = () => false, prefer = () => 0, text = symText, avoid = () => false } = {}) {
  const correctText = text(correct);
  const scored = QUANTITIES.filter((q) => q.id !== correct.id && !avoid(q) && text(q) !== correctText).map((q) => ({
    q,
    score: (sameKey(q) ? 3 : 0) + prefer(q) + rng() * 2,
  }));
  scored.sort((a, b) => b.score - a.score);
  const out = [];
  const used = new Set([correctText]);
  for (const { q } of scored) {
    const t = text(q);
    if (used.has(t)) continue;
    used.add(t);
    out.push(q);
    if (out.length === n) break;
  }
  return out;
}

const sameCat = (a) => (q) => q.cat === a.cat;
const sharesUnit = (a) => (q) => q.unit === a.unit;
const sharesSymbol = (a) => (q) => q.symbols.some((s) => a.symbols.includes(s));

export function explainQuantity(q) {
  const lines = [`${q.en} = ${q.meaning} · สัญลักษณ์ ${symText(q)} · หน่วย ${q.unit}`, `มิติ MLTΘ: ${q.dimMLT} | FLT: ${q.dimFLT}`];
  const others = colliding(q);
  if (others.length) {
    lines.push(
      "ระวังสับสน: " + others.map((id) => `${byId(id).symbols.join("/")} = ${byId(id).en} (${byId(id).unit})`).join(" · ")
    );
  }
  const sameUnit = QUANTITIES.filter((q2) => q2.id !== q.id && q2.unit === q.unit).map((q2) => q2.en);
  if (sameUnit.length) lines.push(`หน่วยเดียวกันกับ: ${sameUnit.join(", ")} (${q.unit})`);
  return lines.join("\n");
}

/* ---------- materialize a spec into a concrete question ---------- */
export function materialize(spec, rng = Math.random) {
  if (spec.kind === "confusion") {
    const c = CONFUSION_QUESTIONS.find((x) => x.id === spec.qid);
    return {
      key: `confusion|${c.id}`,
      kind: "confusion",
      topicIds: c.topics,
      prompt: c.prompt,
      hint: c.hint,
      choices: c.choices.map((x) => x.label),
      answer: c.answer,
      explain: c.explain,
    };
  }

  const q = byId(spec.qid);
  if (!q) return null;
  const base = {
    key: `${spec.kind}|${q.id}`,
    kind: spec.kind,
    topicIds: [q.id],
    prompt: "",
    hint: "",
    explain: explainQuantity(q),
  };

  if (spec.kind === "meaning") {
    const ds = pickDistractors(q, 3, rng, { sameKey: sameCat(q), prefer: (x) => (sharesUnit(q)(x) ? 2 : 0) + (sharesSymbol(q)(x) ? 2 : 0), text: (x) => x.en });
    const choices = shuffle([q.en, ...ds.map((x) => x.en)], rng);
    return { ...base, prompt: q.meaning, hint: "ปริมาณนี้ชื่อภาษาอังกฤษว่าอะไร", choices, answer: choices.indexOf(q.en) };
  }
  if (spec.kind === "symbol") {
    const ds = pickDistractors(q, 3, rng, { sameKey: (x) => colliding(q).includes(x.id) || x.cat === q.cat, prefer: (x) => (sharesLookalike(q, x) ? 4 : 0) + (sharesSymbol(q)(x) ? 3 : 0), text: symText });
    const options = [symText(q), ...ds.map(symText)];
    const shuffled = shuffle(options, rng);
    return { ...base, prompt: q.en, hint: `สัญลักษณ์ที่ใช้บ่อยของ ${q.th}`, choices: shuffled, answer: shuffled.indexOf(symText(q)) };
  }
  if (spec.kind === "unit") {
    const ds = pickDistractors(q, 3, rng, { sameKey: sharesUnit(q), prefer: (x) => (sharesSymbol(q)(x) ? 1 : 0), text: (x) => x.unit });
    const options = [q.unit, ...ds.map((x) => x.unit)];
    const shuffled = shuffle(options, rng);
    return { ...base, prompt: q.en, hint: `หน่วย SI ของ ${q.th}`, choices: shuffled, answer: shuffled.indexOf(q.unit) };
  }
  if (spec.kind === "dim") {
    const ds = pickDistractors(q, 3, rng, {
      sameKey: (x) => x.dimMLT === q.dimMLT,
      prefer: (x) => (sharesUnit(q)(x) ? 3 : 0),
      text: (x) => x.dimMLT,
      avoid: (x) => x.dimMLT === q.dimMLT,
    });
    const options = [q.dimMLT, ...ds.map((x) => x.dimMLT)];
    const shuffled = shuffle(options, rng);
    return { ...base, prompt: q.en, hint: `มิติแบบ MLTΘ ของ ${q.th}`, choices: shuffled, answer: shuffled.indexOf(q.dimMLT) };
  }
  return null;
}

export function buildSession({ mode = "mixed", length = 10, onlyKeys = null, rng = Math.random } = {}) {
  let specs = buildPool(mode);
  if (onlyKeys) specs = specs.filter((s) => onlyKeys.includes(`${s.kind}|${s.qid}`));
  specs = shuffle(specs, rng).slice(0, Math.min(length, specs.length));
  return specs.map((s) => materialize(s, rng)).filter(Boolean);
}

export const countPool = (mode) => buildPool(mode).length;
