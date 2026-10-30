// Takes full-page screenshots of every page at 390px and 1440px, and reports
// horizontal overflow and broken internal links.
// Usage: npm run build && npm start   (in one terminal)
//        npm run qa   (screenshots go to qa/, which is git-ignored)
//        node scripts/qa-screenshots.mjs [baseUrl] [outDir]
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "qa";
const only = process.env.PAGES?.split(",");

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
let pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
pages.push("/this-page-does-not-exist");
if (only) pages = pages.filter((p) => only.includes(p));

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const seenLinks = new Set();
const problems = [];

for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  for (const p of pages) {
    const res = await page.goto(base + p, { waitUntil: "networkidle" });
    if (!res || (res.status() >= 400 && !p.includes("does-not-exist"))) problems.push(`${p}: HTTP ${res?.status()}`);
    // Scroll through so whileInView animations run before the screenshot
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) problems.push(`${p} @${width}px: horizontal overflow ${overflow}px`);
    const links = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")));
    links.forEach((l) => seenLinks.add(l.split("#")[0]));
    const name = (p === "/" ? "home" : p.slice(1).replace(/\//g, "_")) + `-${width}.png`;
    await page.screenshot({ path: path.join(outDir, name), fullPage: true });
  }
  await context.close();
}

for (const link of seenLinks) {
  if (!link) continue;
  const res = await fetch(base + link);
  if (res.status >= 400) problems.push(`Broken link: ${link} -> ${res.status}`);
}

await browser.close();
console.log(`Checked ${pages.length} pages and ${seenLinks.size} internal links.`);
console.log(problems.length ? problems.join("\n") : "No problems found.");
