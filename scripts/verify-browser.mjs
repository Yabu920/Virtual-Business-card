import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const require = createRequire(
  new URL("../test-results/tools/package.json", import.meta.url),
);
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const jsQR = require("jsqr");
const { PNG } = require("pngjs");
const baseURL = process.env.TEST_URL || "http://localhost:3000";
const browser = await chromium.launch({
  headless: true,
  channel: process.env.TEST_BROWSER || "chrome",
});
const results = [];
await mkdir(new URL("../test-results/", import.meta.url), { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  const response = await page.goto(baseURL);
  assert.equal(response.status(), 200);
  assert.equal(await page.title(), "Yeabsra Abera | Software Developer");
  await page.getByRole("heading", { name: "Yeabsra Abera." }).waitFor();
  for (const [width, height] of [
    [320, 667],
    [375, 667],
    [390, 844],
    [430, 932],
    [768, 1024],
    [1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    await page.evaluate(() => window.scrollTo(0, 0));
    const metrics = await page.evaluate(() => ({
      width: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      actions: [
        ...document.querySelectorAll(".save-contact,.quick-actions>a"),
      ].map((el) => {
        const r = el.getBoundingClientRect();
        return { height: r.height, bottom: r.bottom, width: r.width };
      }),
    }));
    assert.ok(
      metrics.scrollWidth <= width,
      "No horizontal overflow at " + width,
    );
    for (const action of metrics.actions) {
      assert.ok(action.height >= 44);
      assert.ok(
        action.bottom <= height,
        "Primary contact actions above fold at " + width,
      );
    }
    await page.screenshot({
      path: "test-results/layout-" + width + ".png",
      fullPage: true,
    });
    results.push("Responsive layout and above-fold actions: " + width + "px");
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const actualLinks = await page
    .locator("a")
    .evaluateAll((links) =>
      links.map((a) => ({
        href: a.getAttribute("href"),
        target: a.target,
        rel: a.rel,
      })),
    );
  for (const link of actualLinks)
    if (link.target === "_blank") {
      assert.ok(link.rel.includes("noopener"));
      assert.ok(link.rel.includes("noreferrer"));
    }
  for (const url of [
    "tel:+251912464134",
    "tel:+251967248487",
    "mailto:Yeab920@gmail.com",
    "https://wa.me/251912464134",
    "https://bluecodes.com.et",
    "https://www.linkedin.com/in/yeabsra-abera-302ba52b3",
    "https://github.com/Yabu920",
    "https://www.instagram.com/y_a_b_u_n_a",
    "https://t.me/Yeab985",
    "https://konjobuna.com",
    "https://omegagarment.com.et",
  ])
    assert.ok(
      actualLinks.some((a) => a.href === url),
      url,
    );
  results.push("All supplied contact, social, and project destinations match");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: /Save Contact/ }).click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "yeabsra-abera.vcf");
  const downloaded = await readFile(await download.path(), "utf8");
  assert.equal(
    downloaded,
    await readFile(
      new URL("../public/yeabsra-abera.vcf", import.meta.url),
      "utf8",
    ),
  );
  results.push("Save Contact downloads correct vCard");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text) => {
          window.__copied = text;
        },
      },
    });
  });
  await page.getByRole("button", { name: "Share Profile" }).click();
  await page
    .getByRole("status")
    .filter({ hasText: "Profile link copied" })
    .waitFor();
  assert.equal(await page.evaluate(() => window.__copied), baseURL + "/");
  results.push("Clipboard sharing fallback");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (data) => {
        window.__shared = data;
      },
    }),
  );
  await page.getByRole("button", { name: "Share Profile" }).click();
  assert.equal((await page.evaluate(() => window.__shared)).url, baseURL + "/");
  results.push("Web Share API payload");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async () => {
        throw new DOMException("Cancelled", "AbortError");
      },
    }),
  );
  await page.getByRole("button", { name: "Share Profile" }).click();
  assert.equal(await page.locator(".share-message").innerText(), "");
  results.push("Share cancellation is quiet");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("denied");
        },
      },
    });
  });
  await page.getByRole("button", { name: "Share Profile" }).click();
  assert.equal(
    await page
      .getByRole("textbox", { name: "Profile link to copy" })
      .inputValue(),
    baseURL + "/",
  );
  results.push("Manual link fallback when clipboard is denied");
  await page.reload();
  await page.locator(".qr-section summary").click();
  await page.locator(".qr-code svg").waitFor();
  const qrPng = PNG.sync.read(await page.locator(".qr-code").screenshot());
  const decoded = jsQR(
    new Uint8ClampedArray(qrPng.data),
    qrPng.width,
    qrPng.height,
  );
  assert.equal(decoded?.data, baseURL + "/");
  results.push("Rendered QR decodes to browser URL");
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  await writeFile(
    "test-results/accessibility.json",
    JSON.stringify(audit, null, 2),
  );
  assert.deepEqual(
    audit.violations.map((v) => ({
      id: v.id,
      description: v.description,
      nodes: v.nodes.map((n) => n.target),
    })),
    [],
  );
  results.push("Automated WCAG A/AA accessibility scan: no violations");
  await page.reload();
  await page.keyboard.press("Tab");
  assert.equal(
    await page.locator(":focus").innerText(),
    "Skip to contact card",
  );
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => location.hash), "#main");
  results.push("Keyboard skip link");
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page
      .locator(".save-contact")
      .evaluate((el) => getComputedStyle(el).transitionDuration),
    "0s",
  );
  results.push("Reduced-motion preference");
  const avatarImage = page.locator(".avatar img");
  assert.equal(
    new URL(await avatarImage.getAttribute("src"), baseURL).pathname,
    "/yeabsra.jpg",
  );
  assert.equal(await avatarImage.getAttribute("alt"), "Yeabsra Abera");
  assert.ok(
    await avatarImage.evaluate((image) => image.complete && image.naturalWidth > 0),
    "Profile image should load successfully",
  );
  assert.deepEqual(errors, []);
  results.push("Yeabsra profile image loads; no browser console or runtime errors");
  await writeFile(
    "test-results/browser-results.json",
    JSON.stringify(results, null, 2),
  );
  console.log(results.join("\n"));
} finally {
  await browser.close();
}
