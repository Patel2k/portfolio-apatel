# Ajay Patel K A — Portfolio

Personal portfolio for **Ajay Patel K A**, Generative AI × Full-Stack Engineer.

Interactive **three.js node-network globe** hero, a mono-heavy terminal
aesthetic with **dark + light themes**, a **3D monitor** that previews each
project, and a **full-screen animated architecture-flow** case study per build.

Plain **React 18 + Vite 5** — no framework, no SSR, ships as static files.

**Live:** https://ajayportfolio-blush.vercel.app

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Requires Node 18+.

## Scripts

| Command           | What it does                          |
|-------------------|---------------------------------------|
| `npm run dev`     | Vite dev server with HMR              |
| `npm run build`   | Production build → `dist/`            |
| `npm run preview` | Serve the built `dist/` locally       |

## Deploy to Vercel

The app is a static Vite build, so Vercel needs no extra configuration.

1. Push this repo to GitHub.
2. Vercel dashboard → **Add New… → Project** → import `portfolio-apatel`.
3. Confirm the auto-detected settings:

   | Setting          | Value           |
   |------------------|-----------------|
   | Framework Preset | Vite            |
   | Root Directory   | `./`            |
   | Build Command    | `npm run build` |
   | Output Directory | `dist`          |
   | Install Command  | `npm install`   |

4. **Deploy.** Every push to `main` redeploys; pull requests get preview URLs.

No environment variables are needed — all content is compiled in from
`src/data/resume.js`. There is no client-side router, so no rewrite rules are
required either.

`vite.config.js` sets `base: './'`, so the same build also works from a
subpath on Netlify, GitHub Pages, or any static host.

## Structure

```
.
├── index.html               # Shell + fonts + no-flash theme script
├── vite.config.js
└── src/
    ├── main.jsx             # React entry
    ├── App.jsx              # Section composition
    ├── styles.css           # Design tokens, dark + light themes
    ├── data/
    │   ├── resume.js        # ALL content lives here
    │   └── spline.js        # Optional Spline scene URLs
    └── components/
        ├── NodeGlobe.jsx        # three.js node-network globe (theme-reactive)
        ├── SplineScene.jsx      # Optional Spline viewer slot
        ├── ThemeToggle.jsx      # Dark ⇄ light, persisted
        ├── useReveal.js         # Scroll reveals, counters, skill bars
        ├── Nav.jsx
        ├── Hero.jsx
        ├── StatsStrip.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Career.jsx
        ├── Projects.jsx         # Monitor + cards + open state
        ├── ProjectMonitor.jsx   # 3D monitor showing the active project
        ├── ProjectModal.jsx     # Full-screen animated flow takeover
        ├── flowIcons.jsx
        ├── Honors.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Updating content

Everything is in **`src/data/resume.js`** — name, contact links, stats, skills,
experience, honors, and the `projects` array. Each project carries its own case
study: `metrics`, a `flow` array (the animated architecture steps), `why` /
`how` bullets, and `stack`.

To add a flow step, append `{ icon, name, desc, tech }`. `icon` must be a key in
`src/components/flowIcons.jsx` (`inbox`, `scan`, `ai`, `pipe`, `check`, `image`,
`upload`, `chat`, `db`, `doc`, `send`).

## Theme

The toggle lives in the nav and persists to `localStorage`; an inline script in
`index.html` applies the saved theme before first paint so there's no flash.
Light tokens are defined under `html[data-theme='light']` in `styles.css`. The
code card and monitor screen stay dark in both themes on purpose — screens
should look like screens. The three.js scene switches from additive to normal
blending in light mode so the network stays legible on white.

## Spline (optional)

`src/data/spline.js` holds two optional scene URLs (`hero`, `projects`). Build
and publish a scene at [spline.design](https://spline.design), paste its
`.splinecode` URL, and it mounts behind that section. Leave the strings empty
and the built-in three.js scene is used instead. Scenes are skipped on
reduced-motion and low-core devices.

## Stack

| Area    | Choice                                     |
|---------|--------------------------------------------|
| UI      | React 18                                   |
| Build   | Vite 5                                     |
| 3D      | three.js                                   |
| Styling | Plain CSS custom properties (no Tailwind)  |
| Fonts   | Space Mono + JetBrains Mono (Google Fonts) |
| Hosting | Vercel                                     |

## Contact

- **Email** — ajaypatelka2002@gmail.com
- **LinkedIn** — https://linkedin.com/in/patel-k-a-
- **GitHub** — https://github.com/Patel2k
