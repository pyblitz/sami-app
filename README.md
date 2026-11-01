# SAMI & SARA AI 2.0 — Advanced Dual-Agent Intelligence Platform

Sami (Chief Intelligence Officer) strategizes and builds. Sara (Chief Intelligence
Reviewer) independently challenges, audits, and can reject weak solutions.
Final decisions are always the user's.

## What is real in this build

- 7-phase dual-agent engine (Understand, Strategize, Challenge, Debate, Improve,
  Final Audit, Delivery) with review cycles capped at 3 — no infinite loops.
- 6 modes: Quick, Dual, Expert, Autonomous, Research, Developer.
- Task planner with approval gates: sensitive actions (publish, pay, send,
  delete) are NEVER auto-executed.
- Long-term memory: personal vs project, searchable, editable, deletable,
  exportable — localStorage only, nothing leaves the device.
- 12 modules with real local tools: research planning (no invented citations),
  coding lab + JS runner, design canvas + PNG download, business plans with
  approved rates, content/SEO plans, lessons, CSV/JSON data analysis,
  automation checklists, security pattern scan, project plans, marketing
  outlines, document stats.
- Premium dashboard: Home, Dual Discussion, AI Workspace, Memory Center,
  Settings. No non-functional buttons: every button runs local code or
  plainly states what is not configured.

## What is honestly NOT here

- This is a LOCAL engine, not a real LLM. It does not call any AI provider.
- LLM providers, web search, image generation, databases and backends are
  shown as NOT CONFIGURED — not faked.
- No API key, password, OTP or secret is stored anywhere in this repo.
  Real LLM use would need the user's own provider setup on their own device
  and is never required.
- No account, no sign-in, no backend, no Play Store release in this build.

## Run

Open `index.html` in a browser, or visit the GitHub Pages site.
No build step, no install, no key.

## Files

- `index.html`, `css/style.css` — dashboard shell
- `js/engine.js` — 7-phase engine + modes
- `js/memory.js` — personal/project memory
- `js/tasks.js` — task planner
- `js/modules.js` — 12 modules
- `js/app.js` — dashboard wiring
- `templates/templates.json` — 10 design templates (from v1)
- `assets/logo.svg` — original S monogram
- `docs/limitations.md` — full honest limitations
