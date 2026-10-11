import { QUANTITIES, CATEGORIES, byId } from "../data/quantities.js";
import { accuracy, needsReview, resetState } from "../lib/store.js";
import Sym from "./Sym.jsx";

export default function Progress({ progress, setProgress, onPractice }) {
  const acc = progress.answered ? Math.round((progress.correct / progress.answered) * 100) : 0;
  const review = needsReview(progress.topics);
  const rows = QUANTITIES.map((q) => ({ q, t: progress.topics[q.id] || { n: 0, ok: 0 }, a: accuracy(progress.topics[q.id]) })).sort(
    (x, y) => (x.a === null ? 101 : x.a) - (y.a === null ? 101 : y.a)
  );

  return (
    <>
      <h1>ความก้าวหน้า</h1>
      <p className="lead">บันทึกไว้ในเบราว์เซอร์เครื่องนี้เท่านั้น (localStorage) — ไม่มีเซิร์ฟเวอร์ ไม่มีบัญชี</p>

      <div className="card">
        <div className="row" style={{ gap: 26 }}>
          <div>
            <div className="small muted">ตอบแล้วทั้งหมด</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{progress.answered} ข้อ</div>
          </div>
          <div>
            <div className="small muted">ตอบถูก</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{progress.correct} ข้อ</div>
          </div>
          <div>
            <div className="small muted">ความแม่น</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{acc}%</div>
          </div>
          <div>
            <div className="small muted">จำนวนรอบที่เล่น</div>
            <div style={{ fontSize: 26, fontWeight: 700 }}>{progress.sessions}</div>
          </div>
        </div>
        <div className="progress" style={{ marginTop: 14 }}>
          <i style={{ width: `${acc}%` }} />
        </div>
        {progress.lastAt && <p className="small muted" style={{ marginTop: 8 }}>รอบล่าสุด: {new Date(progress.lastAt).toLocaleString("th-TH")}</p>}
      </div>

      {review.length > 0 && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>ควรทบทวนก่อนสอบ ({review.length} ปริมาณ)</h3>
          <div className="tags" style={{ gap: 8 }}>
            {review.map((id) => {
              const q = byId(id) || { en: id, symbols: [], unit: "" };
              const t = progress.topics[id] || { n: 0, ok: 0 };
              return (
                <span className="tag bad" key={id}>
                  {q.en} · <Sym s={q.symbols.join(", ")} /> · {Math.round((t.ok / t.n) * 100)}% ({t.ok}/{t.n})
                </span>
              );
            })}
          </div>
          {onPractice && (
            <button
              className="btn primary"
              style={{ marginTop: 12 }}
              onClick={() => onPractice(progress.wrongKeys)}
            >
              ฝึกข้อที่เคยตอบผิด ({progress.wrongKeys.length} ข้อ)
            </button>
          )}
        </div>
      )}

      <h2>รายปริมาณ</h2>
      <div className="card">
        <table className="mtable">
          <thead>
            <tr>
              <th>ปริมาณ</th>
              <th>หมวด</th>
              <th>ตอบถูก / ทั้งหมด</th>
              <th>ความแม่น</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ q, t, a }) => (
              <tr key={q.id}>
                <td>
                  <span className="en">{q.en}</span>
                  <div className="thname">
                    <Sym s={q.symbols.join(", ")} /> · <span className="unit">{q.unit}</span>
                  </div>
                </td>
                <td className="small muted">{CATEGORIES[q.cat]}</td>
                <td className="num">
                  {t.ok} / {t.n}
                </td>
                <td>
                  <div className="row" style={{ gap: 8 }}>
                    <div className="bar">
                      <i className={a !== null && a < 60 ? "low" : ""} style={{ width: `${a === null ? 0 : a}%` }} />
                    </div>
                    <span className="small muted">{a === null ? "ยังไม่ตอบ" : `${a}%`}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cards-mobile">
          {rows.map(({ q, t, a }) => (
            <div className="mcard" key={q.id}>
              <div className="en">{q.en}</div>
              <div className="thname">
                <Sym s={q.symbols.join(", ")} /> · <span className="unit">{q.unit}</span> · {CATEGORIES[q.cat]}
              </div>
              <div className="row" style={{ gap: 8, marginTop: 6 }}>
                <div className="bar">
                  <i className={a !== null && a < 60 ? "low" : ""} style={{ width: `${a === null ? 0 : a}%` }} />
                </div>
                <span className="small muted">
                  {t.ok}/{t.n} {a === null ? "(ยังไม่ตอบ)" : `(${a}%)`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="row">
          <button
            className="btn"
            onClick={() => {
              if (confirm("ล้างความก้าวหน้าทั้งหมดในเครื่องนี้?")) setProgress(resetState());
            }}
          >
            ล้างความก้าวหน้า
          </button>
          <span className="small muted">ล้างแล้วเริ่มนับใหม่จาก 0</span>
        </div>
      </div>
    </>
  );
}
