// Design review screenshots. Run from project root against `npx next start -p 3126`.
import { chromium } from "@playwright/test";
const out = "project-info/testing/review", base = "http://localhost:3126";
const r = {};
const b = await chromium.launch();
const ctx = async (w, h, extra = {}) => (await b.newContext({ viewport: { width: w, height: h }, ...extra })).newPage();

for (const [w, h] of [[375, 812], [1440, 900]]) {
  for (const path of ["/th", "/en", "/th/product/velvet-kiss-matte-lipstick", "/en/product/skin-silk-cushion", "/th/about"]) {
    const p = await ctx(w, h);
    await p.goto(base + path); await p.waitForTimeout(1500);
    const name = `${w}${path.replace(/\//g, "_")}`;
    await p.screenshot({ path: `${out}/${name}-top.png` });
    await p.close();
  }
}

// Hotspots, mobile + desktop
for (const [w, h] of [[375, 812], [1440, 900]]) {
  const p = await ctx(w, h);
  await p.goto(base + "/th"); await p.waitForTimeout(1600);
  const dots = p.locator("[data-hotspot] > button");
  r[`dots${w}`] = await dots.evaluateAll((els) => els.map((e) => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), b.width]; }));
  await dots.nth(0).scrollIntoViewIfNeeded();
  await dots.nth(0).click(); await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/${w}-th-hotspot0.png` });
  r[`card0_${w}`] = await p.locator("#look-0").evaluate((e) => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.right), Math.round(b.bottom)]; });
  await dots.nth(1).click(); await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/${w}-th-hotspot1.png` });
  r[`card1_${w}`] = await p.locator("#look-1").evaluate((e) => { const b = e.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.right), Math.round(b.bottom)]; });
  await p.keyboard.press("Escape"); await p.waitForTimeout(400);
  r[`focusAfterEsc${w}`] = await p.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  // keyboard: focus ring visibility
  await p.goto(base + "/th"); await p.waitForTimeout(1600);
  for (let i = 0; i < 30; i++) {
    await p.keyboard.press("Tab");
    const isDot = await p.evaluate(() => !!document.activeElement?.closest("[data-hotspot]") && document.activeElement.tagName === "BUTTON");
    if (isDot) break;
  }
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/${w}-th-hotspot-keyboard.png` });
  r[`dotFocusOutline${w}`] = await p.evaluate(() => { const s = document.activeElement.querySelector("span:nth-child(2)"); const cs = getComputedStyle(s); return cs.boxShadow; });
  // silk positions
  r[`silk${w}`] = await p.locator(".silk").evaluateAll((els) => els.map((e) => { const b = e.getBoundingClientRect(); return [Math.round(b.width), getComputedStyle(e).animationName]; }));
  await p.close();
}

// Product mobile: sticky bar, tone picker
for (const path of ["/th/product/velvet-kiss-matte-lipstick", "/en/product/skin-silk-cushion"]) {
  const p = await ctx(375, 812);
  await p.goto(base + path); await p.waitForTimeout(1200);
  const tag = path.split("/")[1] + "-" + path.split("/").pop();
  await p.evaluate(() => window.scrollTo(0, 1100)); await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/375-${tag}-sticky.png` });
  r[`sticky-${tag}`] = await p.locator("[data-sticky-add]").evaluate((e) => ({ top: Math.round(e.getBoundingClientRect().top), inert: e.inert }));
  r[`line-${tag}`] = await p.locator(".line-button").evaluate((e) => Math.round(e.getBoundingClientRect().bottom));
  // pay pills
  const pills = p.locator("ul li", { hasText: "PromptPay" }).first();
  r[`pill-${tag}`] = await pills.evaluate((e) => { const cs = getComputedStyle(e); return [cs.fontSize, cs.color, e.getBoundingClientRect().height]; }).catch(() => null);
  const group = p.locator("[role=group]").last();
  if (await group.count()) {
    await group.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 150)); await p.waitForTimeout(400);
    await p.screenshot({ path: `${out}/375-${tag}-tone-medium.png` });
    await group.locator("button").nth(1).click(); await p.waitForTimeout(500);
    await p.screenshot({ path: `${out}/375-${tag}-tone-tan.png` });
    r[`toneFont-${tag}`] = await group.locator("button").nth(0).evaluate((e) => [getComputedStyle(e).fontSize, e.getBoundingClientRect().height]);
  }
  // footer w/ sticky bar
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/375-${tag}-bottom.png` });
  await p.close();
}

// Desktop product compare + pills
{
  const p = await ctx(1440, 900);
  await p.goto(base + "/th/product/velvet-kiss-matte-lipstick"); await p.waitForTimeout(1200);
  await p.locator("[role=group]").last().scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/1440-th-product-compare.png` });
  await p.close();
}

// Brand story leaves
for (const [w, h] of [[375, 812], [1440, 900]]) {
  const p = await ctx(w, h);
  await p.goto(base + "/th"); await p.waitForTimeout(1200);
  await p.locator("[data-leaf-shadow]").first().evaluate((e) => e.parentElement.scrollIntoView());
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/${w}-th-brandstory.png` });
  await p.close();
}

// Reduced motion
{
  const p = await ctx(375, 812, { reducedMotion: "reduce" });
  await p.goto(base + "/th"); await p.waitForTimeout(800);
  r.rmSilk = await p.locator(".silk").first().evaluate((e) => getComputedStyle(e).animationName);
  r.rmRing = await p.locator("[data-hotspot-ring]").first().evaluate((e) => getComputedStyle(e).animationName);
  await p.screenshot({ path: `${out}/375-th-reduced.png` });
  await p.goto(base + "/th/product/velvet-kiss-matte-lipstick"); await p.waitForTimeout(800);
  r.rmStickyTransition = await p.locator("[data-sticky-add]").evaluate((e) => getComputedStyle(e).transitionDuration);
  await p.close();
}
console.log(JSON.stringify(r, null, 1));
await b.close();
