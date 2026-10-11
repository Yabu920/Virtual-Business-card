import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createVCard, escapeVCard, foldLine } from "../scripts/vcard.mjs";
const p = JSON.parse(
  readFileSync(new URL("../data/profile.json", import.meta.url), "utf8"),
);
test("vCard contains the supplied contact details with CRLF and valid boundaries", () => {
  const card = createVCard(p);
  assert.ok(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
  assert.ok(card.endsWith("END:VCARD\r\n"));
  assert.ok(!/(?<!\r)\n/.test(card));
  for (const text of [
    "N:Abera;Yeabsra;;;",
    "FN:Yeabsra Abera",
    "ORG:Bluecode Technology Solution",
    "TITLE:Software Developer",
    "TEL;TYPE=CELL,PREF:+251912464134",
    "TEL;TYPE=CELL:+251967248487",
    "EMAIL;TYPE=INTERNET:Yeab920@gmail.com",
    "URL:https://bluecodes.com.et",
    "ADR;TYPE=WORK:;;Ayat;Addis Ababa;;;Ethiopia",
    "https://www.linkedin.com/in/yeabsra-abera-302ba52b3",
    "https://github.com/Yabu920",
  ])
    assert.ok(card.includes(text), text);
});
test("vCard escapes delimiters and newlines", () => {
  assert.equal(escapeVCard("A,B;C\\D\nE"), "A\\,B\\;C\\\\D\\nE");
});
test("vCard folds UTF-8 at 75 bytes without damaging content", () => {
  const value = "NOTE:" + "አ".repeat(80);
  const folded = foldLine(value);
  assert.equal(folded.replace(/\r\n /g, ""), value);
  for (const line of folded.split("\r\n"))
    assert.ok(Buffer.byteLength(line) <= 75);
});
test("public vCard is synchronized with the profile", () => {
  assert.equal(
    readFileSync(
      new URL("../public/yeabsra.jpg", import.meta.url),
      "utf8",
    ),
    createVCard(p),
  );
});
test("contact formats and all outbound destinations are valid", () => {
  for (const phone of p.phones) assert.match(phone, /^\+251\d{9}$/);
  assert.equal(p.whatsapp, p.phones[0].slice(1));
  for (const url of [
    p.website,
    p.maps,
    ...p.socials.map((s) => s.url),
    ...p.projects.map((s) => s.url),
  ])
    assert.equal(new URL(url).protocol, "https:");
  assert.equal(p.email, "Yeab920@gmail.com");
});
