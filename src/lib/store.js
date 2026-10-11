const KEY = "pq.mastery.v1";

const blank = () => ({ answered: 0, correct: 0, sessions: 0, lastAt: null, topics: {}, wrongKeys: [] });

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank();
    const s = JSON.parse(raw);
    return { ...blank(), ...s, topics: s.topics || {}, wrongKeys: s.wrongKeys || [] };
  } catch {
    return blank();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* โหมดส่วนตัว/ปิด storage — ไม่เป็นไร แค่ไม่จำความก้าวหน้า */
  }
}

export function recordAnswer(state, topicIds, correct, questionKey) {
  const topics = { ...state.topics };
  for (const id of topicIds || []) {
    const t = topics[id] || { n: 0, ok: 0 };
    topics[id] = { n: t.n + 1, ok: t.ok + (correct ? 1 : 0) };
  }
  let wrongKeys = state.wrongKeys || [];
  if (!correct && questionKey && !wrongKeys.includes(questionKey)) wrongKeys = [...wrongKeys, questionKey];
  return { ...state, answered: state.answered + 1, correct: state.correct + (correct ? 1 : 0), topics, wrongKeys };
}

export function finishSession(state) {
  return { ...state, sessions: state.sessions + 1, lastAt: new Date().toISOString() };
}

export function clearWrongKeys(state) {
  return { ...state, wrongKeys: [] };
}

export const resetState = () => blank();

export const accuracy = (t) => (t && t.n ? Math.round((t.ok / t.n) * 100) : null);

// ปริมาณที่ควรทบทวน: เคยตอบผิด หรือตอบถูกต่ำกว่า 60%
export function needsReview(topics) {
  return Object.entries(topics)
    .filter(([, t]) => t.n >= 2 && t.ok / t.n < 0.6)
    .sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)
    .map(([id]) => id);
}
