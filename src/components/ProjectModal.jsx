import { useEffect, useState, useCallback, useRef } from 'react';
import { flowIcons } from './flowIcons.jsx';

/** Full-screen takeover with the animated step-by-step architecture flow. */
export default function ProjectModal({ project, onClose }) {
  const [lit, setLit] = useState(-1);
  const timerRef = useRef(null);

  const play = useCallback(() => {
    if (!project) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setLit(-1);
    let i = 0;
    timerRef.current = setInterval(() => {
      i += 1;
      setLit(i - 1);
      if (i >= project.flow.length) clearInterval(timerRef.current);
    }, 650);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    const startId = setTimeout(play, 420);
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(startId);
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('keydown', onKey);
    };
  }, [project, play, onClose]);

  if (!project) return null;
  const p = project;

  // bold the leadBold phrases inside the lead copy
  let leadHtml = p.lead;
  p.leadBold.forEach((b) => { leadHtml = leadHtml.replace(b, `<b>${b}</b>`); });

  const backdropClose = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="takeover open" role="dialog" aria-modal="true" onClick={backdropClose}>
      <button className="tk-close" aria-label="Close" onClick={onClose}>✕</button>
      <div className="takeover-inner" onClick={backdropClose}>
        <div className="takeover-panel">
          <div className="tk-eyebrow"><span className="dot" /> {p.tag} · {p.meta}</div>
          <h2 className="tk-title">{p.title}</h2>
          <p className="tk-lead" dangerouslySetInnerHTML={{ __html: leadHtml }} />

          <div className="tk-metrics">
            {p.metrics.map((m) => (
              <div key={m.l} className="tk-metric">
                <div className="v">{m.v}</div>
                <div className="l">{m.l}</div>
              </div>
            ))}
          </div>

          <div className="tk-sec-label">how it works · architecture flow</div>
          <div className="flow">
            {p.flow.map((s, i) => (
              <div key={s.name} className={`flow-step${i <= lit ? ' lit' : ''}`}>
                <div className="flow-num">STEP {String(i + 1).padStart(2, '0')}</div>
                <div className="flow-icon">{flowIcons[s.icon]}</div>
                <div className="flow-name">{s.name}</div>
                <div className="flow-desc">{s.desc}</div>
                <div className="flow-tech">{s.tech}</div>
              </div>
            ))}
          </div>
          <button className="tk-replay" onClick={play}>↻ Replay flow</button>

          <div className="tk-sec-label">the build</div>
          <div className="tk-grid2">
            <div className="tk-block">
              <h4>Why it mattered</h4>
              <ul>{p.why.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="tk-block">
              <h4>How it’s engineered</h4>
              <ul>{p.how.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>

          <div className="tk-sec-label">stack</div>
          <div className="tk-stack-full">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
