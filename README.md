# Auto Book – clickable prototype (v5)

Front-end-only, mobile-web prototype of **Auto Book** for workshop test visits in Lagos.
Next.js 15 static export, Tailwind v4, shadcn/ui config, lucide icons. Dummy data only, stored in `localStorage` (key `autobook-v5d`). Single page with hash routes (`#/jobs`, `#/job/<id>`, `#/log/plate`, …), no query params, no backend.

- Spec: https://ewvie.atlassian.net/wiki/spaces/AB/pages/64127033 (Logging flow, Jobs, Booking (paused) sections)
- Jira: **AB-21** (logging flow), **AB-22** (Jobs list and job page)
- **Project docs:** [docs/README.md](docs/README.md) (Confluence + Jira exports, reading order, source-of-truth rule)
- UX mockups used: `/workspace/mock/log.html`, `log5.html`, `flow0-home.html`, `flow1…7-*.html` (on the build box, not in this repo)

## Run / build

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
```

## Deploy (preview only)

Copy `out/` to the QA folder with no-index headers, then deploy to the **log-preview** branch of Cloudflare Pages:

```bash
rm -rf /workspace/autobook-qa-7 && cp -r out /workspace/autobook-qa-7
printf '/*\n  X-Robots-Tag: noindex\n' > /workspace/autobook-qa-7/_headers
printf 'User-agent: *\nDisallow: /\n' > /workspace/autobook-qa-7/robots.txt
cd /workspace/autobook-deploy && npx -y wrangler@3 pages deploy /workspace/autobook-qa-7 --project-name autobk --branch log-preview --commit-dirty=true
```

Preview: https://log-preview.autobk.pages.dev — **never deploy `--branch main`** without Tega's explicit "push".

## Code map

| File | What |
|---|---|
| `src/components/app.tsx` | App shell, hash router, Home, car page, wallet, sign-up, owner WhatsApp demo, settings drawer |
| `src/components/log.tsx` | Logging flow (+ tab): plate → brand → model/year → work → status → cost/note → anything else → check & save (receipt via wa.me) |
| `src/components/jobs.tsx` | Jobs list + filter sheet, job page, add item (reuses logging steps), complete, resend receipt, customer page, booking-coming-soon |
| `src/components/nav.tsx` | Bottom tabs: Home, Bookings, +, Jobs |
| `src/lib/data.ts` | Dummy data (cars, customers, jobs) |
| `src/lib/copy.ts` | English / Pidgin (draft) copy |
| `src/lib/theme.ts` | Colours and header styles |

Host tools (owner WhatsApp demo view, reset demo data): open the side menu and **long-press the workshop name for 2 s**.

## Done

- AB-21 logging flow: one question per screen, known plate skips to work, per-item status and cost, optional note, owner name/number with past-customer suggestions, "Save and send receipt" / "Just save", Saved toast → Home.
- AB-22 Jobs: totals + waiting line, Filter sheet (Date, Car brand; 56px chips), active filter chips with ✕, soft job cards, job page with breadcrumb, item cost panel / Mark done, Add item via logging steps, Send update, Complete job check → final receipt (asks for number or Skip), locked completed jobs, Resend / Send receipt, customer page, earlier visits.
- Booking paused: Bookings tab and Book buttons show "Booking is coming soon" with "Log a car".
- Add correction and Delete job show "You don't have the privilege to do this, contact admin."
- Side menu: workshop name, phone, "Felicia Davis · Manager"; Language, Wallet, Log out.

## Open / known gaps

- QA was a light smoke check at 390px (Playwright), not a side-by-side pixel review against the mockups.
- "Made" total = Done item costs; "waiting" = known costs of In progress items (spec doesn't define).
- Earlier visits are matched by customer phone number, falling back to first name.
- Old booking/new-car screens remain in code but are not reachable.
- Pidgin copy is a partial, untested draft.
- Open spec questions: urgency tag on bookings; rename Jobs tab to Cars.
