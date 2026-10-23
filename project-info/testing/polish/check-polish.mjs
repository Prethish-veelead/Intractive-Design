// Polish-round checks. Run from the project root against a running production server:
//   npm run build && npx next start -p 3125   then   node project-info/testing/polish/check-polish.mjs
import { chromium } from "@playwright/test";

const out = "project-info/testing/polish", base = "http://localhost:3125";
const r = {}; const errors = []; const fails = [];
const check = (name, ok, detail) => { r[name] = detail === undefined ? ok : { ok, detail }; if (!ok) fails.push(name); };
const watch = (p) => {
  p.on("pageerror", (e) => errors.push("pageerror " + e.message));
  p.on("console", (m) => m.type() === "error" && !m.text().includes("404") && errors.push("console " + m.text()));
};
const b = await chromium.launch();
const newPage = async (opts) => { const p = await (await b.newContext(opts)).newPage(); watch(p); return p; };
const phone = { viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true };
const desktop = { viewport: { width: 1440, height: 900 } };
const settle = (p, ms = 700) => p.waitForTimeout(ms);
const style = (loc, prop) => loc.evaluate((e, prop) => getComputedStyle(e)[prop], prop);

// 1. Sticky Add-to-bag bar (phone) + LINE button + 3. payment line + 4. tone picker.
for (const lang of ["th", "en"]) {
  const m = await newPage(phone);
  await m.goto(`${base}/${lang}/product/velvet-kiss-matte-lipstick`); await settle(m, 1000);
  const bar = m.locator("[data-sticky-add]");
  const vh = 812;
  check(`${lang}.barHiddenAtTop`, (await bar.boundingBox()).y >= vh - 1, (await bar.boundingBox()).y);
  check(`${lang}.barSlide350ms`, (await style(bar, "transitionDuration")) === "0.35s");
  const addLabel = lang === "th" ? "เพิ่มลงตะกร้า" : "Add to bag";
  const main = m.getByRole("button", { name: addLabel }).first();
  await main.evaluate((e) => window.scrollTo(0, e.getBoundingClientRect().bottom + window.scrollY + 300));
  await settle(m);
  const barBox = await bar.boundingBox();
  check(`${lang}.barShownAfterScroll`, barBox.y + barBox.height <= vh + 1 && barBox.y < vh - 60, barBox);
  check(`${lang}.barNotInert`, !(await bar.evaluate((e) => e.inert)));
  check(`${lang}.floatingLineHiddenWithBar`, (await style(m.locator(".line-button"), "visibility")) === "hidden");
  const barLine = bar.locator("a[href^='https://line.me']");
  const barLineBox = await barLine.boundingBox();
  check(`${lang}.lineButtonInBar`, barLineBox.width >= 44 && barLineBox.height >= 44 && !!(await barLine.getAttribute("aria-label")), barLineBox);
  const payText = await m.locator("[data-pay-with]").innerText();
  const methods = ["PromptPay", "TrueMoney", "Rabbit LINE Pay", "Visa", "Mastercard"];
  check(`${lang}.paymentLine`, methods.every((x) => payText.includes(x)) && !/COD|ปลายทาง/.test(payText)
    && (await m.locator("[data-pay-with] li").count()) === 0, payText);
  await m.screenshot({ path: `${out}/375-${lang}-product-sticky-bar.png` });
  await bar.getByRole("button").tap(); await m.waitForTimeout(450);
  check(`${lang}.barAddedFeedback`, await bar.getByText(lang === "th" ? "เพิ่มแล้ว" : "Added").isVisible());
  const bagLabel = await m.locator(`header a[href='/${lang}/bag']`).getAttribute("aria-label");
  check(`${lang}.barAddsToBag`, /1/.test(bagLabel ?? ""), bagLabel);
  await m.screenshot({ path: `${out}/375-${lang}-product-sticky-added.png` });
  // Page end: the footer's legal links stay clear of the bar.
  await m.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await settle(m);
  const legal = await m.locator("footer ul").last().boundingBox();
  check(`${lang}.footerClearOfBar`, legal.y + legal.height <= (await bar.boundingBox()).y, { legalBottom: legal.y + legal.height });
  await m.screenshot({ path: `${out}/375-${lang}-product-page-end.png` });
  // Back up: bar hides when the main button is visible again, floating LINE returns.
  await main.evaluate((e) => e.scrollIntoView({ block: "center" })); await settle(m);
  check(`${lang}.barHidesAgain`, (await bar.boundingBox()).y >= vh - 1 && (await bar.evaluate((e) => e.inert)));
  check(`${lang}.floatingLineBack`, (await style(m.locator(".line-button"), "visibility")) === "visible"
    && (await style(m.locator(".line-button"), "opacity")) === "1");

  const picker = m.getByRole("radiogroup", { name: lang === "th" ? "เทียบกับ" : "Compare with" });
  await picker.evaluate((e) => e.scrollIntoView({ block: "center" })); await settle(m, 300);
  const tan = picker.getByRole("radio", { name: lang === "th" ? "ผิวแทน" : "Tan skin" });
  const medium = picker.getByRole("radio", { name: lang === "th" ? "ผิวสองสี" : "Medium skin" });
  check(`${lang}.toneDefaultMedium`, (await medium.getAttribute("aria-checked")) === "true" && (await style(m.locator("[data-tone=medium]"), "opacity")) === "1");
  await m.screenshot({ path: `${out}/375-${lang}-compare-medium.png` });
  await tan.tap(); await m.waitForTimeout(500);
  check(`${lang}.toneSwitchesToTan`, (await tan.getAttribute("aria-checked")) === "true"
    && (await style(m.locator("[data-tone=tan]"), "opacity")) === "1" && (await style(m.locator("[data-tone=medium]"), "opacity")) === "0");
  await m.screenshot({ path: `${out}/375-${lang}-compare-tan.png` });
  // Radio keys: Right wraps tan -> medium and moves focus; only the checked radio is tabbable.
  await tan.focus(); await m.keyboard.press("ArrowRight"); await m.waitForTimeout(400);
  check(`${lang}.toneArrowKeys`, (await medium.getAttribute("aria-checked")) === "true" && (await medium.evaluate((e) => e === document.activeElement))
    && (await tan.getAttribute("tabindex")) === "-1");
  const slider = m.getByRole("slider");
  await slider.focus(); await m.keyboard.press("ArrowLeft");
  check(`${lang}.sliderKeysStillWork`, (await slider.getAttribute("aria-valuenow")) === "45");
  await m.context().close();
}

