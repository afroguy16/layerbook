---
title: "Design principles & first flow sketch"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745
confluence_page_id: 64159745
version: 1
version_date: 2026-10-16T11:00:29.390Z
version_message: ""
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# Design principles & first flow sketch

*Context: the prioritised design principles drawn from the top-10 research, and a first sketch of the mechanic logging and owner booking flows, each step traced to evidence. A sketch to test, not a final design (16 Oct 2026).*

Evidence tags: **\[#n\]** = pick n on [Top 10 booking UIs: deep dives](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977/Top+10+booking+UIs+deep+dives); **\[PB\]** = [playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work) sources; **\[Brief\]** = [Idea brief](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car).

## Prioritised principles

| # | Principle | In plain words | Evidence |
| --- | --- | --- | --- |
| 1 | **The system types, the user taps** | Pre-fill everything we know (car, owner, last issues). The user picks or confirms. | Calendly pre-fill \[#4\]; STK Push "only action is a PIN" \[#5\]; Uber Lite "less typing, more tapping" \[#3\]; Brief "tap, don't type" |
| 2 | **Live inside WhatsApp and links** | No app install, no login for owners. Booking notices and records arrive as a WhatsApp message or link. | WhatsApp Flows \[#1\]; click-to-chat \[#7\]; Paystack links shared on WhatsApp \[#8\]; Calendly no-login \[#4\]; brief says users are WhatsApp-native |
| 3 | **Three urgency colours + words** | Fix now (red) / Fix soon (amber) / Can wait (green); always a word next to the colour. | AutoVitals/Tekmetric DVI \[#2\]; Brief; WCAG (don't rely on colour alone) \[PB\] |
| 4 | **One thing per screen, plain words** | One question per screen, short words, main action at the top, no scrolling where possible. | GOV.UK \[#6\]; NN/g lower-literacy study (task time 22.3 → 9.5 min) \[PB\]; Brief "one job per screen" |
| 5 | **Light by default** | Tiny first load, no maps or photos unless asked; works on 3G and old Androids. | Uber Lite \<5 MB, map on request \[#3\]; Android "Build for billions" and performance budgets \[PB\] |
| 6 | **Count fields, then steps; measure every week** | Target: logging ≤ 4 typed fields for a new car, 0 for a returning car; booking 0 to 1 typed fields. Time with 5 users weekly, aim ≈ 60 s. | Baymard (fields matter more than steps) \[PB\]; NN/g 5 users \[PB\]; Brief "test weekly" |
| 7 | **History makes the next visit faster** | Returning car opens with its pending issues already listed. | AutoVitals re-uses past inspections \[#2\]; competitor scan: reminders/history drive repeat use |
| 8 | **Smart default slot** | Offer the next free slot first ("Today 4pm") and "Bring it now"; other times one tap away. | Uber Lite suggested pickup \[#3\]; Square "any available" \[#10\]; Brief "bring it now" |

## First flow sketch A: mechanic logs a car (v1 MVP)

Goal: under 60 seconds, greasy hands.

| Screen | What's on it | Taps / typing | Traced to |
| --- | --- | --- | --- |
| 1. Today | Big "+ Car" button; list of today's/recent cars with plate in large text | 1 tap | P4, P8 |
| 2. Find or add car | Type 2–3 plate characters → matches appear; or "New car": plate, model (chips of common models), owner name, owner phone | Returning: \~1 tap. New: 4 fields (the brief's minimum) | P1, P6, Baymard \[PB\] |
| 3. Issues | Grid of chips from a short list (brakes, shocks, sensor, oil, …); last visit's pending issues pre-ticked | 1 tap per issue | P1, P7, \[#2\] |
| 4. Urgency | Each picked issue shows 3 buttons: **Fix now / Fix soon / Can wait** (default: Fix soon) | 0–1 tap per issue | P3, \[#2\] |
| 5. Save & share | "Save" + "Send to owner on WhatsApp" (opens chat with pre-written message + record link) | 1–2 taps | P2, \[#7\] |

Rough count for a returning car with 2 issues: about **7–9 taps, 0 typed fields**. For a new car: add 4 short fields. This is an estimate to be timed in the field, not a measured result.

## First flow sketch B: owner books (v2)

The owner starts from the car record link the mechanic sent (no app, no login).

| Screen | What's on it | Taps / typing | Traced to |
| --- | --- | --- | --- |
| 1. My car (link) | Car + pending issues in colour; big button "Book fix" | 1 tap | P2, P3, \[#4\] |
| 2. Pick a time | Next free slot first ("Tomorrow 10am"), then 3–5 more; "Other day" | 1 tap | P8, \[#4\] |
| 3. Done | "Booked: Thu 10am at Emeka's Workshop". Name and phone already known, so no form. Notice sent by WhatsApp. No owner confirmation step (brief). | 0 taps | P1, \[#5\], Brief |

Total: **2 taps, 0 typed fields**, compared with Calendly's 2 fields \[#4\]. Mechanic-side booking (phone-in, "bring it now") reuses sketch A plus a time chip.

## How we'll test this

Per the playbook: paper or clickable prototype → 5 mechanics + 5 owners → task success, time on task, taps/fields, SUS read aloud. Change one thing, re-measure.

## Open questions

- Notice channel: WhatsApp Flows (cost and approval) vs click-to-chat (free, manual send). The brief leaves this open.
- Issue chip list: needs field study in 2–3 workshops.

## Further reading

- [Top 10 booking UIs: deep dives](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977/Top+10+booking+UIs+deep+dives)
- [Booking UI research: selection methodology & shortlist](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64094209/Booking+UI+research+selection+methodology+shortlist)
- [UX research & design playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work)
- [Idea brief: Auto Book](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)
