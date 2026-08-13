import { useEffect } from 'react';

const fmt = (n) => (n >= 1000 ? Math.round(n).toLocaleString() : String(Math.round(n)));

function countUp(el, target, dur, format) {
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format(target * eased);
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = format(target);
  };
  requestAnimationFrame(tick);
}

/** Scroll-driven animations: reveal-on-scroll, stat counters, skill bars. */
export default function useReveal() {
  useEffect(() => {
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));

    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          countUp(e.target, Number(e.target.dataset.target || 0), 1600, fmt);
          counterIO.unobserve(e.target);
        });
      },
      { threshold: 0.3 }
    );
    document.querySelectorAll('.counter').forEach((el) => counterIO.observe(el));

    const barIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const attr = e.target;
          const bar = attr.querySelector('.bar-fill');
          const num = attr.querySelector('.attr-val');
          if (bar) bar.style.width = `${bar.dataset.fill || 0}%`;
          if (num) countUp(num, Number(num.dataset.skill || 0), 1400, (v) => String(Math.round(v)));
          barIO.unobserve(e.target);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('.attr').forEach((el) => barIO.observe(el));

    return () => {
      revealIO.disconnect();
      counterIO.disconnect();
      barIO.disconnect();
    };
  }, []);
}
