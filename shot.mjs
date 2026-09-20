import { chromium } from "playwright";

const BASE = "http://localhost:4180";
const OUT = "/Users/amnasahamed/Desktop/m3/shots";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

await page.goto(BASE, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/mj-01-gate.png` });

// open the invitation
await page.getByText("Open Invitation").click();
await page.waitForTimeout(2600);
await page.screenshot({ path: `${OUT}/mj-02-hero.png` });

// full scroll-through captures
const stops = [
  ["invite", 0.14],
  ["couple", 0.30],
  ["events", 0.48],
  ["venue", 0.68],
  ["rsvp", 0.84],
  ["footer", 1.0],
];
for (const [name, frac] of stops) {
  await page.evaluate((f) => {
    const h = document.body.scrollHeight - window.innerHeight;
    window.scrollTo({ top: h * f, behavior: "instant" });
  }, frac);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/mj-03-${name}.png` });
}

await browser.close();
console.log("done");
