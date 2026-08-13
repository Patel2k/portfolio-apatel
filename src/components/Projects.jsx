import { useState } from 'react';
import ProjectModal from './ProjectModal.jsx';
import ProjectMonitor from './ProjectMonitor.jsx';
import SplineScene from './SplineScene.jsx';
import { spline } from '../data/spline.js';

export default function Projects({ projects }) {
  const [active, setActive] = useState(null);
  const [preview, setPreview] = useState(0);

  return (
    <section id="work" className="section wrap" style={{ position: 'relative' }}>
      <SplineScene id="spline-projects" url={spline.projects} interactive />

      <div className="section-head reveal">
        <div>
          <div className="section-label">04 · work</div>
          <h2 className="section-h2">Featured Builds</h2>
        </div>
        <div className="section-min">hover to preview · click to open case study ↗</div>
      </div>

      <ProjectMonitor project={projects[preview]} onOpen={() => setActive(projects[preview])} />

      <div className="proj-grid">
        {projects.map((p, i) => (
          <button
            key={p.title}
            className="proj-card reveal"
            data-delay={String(i % 2)}
            onClick={() => setActive(p)}
            onPointerEnter={() => setPreview(i)}
            onFocus={() => setPreview(i)}
            aria-label={`Open case study: ${p.title}`}
          >
            <span className="proj-expand" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 4h6v6M20 4l-8 8M10 20H4v-6M4 20l8-8" />
              </svg>
            </span>
            <div className="proj-top">
              <div>
                <div className="proj-idx">{p.idx}</div>
                <div className="proj-meta">{p.meta}</div>
              </div>
              <div className="proj-status">{p.status}</div>
            </div>
            <h3 className="proj-h3">{p.title}</h3>
            <p className="proj-p">{p.lead.slice(0, 150)}…</p>
            <div className="proj-foot">
              <div className="proj-stack">
                {p.stack.slice(0, 3).map((s) => <span key={s}>{s}</span>)}
              </div>
              <span className="proj-cta">View case study <span className="arrow">→</span></span>
            </div>
          </button>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
