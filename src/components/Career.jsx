export default function Career({ experience }) {
  return (
    <section id="career" className="section wrap">
      <div className="section-head reveal">
        <div>
          <div className="section-label">03 · experience</div>
          <h2 className="section-h2">git log</h2>
        </div>
        <div className="section-min">2023 → present · 1 company</div>
      </div>

      <div className="career">
        <aside className="career-side reveal">
          <div>Bangalore, IN</div>
          <div>Aug 2023 →</div>
          <div className="live">active</div>
        </aside>

        <div>
          {experience.map((job) => (
            <article key={job.company} className="job-card reveal">
              <div className="job-top">
                <div>
                  <div className="job-co">{job.company}</div>
                  <div className="job-role">{job.role}</div>
                </div>
                <div className="job-period">
                  {job.period}
                  <br />
                  {job.sub}
                </div>
              </div>
              <ul className="job-list">
                {job.highlights.map(({ tag, bold, rest }) => (
                  <li key={tag}>
                    <span className="job-tag">{tag}</span>
                    <span><b>{bold}</b>{rest}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
