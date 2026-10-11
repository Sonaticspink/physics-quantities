import { useMemo, useState } from "react";
import { QUANTITIES, CATEGORIES, symbolIndex, byId } from "../data/quantities.js";
import Sym from "./Sym.jsx";

const UNIT_CONFLICTS = [
  { unit: "J", names: "Work · Energy · Heat", note: "หน่วยเดียวกัน แต่ความหมายต่างกัน — Heat คือพลังงานที่ถ่ายเทเพราะอุณหภูมิต่างกัน" },
  { unit: "N·m", names: "Moment of a force · Torque", note: "มิติเท่างานแต่ไม่เรียกว่าจูล เพราะเป็นการหมุน" },
  { unit: "Pa", names: "Stress · Pressure · Modulus of elasticity", note: "แรงต่อพื้นที่ทั้งหมด (N/m²)" },
];

export default function Material({ onStartQuiz }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState({});

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return QUANTITIES.filter(
      (x) =>
        (cat === "all" || x.cat === cat) &&
        (!s ||
          [x.en, x.th, x.meaning, x.symbols.join(" "), x.unit, x.unitRaw, x.dimMLT, x.dimFLT]
            .join(" ")
            .toLowerCase()
            .includes(s))
    );
  }, [q, cat]);

  const collisions = useMemo(
    () =>
      Object.entries(symbolIndex)
        .filter(([, ids]) => ids.length > 1)
        .sort((a, b) => b[1].length - a[1].length),
    []
  );

  const blurred = (id, field) => hide && !show[id + field];
  const toggle = (id, field) => setShow((r) => ({ ...r, [id + field]: !r[id + field] }));

  return (
    <>
      <h1>เนื้อหา — ปริมาณทางฟิสิกส์ 32 ปริมาณ</h1>
      <p className="lead">
        ความหมาย · สัญลักษณ์ · หน่วย SI · มิติ (MLTΘ และ FLT) พร้อมโหมดซ่อนคำตอบสำหรับท่องจำ
      </p>

      <div className="card">
        <div className="row">
          <input
            type="search"
            placeholder="ค้นหา: ชื่อ / ความหมาย / สัญลักษณ์ / หน่วย เช่น Pa, มุม, m/s²"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className={hide ? "chip on" : "chip"} onClick={() => setHide((h) => !h)}>
            {hide ? "ซ่อนคำตอบ: เปิด" : "ซ่อนคำตอบ: ปิด"}
          </button>
          <button className="chip" onClick={() => setShow({})}>
            ซ่อนทั้งหมดอีกครั้ง
          </button>
        </div>
        <div className="row" style={{ marginTop: 10 }}>
          <button className={cat === "all" ? "chip on" : "chip"} onClick={() => setCat("all")}>
            ทั้งหมด ({QUANTITIES.length})
          </button>
          {Object.entries(CATEGORIES).map(([k, label]) => (
            <button key={k} className={cat === k ? "chip on" : "chip"} onClick={() => setCat(k)}>
              {label} ({QUANTITIES.filter((x) => x.cat === k).length})
            </button>
          ))}
        </div>
        {hide && <p className="small muted" style={{ marginTop: 10 }}>โหมดซ่อน: แตะที่ช่องที่เบลอเพื่อเฉลยทีละช่อง</p>}
      </div>

      <div className="card">
        <table className="mtable">
          <thead>
            <tr>
              <th>ปริมาณ</th>
              <th>ความหมาย</th>
              <th>สัญลักษณ์</th>
              <th>หน่วย SI</th>
              <th>มิติ (MLTΘ)</th>
              <th className="desk-only">มิติ (FLT)</th>
            </tr>
          </thead>
          <tbody>
            {list.map((x) => (
              <tr key={x.id}>
                <td>
                  <span className="en">{x.en}</span>
                  <div className="thname">{x.th}</div>
                </td>
                <td style={{ maxWidth: 300 }}>{x.meaning}</td>
                <td className="num">
                  <span
                    className={blurred(x.id, "sym") ? "blurred" : ""}
                    onClick={() => toggle(x.id, "sym")}
                    title={hide ? "แตะเพื่อเฉลย" : ""}
                  >
                    <Sym s={x.symbols.join(", ")} />
                  </span>
                </td>
                <td className="num">
                  <span className={blurred(x.id, "unit") ? "blurred unit" : "unit"} onClick={() => toggle(x.id, "unit")}>
                    {x.unit}
                  </span>
                  <div className="thname">{x.unitRaw} · {x.unit}</div>
                </td>
                <td className="num">
                  <span className={blurred(x.id, "dim") ? "blurred" : ""} onClick={() => toggle(x.id, "dim")}>
                    <Sym s={x.dimMLT} />
                  </span>
                </td>
                <td className="num desk-only">
                  <Sym s={x.dimFLT} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="muted">ไม่พบปริมาณที่ตรงกับคำค้น</p>}

        <div className="cards-mobile">
          {list.map((x) => (
            <div className="mcard" key={x.id}>
              <div className="en">{x.en}</div>
              <div className="thname" style={{ marginBottom: 6 }}>{x.th}</div>
              <div>{x.meaning}</div>
              <div className="k2" style={{ marginTop: 8 }}>สัญลักษณ์ · หน่วย · มิติ</div>
              <div
                className={blurred(x.id, "sym") || blurred(x.id, "unit") || blurred(x.id, "dim") ? "blurred" : ""}
                onClick={() => {
                  toggle(x.id, "sym");
                  toggle(x.id, "unit");
                  toggle(x.id, "dim");
                }}
              >
                <Sym s={x.symbols.join(", ")} /> · <span className="unit">{x.unit}</span> · <Sym s={x.dimMLT} /> (FLT: <Sym s={x.dimFLT} />)
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>สัญลักษณ์ที่ใช้ซ้ำ — จุดที่ต้องแยกให้ออก</h2>
      <div className="card">
        <div className="tags" style={{ gap: 10 }}>
          {collisions.map(([s, ids]) => (
            <span className="tag" key={s} style={{ whiteSpace: "normal", display: "inline-block" }}>
              <Sym s={s} /> = {ids.map((id) => `${byId(id).en} (${byId(id).unit})`).join(" · ")}
            </span>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 12 }}>
          นอกจากนี้ยังมีคู่ที่หน้าตาใกล้กันแต่ไม่ซ้ำกันเป๊ะ: v (ความเร็ว) · ν (ความถี่/ความหนืดจลน์) · V (ปริมาตร) และ m (มวล) · M (โมเมนต์ของแรง) · μ (ความหนืดไดนามิก)
        </p>
        {onStartQuiz && (
          <button className="btn primary" style={{ marginTop: 12 }} onClick={() => onStartQuiz("confusion")}>
            ไปฝึก “จุดที่มักสับสน” →
          </button>
        )}
      </div>

      <h2>หน่วยที่ซ้ำกันแต่คนละความหมาย</h2>
      <div className="card">
        {UNIT_CONFLICTS.map((u) => (
          <p key={u.unit} style={{ marginBottom: 10 }}>
            <b className="unit">{u.unit}</b> — {u.names}
            <br />
            <span className="small muted">{u.note}</span>
          </p>
        ))}
        <p className="warnbox">
          Strain (ความเครียด) ไม่มีหน่วย เพราะเป็นอัตราส่วนความยาวต่อความยาว · ส่วน Work/Heat/Energy หน่วยเป็น J ทั้งหมด และ Stress/Pressure/Modulus of elasticity หน่วยเป็น Pa ทั้งหมด
        </p>
      </div>
    </>
  );
}
