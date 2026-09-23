# Sarah Hopp — Portfolio

A personal portfolio site for Sarah Hopp — a touring audio engineer turned software engineer. It tells her story through an interactive genre-based "show flyer" carousel of the artists she's worked front-of-house/monitors for, a live photo & video gallery, a hobbies gallery, and a write-up of her pivot into software engineering.

---

## Features

- 🎪 **Interactive show flyer carousel** (Bands page) — 8 genre-themed flyers with keyboard/arrow navigation, dot indicators, and an artist search box
- 🖼️ **Hover-to-reveal artist logos** — hovering a headliner's name on a flyer swaps it for that artist's logo
- 📸 **Live photo & video gallery** (Photos page) — grid of live-show photos and videos with a full keyboard-navigable lightbox (arrow keys to browse, space bar to play/pause video, escape to close)
- 🏔️ **Hobbies gallery** (Off the Clock page) — Camping & Travel, Dogs, Kayaking, Snowboarding, and Drums categories, each with their own photo/video lightbox; Drums includes embedded YouTube videos and a link to her channel
- 🎚️ **Tools of the Trade page** — venues worked, consoles run, and software used
- 📖 **Career pivot story** — a written narrative page on the move from FOH audio engineering to software engineering
- 📬 **Connect page** — Instagram, LinkedIn, GitHub, and email links
- ⚡ **Performance-tuned** — batch-compressed images/video, preconnected & merged font loading, and layout-shift fixes bring most pages to 90+ Lighthouse performance/accessibility scores

---

## Tech Stack

**Frontend:** Svelte 5 (runes: `$state`, `$derived`, `$effect`), TypeScript, Vite

**Styling:** Tailwind CSS v4 (CSS-first config, no `tailwind.config.js` — configured via the `@tailwindcss/vite` plugin)

**Routing:** [`@mateothegreat/svelte5-router`](https://github.com/mateothegreat/svelte5-router)

**Fonts:** Google Fonts — Oswald, Playfair Display, Orbitron, Anton, Rye, Cinzel, UnifrakturMaguntia, Barlow Condensed, Inter, Metal Mania

**Type-checking:** `svelte-check` + `tsc`

**Assets:** all images/videos are bundled at build time via static `import` and `import.meta.glob` — no backend, database, or environment variables required

---

## Project Structure

```
portfolio_build/
│
├── index.html                    # Vite entry HTML — loads Google Fonts, sets favicon, mounts #app
├── vite.config.ts                # Vite config — @tailwindcss/vite + @sveltejs/vite-plugin-svelte
├── svelte.config.js              # Svelte config
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json   # TypeScript project references
├── package.json
│
├── public/
│   ├── favicon.svg
│   └── horns-icon.png            # site favicon
│
└── src/
    ├── main.ts                   # entry point — mounts App into #app
    ├── App.svelte                # root component — defines all routes, renders NavBar + Router
    ├── app.css                   # `@import "tailwindcss";` (Tailwind v4 CSS-first setup)
    │
    ├── components/
    │   └── NavBar.svelte         # top navigation bar, incl. Bands dropdown and mobile menu
    │
    ├── pages/
    │   ├── Home.svelte           # landing page — hero image, headline, stats, CTA to Pivot
    │   ├── Pivot.svelte          # "From FOH to Full Stack" — career pivot narrative
    │   ├── Bands.svelte          # genre flyer carousel with search and hover-logo reveal
    │   ├── Photos.svelte         # "Live at Work" - live photo/video gallery grid + lightbox
    │   ├── Hobbies.svelte        # "Off the Clock" — hobby category galleries + YouTube embeds
    │   ├── Experience.svelte     # "Tools of the Trade" — venues, consoles, programs
    │   └── Connect.svelte        # "Let's Talk" — social links + email
    │
    ├── data/
    │   ├── types.ts              # shared TS interfaces: Flyer, Act
    │   ├── flyers.ts             # the 8 genre Flyer objects (content for the Bands page)
    │   ├── headlinerLogos.ts     # headliner name → logo image map
    │   ├── searchableActs.ts     # flattened, searchable list of every act across all flyers
    │   └── experience.ts         # venues / consoles / programs arrays
    │
    ├── stores/
    │   └── flyerStore.svelte.ts  # shared rune-based store tracking the active flyer index
    │
    └── assets/
        ├── flyers/               # 8 background images, one per genre flyer
        ├── hero/                 # Home page hero background image
        ├── logos/                # ~34 artist/band logos used on hover in the Bands page
        ├── photos/               # ~60 live-show photos + 3 videos for the Photos gallery
        └── hobbies/
            ├── campingTravel/    # photos + videos
            ├── dogs/             # photos
            ├── drums/            # photos + videos
            ├── kayaking/         # photos
            └── snowboarding/     # photos
```

---

## Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
git clone https://github.com/sarahhopp717/portfolio.git
cd portfolio
npm install
```

### Running Locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Type-Checking

```bash
npm run check
```

### Production Build & Preview

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally at http://localhost:4173
```

---

## Deployment

This is a fully static site with no backend or environment variables — `npm run build` outputs a `dist/` folder that can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.). Not yet deployed.

---

## About

Built by Sarah Hopp — a touring audio engineer (FOH/monitors) turned software engineer.
