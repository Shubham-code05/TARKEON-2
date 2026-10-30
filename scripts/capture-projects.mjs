// Takes desktop and mobile screenshots of every project in content/projects.ts that has a
// liveUrl, and records their pixel sizes in content/project-images.json. DeviceMockup picks
// them up from there, so a new project only needs its liveUrl and one run of this script.
// Usage: npm run capture            (all projects)
//        npm run capture -- <slug>  (one project)
import { chromium } from "playwright";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const MAX_BYTES = 240 * 1024;
// Long enough for the hover scroll, short enough to stay light
const MAX_DESKTOP_HEIGHT = 4200;
const outDir = "public/images/work";
const manifestPath = "content/project-images.json";

const source = fs
  .readFileSync("content/projects.ts", "utf8")
  .split("\n")
  .filter((line) => !line.trim().startsWith("//"))
  .join("\n");
const only = process.argv[2];
const projects = [...source.matchAll(/slug: "([^"]+)"[\s\S]*?liveUrl: "([^"]+)"/g)]
  .map((m) => ({ slug: m[1], url: m[2] }))
  .filter((p) => !only || p.slug === only);

const dismissLabels = /^(accept( all)?|i agree|agree|allow( all)?|got it|ok(ay)?|close|no,? thanks|dismiss|×|x)$/i;

async function dismissPopups(page) {
  await page.keyboard.press("Escape").catch(() => {});
  for (const role of ["button", "link"]) {
    const items = await page.getByRole(role, { name: dismissLabels }).all();
    for (const item of items.slice(0, 5)) {
      if (await item.isVisible().catch(() => false)) await item.click({ timeout: 1500 }).catch(() => {});
    }
  }
  await page.locator('[aria-label*="close" i], [class*="popup" i] [class*="close" i], [class*="modal" i] [class*="close" i]').evaluateAll((els) => {
    for (const el of els) if (el.offsetParent) el.click();
  });
  // Stuck preloaders (fixed, full-screen, no text) and "install our app" bars
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed") continue;
      const box = el.getBoundingClientRect();
      const fullScreen = box.width >= innerWidth * 0.9 && box.height >= innerHeight * 0.9;
      if ((fullScreen && el.innerText.trim().length < 5) || /install app/i.test(el.innerText)) el.remove();
    }
  });
}

async function open(browser, url, viewport, deviceScaleFactor) {
  const context = await browser.newContext({ viewport, deviceScaleFactor, isMobile: viewport.width < 500, hasTouch: viewport.width < 500 });
  const page = await context.newPage();
  // "load" can hang on slow third-party scripts, so the page gets a fixed time to settle instead
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  // Some sites sit on a loading spinner for a long time; a shot of that is useless
  await page.waitForFunction(() => document.body.innerText.trim().length > 300, null, { timeout: 90000 });
  await page.waitForTimeout(6000); // popups, intro fades and hero sliders settle after load
  await dismissPopups(page);
  // Scroll through so lazy images and scroll animations load before the shot
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(3000);
  await dismissPopups(page);
  await page.waitForTimeout(1000);
  return { context, page };
}

async function save(png, file, maxHeight) {
  const meta = await sharp(png).metadata();
  // Image-heavy sites can't fit the limit at full length, so shorten the page before
  // dropping the quality far enough to blur its text
  for (const limit of [maxHeight, 3200, 2400, 1800]) {
    const height = Math.min(meta.height, limit);
    const cropped = sharp(png).extract({ left: 0, top: 0, width: meta.width, height });
    for (const quality of [82, 74, 66, 58]) {
      const out = await cropped.clone().webp({ quality, effort: 6 }).toBuffer();
      if (out.length > MAX_BYTES) continue;
      fs.writeFileSync(path.join(outDir, file), out);
      console.log(`  ${file} ${meta.width}x${height} q${quality} ${Math.round(out.length / 1024)} KB`);
      return { width: meta.width, height };
    }
  }
  throw new Error(`${file} does not fit in ${MAX_BYTES / 1024} KB`);
}

fs.mkdirSync(outDir, { recursive: true });
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};
const browser = await chromium.launch();
const failed = [];

for (const { slug, url } of projects) {
  console.log(`${slug}: ${url}`);
  try {
    const desktop = await open(browser, url, { width: 1440, height: 900 }, 1);
    const desktopSize = await save(await desktop.page.screenshot({ fullPage: true }), `${slug}-desktop.webp`, MAX_DESKTOP_HEIGHT);
    await desktop.context.close();

    const mobile = await open(browser, url, { width: 390, height: 844 }, 2);
    const mobileSize = await save(await mobile.page.screenshot(), `${slug}-mobile.webp`, Infinity);
    await mobile.context.close();

    manifest[slug] = { desktop: desktopSize, mobile: mobileSize };
  } catch (err) {
    failed.push(`${slug}: ${err.message}`);
  }
}

await browser.close();
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(failed.length ? `Failed:\n${failed.join("\n")}` : "All screenshots saved.");