// 5 (review). No compare slider for base products: one foundation shade on every tone would mislead.
{
  const p = await newPage(phone);
  await p.goto(`${base}/en/product/skin-silk-cushion`); await settle(p, 600);
  const cushion = await p.getByRole("slider").count();
  await p.goto(`${base}/en/product/airy-loose-powder`); await settle(p, 600);
  check("compareHiddenForBase", cushion === 0 && (await p.getByRole("slider").count()) === 0);
  await p.context().close();
}

// Desktop: sticky bar never shows.
{
  const d = await newPage(desktop);
  await d.goto(`${base}/en/product/velvet-kiss-matte-lipstick`); await settle(d, 1000);
  await d.evaluate(() => window.scrollTo(0, 1400)); await settle(d);
  check("desktop.barNotDisplayed", (await style(d.locator("[data-sticky-add]"), "display")) === "none");
  await d.evaluate(() => window.scrollTo(0, 250)); await settle(d);
  await d.screenshot({ path: `${out}/1440-en-product.png` });
  await d.context().close();
}

// 2. Shop-the-look hotspots on the home hero (+ 6. silk, 5. leaf shadows).
for (const [size, opts] of [["375", phone], ["1440", desktop]]) {
  for (const lang of ["th", "en"]) {
    const p = await newPage(opts);
    await p.goto(`${base}/${lang}`); await settle(p, 1600);
    const spots = p.locator("[data-hotspot] > button");
    const tag = `${size}.${lang}`;
    check(`${tag}.hotspots`, (await spots.count()) === 2);
    const [lips, cheek] = [spots.nth(0), spots.nth(1)];
    // First screen, no scrolling: the card must open fully on screen (it flips above near the bottom).
    check(`${tag}.notScrolled`, (await p.evaluate(() => window.scrollY)) === 0);
    if (size === "375") await lips.tap(); else await lips.click();
    await settle(p, 450);
    const card0 = p.locator("#look-0");
    check(`${tag}.hotspotOpens`, (await lips.getAttribute("aria-expanded")) === "true" && (await style(card0, "opacity")) === "1");
    const box0 = await card0.boundingBox();
    check(`${tag}.lipsCardOnScreen`, box0.x >= 0 && box0.x + box0.width <= opts.viewport.width && box0.y >= 0 && box0.y + box0.height <= opts.viewport.height,
      { ...box0, place: await card0.getAttribute("data-place") });
    await p.screenshot({ path: `${out}/${size}-${lang}-hero-look-open.png` });
    // On a phone the open card can cover the other dot, so switch with a direct click event.
    await cheek.dispatchEvent("click"); await settle(p, 450);
    check(`${tag}.onlyOneOpen`, (await lips.getAttribute("aria-expanded")) === "false" && (await cheek.getAttribute("aria-expanded")) === "true");
    const box1 = await p.locator("#look-1").boundingBox();
    check(`${tag}.cheekCardOnScreen`, box1.x >= 0 && box1.x + box1.width <= opts.viewport.width && box1.y >= 0 && box1.y + box1.height <= opts.viewport.height, box1);
    await p.screenshot({ path: `${out}/${size}-${lang}-hero-look-cheek.png` });
    await p.keyboard.press("Escape"); await settle(p, 400);
    check(`${tag}.escapeCloses`, (await cheek.getAttribute("aria-expanded")) === "false" && (await style(p.locator("#look-1"), "visibility")) === "hidden");
    check(`${tag}.escapeReturnsFocus`, await cheek.evaluate((e) => e === document.activeElement));
    await lips.click(); await settle(p, 300);
    await p.mouse.click(5, 300); await settle(p, 300);
    check(`${tag}.outsideClickCloses`, (await lips.getAttribute("aria-expanded")) === "false");
    // Keyboard: Tab onto the dot does not open it; Enter opens; Tab reaches the card link; Enter on the dot closes.
    await p.locator(`section a[href='/${lang}/shade-finder']`).first().focus();
    await p.keyboard.press("Tab"); await settle(p, 300);
    check(`${tag}.focusAloneDoesNotOpen`, (await lips.evaluate((e) => e === document.activeElement)) && (await lips.getAttribute("aria-expanded")) === "false");
    await p.keyboard.press("Enter"); await settle(p, 300);
    check(`${tag}.enterOpens`, (await lips.getAttribute("aria-expanded")) === "true");
    await p.keyboard.press("Tab");
    check(`${tag}.tabIntoCardLink`, await p.evaluate(() => document.activeElement?.closest("#look-0") !== null));
    await p.keyboard.press("Shift+Tab"); await p.keyboard.press("Enter"); await settle(p, 300);
    check(`${tag}.enterCloses`, (await lips.getAttribute("aria-expanded")) === "false");
    const ring = p.locator("[data-hotspot-ring]").first();
    check(`${tag}.pulseThreeTimes`, (await style(ring, "animationName")) === "hotspot-pulse" && (await style(ring, "animationIterationCount")) === "3");

    if (size === "375" && lang === "th") {
      await p.evaluate(() => window.scrollTo(0, 0)); await settle(p, 300);
      const silk = await p.locator(".silk").evaluateAll((els) => els.map((e) => { const s = getComputedStyle(e); return `${s.animationName} ${s.animationDuration} ${s.animationPlayState} ${s.willChange}`; }));
      check("silk.twoLayersDrifting", silk.length === 2 && silk.every((s) => s.includes("running") && s.endsWith("auto"))
        && new Set(silk.map((s) => s.split(" ")[1])).size === 2, silk);
      await p.evaluate(() => window.scrollTo(0, 2500)); await settle(p, 400);
      check("silk.pausedOffscreen", (await p.locator(".silk").evaluateAll((els) => els.map((e) => getComputedStyle(e).animationPlayState))).every((s) => s === "paused"));
      await p.evaluate(() => window.scrollTo(0, 0)); await settle(p, 400);
      check("silk.resumesOnScreen", (await style(p.locator(".silk").first(), "animationPlayState")) === "running");
      const leaf = p.locator("[data-leaf-shadow]");
      check("leaf.homeStatic", (await leaf.count()) === 1 && (await style(leaf, "mixBlendMode")) === "multiply"
        && (await style(leaf, "animationName")) === "none", { opacity: await style(leaf, "opacity") });
      await leaf.evaluate((e) => e.parentElement.scrollIntoView({ block: "start" })); await settle(p, 1800); // reveals finish
      await p.screenshot({ path: `${out}/375-th-brand-story-leaves.png` });
    }
    if (size === "1440") {
      await p.locator("[data-leaf-shadow]").evaluate((e) => e.parentElement.scrollIntoView({ block: "start" }));
      await settle(p, 1800);
      await p.screenshot({ path: `${out}/1440-${lang}-brand-story-leaves.png` });
    }
    await p.context().close();
  }
}

