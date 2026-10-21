---
title: "Top 10 booking UIs: deep dives"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977
confluence_page_id: 64126977
version: 2
version_date: 2026-10-16T11:02:12.977Z
version_message: "Fix cross-links"
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# Top 10 booking UIs: deep dives

*Context: what each of the 10 shortlisted UIs does, why it's fast, and what Auto Book should take from it. Desk research, 16 Oct 2026; links checked that day. Selection is explained in [Selection methodology & shortlist](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64094209/Booking+UI+research+selection+methodology+shortlist); method from the [playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work).*

**How to read this page.** Each pick has four parts: **Design thesis** (the one idea behind it), **Why it works** (with step/field counts only where a source gives them), **Learnings**, and **For Auto Book**. Where no count is published, we say so rather than guess.

## 1. WhatsApp Flows (appointment booking template)

- **Design thesis:** don't send people to an app; bring the form into the chat they already have open.
- **Why it works:** WhatsApp Flows let a business show multi-screen forms (pick a service, date, time) inside a WhatsApp conversation. Meta publishes an appointment-booking Flow template plus an example server, marked "for prototyping only". ([Meta: WhatsApp Flows getting started](https://developers.facebook.com/docs/whatsapp/flows/gettingstarted/); [WhatsApp-Flows-Tools book-appointment example, GitHub](https://github.com/WhatsApp/WhatsApp-Flows-Tools/tree/main/examples/endpoint/nodejs/book-appointment)). No published step count; it depends on how many screens you design.
- **Learnings:** zero install, zero new login; the chat itself is the confirmation record.
- **For Auto Book:** the owner's booking notice and "book again" could be a WhatsApp Flow. Needs the WhatsApp Business Platform (cost and approval to check). The brief leaves the notice channel undecided; this is the strongest candidate.

## 2. Digital vehicle inspections: AutoVitals and Tekmetric

- **Design thesis:** the mechanic taps a traffic-light status per item; the customer sees red/yellow/green plus photos and approves from their phone.
- **Why it works:** AutoVitals describes colour-coded results where the motorist "can easily tell what needs fixing (red), what repairs can wait until next time (yellow), and areas of their vehicle in perfect health (green)", and shops re-use past inspections rather than starting fresh. ([AutoVitals blog](https://blog.autovitals.com/four-ways-to-add-value-to-your-digital-inspections)). Tekmetric: customers "can actually see what is wrong with the vehicle and understand the repair before they approve it". ([Tekmetric DVI](https://www.tekmetric.com/features/digital-vehicle-inspections)). No tap counts published.
- **Learnings:** three statuses are enough; colour + word, not just colour; history makes the next inspection faster.
- **For Auto Book:** this validates the brief's **Fix now / Fix soon / Can wait** directly. Pre-fill last visit's pending issues when the same car comes back. Photos are post-MVP per the brief.

## 3. Uber Lite

- **Design thesis:** design for the worst phone and the worst network, and make tapping replace typing.
- **Why it works:** under 5 MB to download vs 181 MB for the standard app; 300 ms response time; opens on a suggested nearby landmark from GPS instead of a map or text box; guesses destinations from cached popular places; map only loads if you tap for it. "You have to do less typing and can do more tapping." ([TechCrunch, Jun 2018](https://techcrunch.com/2018/06/12/uber-lite/); [CNBC, Jun 2018](https://www.cnbc.com/2018/06/12/uber-5mb-lite-app-for-emerging-market-users-pilots-in-india.html))
- **Learnings:** smart default first screen; heavy media only on request; cache the common choices.
- **For Auto Book:** set a page-weight budget; no maps or big images by default; open on the most likely car/time.

## 4. Calendly booking link

- **Design thesis:** a link is the whole product for the invitee; no account.
- **Why it works:** invitee opens the link, picks a time, enters name and email (2 fields by default), confirms. No Calendly account or login needed; reschedule/cancel via links in the confirmation. ([Calendly Community answer](https://community.calendly.com/asked-answered-79/do-invitees-need-to-login-to-book-through-calendly-4644)). Details can be **pre-filled** through the link itself. ([Calendly Help: pre-fill](https://calendly.com/help/how-to-pre-fill-invitee-information-in-your-calendly-link)). Calendly claims scheduling takes "less than a minute" (vendor claim). ([Calendly blog](https://calendly.com/blog/getting-started-guide))
- **Learnings:** pre-filled link + only free times shown = almost nothing left to decide.
- **For Auto Book:** the mechanic sends a per-car link with owner name, phone and car already filled; the owner only taps a slot.

## 5. M-Pesa STK Push (Lipa na M-Pesa Online)

- **Design thesis:** the business does all the typing; the customer only confirms.
- **Why it works:** instead of the customer going to the menu and entering a Paybill number, account and amount, the business pushes a prompt showing its name, the amount and reference; "the customer's only action is entering their M-Pesa PIN." ([Vendly guide](https://vendly.ke/blog/mpesa-stk-push-business); [Safaricom Daraja](https://developer.safaricom.co.ke/)). Kenyan, but the pattern is what counts.
- **Learnings:** move effort from the customer to the system; one confirm action.
- **For Auto Book:** a booking notice should need zero or one tap from the owner (the brief already says no confirmation step). Same idea for the mechanic's wallet top-up.

## 6. GOV.UK "one thing per page"

- **Design thesis:** each page asks one question.
- **Why it works:** GOV.UK advises starting forms with one thing per page because it helps people understand what you're asking and focus on the question and answer. ([GOV.UK Service Manual: form structure](https://www.gov.uk/service-manual/design/form-structure); [GOV.UK Design System: question pages](https://design-system.service.gov.uk/patterns/question-pages/)). Designed for the whole public, including lower-literacy users.
- **Learnings:** short screens, no scrolling, clear back button.
- **For Auto Book:** matches the brief's "one job per screen": car, then issues, then urgency, then save.

## 7. WhatsApp click-to-chat with prefilled text

- **Design thesis:** a link that opens a chat with the words already written.
- **Why it works:** `wa.me/<number>?text=...` opens a chat with that number and the message pre-filled; works on phone and WhatsApp Web; no need to save the contact. ([WhatsApp Help: click to chat](https://faq.whatsapp.com/5913398998672934)). One tap plus Send.
- **Learnings:** free, no API approval, uses a habit people already have.
- **For Auto Book:** cheap MVP channel: "Share record" or "Send booking notice" buttons that open WhatsApp with the message ready. Fallback if WhatsApp Flows is too costly.

## 8. Paystack Payment Pages

- **Design thesis:** a payment form as a shareable link.
- **Why it works:** a business creates a simple payment form reachable by a link it shares by email, WhatsApp or Twitter; "All your customer has to do is open it and pay" via Paystack Checkout. ([Paystack Support: Payment Pages](https://support.paystack.com/en/articles/2132546)). Nigerian provider, familiar to our users.
- **Learnings:** link-in-chat is how Nigerian small businesses already transact.
- **For Auto Book:** mechanic wallet top-up; later, owner pays the invoice from the car record link.

## 9. Reserve with Google

- **Design thesis:** book from where you searched; don't make people visit another site.
- **Why it works:** search, book and pay "without leaving a Google surface" (Search, Maps, Assistant). Google's help page says this is available in the United States. ([Google Maps Help](https://support.google.com/maps/answer/9322362?hl=en))
- **Learnings:** meet the user where they already are.
- **For Auto Book:** the place our users already are is WhatsApp and the car record link, so booking should start there. (Not a Lagos channel today.)

## 10. Square Appointments

- **Design thesis:** a ready-made booking site for small businesses with one owner and a few staff, the closest shape to a workshop.
- **Why it works:** clients book from the business's online booking site. ([Square Support: set up online booking](https://squareup.com/help/us/en/article/5355-set-up-online-booking-with-square-appointments)). Per Square's help content the order is service, staff (or "any available"), date/time, contact details. We couldn't confirm a field count from the page text; check by hand.
- **Learnings:** "any available" as a default removes a decision.
- **For Auto Book:** default to the shop, not a named mechanic; allow the Oga's settings to decide.

## What the ten have in common

1. **The system does the typing** (pre-filled links, STK Push, Uber Lite suggestions).
2. **Choices, not text** (traffic-light statuses, time slots, landmarks).
3. **Live where users already are** (WhatsApp, a shared link) instead of a new app.
4. **Light by default** (Uber Lite: map on request).
5. **One thing per screen** (GOV.UK).

These become the principles on [Design principles & first flow sketch](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch).

## Further reading

- [Design principles & first flow sketch](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch)
- [UI library comparison & recommendation](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63602701/UI+library+comparison+recommendation)
- [Booking UI research: selection methodology & shortlist](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64094209/Booking+UI+research+selection+methodology+shortlist)
- [UX research & design playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work)
- [Idea brief: Auto Book](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)
