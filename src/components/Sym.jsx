export default function Sym({ s, className = "sym" }) {
  const parts = String(s).split(/(_[A-Za-z0-9]+)/g).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.startsWith("_") ? <sub key={i}>{p.slice(1)}</sub> : <span key={i}>{p}</span>
      )}
    </span>
  );
}
