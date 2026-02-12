# CODEFEST 2026

A synthwave-styled landing page for the codefest event: teams, products, and a team-to-product allocator.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Editing data

All event data lives in `public/db.json`:

- **event**: title, tagline, date, time
- **teams**: id, name, members[], avatar (URL or null)
- **products**: id, name, slug, scope, caveat, risk
- **allocations**: `{ "productId": ["teamId1", "teamId2"] }`

Edit `db.json` directly to change event info, teams, products, or initial allocations.

## Team allocator

On the landing page, use the **Assign teams** section to add teams to products. Allocations are stored in your browser’s localStorage and persist on that device.

To share allocations with everyone (e.g. after redeploy):

1. Click **Export allocations (copy JSON)**
2. Open `public/db.json`
3. Replace the `allocations` object with the copied JSON
4. Commit and redeploy

Anyone visiting the site will then see the updated allocations.

## Deployment

**Vercel / Netlify**

1. Connect your repo
2. Build command: `npm run build`
3. Output directory: `dist`

No environment variables required.

## QR codes

Deploy the site, then generate QR codes pointing to your deployed URL (e.g. https://codefest2026.vercel.app). Use any free QR generator (e.g. [qr-code-generator.com](https://www.qr-code-generator.com)) and print the codes so participants can open the site on their phones.
