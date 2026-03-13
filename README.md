# Mood Arcade

A playful micro-wellbeing web app built with Next.js 15 + the App Router. Gen Z users pick a mood deck (Amped, Meh, Foggy) and instantly get a curated trio of mini-interventions: animated breath work, tap-based wins, and low-pressure prompts/doodles.

https://github.com/akhileshnitt?—pending push and Vercel deploy.

## Features

- **Mood Decks** – gradient cards with emoji, vibe copy, and badge metadata. Animates between decks using Framer Motion.
- **Breath Loop** – progressive glow animation that guides inhale/hold/exhale timings.
- **Color Smash** – tap the matching bubble to earn points. Uses a deterministic pseudo-random generator to stay React-lint-friendly.
- **Doodle Pad** – single-tap squiggle painter with layered neon SVG strokes.
- **Prompt Shuffler** – quick missions for social connection or grounding (shuffle button rotates suggestions).
- **Score Ticker** – ambient “tiny wins logged today” counter to add playful social proof.
- **Glassmorphism UI** – tailwind-styled cards, gradients, and blur surfaces for a futuristic arcade feel.

## Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org)
- TypeScript + Tailwind CSS
- [Framer Motion](https://www.framer.com/motion/) for transitions

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 and test mood switches, games, and prompts.

## Linting

```bash
npm run lint
```

Lint must stay clean before pushing/deploying.

## Deployment

1. Push the repo to GitHub (e.g., `akhileshnitt/mood-arcade`).
2. On Vercel, import the repo, choose the default Next.js build command (`npm run build`) and output directory (`.next`).
3. Set up preview + production domains. No env vars required yet.

## Next Steps / Ideas

- Hook up analytics to track which deck gets the most engagement.
- Add audio playback for soundtrack labels.
- Gate premium decks behind an “Arcade Pass” drop / login.
- Store doodles in localStorage and allow sharing via canvas export.
