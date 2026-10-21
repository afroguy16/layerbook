---
title: "Booking UI research: selection methodology & shortlist"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/64094209
confluence_page_id: 64094209
version: 2
version_date: 2026-10-16T11:02:11.267Z
version_message: "Fix cross-links"
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# Booking UI research: selection methodology & shortlist

*Context: how we chose the 10 booking and task UIs Auto Book should learn from, and why others were rejected. Desk research, 16 Oct 2026; nobody contacted. Method follows the [UX research & design playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work) (competitive evaluation, step/field counts).*

## The question we're answering

Auto Book's bar: **a mechanic logs a car, and an owner books, in about one minute on a phone in Lagos** (low data, mixed literacy, WhatsApp-native). Which existing products already do something like that, and what can we copy?

We deliberately did **not** start from "famous apps". A famous app can be slow to book (lots of browsing first). We looked for products that make **one task** fast, wherever they come from.

## Step 1: Wide search (where we looked)

| Area | What we looked at |
| --- | --- |
| Chat / WhatsApp flows | WhatsApp Flows (forms inside a chat), WhatsApp click-to-chat links, Telegram bots |
| Appointment booking | Calendly, Cal.com, Google Calendar appointment schedules, Square Appointments, Fresha, Booksy, Zocdoc, Reserve with Google |
| Workshop / mechanic tools | AutoVitals and Tekmetric digital vehicle inspections, Shopmonkey; local players from our [competitor scan](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63799297/Mechanic+Booking+App+Competitor+Market+Scan+Oct+2026) (Fixit45, Carviva, Mecho, SureMech) |
| Low-data / emerging-market apps | Uber Lite, mainstream ride-hailing apps |
| Payments as a "one action" task | M-Pesa STK Push, Paystack Payment Pages, USSD banking |
| Forms done well | GOV.UK "one thing per page" pattern |
| Travel / hospitality (control group) | Airbnb, Booking.com, OpenTable |

## Step 2: Must-pass filters

A candidate goes forward only if:

1. **There is a public source** describing its flow (help docs, developer docs, or reputable press). No source, no pick.
2. **It makes one task fast**, not just discovery or browsing.
3. **The lesson transfers** to logging a car or booking your *own* mechanic (Auto Book is a relationship, not a marketplace, per the [Idea brief](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)).

## Step 3: Scoring rubric (0 to 5 each, max 30)

| Criterion | What a 5 looks like |
| --- | --- |
| A. Speed evidence | Sourced step/field/tap counts or timing that show the task is short |
| B. Low data / low-end phones | Explicitly designed for weak networks or cheap phones |
| C. Tap-first, low literacy | Choices instead of typing; few words; prefilled defaults |
| D. Chat / WhatsApp fit | Lives in, or hands off cleanly to, WhatsApp/SMS |
| E. Relevance to Auto Book | Directly maps to logging issues/urgency or own-provider booking |
| F. Evidence quality | Official docs or independent press, not just marketing |

Scores are **our judgement** applied to the sources linked on the deep-dive page; they're a way to rank, not a measurement. Test in the field before trusting them.

## Step 4: Shortlist (top 10)

| # | Product / pattern | A | B | C | D | E | F | Total | One-line reason |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | WhatsApp Flows (appointment template) | 3 | 4 | 4 | 5 | 5 | 4 | 25 | Booking form inside the chat our users already live in |
| 2 | Digital vehicle inspection (AutoVitals / Tekmetric) | 3 | 2 | 4 | 3 | 5 | 4 | 21\* | Red/yellow/green issue status = our Fix now / Fix soon / Can wait |
| 3 | Uber Lite | 4 | 5 | 5 | 1 | 4 | 5 | 24 | Built for 2G and old Androids: \<5 MB, "less typing, more tapping" |
| 4 | Calendly booking link | 5 | 3 | 4 | 3 | 4 | 4 | 23 | Open link, pick a time, 2 fields, confirm; no login |
| 5 | M-Pesa STK Push | 5 | 5 | 4 | 2 | 3 | 4 | 23 | Business prefills everything; customer's only action is a PIN |
| 6 | GOV.UK "one thing per page" | 3 | 4 | 5 | 1 | 4 | 5 | 22 | Proven form pattern for mixed-literacy public users |
| 7 | WhatsApp click-to-chat with prefilled text | 4 | 4 | 4 | 5 | 3 | 5 | 25\* | One tap opens a chat with the message already written |
| 8 | Paystack Payment Pages | 3 | 3 | 3 | 4 | 3 | 4 | 20 | Nigerian: a link you share on WhatsApp, customer just opens and pays |
| 9 | Reserve with Google | 3 | 2 | 3 | 1 | 3 | 4 | 16 | Book without leaving where you searched (US only) |
| 10 | Square Appointments | 3 | 2 | 3 | 1 | 4 | 3 | 16 | Small-business booking site: service, staff, time, contact details |

\* Ordering isn't purely by total. **#2 is ranked above its score** because it is the only pick that covers the **mechanic logging** side (the v1 MVP). **#7 is ranked below its score** because it's a hand-off pattern (a link), not a full flow.

Deep dives with sources: [Top 10 booking UIs: deep dives](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977/Top+10+booking+UIs+deep+dives).

## Step 5: Rejected, with reasons

| Candidate | Why rejected |
| --- | --- |
| Airbnb, Booking.com | Browse-and-compare first; speed of one booking isn't their design goal. Fails filter 2. |
| OpenTable | Couldn't verify a public flow description in this round. Fails filter 1. |
| Zocdoc | Couldn't verify a public flow description (fetch failed); also US insurance-centric. Fails filter 1. |
| Fresha, Booksy | Marketplace discovery first, against our own-mechanic model; booking page couldn't be verified. Fails filters 1 and 3. |
| Cal.com, Google Calendar appointment schedules | Same pattern as Calendly; one exemplar is enough. Duplicate. |
| Shopmonkey | Same digital-inspection pattern as AutoVitals/Tekmetric. Duplicate. |
| Mainstream Uber/Bolt apps | Uber Lite is the low-data version and better documented for our conditions. Duplicate. |
| Telegram bots | Our users are WhatsApp-native (brief); lesson is the same as WhatsApp Flows. Fails filter 3. |
| USSD banking | Strong for feature phones, but the brief targets smartphone users and a web app; USSD can't show car history. Park for later. |
| Fixit45, Carviva, Mecho, SureMech | Covered in the [competitor scan](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63799297/Mechanic+Booking+App+Competitor+Market+Scan+Oct+2026); partner-garage/marketplace models, and we found no public flow docs with step counts. Re-test them hands-on later. |

## Limits

- Desk research only. Step counts come from docs, not from timing real users.
- Next step (per the playbook): run the same tasks on 3 to 4 of these with 5 Lagos users and time them.

## Further reading

- [Top 10 booking UIs: deep dives](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977/Top+10+booking+UIs+deep+dives)
- [Design principles & first flow sketch](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch)
- [UX research & design playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work)
- [Idea brief: Auto Book](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)
- [Competitor & Market Scan](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63799297/Mechanic+Booking+App+Competitor+Market+Scan+Oct+2026)
