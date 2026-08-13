export default function Honors({ honors }) {
  return (
    <section id="honors" className="section wrap">
      <div className="section-head reveal">
        <div>
          <div className="section-label">05 · honors</div>
          <h2 className="section-h2">Recognition</h2>
        </div>
        <div className="section-min">awards &amp; leadership</div>
      </div>

      <div className="honors">
        {honors.map(({ num, title, desc }, i) => (
          <div key={num} className="honor reveal" data-delay={String(i % 4)}>
            <div className="honor-num">{num}</div>
            <div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
