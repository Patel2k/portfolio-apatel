import { useEffect, useState } from 'react';

const KEY = 'ajay-portfolio-theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  // adopt whatever the no-flash script in index.html already set
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable */ }
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
    >
      <svg className="t-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
      <svg className="t-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
      <span className="t-label">{theme}</span>
    </button>
  );
}
