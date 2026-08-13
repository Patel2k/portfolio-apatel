import ThemeToggle from './ThemeToggle.jsx';

const links = [
  { num: '01', label: 'about',  href: '#about'  },
  { num: '02', label: 'skills', href: '#skills' },
  { num: '03', label: 'career', href: '#career' },
  { num: '04', label: 'work',   href: '#work'   },
  { num: '05', label: 'honors', href: '#honors' },
];

export default function Nav() {
  return (
    <nav className="nav">
      <a className="nav-brand" href="#top">
        <span className="nav-dot" aria-hidden="true" />
        <b>AJAY&nbsp;PATEL</b> <small>K.A.</small>
      </a>
      <ul className="nav-links" role="list">
        {links.map(({ num, label, href }) => (
          <li key={href}>
            <a href={href}><span className="num">{num}</span> {label}</a>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ThemeToggle />
        <a className="nav-cta" href="#contact">$ contact --me</a>
      </div>
    </nav>
  );
}
