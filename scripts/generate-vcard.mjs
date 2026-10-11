import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createVCard } from "./vcard.mjs";
const profile = JSON.parse(
  await readFile(new URL("../data/profile.json", import.meta.url), "utf8"),
);
await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../public/yeabsra.jpg", import.meta.url),
  createVCard(profile),
);
console.log("Generated public/yeabsra.jpg from data/profile.json");
