export default function StatsStrip({ stats }) {
  return (
    <section id="stats" className="wrap" style={{ padding: '40px' }}>
      <div className="stats-strip">
        {stats.map(({ target, unit, label }, i) => (
          <div key={label} className="stat-cell reveal" data-delay={String(i)}>
            <div className="stat-num">
              <span className="counter" data-target={String(target)}>0</span>
              <span className="stat-unit">{unit}</span>
            </div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
