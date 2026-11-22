// Smoke test: step through every beat of both decks, forward and back,
// in a normal page and inside a sandboxed iframe, and fail on any script error.
//
//   npm test
//
// Set GSAP_FILE=/path/to/gsap.min.js to serve GSAP locally when the CDN is unreachable.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DECKS = [
  { file: 'index.html', presses: 20, wait: 1400 },       // 12 beats + 8 slide changes
  { file: 'zoom-deck.html', presses: 20, wait: 900 },    // 12 beats + 8 zoom dives
];

const browser = await chromium.launch();
let failed = false;

async function open(page, deck, sandboxed) {
  if (process.env.GSAP_FILE) {
    await page.route(/cdnjs\.cloudflare\.com.*gsap/, r => r.fulfill({
      body: readFileSync(process.env.GSAP_FILE), contentType: 'application/javascript', headers: { 'access-control-allow-origin': '*' },
    }));
  }
  if (!sandboxed) {
    await page.goto(pathToFileURL(path.join(root, deck.file)).href);
    return () => page;
  }
  const html = readFileSync(path.join(root, deck.file), 'utf8');
  await page.setContent('<iframe id="f" sandbox="allow-scripts" style="width:1600px;height:900px;border:0"></iframe>');
  await page.$eval('#f', (f, h) => { f.srcdoc = h; }, html);
  await page.waitForTimeout(500);
  await page.click('#f', { position: { x: 5, y: 5 } });
  return () => page.frames()[1];
}

for (const deck of DECKS) {
  for (const sandboxed of [false, true]) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const frame = await open(page, deck, sandboxed);
    // Wait for the deck to boot, then press only when it is ready: the zoom deck
    // ignores presses while a dive is animating, and CI runners can be slow.
    const ready = () => frame().waitForFunction(() => window.__deck && window.__deck.cur >= 0 && !window.__deck.busy, null, { timeout: 30000 });
    const press = async key => { await ready(); await page.keyboard.press(key); await page.waitForTimeout(deck.wait); };
    await ready();
    await page.waitForTimeout(1500);
    for (let i = 0; i < deck.presses; i++) await press('ArrowRight');
    await ready();
    const end = await frame().evaluate(() => [window.__deck.cur, window.__deck.step]);
    for (let i = 0; i < deck.presses; i++) await press('ArrowLeft');
    await ready();
    const start = await frame().evaluate(() => [window.__deck.cur, window.__deck.step]);
    const ok = errors.length === 0 && end[0] === 8 && start[0] === 0 && start[1] === 0;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${deck.file}${sandboxed ? ' (sandboxed)' : ''}  forward→${end}  back→${start}${errors.length ? '  errors: ' + errors.join(' | ') : ''}`);
    if (!ok) failed = true;
    await page.close();
  }
}

await browser.close();
process.exit(failed ? 1 : 0);