// 5b. About page header leaves, and the Thai heading never ends on "คุณ" alone.
for (const [size, opts] of [["375", phone], ["1440", desktop]]) {
  const p = await newPage(opts);
  await p.goto(`${base}/th/about`); await settle(p, 1000);
  check(`${size}.leaf.about`, (await p.locator("[data-leaf-shadow]").count()) === 1);
  const lastLine = await p.locator("h1").evaluate((h) => {
    const text = h.firstChild; const range = document.createRange(); let last = -1e9, start = 0;
    for (let i = 0; i < text.length; i++) {
      range.setStart(text, i); range.setEnd(text, i + 1);
      const top = range.getBoundingClientRect().top;
      if (top > last + 4) { last = top; start = i; }
    }
    return text.textContent.slice(start).replace(/⁠/g, "");
  });
  check(`${size}.aboutNoOrphan`, lastLine !== "คุณ", lastLine);
  await p.screenshot({ path: `${out}/${size}-th-about-leaves.png` });
  await p.goto(`${base}/th/help`); await settle(p, 300);
  check(`${size}.leaf.notOnHelp`, (await p.locator("[data-leaf-shadow]").count()) === 0);
  await p.context().close();
}

// Reduced motion: no pulse, no silk; hotspots still visible; the sticky bar slides instantly.
{
  const p = await newPage({ ...phone, reducedMotion: "reduce" });
  await p.goto(`${base}/th`); await settle(p, 600);
  const anims = async (sel) => p.locator(sel).evaluateAll((els) => els.map((e) => getComputedStyle(e).animationName));
  check("rm.noPulse", (await anims("[data-hotspot-ring]")).every((n) => n === "none"));
  check("rm.noSilk", (await anims(".silk")).every((n) => n === "none"));
  check("rm.leafStatic", (await anims("[data-leaf-shadow]")).every((n) => n === "none"));
  check("rm.hotspotsVisible", (await p.locator("[data-hotspot]").evaluateAll((els) => els.map((e) => getComputedStyle(e).opacity))).every((o) => o === "1"));
  await p.goto(`${base}/th/product/velvet-kiss-matte-lipstick`); await settle(p, 600);
  check("rm.barInstant", parseFloat(await style(p.locator("[data-sticky-add]"), "transitionDuration")) < 0.001);
  await p.context().close();
}

