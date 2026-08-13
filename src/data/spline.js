/**
 * Spline scene configuration.
 *
 * Spline (https://spline.design) is a browser-based 3D editor. To use it:
 *   1. Build a scene in the Spline editor.
 *   2. Export → Web / "Public URL" → publish.
 *   3. Paste the generated `.splinecode` URL below.
 *
 * Leave a URL empty ('') to keep the built-in three.js node-network scene.
 * Nothing breaks if you never set one — the slots simply don't render.
 */
export const spline = {
  /** Behind the hero. Set `replaceGlobe: true` to swap out the three.js globe. */
  hero: '',
  /** Ambient scene behind the Projects monitor. */
  projects: '',
  replaceGlobe: false,
};
