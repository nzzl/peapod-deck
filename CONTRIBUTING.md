# Contributing

Thanks for helping! New characters, portals and scene backdrops are especially welcome.

## Ground rules

- **Keep it one file per deck.** No build step and no new runtime dependencies besides GSAP.
- **Original art only.** Draw your own characters; no recreations of existing brands, games or mascots.
- **Keep the bottom ~150 px of a scene clear** for the presenters.
- **Every beat must be rewindable.** A scene's `setStep(n, instant)` has to produce beat *n* from any direction.
- **Must run in a sandboxed iframe.** Wrap browser APIs that previews block (history, full screen) in `try`/`catch`.

## Adding a character

1. Draw it as rows of characters plus a palette (see `GK` for Gigi or `ZIP_ROWS` for Zip).
2. Render it with `spriteSVG(frames, palette, pixelSize)` and place it with `makeActor(scene, html, { x, y, w, h, title })`.
3. Give it an idle loop, a click reaction and an `arrive` line in its scene's entry in `DEFS`.

## Adding a portal kind

Add a branch to `buildPortal()` in `index.html` that draws decoration behind the circle (`bh`) and styles its rim (`rimCss`). The circle itself, the preview and the dive are handled for you.

## Before opening a pull request

```sh
npm install
npx playwright install chromium
npm test
```

Include a screenshot or short GIF of what you changed.
