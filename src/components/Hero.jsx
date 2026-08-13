import NodeGlobe from './NodeGlobe.jsx';
import SplineScene from './SplineScene.jsx';
import { spline } from '../data/spline.js';

export default function Hero({ resume }) {
  const { name, tokens } = resume;

  return (
    <header className="hero" id="top">
      {!(spline.hero && spline.replaceGlobe) && <NodeGlobe />}
      <SplineScene id="spline-hero" url={spline.hero} />

      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="term-line reveal">
              <span className="prompt">~/ajay</span>
              <span className="path">$</span> whoami
              <span className="blink" />
            </div>

            <h1 className="hero-h1 reveal" data-delay="1">
              {name.first}
              <br />
              <span className="grad">{name.last}</span>
            </h1>

            <div className="hero-role reveal" data-delay="2">
              Generative&nbsp;AI <span className="sep">×</span> Full-Stack Engineer{' '}
              <span className="sep">·</span> Bangalore, IN
            </div>

            <p className="hero-sub reveal" data-delay="2">
              I turn Generative AI from a demo into <b>dependable production systems</b> — LLM
              orchestration, agentic workflows, RAG, and fast frontends that hold up under real
              load. 3 years shipping, 20+ AI projects delivered.
            </p>

            <div className="hero-tokens reveal" data-delay="3">
              {tokens.map((t, i) => (
                <span key={t} className={`token${i % 2 ? ' mag' : ''}`}>{t}</span>
              ))}
            </div>

            <div className="cta-row reveal" data-delay="4">
              <a className="btn btn-primary" href="#work">View work <span className="arrow">↗</span></a>
              <a className="btn btn-ghost" href="#contact">Get in touch <span className="arrow">↗</span></a>
            </div>
          </div>

          <div className="hero-side reveal" data-delay="3">
            <div className="code-card">
              <div className="code-bar">
                <span className="dot" /><span className="dot" /><span className="dot" />
                <span className="file">ajay.engineer.ts</span>
              </div>
              <div className="code-body">
                <div><span className="ln">1</span><span className="c-key">const</span> <span className="c-fn">ajay</span> <span className="c-pun">=</span> <span className="c-pun">{'{'}</span></div>
                <div><span className="ln">2</span>&nbsp;&nbsp;role<span className="c-pun">:</span> <span className="c-str">&apos;GenAI · Full-Stack&apos;</span><span className="c-pun">,</span></div>
                <div><span className="ln">3</span>&nbsp;&nbsp;ships<span className="c-pun">:</span> <span className="c-str">&apos;production AI&apos;</span><span className="c-pun">,</span></div>
                <div><span className="ln">4</span>&nbsp;&nbsp;years<span className="c-pun">:</span> <span className="c-num">3</span><span className="c-pun">,</span></div>
                <div><span className="ln">5</span>&nbsp;&nbsp;stack<span className="c-pun">:</span> <span className="c-pun">[</span><span className="c-str">&apos;LangGraph&apos;</span><span className="c-pun">,</span> <span className="c-str">&apos;MCP&apos;</span><span className="c-pun">],</span></div>
                <div><span className="ln">6</span>&nbsp;&nbsp;<span className="c-fn">build</span><span className="c-pun">:</span> <span className="c-pun">()</span> <span className="c-key">=&gt;</span> <span className="c-str">&apos;agents that ship&apos;</span><span className="c-pun">,</span></div>
                <div><span className="ln">7</span><span className="c-pun">{'}'}</span><span className="c-pun">;</span></div>
                <div><span className="ln">8</span></div>
                <div><span className="ln">9</span><span className="c-com">// hackathon winner · mentor 500+</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">scroll</div>
    </header>
  );
}