// No JavaScript: hotspots are hidden (they need JS), the rest renders.
{
  const p = await (await b.newContext({ ...phone, javaScriptEnabled: false })).newPage();
  await p.goto(`${base}/th`);
  check("nojs.hotspotsHidden", (await p.locator("[data-hotspot]").first().isVisible()) === false);
  await p.context().close();
}

// Home LCP and CLS: phone, 4x CPU throttling, 3 runs (median).
{
  const runs = [];
  for (let i = 0; i < 3; i++) {
    const ctx = await b.newContext(phone); const p = await ctx.newPage();
    await p.addInitScript(() => {
      window.__lcp = 0; window.__cls = 0;
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: "layout-shift", buffered: true });
    });
    const cdp = await ctx.newCDPSession(p);
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await p.goto(`${base}/th`, { waitUntil: "load" }); await p.waitForTimeout(3000);
    await p.evaluate(() => window.scrollTo(0, 600)); await p.waitForTimeout(800);
    runs.push(await p.evaluate(() => ({ lcp: Math.round(window.__lcp), cls: +window.__cls.toFixed(4) })));
    await ctx.close();
  }
  const median = (k) => runs.map((x) => x[k]).sort((a, c) => a - c)[1];
  check("vitals.homeLcpUnder1200", median("lcp") < 1200, { runs, lcp: median("lcp"), cls: median("cls") });
  check("vitals.homeClsUnder005", median("cls") < 0.05);
}

check("noConsoleErrors", errors.length === 0, errors);
console.log(JSON.stringify(r, null, 1));
console.log(fails.length ? `FAILED: ${fails.join(", ")}` : "ALL PASS");
await b.close();
