export function escapeVCard(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}
// RFC 2425: fold at 75 octets without splitting UTF-8 code points.
export function foldLine(line) {
  const lines = [];
  let part = "";
  for (const char of line) {
    if (Buffer.byteLength(part + char, "utf8") > 75) {
      lines.push(part);
      part = " ";
    }
    part += char;
  }
  lines.push(part);
  return lines.join("\r\n");
}
export function createVCard(p) {
  const e = escapeVCard;
  const linkedin = p.socials.find((s) => s.id === "linkedin")?.url;
  const github = p.socials.find((s) => s.id === "github")?.url;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:" + e(p.lastName) + ";" + e(p.firstName) + ";;;",
    "FN:" + e(p.name),
    "ORG:" + e(p.company),
    "TITLE:" + e(p.title),
    ...p.phones.map(
      (phone, i) => "TEL;TYPE=CELL" + (i === 0 ? ",PREF" : "") + ":" + phone,
    ),
    "EMAIL;TYPE=INTERNET:" + e(p.email),
    "URL:" + p.website,
    "ADR;TYPE=WORK:;;" +
      e(p.address.street) +
      ";" +
      e(p.address.city) +
      ";;;" +
      e(p.address.country),
    "LABEL;TYPE=WORK:" + e(p.location),
    ...(linkedin ? ["item1.URL:" + linkedin, "item1.X-ABLabel:LinkedIn"] : []),
    ...(github ? ["item2.URL:" + github, "item2.X-ABLabel:GitHub"] : []),
    "END:VCARD",
  ];
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
