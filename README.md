# Sami App

A responsive web app (PWA) for templates, design, promotions, local automations,
and Sami & Sara discussion.

**Status: Published as a web app on GitHub. Not a Play Store listing.**
**No API key, no sign-in, no secret in this repo.** Platform sign-in, if ever
needed, is done by the owner himself on his own device/browser.

## What it does
- Templates Maker: pick a preset, edit text and colours, send it to the Designer.
- Designer: a simple canvas editor. Edit headline, subtext, colours, and download a PNG.
- Promotions: build a promotion caption from facts you type, then copy it. No auto-posting.
- Automations: local checklists and reminders only. No account login is stored here.
- Sami & Sara Discuss: Sami gives plan/logic, Sara gives QC/risk/user view, then a
  joint conclusion, against 7 lenses. Local text only — no LLM, no API, no auto-post,
  no voice call. Sami and Sara are fictional assistant characters, not real people.

## Demo
Open `index.html` in a browser. No build step, no install needed.
On a phone, use "Add to Home Screen" for an app-like install. This is not a Play Store listing.

## Tech Stack
HTML, CSS, JavaScript. No framework, no backend.

## Installation
```bash
git clone https://github.com/pyblitz/sami-app.git
cd sami-app
# Open index.html in a browser. No server needed.
```

## Usage
1. Open Home, pick a section.
2. Templates: choose a preset, then edit it in Designer.
3. Designer: type headline and subtext, pick colours, click Download PNG.
4. Promotions: type product, price, and call to action, click Generate, then Copy.
5. Automations: tick a checklist. Data stays in your browser only.
6. Sami & Sara Discuss: type an idea, click Discuss, read Sami, Sara, and the joint conclusion.

## Project structure
- `index.html` — app shell and sections
- `css/style.css` — responsive layout
- `js/` — app, templates, designer, promotions, automations, discuss, config (no-key only)
- `templates/templates.json` — concept presets (10)
- `docs/no-key-system.md` — no-key system
- `docs/sami-and-sara-characters.md` — Sami & Sara character system

## How to run / test
- Open on phone, tablet, and desktop widths. Text must not be cut off.
- Designer PNG download must work in the browser.
- Promotions copy button must copy only the text you typed.
- Automations must not post anywhere and must not ask for any password.
- Discuss must show Sami, Sara, and a joint conclusion for any idea typed.

## Login
No sign-in in this app, by design. No password or OTP is ever asked in chat, and
no secret is stored in this repo. See `docs/no-key-system.md`.

## Contributing
No contributions are being accepted until the owner approves further changes.

## License
Proposed: MIT (proposal only, final only after owner approval). No LICENSE file
is included yet.
