# YouTube Shorts Animation Generator (Remotion + React + TypeScript)

A fresh Remotion project for creating **original** 30-60 second vertical YouTube Shorts (1080x1920, 30 FPS) from a script.

## Features

- Remotion + React + TypeScript setup (no Three.js game code).
- Vertical shorts output: **1080x1920**, **30 FPS**.
- Dashboard UI (dark, card-based, mobile-friendly):
  - Create new video
  - Preview video
  - Save projects (localStorage)
  - Duplicate projects
- Input fields:
  - Video title
  - Niche
  - Script
  - Tone
  - Call to action
  - Background style
  - Optional voiceover path
  - Theme preset
  - SFX timing markers
- Auto scene splitting from script sentences.
- Animated content system:
  - Hook in first 2 seconds
  - Moving title text
  - Character-style shape blocks
  - Background motion
  - Pop-up captions
  - Zoom + swipe transitions
  - Arrows/circles/highlight overlays
  - Sound effect markers
- Caption modes:
  - Word-by-word timing
  - Sentence-by-sentence timing
  - High-contrast readable style
  - Shorts-safe area overlay
- Included animation style presets:
  - Roblox-story style
  - Faceless documentary style
  - Reddit-story style
  - Quiz/trivia style
  - Money/business explainer style
  - Scary story style
  - Motivational style
- Included visual theme presets:
  - Neon Pulse
  - Cinematic Gold
  - Horror Red
  - Clean Corporate
  - Arcade Pop
- Included templates:
  - 30-second story short
  - 45-second facts short
  - 60-second motivational short
  - 30-second Roblox-style skit
- Sample composition: **`RobloxStoryShort`**
  - 1080x1920 vertical
  - Original game-like generated background
  - Fake character nametags
  - Dialogue bubbles
  - Captions/dialogue blocks
  - Camera zoom feel
  - Dramatic popup text
  - Ending CTA

## Copyright & Asset Safety

This project uses only original, code-generated visuals. Do **not** add copyrighted Roblox assets, logos, characters, music, or clips.

## Install

```bash
npm install
```

## Run locally

### 1) Remotion Studio

```bash
npm run studio
```

### 2) Dashboard (form + preview player)

```bash
npm run dashboard
```

Open: `http://localhost:5173`

## Render MP4

### Render default shorts composition

```bash
npm run render
```

Output file:

- `out/short.mp4`

### Render Roblox sample composition

```bash
npm run render:roblox
```

Output file:

- `out/roblox-story-short.mp4`

### Render sample template props

```bash
npm run render:sample
```

Output file:

- `out/sample-short.mp4`

## Project Structure

```txt
src/
  dashboard/
    DashboardApp.tsx
    main.tsx
    styles.css
  remotion/
    components/
      AnimatedBackground.tsx
      Captions.tsx
      SceneCard.tsx
    compositions/
      ShortsComposition.tsx
      RobloxStoryShort.tsx
    lib/
      scene-splitter.ts
      style-presets.ts
      templates.ts
    Root.tsx
    index.ts
```
