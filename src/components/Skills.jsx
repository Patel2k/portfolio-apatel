export default function Skills({ skills }) {
  return (
    <section id="skills" className="section wrap">
      <div className="section-head reveal">
        <div>
          <div className="section-label">02 · stack</div>
          <h2 className="section-h2">Skills</h2>
        </div>
        <div className="section-min">rated 0 → 99</div>
      </div>

      <div className="attrs">
        {skills.map(({ name, rating, tags }, i) => (
          <div key={name} className="attr reveal" data-delay={String(i % 3)}>
            <div className="attr-head">
              <span className="attr-name">{name}</span>
              <span className="attr-val" data-skill={String(rating)}>0</span>
            </div>
            <div className="bar">
              <div className="bar-fill" data-fill={String(rating)} />
            </div>
            <div className="attr-tags">{tags}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
