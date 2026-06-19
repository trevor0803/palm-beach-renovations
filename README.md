# Palm Beach Renovations — Website

Next.js 15 (App Router) + TypeScript. SEO-optimized, statically rendered, deploys on Vercel.

## Quick start (local)
```powershell
npm install
npm run dev          # http://localhost:3000
npm run build        # production build check
```

## Project structure
- `app/` — pages (home, services, our-team, gallery, contact, privacy) + sitemap/robots/manifest
- `components/` — Header, Footer, ContactForm, GalleryGrid
- `lib/site.ts` — ALL business info (phone, email, services, reviews, team). Edit here.
- `public/img/` — logo + team photos. Drop gallery photos in `public/img/gallery/`.

## Add gallery photos
Save images as `public/img/gallery/gallery-1.jpg` ... `gallery-25.jpg`.
Empty slots show a labeled placeholder until a file exists.

## Update business info
Everything (phone, email, hours, services, reviews) lives in `lib/site.ts`.
Set the real email in `site.email` so the contact form routes correctly.
