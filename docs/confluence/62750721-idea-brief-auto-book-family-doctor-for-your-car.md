---
title: "Idea brief: Auto Book ("family doctor for your car")"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721
confluence_page_id: 62750721
version: 18
version_date: 2026-10-16T11:31:59.462Z
version_message: "Decide outside-fix flow; mark routing levers deferred"
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# Idea brief: Auto Book ("family doctor for your car")

DRAFTIDEA

**Owner:** Tega (founder) · **Date:** 

**In one line:** Auto Book is a simple workshop tool that helps mechanics log the work on every car, so each car gets a family doctor. Booking comes later, built on that record.

## The problem

What a car owner runs into with their own mechanic today:

- They turn up unannounced and the mechanic is busy, or tells them to come back another time.
- A sensor the car needed never got bought, because the follow-up was "reach us on WhatsApp" and nobody replied.
- Sometimes it's hard to pay for a full service all at once.

## Positioning

- **The mechanic is the main target.** Auto Book is first a workshop tool for logging work orders and the work done on each car.
- **The shop's everyday digital ledger and invoice tool.** Mechanics come back because of the tool itself, not because Auto Book sends them business.
- **The record comes first, booking second.** Once a car's history lives in Auto Book, booking is built on top of it.
- **Still a relationship, not a marketplace.** Auto Book keeps a car owner and **their own** mechanic connected, like a family doctor for your car. A marketplace may come later, only if traction makes it happen naturally.
- **Who it's for:** semi-branded workshops first. That means a fixed location (a fenced yard or canopy), a painted signboard, and an Oga who uses a smartphone and WhatsApp with clients. Not roadside mechanics under trees, and not high-end corporate hubs. On the owner side, private car owners, who start on WhatsApp. Not korope or commercial drivers.
- **Platforms (decided 16 Oct 2026):** mechanics use a web app; owners use WhatsApp to start.
- **Their pain:** estimates on grease-stained cardboard or scraps of paper look amateurish and create a trust gap with middle-class drivers. Clean digital invoices to the customer fix that.

## MVP

**v1: the mechanic's job card**

1. Pick a car, or add one: owner name and phone, plate, model.
2. Tap the issues found from a short list, each with an urgency: **Fix now**, **Fix soon** or **Can wait**.
3. Mark each issue done or pending.
4. The car's history is kept.
5. The owner can view their car's record through a link.

**v2: booking, built on the record**

- Bookings: time slots in the mechanic's schedule, whether the owner booked in Auto Book or phoned in. No owner confirmation needed; the owner gets a booking notice by email and WhatsApp for now.
- Reminders.
- The ₦500 booking fee, paid by the mechanic from prepaid credit, per completed booking. Logging stays free.

Marking an issue as fixed outside Auto Book should take a little effort (for example, asking for a reason), so the history stays honest. **Decided (16 Oct 2026):** a one-tap confirm with reason chips "Fixed elsewhere", "Owner declined" and "No longer needed"; the history shows a "marked outside Auto Book" label. Wording to be checked on the workshop visits.

## UX bar

- **One job per screen.**
- **Tap, don't type.**
- **Smart defaults.**
- **Plain words.**
- **Test weekly.** Hand Auto Book to mechanics with no explanation and time them.
- **Greasy hands.** Hands are often greasy and typing fails, so the MVP is tap-first: big buttons and chips, with typing optional at the bottom. Voice and photo input come after the MVP, deliberately: the tap interface must be simple enough on its own, not propped up by AI. If we're already thinking of voice, that shows how dead simple the screens need to be.

## Engineering foundations (day 1)

- **Multi-tenant from day one.** Each workshop is a tenant.
- **Role-based access from day one.** Owner permissions differ from manager permissions. For example, only the owner handles the wallet and billing settings.
- **Billing built to grow.** Premium tiers and usage limits can be added later without a rewrite.

## Later

- **Save bit by bit** toward maintenance, for example ₦5k at a time.
- **Insurance** sales.
- **B2B fleet visibility** for small businesses with 2 to 5 vehicles.

## Logging vs booking

- **Logging** is recording a car and its work in Auto Book (the car, the issues found with their urgency, and the work marked done or pending), with no time slot reserved in the mechanic's schedule. Always free.
- **Booking** is a job the mechanic puts into the schedule as a time slot (from the app, a phone call, or "bring it now"). It's a booking from the moment the slot is reserved, whether it ends up completed, cancelled or a no-show. ₦500, paid by the mechanic, only when it's marked completed.

|  | Logging | Booking |
| --- | --- | --- |
| What it is | Recording a car and its work: the car, the issues found with their urgency, and the work marked done or pending. | A time slot the mechanic puts into the schedule for a job. It's a booking from the moment the slot is reserved, whether it ends up completed, cancelled or a no-show. |
| What it is not | Not a reservation of the mechanic's time. Not charged, even when work is done on a walk-in. | Not the record of the work itself (that's logging). Not the same thing as a charge: a booking exists whether or not it's ever paid for. |
| Takes up a slot in the schedule? | No. | Yes. The slot blocks that time, so other customers get later slots. That's Auto Book doing real work. |
| Needs the customer on the app? | No. | No. It can come from the app, a phone call ("come at 4pm") or "bring it now". |
| Needs customer confirmation? | No. | No. The customer gets a booking notice, not an approval step. |
| When it's charged | Never. | Separate from what makes it a booking: the fee is charged only when the mechanic marks the booking completed (a "completed booking"). Cancelled bookings and no-shows are still bookings, but aren't charged. |
| Cost | Free, always. | ₦500 per completed booking. Cancelled bookings and no-shows cost nothing. |
| Who pays | Nobody. | The mechanic is billed and pays from prepaid credit. The customer pays by proxy, because the mechanic builds the ₦500 into their price; it only shows on the customer's invoice and receipt if the mechanic turns that on (off by default). |
| Examples | Emeka logs Chidi's Corolla on a walk-in. | Emeka books the sensor fix for Thursday 10am and completes it. Ejiro phones in and is given a 4pm slot that's completed. |

