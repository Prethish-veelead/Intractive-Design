import { chromium } from "@playwright/test";
const out = "project-info/testing/review", base = "http://localhost:3126";
const b = await chromium.launch(); const r = {};
for (const [w, h] of [[375, 812], [1440, 900]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(base + "/th"); await p.waitForTimeout(1200);
  const y = await p.locator("[data-leaf-shadow]").first().evaluate((e) => e.parentElement.getBoundingClientRect().top + scrollY);
  for (let s = 0; s < y; s += 300) { await p.mouse.wheel(0, 300); await p.waitForTimeout(80); }
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `${out}/${w}-th-brandstory2.png` });
  r[w] = await p.locator("[data-leaf-shadow]").first().evaluate((e) => { const c = getComputedStyle(e); return [c.opacity, c.mixBlendMode, c.zIndex, e.getBoundingClientRect().width|0, e.getBoundingClientRect().height|0]; });
  // hero mobile scrolled so photo visible
  if (w === 375) {
    await p.goto(base + "/th"); await p.waitForTimeout(1500);
    await p.evaluate(() => window.scrollTo(0, 420)); await p.waitForTimeout(600);
    await p.screenshot({ path: `${out}/375-th-hero-photo.png` });
    await p.locator("[data-hotspot] > button").first().click(); await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/375-th-hero-photo-lip-open.png` });
    // contrast of hotspot dot vs photo: sample the hint
    r.cardFont = await p.locator("#look-0 a span span").first().evaluate((e) => [getComputedStyle(e).fontSize, getComputedStyle(e).fontWeight, getComputedStyle(e).fontFamily]);
    // tab to the card link and ensure link focus visible
  }
  await p.close();
}
// product en desktop + cushion mobile bottom
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto(base + "/en/product/skin-silk-cushion"); await p.waitForTimeout(1500);
await p.evaluate(() => window.scrollTo(0, 350)); await p.waitForTimeout(500);
await p.screenshot({ path: `${out}/1440-en-cushion-mid.png` });
r.payWithColor = await p.locator("text=Pay with").last().evaluate((e) => getComputedStyle(e).color);
await b.close(); console.log(JSON.stringify(r));
