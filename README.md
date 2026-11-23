# Peapod 🌱

**Your slides, with tiny friends.**

Most presentations are a wall of bullet points and a room full of people checking their phones. Peapod slides come with a cast.

Meet Sprig, a little sprout who hops across the bottom of every slide, jumps onto whatever you're talking about, and throws a confetti party at the end. Meanwhile, the garden gets on with its day. Birds land on Sprig's head. A koi leaps out of the pond. A snake slithers past and startles Zip, Sprig's sparky little sidekick.

It's hard to look away from a hopping sprout.

![Sprig and Zip in the garden, then Sprig hops to the next slide and lands on the highlighted bar](docs/slides.gif)

### **[▶ Try the demo](https://nzzl.github.io/peapod-deck/)**

Press → to start. Click the critters. Press **N** for secret presenter notes.

## Why you might like it

- **It's one file.** Nothing to install. Just open it in a browser and present.
- **It moves with you.** Headlines fly in word by word, highlighter sweeps across key phrases, and Sprig hops over to point at the important bit.
- **It's interactive.** Flip a before/after switch, click around a diagram, or drag sliders live on stage.
- **It keeps the room company.** While you talk, Sprig stretches, waves at Zip and watches the birds.
- **It's yours.** Swap in your own words and keep the friends.

## Feeling fancy? Try the zoom version

![Diving into the flower: the title scene zooms through a flower into the next slide](docs/dive.gif)

In **[the zoom version](https://nzzl.github.io/peapod-deck/zoom-deck.html)**, every slide lives inside something on the slide before it: a flower, a dewdrop, a bubble, the setting sun. Press → and you dive right in. Each slide gets its own presenter from the cast, and at the end everyone comes out for a party.

## Meet the garden

| Who | What they get up to |
|---|---|
| 🌱 **Sprig** | Hops to every slide, lands on the good stuff, hands out tips when clicked |
| ⚡ **Zip** | Follows Sprig everywhere and cheers at the good bits |
| 🐦 **The bluebirds** | Hop between the trees and sometimes nap on Sprig's head |
| 🐟 **The koi** | Leaps out of the lily pond whenever it feels like it |
| 🦎 **Monty** | A monitor lizard on a slow stroll who also swims, apparently |
| 🐍 **Noodle** | A friendly snake who is very long |
| 🌿 **Gigi** | A gecko who scurries up the tree trunks and licks her own eyeballs |
| 🦋 **The butterfly** | Visits the flowers and, if you're lucky, Sprig |

## Make it your own

1. **Download** `index.html`.
2. **Change the words.** Each slide is a clearly marked section in the file, and the speaker notes sit near the bottom.
3. **Open it in your browser** and press **F** for full screen.

**Keys:** `→` / `Space` next · `←` back · `F` full screen · `R` replay a slide · `N` notes · `Home` / `End` first / last slide

## Under the hood

For the curious:

- Every slide is designed at 1920 × 1080 and scaled to fit any screen.
- The critters are drawn from little text grids, like `'.kgggk.'`, turned into crisp pixel art in SVG. No image files.
- Sprig's hop is one [GSAP](https://gsap.com) timeline with squash, stretch and an elastic landing. The rest of the garden listens for it, which is how Zip follows and birds fly off.
- Each slide can rewind itself to any beat, so going back never breaks an animation.
- In the zoom version, the next slide sits inside a portal on the current one as a live preview. After each dive the camera quietly resets, so you can dive forever without anything going blurry.

To run the automated check, which clicks through both decks forwards and back:

```sh
npm install
npx playwright install chromium
npm test
```

Contributions are welcome, especially new critters. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

- Code and artwork: [MIT](LICENSE)
- Animation: [GSAP](https://gsap.com), loaded from cdnjs under [its own licence](https://gsap.com/standard-license)
- Fonts: Space Grotesk, Inter and JetBrains Mono from Google Fonts (SIL Open Font License)
