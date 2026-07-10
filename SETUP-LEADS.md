# Palm Beach Reno — Lead Funnel Setup (/go)

Hidden lead-capture page for Meta ads at **https://palmbeachreno.com/go**.
Flow: `/go` funnel → `/api/lead` → GHL contact (Private Integration token) + Meta CAPI `Lead` event, deduped with the browser pixel via a shared `event_id`. Same architecture as Mat Factory / National Relo.

The page is hidden: `noindex`, blocked in robots.txt, excluded from the sitemap, no internal links.

---

## 1. Vercel environment variables (project: palm-beach-renovations)

Vercel → Project → Settings → Environment Variables → add to **Production** (and Preview if you want to test):

| Variable | Value | Where to get it |
|---|---|---|
| `GHL_API_TOKEN` | Private Integration token | PBR sub-account → Settings → **Private Integrations** → Create (scopes: `contacts.write`, `contacts.readonly`) |
| `GHL_LOCATION_ID` | Location ID | PBR sub-account → Settings → Business Profile (or the URL: `/location/{ID}/`) |
| `META_PIXEL_ID` | `2198610930906085` | Dataset "Palm Beach Reno - Website" (owned by Broadleaf Marketing & SEO, connected to ad account 749421483342965) |
| `META_CAPI_TOKEN` | Conversions API access token | Events Manager → Palm Beach Reno - Website → Settings → **Generate access token** |
| `NEXT_PUBLIC_META_PIXEL_ID` | `2198610930906085` | Loads the browser pixel site-wide |
| `META_TEST_EVENT_CODE` | (optional, temporary) | Events Manager → Test Events tab — set while verifying, **remove when done** |

After adding/changing env vars, redeploy (Deployments → ⋯ → Redeploy) — they only apply to new builds.

## 2. Meta Events Manager — DONE (July 10, 2026)

- Dataset **"Palm Beach Reno - Website", ID `2198610930906085`**, created under **Broadleaf Marketing & SEO** and connected to the **Palm Beach Reno ad account (749421483342965)**. Automatic advanced matching: ON.
- Why a new dataset: the old "Palm Beach Reno Pixel" (3506091206330604, created Sep 2023) is owned by the client's personal ad account, not a Business Manager, so Meta refuses to issue CAPI tokens for it. It still fires PageViews from wherever it was installed — ignore it, or have the client claim it later.
- Remaining manual steps:
  1. Settings → Conversions API → **Generate access token** → paste into Vercel as `META_CAPI_TOKEN` (don't save it anywhere else).
  2. Verify domain if not already: Business Settings → Brand Safety → Domains → `palmbeachreno.com`.
- Events fired by the site: `PageView` (all pages, browser), `Lead` (browser + CAPI, deduped by event_id), `Contact` (call-button clicks).
- After leads flow: Events Manager should show **Lead — Browser · Server** with "Deduplicated" status. In Ads Manager, optimize campaigns for **Lead** on dataset 2198610930906085.

## 3. GHL (PBR sub-account)

1. Create the Private Integration (step 1 above).
2. Leads arrive tagged: `website-lead`, `meta-funnel`, `free-estimate`. Project type, timeline, and city land as a note on the contact.
3. Build a workflow: Trigger = Contact Tag `free-estimate` → internal notification + speed-to-lead SMS/call, same as Mat Factory.

## 4. Deploy

```powershell
cd "C:\Users\Tyler Upsell\Desktop\Projects\pbr"
git add app/go app/api/lead lib/ghl.ts lib/capi.ts components/MetaPixel.tsx components/EstimateFunnel.tsx app/layout.tsx app/robots.ts SETUP-LEADS.md
git commit -m "Add hidden /go lead funnel: GHL private integration + Meta pixel/CAPI"
git push origin main
```

Vercel auto-deploys from `main`.

## 5. Verify end-to-end

1. `https://palmbeachreno.com/api/lead` in a browser → all values should be `true`.
2. Set `META_TEST_EVENT_CODE`, open `/go?fbclid=test123`, submit a test lead.
3. Check: GHL contact created with tags + note; Events Manager Test Events shows `Lead` from **both** browser and server, deduplicated.
4. Remove `META_TEST_EVENT_CODE`, redeploy.
5. In Ads Manager, set the campaign to optimize for the **Lead** event on this dataset.
