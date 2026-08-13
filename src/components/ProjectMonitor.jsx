import { useRef } from 'react';
import { flowIcons } from './flowIcons.jsx';

/** 3D monitor that displays the active project and tilts with the pointer. */
export default function ProjectMonitor({ project: p, onOpen }) {
  const monitorRef = useRef(null);
  const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

  const onMove = (e) => {
    const el = monitorRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(px * 14).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(6 - py * 10).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = monitorRef.current;
    if (!el) return;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '6deg');
  };

  return (
    <div className="monitor-stage reveal" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="monitor" ref={monitorRef}>
        <div className="monitor-frame">
          <button
            className="monitor-screen-btn"
            type="button"
            onClick={onOpen}
            aria-label={`Open the full case study for ${p.title}`}
          >
            <div className="monitor-screen">
              <div className="scr-glow" aria-hidden="true" />
              {/* key remounts the panel so the boot animation replays per project */}
              <div className="scr-content" key={p.title}>
                <div className="scr-bar">
                  <span className="scr-dot" /><span className="scr-dot" /><span className="scr-dot" />
                  <span className="scr-file">~/projects/{slug}.md</span>
                  <span className="scr-live">{p.status}</span>
                </div>
                <div className="scr-cmd">
                  <span className="p">ajay@portfolio</span><span className="d">:~</span>$ open --project{' '}
                  <span className="s">&quot;{p.title}&quot;</span>
                </div>
                <div className="scr-tag">{p.tag} · {p.meta}</div>
                <h3 className="scr-title">{p.title}</h3>
                <div className="scr-desc">{p.lead.slice(0, 185)}…</div>
                <div className="scr-metrics">
                  {p.metrics.map((m) => (
                    <div key={m.l} className="scr-m"><b>{m.v}</b><span>{m.l}</span></div>
                  ))}
                </div>
                <div className="scr-flowlabel">// pipeline</div>
                <div className="scr-flow">
                  {p.flow.map((s, i) => (
                    <span key={s.name} style={{ display: 'contents' }}>
                      <span className="scr-node">{flowIcons[s.icon]}<i>{s.name}</i></span>
                      {i < p.flow.length - 1 && <span className="scr-arr">→</span>}
                    </span>
                  ))}
                </div>
              </div>
              <div className="scr-scan" aria-hidden="true" />
              <div className="scr-open">
                <span><b>Click</b> to open the full architecture flow</span>
                <span className="kbd">ENTER</span>
              </div>
            </div>
          </button>
          <div className="monitor-brand">A J A Y / / O S</div>
          <div className="monitor-led" aria-hidden="true" />
        </div>
        <div className="monitor-stand" aria-hidden="true">
          <div className="stand-neck" />
          <div className="stand-base" />
        </div>
      </div>
      <div className="monitor-hint">
        hover a build to load it · click to expand the full architecture flow
      </div>
    </div>
  );
}
