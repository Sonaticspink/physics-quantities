import { useEffect, useState } from "react";
import { MODES, buildSession, countPool } from "../lib/quiz.js";
import { recordAnswer, finishSession } from "../lib/store.js";
import Sym from "./Sym.jsx";

const LENGTHS = [
  { n: 10, label: "10 ข้อ" },
  { n: 20, label: "20 ข้อ" },
  { n: 999, label: "ทั้งหมด" },
];
const KEYS = ["A", "B", "C", "D", "E"];

export default function Quiz({ progress, setProgress, initialMode, initialKeys }) {
  const [mode, setMode] = useState(initialMode || "mixed");
  const [length, setLength] = useState(10);
  const [session, setSession] = useState(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [okList, setOkList] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode]);

  // เปิดมาจากปุ่ม "ฝึกข้อที่เคยตอบผิด" หรือ "จุดที่มักสับสน" → เริ่มชุดให้เลย
  useEffect(() => {
    if (initialKeys && initialKeys.length) start("mixed", initialKeys.length, initialKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = (m = mode, l = length, onlyKeys = null) => {
    const s = buildSession({ mode: m, length: l, onlyKeys });
    if (!s.length) return;
    setSession(s);
    setI(0);
    setPicked(null);
    setOkList([]);
    setDone(false);
  };

  const q = session && !done ? session[i] : null;

  const answer = (k) => {
    if (picked !== null || !q) return;
    const ok = k === q.answer;
    setPicked(k);
    setOkList((r) => [...r, ok]);
    setProgress((p) => recordAnswer(p, q.topicIds, ok, q.key));
  };

  const next = () => {
    if (picked === null) return;
    if (i + 1 < session.length) {
      setI(i + 1);
      setPicked(null);
    } else {
      setProgress((p) => finishSession(p));
      setDone(true);
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (!session || done) return;
      if (e.key === "Enter" || e.key === " ") {
        if (picked !== null) {
          e.preventDefault();
          next();
        }
        return;
      }
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= (q?.choices.length || 0)) answer(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* ---------- setup ---------- */
  if (!session) {
    return (
      <>
        <h1>ควิซ — เลือกตอบ 4 ตัวเลือก</h1>
        <p className="lead">
          คำถามสร้างจากข้อมูลเดียวกับหน้าเนื้อหา (จึงไม่มีทางออกนอกเนื้อหา) · ตัวเลือกหลอกดึงจากกลุ่มสัญลักษณ์/หน่วยที่ซ้ำกัน
        </p>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>เลือกโหมด</h3>
          <div className="modes">
            {MODES.map((m) => (
              <button key={m.id} className={mode === m.id ? "mode on" : "mode"} onClick={() => setMode(m.id)}>
                <b>{m.label}</b>
                <span>{m.desc}</span>
                <span className="small"> · {countPool(m.id)} ข้อ</span>
              </button>
            ))}
          </div>
          <h3>จำนวนข้อ</h3>
          <div className="row">
            {LENGTHS.map((l) => (
              <button key={l.n} className={length === l.n ? "chip on" : "chip"} onClick={() => setLength(l.n)}>
                {l.label}
              </button>
            ))}
          </div>
          <div className="row" style={{ marginTop: 16 }}>
            <button className="btn primary" onClick={() => start()}>
              เริ่มควิซ
            </button>
            <span className="small muted">กด 1-4 เพื่อเลือกคำตอบ · Enter เพื่อไปข้อถัดไป</span>
          </div>
          {progress.wrongKeys.length > 0 && (
            <p className="small muted" style={{ marginTop: 12 }}>
              มีข้อที่เคยตอบผิดค้างอยู่ {progress.wrongKeys.length} ข้อ —{" "}
              <button className="btn ghost small" onClick={() => start(mode, progress.wrongKeys.length, progress.wrongKeys)}>
                ทำข้อที่ผิดซ้ำ
              </button>
            </p>
          )}
        </div>
      </>
    );
  }

  /* ---------- results ---------- */
  if (done) {
    const total = session.length;
    const correct = okList.filter(Boolean).length;
    const pct = Math.round((correct / total) * 100);
    return (
      <>
        <h1>สรุปผล</h1>
        <div className="card">
          <div className="qbox">
            ตอบถูก {correct} / {total} ({pct}%)
          </div>
          <p className="muted small">
            {pct >= 80 ? "ผ่านเกณฑ์ — พร้อมสอบแล้ว" : pct >= 60 ? "เกือบแล้ว ทบทวนข้อที่ผิดอีกรอบ" : "ยัง shaky — กลับไปอ่านหน้าเนื้อหา แล้วทำใหม่"}
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <button className="btn primary" onClick={() => start(mode, length)}>
              เริ่มชุดใหม่
            </button>
            <button className="btn" onClick={() => setSession(null)}>
              เปลี่ยนโหมด
            </button>
          </div>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>ทบทวนทีละข้อ</h3>
          {session.map((s, idx) => {
            const ok = okList[idx];
            const mono = s.kind === "symbol" || s.kind === "dim";
            return (
              <div key={s.key + idx} style={{ borderTop: idx ? "1px solid var(--line)" : 0, paddingTop: idx ? 12 : 0, marginTop: idx ? 12 : 0 }}>
                <div className="small muted">
                  ข้อ {idx + 1} · {ok ? "✓ ถูก" : "✗ ผิด"}
                </div>
                <div style={{ fontWeight: 600 }}>{s.prompt}</div>
                <div className="small">
                  เฉลย: {mono ? <Sym s={s.choices[s.answer]} /> : s.choices[s.answer]}
                </div>
                <div className="small muted" style={{ whiteSpace: "pre-line" }}>{s.explain}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  /* ---------- play ---------- */
  const mono = q.kind === "symbol" || q.kind === "dim";
  const correctSoFar = okList.filter(Boolean).length;
  return (
    <>
      <div className="card">
        <div className="meta">
          <span>
            ข้อ {i + 1} / {session.length} · ตอบถูก {correctSoFar}
          </span>
          <span>
            <button className="btn ghost small" onClick={() => setSession(null)}>
              ออก
            </button>
          </span>
        </div>
        <div className="progress">
          <i style={{ width: `${((i + (picked !== null ? 1 : 0)) / session.length) * 100}%` }} />
        </div>

        <div className="qbox" style={{ marginTop: 16 }}>
          {mono ? <Sym s={q.prompt} /> : q.prompt}
        </div>
        <div className="qhint">{q.hint}</div>

        {q.choices.map((c, idx) => {
          const state =
            picked === null ? "" : idx === q.answer ? " good" : idx === picked ? " bad" : "";
          return (
            <button
              key={idx}
              className={"opt" + state}
              disabled={picked !== null}
              onClick={() => answer(idx)}
            >
              <span className="k">{KEYS[idx]}</span>
              <span>{mono ? <Sym s={c} /> : c}</span>
            </button>
          );
        })}

        {picked !== null && (
          <>
            <div className={"feedback " + (picked === q.answer ? "good" : "bad")}>
              {picked === q.answer ? "ถูกต้อง ✓" : "ยังไม่ถูก — เฉลย: "}
              {picked === q.answer ? "" : mono ? <Sym s={q.choices[q.answer]} /> : q.choices[q.answer]}
              {"\n"}
              {q.explain}
            </div>
            <button className="btn primary" onClick={next}>
              {i + 1 < session.length ? "ข้อถัดไป →" : "ดูสรุปผล"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
