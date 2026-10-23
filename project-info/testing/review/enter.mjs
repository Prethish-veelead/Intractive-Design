import { chromium } from "@playwright/test";
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto("http://localhost:3126/th"); await p.waitForTimeout(1500);
for (let i = 0; i < 40; i++) { await p.keyboard.press("Tab"); if (await p.evaluate(() => document.activeElement?.tagName === "BUTTON" && !!document.activeElement.closest("[data-hotspot]"))) break; }
const st = async () => p.evaluate(() => document.activeElement.getAttribute("aria-expanded"));
console.log("after focus", await st());
await p.keyboard.press("Enter"); await p.waitForTimeout(200);
console.log("after Enter", await st());
await p.keyboard.press("Enter"); await p.waitForTimeout(200);
console.log("after 2nd Enter", await st());
await b.close();
