# SignalQR — Fast QR Code Generator

SignalQR is a fast, stylish QR code generator by BeaconLabs. Type any text or URL and get a QR instantly. Download your QR as JPG or PDF.

## Features

- **Instant preview** as you type
- **Downloads**: JPG (no dependency) and PDF (via jspdf)
- **Modern UI** with glass effect and responsive layout
- **About toggle** for a short BeaconLabs description
- **SEO-ready**: meta tags, Open Graph, Twitter cards, JSON-LD
- **PWA manifest** configured with custom icon and colors

## Quick Start

Prerequisites: Node 18+ recommended

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the dev server
   ```bash
   npm start
   ```
3. Open http://localhost:3000

## Scripts

- `npm start` – Run development server
- `npm run build` – Build production assets into `build/`
- `npm test` – Run tests (CRA default)

## Project Structure

- `src/qr-generator.js` – Main component (SignalQR UI, JPG/PDF downloads)
- `src/qr-generator.css` – Custom styles for the app
- `public/index.html` – SEO meta, Open Graph, Twitter, JSON-LD
- `public/manifest.json` – PWA config (short_name, icons, theme)
- `public/logoGreen.png` – App icon used for social/manifest/favicon

## Customization

- **Branding**:
  - Update icons in `public/` (e.g., `logoGreen.png`)
  - Edit manifest fields in `public/manifest.json`
  - Adjust page meta in `public/index.html`
- **Theme**: Tweak CSS variables in `src/qr-generator.css` (`:root` block)
- **Footer/Description**: Update the about text in `src/qr-generator.js`

## SEO Notes

- Title, description, keywords set in `public/index.html`
- Open Graph/Twitter images point to `%PUBLIC_URL%/logoGreen.png`
- JSON-LD describes the app as a SoftwareApplication by BeaconLabs
- Optional: add `sitemap.xml` and update `public/robots.txt`

## Troubleshooting

- **Favicon not updating**: Browsers cache favicons.
  - Hard refresh (Cmd/Ctrl+Shift+R) or try an incognito window
  - Close/reopen the tab or clear site data
- **PDF not downloading**: Ensure `jspdf` is installed (already in dependencies)
- **QR looks blurry**: Increase size of `QRCodeCanvas` in `src/qr-generator.js`

## License

Copyright © BeaconLabs. All rights reserved.
