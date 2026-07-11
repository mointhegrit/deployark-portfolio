# DeployArk — Portfolio Website

Portfolio site for **Moin Khan / DeployArk** — the automation practice that delivers systems, not decks. AI workflow automation for PR & marketing agencies.

**Live:** deployed on Vercel · **Contact:** [cal.com/mointhegrit/30min](https://cal.com/mointhegrit/30min)

## Stack

- React 19 + Vite
- Tailwind CSS 3.4
- GSAP 3 + ScrollTrigger
- React Router (case-study pages at `/work/:slug`)

## Structure

- `src/data/projects.js` — single source of truth for all case studies (summary, problem, solution, steps, outcome)
- `src/components/` — one component per section; `CaseStudy.jsx` renders detail pages
- `public/work/` — n8n workflow canvas screenshots

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

SPA rewrites + security headers configured in `vercel.json`.
