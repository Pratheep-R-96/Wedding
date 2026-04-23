# Pratheep & Fanny Praiselin — Wedding Website

A single-page wedding website built with React 19, Tailwind CSS, and Framer Motion.
Sections: Hero · Our Story · Events · Countdown · Gallery · Venues · Blessings.

---

## Getting Started (local)

**Requirements:** Node 20+, npm 10+

```bash
npm install
npm run dev
# → http://localhost:5173
```

---

## Build

```bash
npm run build          # production build → dist/
npm run preview        # serve the production build locally on :4173
npm run build:analyze  # same build + opens dist/stats.html bundle treemap
```

---

## Environment Variables

Create a `.env.local` file at the project root (never commit it):

| Variable | Purpose | Required |
|---|---|---|
| `VITE_FORMSPREE_URL` | RSVP submissions endpoint (e.g. `https://formspree.io/f/xxxx`). Falls back to localStorage when absent. | No |
| `VITE_SUPABASE_URL` | Reserved — Supabase project URL for blessings backend upgrade | No |
| `VITE_SUPABASE_ANON_KEY` | Reserved — Supabase anon key | No |

All `VITE_` variables are inlined at build time; they are safe for public client-side use. Do **not** put secrets here.

---

## Deploy — Netlify

1. Push the repo to GitHub (or GitLab / Bitbucket).
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import existing project**.
3. Select the repo. Build settings are auto-read from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in **Site Settings → Environment variables**.
5. Click **Deploy site**.
6. *(Optional)* Add a custom domain (e.g. `pratheepandfanny.com`) under **Domain management** — HTTPS is provisioned automatically via Let's Encrypt.

---

## Deploy — Vercel

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command and output directory are filled automatically from `vercel.json`.
4. Add environment variables in **Project Settings → Environment Variables**.
5. Click **Deploy**.
6. *(Optional)* Assign a custom domain under **Domains**.

---

## Replacing Placeholder Content

| What | Where |
|---|---|
| Gallery photos | Drop files into `public/images/gallery/` and update `GALLERY` in [`src/lib/constants.js`](src/lib/constants.js). Use the `<Picture>` component — it auto-generates WebP srcset. Add AVIF variants for best compression. |
| Timeline photos | Same pattern — update `image` fields in `STORY_MILESTONES` in `src/lib/constants.js`. |
| Background music | Add `public/audio/background.mp3` — royalty-free instrumental, mono 96 kbps, ≤ 2 MB recommended. Sources: [Pixabay Music](https://pixabay.com/music/) (free, no attribution) · [Incompetech](https://incompetech.com/music/) (Kevin MacLeod, CC-BY). |
| Hero background | Replace the picsum URL in [`src/components/sections/Hero.jsx`](src/components/sections/Hero.jsx) with a real photo. |
| OG social image | Add `public/og-image.jpg` (1200 × 630 px) and update the `og:image` meta tag in [`index.html`](index.html). |
| Couple names / date / venue | Edit `COUPLE`, `WEDDING_DATE`, and `EVENTS` in [`src/lib/constants.js`](src/lib/constants.js). |
| Our Story copy | Edit `STORY_MILESTONES` in `src/lib/constants.js`. |
| Nav links | Edit `NAV_LINKS` in `src/lib/constants.js`. |

---

## Content Checklist Before Launch

- [ ] Replace all picsum placeholder images with real photos
- [ ] Add `public/audio/background.mp3` (or remove the music toggle)
- [ ] Verify RSVP deadline date in the Events section
- [ ] Confirm venue addresses and Google Maps queries in `EVENTS`
- [ ] Add a real OG image (`public/og-image.jpg`)
- [ ] Test on physical iOS and Android devices
- [ ] Set up Formspree / Supabase if cloud RSVP / blessings storage is needed
- [ ] Point custom domain and verify HTTPS

---

## Project Structure

```
src/
  components/
    layout/   Nav, Footer, PageShell
    sections/ Hero, OurStory, Events, Countdown, Gallery, Map, Blessings
    ui/       Button, Card, EventCard, Lightbox, Picture, SectionShimmer, …
  hooks/      useCountdown, useBackgroundMusic, useScrollReveal
  lib/        constants.js, animations.js, blessings.js, ics.js
  styles/     globals.css
public/
  fonts/      Self-hosted woff2 files (preloaded in index.html)
  audio/      background.mp3 (add manually)
  robots.txt
netlify.toml
vercel.json
```

---

## Performance (Lighthouse Mobile — production build)

| | Score |
|---|---|
| Performance | 91 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

FCP 1.8 s · LCP 3.2 s · TBT 10 ms · CLS 0

---

## License

All wedding content — names, photos, and copy — © Pratheep & Fanny Praiselin.  
Source code is released under the **MIT License**.
