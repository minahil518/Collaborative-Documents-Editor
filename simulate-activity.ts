import { chromium, type Page } from "playwright";
const URL = process.env.URL ?? "http://localhost:3000";
const EDITOR = process.env.EDITOR ?? '[contenteditable="true"]';
const INTERVAL_MS = Number(process.env.INTERVAL ?? 10);
const EDIT_PROBABILITY = Number(process.env.EDIT_PROBABILITY ?? 0.35);
const MOVE_STEPS = Number(process.env.MOVE_STEPS ?? 36);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
let curX: number | null = null;
let curY: number | null = null;

async function getViewport(page: Page) {
  const vp = page.viewportSize();
  if (vp) return vp;
  return page.evaluate(() => ({ width: window.innerWidth, height: window.innerHeight }));
}
async function anchorMouse(page: Page) {
  const vp = await getViewport(page);
  curX = Math.round(vp.width / 2);
  curY = Math.round(vp.height / 2);
  await page.mouse.move(curX, curY, { steps: 8 });
}

async function randomMouseMove(page: Page) {
  if (curX == null || curY == null) await anchorMouse(page);

  const vp = await getViewport(page);
  const margin = 24;
  const destX = rand(margin, vp.width - margin);
  const destY = rand(margin, vp.height - margin);

  const mid1X = (curX as number) + rand(-60, 60);
  const mid1Y = (curY as number) + rand(-60, 60);
  const mid2X = destX + rand(-60, 60);
  const mid2Y = destY + rand(-60, 60);

  const segSteps = Math.max(8, Math.floor(MOVE_STEPS / 3));
  await page.mouse.move(mid1X, mid1Y, { steps: segSteps });
  await page.mouse.move(mid2X, mid2Y, { steps: segSteps });
  await page.mouse.move(destX, destY, { steps: segSteps });

  curX = destX;
  curY = destY;
}

async function tinyEdit(page: Page) {
  const editable = page.locator(EDITOR).first();
  if (!(await editable.count())) return;

  const box = await editable.boundingBox();
  if (!box) return;

  const clickX = Math.round(box.x + Math.min(24, Math.max(8, box.width * 0.1)));
  const clickY = Math.round(box.y + Math.min(24, Math.max(8, box.height * 0.1)));

  await page.mouse.move(clickX, clickY, { steps: 12 });
  await editable.click({
    position: { x: Math.max(2, clickX - box.x), y: Math.max(2, clickY - box.y) },
  });
  await page.keyboard.type(" ");
  await page.keyboard.press("Backspace");
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const cleanup = async () => {
    try { await page.close({ runBeforeUnload: true }); } catch {}
    try { await ctx.close(); } catch {}
    try { await browser.close(); } catch {}
    process.exit(0);
  };
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  console.log(`Opening ${URL} ...`);
  await page.goto(URL, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(EDITOR, { timeout: 30_000 }).catch(() => {});
  await anchorMouse(page);

  console.log(
    `Simulating activity every ~${Math.round(INTERVAL_MS / 1000)}s ` +
      `(tiny edits ~${Math.round(EDIT_PROBABILITY * 100)}% of cycles). Ctrl+C to stop.`
  );
  while (true) {
    try {
      await randomMouseMove(page);
      if (Math.random() < EDIT_PROBABILITY) await tinyEdit(page);
    } catch (err) {
      console.warn("Iteration error:", (err as Error)?.message ?? err);
    }
    const jitter = rand(-2000, 2000);
    await sleep(Math.max(1000, INTERVAL_MS + jitter));
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
export {};


// Run with:  npx tsx simulate-activity.ts
