
# The Wizarding World — Cinematic Build Plan

A fully immersive, dark-fantasy site spanning 10 routes, with shared magical UI, Three.js atmosphere, and three AI features powered by Lovable Cloud + AI Gateway.

Given the scale, this will ship in **4 phased iterations**. Each phase is a working, polished milestone — not a placeholder. After Phase 1 you'll see a finished cinematic landing; after Phase 4 the full universe is live.

---

## Design language (applied everywhere)

- **Palette (oklch tokens in `src/styles.css`)**: midnight black, midnight blue, deep emerald, burgundy, antique gold, silver, candlelight orange. Plus gradient/shadow tokens (`--gradient-gold`, `--gradient-moonlight`, `--shadow-candle`, `--shadow-rune`).
- **Typography**: Cinzel (display), Cormorant Garamond (sub-display), EB Garamond (body) loaded via Google Fonts in `__root.tsx` head.
- **Atmosphere primitives** (reusable components in `src/components/magic/`):
  - `Particles` (canvas embers / dust / snow), `Fog`, `Stars`, `Candle`, `RuneSeparator`, `WandCursor`, `SpellTrail`, `GoldenText`, `Parchment`, `EngravedButton`, `ArcaneCard`, `MagicalInput`.
- **Motion**: Framer Motion for UI; GSAP for scroll storytelling; React Three Fiber + drei for 3D.
- **Cursor**: global wand-tip cursor with glowing trail + spark on click (toggleable for accessibility).

---

## Routes & sections

```
src/routes/
  __root.tsx          shared shell: fonts, fog, stars, ambient audio toggle, nav, wand cursor
  index.tsx           Home — castle hero
  hogwarts.tsx        Castle map
  houses.tsx          Four houses
  spells.tsx          Spellbook
  potions.tsx         Cauldron lab
  characters.tsx      Portraits
  wands.tsx           Wand shop
  map.tsx             Marauder's Map
  profile.tsx         Wizard dashboard
  dark-arts.tsx       Forbidden magic
  sorting-hat.tsx     AI feature
  patronus.tsx        AI feature
  chat.tsx            AI feature
  api/sorting.ts      AI server route
  api/patronus.ts     AI server route
  api/character-chat.ts  streaming chat
```

Every route gets unique `head()` metadata (title, description, og).

### Per-route highlights

1. **Home** — R3F scene: silhouette castle, drifting clouds, moon, flying owl sprite, floating lanterns. Parallax mouse + scroll. Hero text "Enter the Wizarding World" with golden gradient + rune underline. Scroll-triggered story panels.
2. **Hogwarts** — interactive SVG/3D castle map; hover towers reveal candle-lit room cards (Great Hall, Library, Astronomy Tower, Dungeons, Moving Staircases). Each card is a tilt-card with parallax candles.
3. **Houses** — 4 immersive panels with house-specific particle systems (fire embers / green fog / blue stars / golden dust). Tilt crests, animated banners, founder lore.
4. **Spells** — animated spellbook with page-turn (Framer Motion 3D rotateY), spell cards with rune burst on hover, mouse-trail spark.
5. **Potions** — cauldron with shader-style bubbling fog (canvas), draggable ingredient bottles, brew button triggers color-shift + smoke explosion + named potion result.
6. **Characters** — portrait gallery; subtle blink + ambient float; aura on hover.
7. **Wands** — R3F rotating wand showcase; shelf grid; click reveals wood/core/length stats with golden energy pulse.
8. **Marauder's Map** — parchment with animated ink reveal on hover, walking footstep paths drawn with SVG `pathLength`.
9. **Profile** — magical dashboard: house badge (from Sorting Hat result stored locally + Cloud), XP bar, spell mastery, wand, patronus.
10. **Dark Arts** — black smoke shaders, red rune circle, lightning flashes, content gated behind a "I accept the risk" rune unlock.

### AI features (Lovable Cloud + AI Gateway, `google/gemini-3-flash-preview`)

- **Sorting Hat** (`/sorting-hat` + `api/sorting.ts`): 6 atmospheric questions → server route sends to AI Gateway with structured tool-calling schema → returns `{ house, reasoning }` → cinematic reveal (smoke → crest explosion → house theme takeover). Result persisted to `profiles` table.
- **Patronus** (`/patronus` + `api/patronus.ts`): 4 emotional prompts → AI returns `{ animal, description }` → ethereal blue smoke morphs into glowing silhouette (CSS + filter blur + generated image).
- **Character Chat** (`/chat` + streaming `api/character-chat.ts`): pick a character (Dumbledore, McGonagall, Snape, Hagrid, Luna). Streamed SSE responses rendered on enchanted parchment with ink-fade-in.

### Backend (Lovable Cloud)

- `profiles` table: `user_id`, `house`, `patronus`, `wand`, `xp` (RLS: user can read/update own).
- `chat_messages` table: `user_id`, `character`, `role`, `content`, `created_at` (RLS: user-scoped).
- Anonymous sessions allowed (sign-in optional) — fall back to `localStorage` profile if not authed.

---

## Generated visual assets (premium tier, AI Gateway via skill)

About 12 hero images, all `1920x1080` cinematic photoreal:
1. Castle at midnight (home hero)
2. Great hall interior
3. Moving staircase corridor
4. Four house common rooms (×4)
5. Potions lab
6. Wand shop interior
7. Marauder's map parchment texture
8. Forbidden forest / dark arts scene
9. Spellbook open

Plus 4 emblem PNGs (transparent) for houses, 1 sorting hat, 1 patronus mist base.

---

## Phasing

- **Phase 1 — Foundation + Home (this iteration)**
  - Fonts + design tokens + magical UI primitives
  - Wand cursor, particles, fog, stars
  - Home page R3F castle hero + scroll storytelling
  - Shared nav + footer in `__root.tsx`
  - 2 generated hero images
- **Phase 2 — Hogwarts, Houses, Wands, Characters** (visual-heavy pages)
- **Phase 3 — Spells, Potions, Map, Dark Arts, Profile** (interactive pages)
- **Phase 4 — Lovable Cloud + 3 AI features + auth**

I'll deliver Phase 1 fully polished, then continue phase-by-phase on your go-ahead.

---

## Technical notes

- New deps: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `framer-motion` (likely already present), `zod`.
- All Three.js scenes lazy-loaded with `React.lazy` + Suspense fallback (parchment shimmer) to keep initial JS reasonable.
- `prefers-reduced-motion` honored: disables particles, wand-trail, parallax.
- Performance budget: each route under ~200KB JS gz excluding the 3D chunk; 3D chunk only loaded on routes that use it.
- IP: using canonical names as you confirmed.
- Ambient audio: muted by default, user-toggle in nav (royalty-free castle ambience added in Phase 2).
