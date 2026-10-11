// ตรวจความถูกต้องของควิซที่สร้างอัตโนมัติ: node scripts/check-quiz.mjs
import { QUANTITIES, byId, colliding } from "../src/data/quantities.js";
import { MODES, buildPool, buildSession, countPool, materialize } from "../src/lib/quiz.js";

let problems = 0;
const bad = (msg) => {
  problems++;
  console.log("  ✗", msg);
};

console.log(`ข้อมูล: ${QUANTITIES.length} ปริมาณ`);
for (const m of MODES) console.log(`  โหมด ${m.id.padEnd(10)} pool = ${countPool(m.id)} ข้อ`);

// 1) ทุกคำถามต้องมี 4 ตัวเลือก ไม่ซ้ำ และ index เฉลยชี้ไปที่คำตอบจริง
let made = 0;
for (const mode of MODES.map((m) => m.id)) {
  for (const spec of buildPool(mode)) {
    for (let t = 0; t < 12; t++) {
      const q = materialize(spec, Math.random);
      made++;
      if (!q) bad(`materialize คืน null: ${spec.kind}|${spec.qid}`);
      if (!q) continue;
      if (q.choices.length !== 4) bad(`${q.key}: มี ${q.choices.length} ตัวเลือก`);
      if (new Set(q.choices).size !== 4) bad(`${q.key}: ตัวเลือกซ้ำ — ${JSON.stringify(q.choices)}`);
      if (q.answer < 0 || q.answer > 3) bad(`${q.key}: answer=${q.answer}`);
      if (!q.prompt) bad(`${q.key}: ไม่มีคำถาม`);
      if (!q.explain) bad(`${q.key}: ไม่มีคำอธิบายเฉลย`);
      // เฉลยต้องตรงกับปริมาณต้นทาง
      if (spec.kind === "symbol" && q.choices[q.answer] !== byId(spec.qid).symbols.join(", "))
        bad(`${q.key}: เฉลยไม่ตรงกับสัญลักษณ์ของ ${spec.qid}`);
      if (spec.kind === "unit" && q.choices[q.answer] !== byId(spec.qid).unit)
        bad(`${q.key}: เฉลยไม่ตรงกับหน่วยของ ${spec.qid}`);
      if (spec.kind === "dim" && q.choices[q.answer] !== byId(spec.qid).dimMLT)
        bad(`${q.key}: เฉลยไม่ตรงกับมิติของ ${spec.qid}`);
      if (spec.kind === "meaning" && q.choices[q.answer] !== byId(spec.qid).en)
        bad(`${q.key}: เฉลยไม่ตรงกับชื่อของ ${spec.qid}`);
    }
  }
}
console.log(`\nตรวจคำถามที่สร้างทั้งหมด ${made} ชุด`);

// 2) โหมด "ชื่อปริมาณ → มิติ": ตัวหลอกต้องไม่ใช่มิติเดียวกัน (ไม่งั้นมีคำตอบถูกหลายข้อ)
{
  const specs = buildPool("dim");
  let ambiguous = 0;
  for (const s of specs) {
    const q = byId(s.qid);
    for (let t = 0; t < 30; t++) {
      const m = materialize(s, Math.random);
      const same = m.choices.filter((c) => c === q.dimMLT).length;
      if (same > 1) ambiguous++;
    }
  }
  console.log(`โหมดมิติ: พบตัวเลือกที่มิติซ้ำกับเฉลย ${ambiguous} ครั้ง (ต้องเป็น 0)`);
  if (ambiguous) problems++;
}

// 3) ตัวเลือกหลอกของโหมดสัญลักษณ์ ต้องเป็นสัญลักษณ์จริงของปริมาณอื่น (ไม่ใช่ของมั่ว)
{
  const symSets = new Set(QUANTITIES.map((q) => q.symbols.join(", ")));
  const allUnits = new Set(QUANTITIES.map((q) => q.unit));
  const allDims = new Set(QUANTITIES.map((q) => q.dimMLT));
  const allNames = new Set(QUANTITIES.map((q) => q.en));
  let notReal = 0;
  let distractorTotal = 0;
  let fromCollision = 0;
  for (const spec of buildPool("mixed")) {
    const m = materialize(spec, Math.random);
    const pool =
      spec.kind === "symbol" ? symSets : spec.kind === "unit" ? allUnits : spec.kind === "dim" ? allDims : spec.kind === "meaning" ? allNames : null;
    if (!pool) continue;
    m.choices.forEach((c, idx) => {
      if (!pool.has(c)) notReal++;
      if (idx !== m.answer) {
        distractorTotal++;
        const src = QUANTITIES.find((q) => (spec.kind === "symbol" ? q.symbols.join(", ") : spec.kind === "unit" ? q.unit : spec.kind === "dim" ? q.dimMLT : q.en) === c);
        if (src && (spec.qid === undefined || colliding(byId(spec.qid)).includes(src.id) || src.cat === byId(spec.qid).cat)) fromCollision++;
      }
    });
  }
  console.log(`ตัวเลือกหลอกที่ไม่ใช่ข้อมูลจริงในไฟล์: ${notReal} (ต้องเป็น 0)`);
  console.log(
    `ตัวหลอกจากกลุ่มที่เกี่ยวข้อง (สัญลักษณ์ซ้ำ/หมวดเดียวกัน): ${fromCollision}/${distractorTotal} = ${Math.round((fromCollision / distractorTotal) * 100)}%`
  );
  if (notReal) problems++;
}

// 4) ตัวหลอกของโหมดสัญลักษณ์ ดึงจากกลุ่มสับสนได้จริง (สุ่ม 8 ข้อมาดู)
console.log("\nตัวอย่างตัวเลือกหลอกของโหมดสัญลักษณ์:");
for (const id of ["velocity", "temperature", "pressure", "work", "stress", "specific_weight", "frequency", "strain"]) {
  const m = materialize({ kind: "symbol", qid: id });
  const m2 = materialize({ kind: "unit", qid: id });
  console.log(`  ${byId(id).en.padEnd(20)} สัญลักษณ์: ${m.choices.join(" | ")}   หน่วย: ${m2.choices.join(" | ")}`);
}

// 5) buildSession: ความยาวถูกต้อง และโหมดผสมมีQUESTION ครบทุก kind
{
  const s = buildSession({ mode: "mixed", length: 20 });
  const kinds = new Set(s.map((q) => q.kind));
  console.log(`\nbuildSession(mixed,20) → ${s.length} ข้อ, kind: ${[...kinds].join(", ")}`);
  if (s.length !== 20) bad("buildSession ให้จำนวนข้อไม่ตรง");
  const retry = buildSession({ mode: "mixed", length: 99, onlyKeys: s.slice(0, 3).map((q) => q.key) });
  if (retry.length !== 3) bad("โหมดทำข้อที่ผิดซ้ำ ให้จำนวนข้อไม่ตรง");
  else console.log(`ทำข้อที่ผิดซ้ำ → ${retry.length} ข้อ: ${retry.map((q) => q.key).join(", ")}`);
}

console.log(problems ? `\nFAILED: ${problems} ปัญหา` : "\nผ่านทั้งหมด ✓");
process.exit(problems ? 1 : 0);
