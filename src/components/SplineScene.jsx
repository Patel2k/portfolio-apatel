import { useEffect, useRef } from 'react';

const VIEWER_SRC = 'https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js';
let loaderPromise = null;

function loadViewer() {
  if (loaderPromise) return loaderPromise;
  loaderPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${VIEWER_SRC}"]`)) return resolve();
    const s = document.createElement('script');
    s.type = 'module';
    s.src = VIEWER_SRC;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('spline viewer failed to load'));
    document.head.appendChild(s);
  });
  return loaderPromise;
}

/**
 * Optional Spline scene slot. Renders nothing when `url` is empty, so the
 * built-in three.js scene keeps running and the site never depends on an
 * external asset. Skipped on reduced-motion / low-core devices.
 */
export default function SplineScene({ id, url, interactive = false }) {
  const slotRef = useRef(null);

  useEffect(() => {
    if (!url) return;
    const slot = slotRef.current;
    if (!slot) return;

    const lowPower =
      matchMedia('(prefers-reduced-motion: reduce)').matches ||
      (navigator.hardwareConcurrency ?? 8) <= 4;
    if (lowPower) return;

    let reveal;
    loadViewer()
      .then(() => {
        const v = document.createElement('spline-viewer');
        v.setAttribute('url', url);
        v.setAttribute('loading-anim-type', 'none');
        v.addEventListener('load', () => slot.classList.add('ready'));
        slot.appendChild(v);
        reveal = setTimeout(() => slot.classList.add('ready'), 2500);
      })
      .catch(() => console.warn('[spline] keeping the three.js scene'));

    return () => {
      clearTimeout(reveal);
      slot.innerHTML = '';
      slot.classList.remove('ready');
    };
  }, [url]);

  if (!url) return null;

  return (
    <div
      className="spline-slot"
      id={id}
      ref={slotRef}
      aria-hidden="true"
      data-interactive={interactive ? 'true' : undefined}
    />
  );
}
