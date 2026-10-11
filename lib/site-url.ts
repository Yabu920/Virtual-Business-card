export function validSiteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    url.hash = "";
    url.search = "";
    return url.href;
  } catch {
    return undefined;
  }
}
export const siteUrl = validSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
