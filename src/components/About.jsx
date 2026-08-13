export default function About({ resume }) {
  const { contact } = resume;

  return (
    <section id="about" className="section wrap">
      <div className="section-head reveal">
        <div>
          <div className="section-label">01 · profile</div>
          <h2 className="section-h2">whoami</h2>
        </div>
        <div className="section-min">~ / {contact.location}</div>
      </div>

      <div className="about-grid">
        <div>
          <p className="about-p reveal">
            I’m a <b>Generative AI &amp; Full-Stack engineer</b> who builds end-to-end — from{' '}
            <b>React / Next.js</b> UIs people actually enjoy, to <b>Python · Django · Azure</b>{' '}
            services and agentic backends that scale.
          </p>
          <p className="about-p2 reveal" data-delay="1">
            At First American (India) I own systems from data ingestion to UI: GPT-driven document
            intelligence, MCP &amp; LangGraph agents, RAG pipelines, and prompt &amp; context
            engineering — turning AI demos into features that survive real production load.
          </p>
          <p className="about-p2 reveal" data-delay="2">
            Off the clock: a company-wide hackathon winner, Q3 Top Performer, and a mentor to 500+
            engineers.
          </p>
        </div>

        <div className="about-side reveal" data-delay="2">
          <dl>
            <dt className="about-dt">role</dt>
            <dd className="about-dd">GenAI · Full-Stack Engineer</dd>
            <dt className="about-dt">company</dt>
            <dd className="about-dd">First American (India) Pvt. Ltd.</dd>
            <dt className="about-dt">experience</dt>
            <dd className="about-dd">3 years · Aug 2023 →</dd>
            <dt className="about-dt">education</dt>
            <dd className="about-dd">B.E. Information Science · BIET · 8.5 GPA</dd>
            <dt className="about-dt">focus</dt>
            <dd className="about-dd">LLM Orchestration · Agents · RAG</dd>
            <dt className="about-dt">status</dt>
            <dd className="about-dd ok">// open to opportunities</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
