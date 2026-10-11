import { useEffect, useState } from "react";
import { loadState, saveState } from "./lib/store.js";
import Material from "./components/Material.jsx";
import Quiz from "./components/Quiz.jsx";
import Progress from "./components/Progress.jsx";
import About from "./components/About.jsx";
import { QUANTITIES } from "./data/quantities.js";

const TABS = [
  ["material", "เนื้อหา"],
  ["quiz", "ควิซ"],
  ["progress", "ความก้าวหน้า"],
  ["about", "เกี่ยวกับ"],
];

export default function App() {
  const [tab, setTab] = useState("material");
  const [progress, setProgress] = useState(() => loadState());
  const [quizRun, setQuizRun] = useState({ mode: null, keys: null, k: 0 });

  useEffect(() => {
    saveState(progress);
  }, [progress]);

  const openQuiz = (mode, keys = null) => {
    setQuizRun({ mode: mode || null, keys, k: Date.now() });
    setTab("quiz");
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <header className="top">
        <div className="top-inner">
          <div className="brand">
            ปริมาณทางฟิสิกส์
            <small>
              {QUANTITIES.length} ปริมาณ · ความหมาย · สัญลักษณ์ · หน่วย SI · มิติ
            </small>
          </div>
          <nav className="tabs">
            {TABS.map(([id, label]) => (
              <button key={id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="wrap">
        {tab === "material" && <Material onStartQuiz={(mode) => openQuiz(mode)} />}
        {tab === "quiz" && (
          <Quiz
            key={quizRun.k}
            progress={progress}
            setProgress={setProgress}
            initialMode={quizRun.mode}
            initialKeys={quizRun.keys}
          />
        )}
        {tab === "progress" && (
          <Progress
            progress={progress}
            setProgress={setProgress}
            onPractice={(keys) => openQuiz("mixed", keys?.length ? keys : null)}
          />
        )}
        {tab === "about" && <About />}

        <footer className="foot">
          เนื้อหาดัดแปลงจากไฟล์ส่งออกการสนทนา · เพิ่มคอลัมน์มิติ (MLTΘ / FLT) และแบบทดสอบขึ้นใหม่ · เก็บความก้าวหน้าไว้ในเบราว์เซอร์เท่านั้น
        </footer>
      </main>
    </>
  );
}
