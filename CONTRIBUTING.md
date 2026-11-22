# Contributing

Thanks for helping! New characters, portals and scene backdrops are especially welcome.

## Ground rules

- **Keep it one file per deck.** No build step and no new runtime dependencies besides GSAP.
- **Original art only.** Draw your own characters; no recreations of existing brands, games or mascots.
- **Keep the bottom ~150 px of a scene clear** for the presenters.
- **Every beat must be rewindable.** A scene's `setStep(n, instant)` has to produce beat *n* from any direction.
- **Must run in a sandboxed iframe.** Wrap browser APIs that previews block (history, full screen) in `try`/`catch`.

## Adding a character

1. Draw it as rows of characters plus a palette (see the gecko `GK` or `ZIP_ROWS` for Zip).
2. Render it with `spriteSVG(frames, palette, pixelSize)`.
3. **In `index.html`:** add it to the garden in the `Scene` module, next to the koi, lizard and gecko, with an idle loop and a click reaction.
4. **In `zoom-deck.html`:** place it with `makeActor(scene, html, { x, y, w, h, title })` and give it an `arrive` line in its scene's entry in `DEFS`.

## Adding a portal kind

Add a branch to `buildPortal()` in `zoom-deck.html` that draws decoration behind the circle (`bh`) and styles its rim (`rimCss`). The circle itself, the preview and the dive are handled for you.

## Before opening a pull request

```sh
npm install
npx playwright install chromium
npm test
```

Include a screenshot or short GIF of what you changed.