A booking always includes logging, because the job is recorded too. But logging on its own doesn't make a booking.

**Example**

| What happens | Cost to Emeka |
| --- | --- |
| Emeka logs Chidi's Corolla on a walk-in | Free |
| Later, he books the sensor fix for Thursday 10am and completes it | ₦500 |
| Ejiro phones in, is given a 4pm slot, and the job is completed | ₦500 |

## How it makes money

- **The mechanic always pays the ₦500**, per completed booking. The customer pays by proxy, because the mechanic builds the ₦500 into their price. Logging is free. ₦500 is about 1% of a typical ₦40k service.
- **Only bookings are charged; logging is free** (Tega decided). Considered and rejected for now: charging every finalised job, including walk-ins.
- **Pay per job, not a subscription.** Monthly subscriptions don't suit this market, because mechanics see them as a loss in slow weeks, while pay-as-you-go matches prepaid power and data. Later, premium plans for heavy users once Auto Book proves sticky (for example, more than 1,000 logged jobs). Not in the MVP.
- **It shows as "Booking fee ₦500"** on the mechanic's side of the invoice or receipt breakdown. It doesn't show on the customer's side unless the mechanic turns that on in their settings.
- We give mechanics the tools to pass the fee on openly: a setting to add "Booking fee ₦500" as a line item on the customer's invoice and receipt. It's off by default.
- **Prepaid wallet in the MVP.** At the start workshops get free credit, so payments aren't built until at least 2 workshops use Auto Book daily (decided 16 Oct 2026). Leaning towards Bach as the wallet provider (Paystack and Monnify were earlier examples). New mechanics get 5 free completed bookings at sign-up, then top up with a single bank transfer for a pack of 10: ₦5,000 at the ₦500 list price. Workshops with a field marketer's discount code get discounted packs (₦2,000 for 10 at ₦200). This avoids a payment-provider fee on every booking.
- **When credit runs out** (once payments go live; until then workshops are on free credit), bookings keep working, with top-up warnings, and a balance owed builds up. Once the mechanic owes ₦5,000, they can't add new bookings but can still complete existing ones. The balance is settled at the next top-up.
- **Bookings routed around Auto Book: deferred for now.** No stale-account flags or customer caps while credit is free, because there's no fee to dodge. Revisit when payments go live.

**Decided (16 Oct 2026): the booking fee list price stays ₦500** per completed booking, paid by the mechanic from prepaid credit. The customer pays by proxy through the mechanic's price.

- **Early testing discount:** field marketers give workshops a discount code that brings the fee to ₦200 per completed booking.
- Why a lower test price: a semi-branded shop does about 5 jobs a day (130 to 150 a month). At ₦500, that would take about ₦75k a month from the mechanic, enough to push them offline. ₦200 is like the price of a soft drink, easy to add to the customer's bill unnoticed.

## Strategy

1. **UX 20x better than local apps.** Apple-style simple and sleek, built with the team bots.
2. **Dirt cheap.** No VC money and low infrastructure costs.
3. **B2B fleets later.**

## Numbers

| Target | Per day | 30 days |
| --- | --- | --- |
| 50 completed bookings/day (first target) | ₦25k | About ₦750k (about ₦550k on weekdays only) |
| 100 completed bookings/day (stretch) | ₦50k | About ₦1.5M |
| 500 completed bookings/day (stretch) | ₦250k | About ₦7.5M |

All figures are before payment fees, and start once booking arrives in v2.

A reality check: 100 a day from 20 workshops means 5 completed bookings per workshop per day, which is ambitious. 50 to 60 workshops at about 2 a day is more realistic.

## Competitors and lessons

A short summary of the desk research (15 Oct 2026). Nobody was contacted.

**Key lessons**

- **AutoSave died because people didn't need it often enough.** "No one wished their cars would keep breaking down." Reminders and issue history are what bring people back.
- **Mecho pivoted to parts.** Parts are about 80% of the market's value, against about 20% for service.
- **Nobody charges a flat booking fee.** Peers use commissions, revenue shares, referral fees or subscriptions. So ₦500 is untested, and also a chance to stand out.
- **Fixit45 uses partner garages, not the owner's own mechanic.** That's the gap we're aiming at.

## Risks

- **Mechanics may not log jobs.** Many still use an exercise book. The workshop visits will test this.
- **Both sides can skip Auto Book** and settle things on WhatsApp.
- **Signing up workshops is the real work.** Past adoption needed hands-on help, so expect field onboarding, not app-store downloads.

## Go-to-market and first step

**Sign up workshops face to face.** Trust is the currency, and digital ads are useless for the first cohort.

Sit down with my own mechanic and 2 to 3 others. Test whether they'd log a car, with its issues and urgency, in **under a minute**.

**Test prototype:** a front-end-only clickable Next.js app with dummy data and no backend.

## Further reading

- [Auto Book: post-MVP and AI direction](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63340546/Auto+Book+post-MVP+and+AI+direction)
- [Mechanic Booking App: Competitor & Market Scan (Oct 2026)](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63799297/Mechanic+Booking+App+Competitor+Market+Scan+Oct+2026)
