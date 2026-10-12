# Yeabsra Abera · NFC digital business card

A fast, mobile-first personal business card for Yeabsra Abera, Software Developer and founder of Bluecode Technology Solution. A dark navy identity card with cyan accents, accessible contact actions, featured projects, and a collapsible QR code.

## Stack and features

Next.js App Router, TypeScript, Tailwind CSS, Lucide React, and a small local QR generator (`qrcode.react`). No database, authentication, paid services, or backend APIs. The page is statically prerendered by Next.js; interactive JavaScript is limited to the avatar fallback, sharing, and QR code.

- Save Contact downloads a vCard 3.0 with both phones and professional links.
- Direct Call, WhatsApp, Email, social, project, and Maps links.
- Web Share API with clipboard fallback and a manual copy field if clipboard access is denied.
- Local SVG QR generation; no URL sent to an external QR service.
- Keyboard focus styles, skip link, semantic sections, reduced-motion support.
- Metadata, Open Graph, Twitter metadata, favicon, and theme color.

## Local development

Use Node.js 20.9 or newer (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm run lint
npm run typecheck
npm test
npm start
```

The build regenerates the contact file before running Next.js. The lockfile fixes dependency versions; use `npm ci` for reproducible installs. Next.js 16 runs lint separately from its production build ([installation documentation](https://nextjs.org/docs/app/getting-started/installation)).

## Personal information and links

Edit `data/profile.json` to change personal information, phone numbers, social links, and featured projects. Edit `app/layout.tsx` when changing the SEO identity. Styling is in `app/globals.css`.

Project artwork is decorative typography and iconography, not a screenshot or official brand logo.

## Real profile photo

The profile photo is **`public/yeabsra.jpg`**. Replace that file with your preferred portrait, then redeploy. The circular YA initials are the fallback when the image is missing or fails to load; no fake portrait is included. Use a square JPG around 400×400 pixels, ideally below 150 KB. The photo uses Next.js Image without server optimization, keeping this small local asset portable.

## Contact file

`data/profile.json` is the source of truth. Run:

```sh
npm run contact
```

This updates `public/yeabsra,jpg`; it also runs automatically during `npm run build`. The generator uses vCard 3.0, CRLF line endings, escaped text, and UTF-8-safe 75-byte folding for broad compatibility. iOS and Android handle contact import differently; open the downloaded contact and confirm the OS import prompt. A website cannot silently add a contact. Test an import on your physical iPhone and Android before printing NFC cards.

## Website URL and QR code

Copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-final-domain.example
```

Use your actual HTTPS production domain. This value sets canonical/Open Graph URLs and the share/QR destination. Without it, share and QR use the current browser URL, and no guessed canonical URL is emitted. Invalid or non-HTTP values are ignored. Public environment values are embedded at build time: rebuild/redeploy after changing them. Avoid encoding a temporary Vercel preview URL onto physical cards.

## Deploy on Vercel

1. Push this project to `Yabu920/yeabsra-nfc-business-card`, branch `main`.
2. In Vercel choose **Add New → Project**, import that GitHub repository.
3. Keep the detected **Next.js** framework, repository root, default build command, and default output settings. Choose Node.js 22.x or newer.
4. Deploy. After the final domain is assigned, set `NEXT_PUBLIC_SITE_URL` in **Project Settings → Environment Variables** for Production, and redeploy.
5. Open the HTTPS site on iPhone and Android. Verify contact import, Call, WhatsApp, Email, sharing, and scanning from another phone.

No Vercel-specific configuration is necessary.

## NFC card setup

Once the website is deployed, write only the final HTTPS website URL to the NFC card using an NFC writing application such as NFC Tools.

Use a URL/URI record, not the vCard text. Scan the QR code and tap the NFC card from another phone to confirm both reach the final site. Keep the URL stable; profile changes then only require a redeploy.

## GitHub push if not already connected

With GitHub CLI installed and authenticated as Yabu920:

```sh
gh auth login
gh repo create Yabu920/yeabsra-nfc-business-card --public --source=. --remote=origin --push
```

If the repository already exists, inspect it first. Do not force push over existing work. For an empty existing repository:

```sh
git remote add origin https://github.com/Yabu920/yeabsra-nfc-business-card.git
git push -u origin main
```

If origin is already configured, skip the remote-add command. Use `--private` instead of `--public` if you prefer private source.

## File map

- `app/`: page, layout/SEO, favicon, global styling.
- `components/`: contact actions, avatar, social links, projects, sharing, QR.
- `data/profile.json`: profile and links.
- `scripts/`: reproducible vCard generation.
- `public/yeabsra.jpg`: profile photo.
- `public/yeabsra-abera.vcf`: downloadable contact, generated from `data/profile.json`.
- `tests/`: vCard format, escaping, folding, synchronization, destination validation.

## Optional browser regression checks

With Google Chrome installed and `npm start` running in another terminal:

```sh
npm install --prefix test-results/tools --no-audit --no-fund playwright @axe-core/playwright jsqr pngjs
npm run test:browser
```

These development-only tools and generated screenshots stay in the ignored `test-results/` directory. The checks cover 320–1440px layouts, above-fold contact actions, download content, sharing success/cancel/error paths, actual QR decoding, keyboard access, and automated WCAG A/AA checks using [Playwright and axe](https://playwright.dev/docs/accessibility-testing). Set `TEST_URL` if using another local port; set `TEST_BROWSER=msedge` to use installed Microsoft Edge. Device-native contact imports and sharing sheets still need a physical-device check.
