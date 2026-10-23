// Task 3 content checks. Run from the project root against a running server:
//   npx next start -p 3123  then  node project-info/testing/task-3/check-content.mjs
import { chromium } from "@playwright/test";
const out = "project-info/testing/task-3", base = "http://localhost:3123";
const pages = ["", "/shop/lips", "/shop/face", "/shop/eyes", "/shop/lashes", "/shop/sets", "/product/skin-silk-cushion", "/gifts", "/shade-finder",
  "/journal", "/journal/songkran-waterproof-look", "/about", "/help", "/contact", "/privacy", "/terms", "/cookies"];
const r = { pages: {}, errors: [] };
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 375, height: 812 } });
p.on("pageerror", (e) => r.errors.push(`${p.url()} pageerror ${e.message}`));
p.on("console", (m) => m.type() === "error" && !m.text().includes("404") && r.errors.push(`${p.url()} console ${m.text()}`));
for (const lang of ["th", "en"]) {
  for (const path of pages) {
    const res = await p.goto(`${base}/${lang}${path}`);
    const h1 = await p.locator("h1:visible").first().innerText().catch(() => "(no h1)");
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    r.pages[`/${lang}${path}`] = `${res.status()} | ${h1.replace(/\n/g, " ").slice(0, 40)}${overflow ? " | HORIZONTAL OVERFLOW" : ""}`;
  }
}
// Broken internal links: collect every href on every page, request each once.
const hrefs = new Set();
for (const lang of ["th", "en"]) for (const path of pages) {
  await p.goto(`${base}/${lang}${path}`);
  (await p.locator("a[href^='/']").evaluateAll((as) => as.map((a) => a.getAttribute("href")))).forEach((h) => hrefs.add(h.split("#")[0]));
}
r.brokenLinks = [];
for (const h of hrefs) {
  const html = await (await fetch(base + h)).text();
  if (html.includes("NEXT_HTTP_ERROR_FALLBACK;404")) r.brokenLinks.push(h);
}
// Filters on Lips
await p.goto(`${base}/en/shop/lips`); await p.waitForTimeout(600);
await p.getByRole("button", { name: "Filters" }).click();
await p.getByRole("button", { name: "Glossy" }).click(); await p.waitForTimeout(300);
r.filterGlossy = await p.locator("main ul li:not([hidden])").count();
r.filterCountText = await p.locator("[aria-live=polite]").first().innerText();
await p.screenshot({ path: out + "/filters-glossy-375.png" });
await p.getByRole("button", { name: "Clear filters" }).click();
await p.selectOption("select", "priceHigh"); await p.waitForTimeout(300);
r.sortFirst = await p.locator("main ul li:not([hidden])").evaluateAll((lis) => lis.sort((a, b) => Number(a.style.order) - Number(b.style.order)).map((li) => li.querySelector("h3")?.textContent)[0]);
// Product gallery + details
await p.goto(`${base}/th/product/velvet-kiss-matte-lipstick`); await p.waitForTimeout(600);
await p.getByRole("button", { name: "สีบนผิว" }).click(); await p.waitForTimeout(600);
r.galleryLabel = await p.locator("[data-shade-art]").getAttribute("aria-label");
await p.screenshot({ path: out + "/product-gallery-swatch-375.png" });
r.ingredientsOpen = await p.getByText("วิธีใช้").first().isVisible();
await p.locator("#reviews").scrollIntoViewIfNeeded(); await p.waitForTimeout(700);
await p.screenshot({ path: out + "/product-reviews-375.png" });
// Shade finder: medium, warm, matte
await p.goto(`${base}/en/shade-finder`); await p.waitForTimeout(600);
await p.getByRole("button", { name: "Medium" }).click(); await p.waitForTimeout(300);
await p.getByRole("button", { name: /^Warm/ }).click(); await p.waitForTimeout(300);
await p.getByRole("button", { name: /^Matte/ }).click(); await p.waitForTimeout(800);
r.quizResults = await p.locator("main ul li a").evaluateAll((as) => as.map((a) => a.innerText.replace(/\n/g, " / ")));
await p.screenshot({ path: out + "/shade-finder-result-375.png", fullPage: true });
// 404
const nf = await p.goto(`${base}/th/does-not-exist`);
r.notFound = `${nf.status()} | ${await p.locator("h1").first().innerText()}`;
await p.screenshot({ path: out + "/not-found-th-375.png" });
// Desktop screenshots of new pages
const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const [name, path] of [["journal", "/th/journal"], ["article", "/th/journal/songkran-waterproof-look"], ["help", "/th/help"], ["contact", "/en/contact"], ["gifts", "/th/gifts"], ["shade-finder", "/th/shade-finder"], ["product", "/en/product/velvet-kiss-matte-lipstick"]]) {
  await d.goto(base + path); await d.waitForTimeout(700);
  for (let y = 0; y < 6000; y += 600) { await d.mouse.wheel(0, 600); await d.waitForTimeout(80); }
  await d.waitForTimeout(800); await d.evaluate(() => window.scrollTo(0, 0)); await d.waitForTimeout(300);
  await d.screenshot({ path: `${out}/${name}-1440.png`, fullPage: true });
}
console.log(JSON.stringify(r, null, 1));
await b.close();
