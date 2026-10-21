---
title: "Auto Book: post-MVP and AI direction"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/63340546
confluence_page_id: 63340546
version: 1
version_date: 2026-10-16T09:50:16.522Z
version_message: ""
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# Auto Book: post-MVP and AI direction

DRAFTIDEA

From a brainstorm with an outside AI assistant; figures are unverified and need checking before any decision.

Parent brief: [Idea brief: Auto Book ("family doctor for your car")](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)

Nothing on this page is in the MVP. The MVP stays tap-first (see the brief's UX bar).

## Input order (post-MVP)

1. **Voice note first.** 15-second notes in Nigerian English or Pidgin, for example "This Camry legwork don condemn, shock needs replacing".
2. **Photo scan.**
3. **Tappable chips.**
4. **Open text.** An optional comment box only.

## What the AI does

- **Reads photos** of fault-code (OBD-II) scanners and handwritten parts lists, and explains them to car owners in plain words.
- **Turns voice notes into structured job entries** (JSON).

## Privacy

- **Paid billing from the alpha test onward.** Data sent through the free tier of the Gemini API may be used for training.
- **Keep prompts abstract.** The AI never sees the product name or pricing, and acts only as an anonymous parser.

## Unit economics (UNVERIFIED)

As given in the brainstorm, using Gemini 2.5 Flash, per booking:

| Item | Tokens | Rate given |
| --- | --- | --- |
| Input: system prompt | 1,000 | $0.075 per million |
| Input: 30s of audio | 400 |  |
| Input: one image | 258 |  |
| Output | 600 | $0.30 per million |

Total: about **₦0.49 per job**. Margin at ₦200: about **₦199.51**.

## Hosting for the pilot (UNVERIFIED)

- **Vercel Hobby** and the **Supabase free tier** (500MB).
- **WhatsApp:** about ₦10.72 per outbound service message. The claimed 1,000 free conversations a month may be out of date, since Meta has changed its pricing. Check before relying on it.
- **Check:** free hobby tiers may not allow commercial use.

## Scaling

Above about 50k bookings a month, move the database to a dedicated server (Hetzner or OVHcloud, about €40 a month).

## Revenue at scale

At ₦200 per completed booking, 5 jobs a day, 26 working days a month:

| Mechanics | Bookings a month | Revenue a month |
| --- | --- | --- |
| 50 | 6,500 | ₦1.3M |
| 500 | 65,000 | ₦13M |
| 2,000 | 260,000 | ₦52M |

This assumes all 5 daily jobs are completed bookings. Walk-ins that are only logged are free, so real revenue will be lower. The ₦200 fee is still an open decision in the brief.

## Premium plans

Later, for heavy users (for example, more than 1,000 logged jobs), once Auto Book proves sticky.

## Other later ideas

B2B fleet visibility for small businesses with 2 to 5 vehicles, saving bit by bit toward maintenance, and insurance sales are already in the brief. See its [Later section](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car#Later).
