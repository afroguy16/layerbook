---
title: "Prototype spec: screen by screen"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/64127033
confluence_page_id: 64127033
version: 24
version_date: 2026-10-16T15:40:02.809Z
version_message: "B.9: Resend vs Send receipt; no-number jobs show no receipt sent. Side menu: Host tools behind 2s press on workshop name"
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# Prototype spec: screen by screen

*Context: screen-by-screen spec for a clickable, front-end-only Next.js prototype (shadcn/ui, mobile-first, dummy data, no backend) to test in workshops; applies Tega's 16 Oct 2026 decisions to *[*Design principles & first flow sketch*](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch)*. Colours, type, spacing, states and wireframes: *[*UI design spec: look and feel*](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63078414/UI+design+spec+look+and+feel)*.*

## Changes approved 16 Oct 2026

1. **Log-a-car becomes a wizard**, one question per screen, and is the default flow. Order: car type (make) first; tapping a make moves straight to its models; "Other" opens one short optional text box for the make; then plate, problems, urgency, owner's phone, ending on a short review screen with Save. Each tap that answers a question moves on by itself, with no Next button and no page reload. Model chips show the model only, on one line.
2. **~~Two links, one per flow:~~**~~ https://autobk.pages.dev opens the wizard (the default); https://autobk.pages.dev/?flow=single opens the old single-screen log-a-car. The app remembers the chosen flow while tapping around, until the other link is opened.~~ **Dropped 16 Oct 2026:** wizard only, at <https://autobk.pages.dev>.
3. **Header** holds only the screen title and back button. The brand name and the EN/PG language switch (globe icon, at least 48 px) move into a settings drawer, opened from a gear in the bottom nav. The first screen asks "English or Pidgin?" once, with two big buttons. English is the default; Pidgin is an untested draft and not needed for the visits.
4. **Host tools:** turn on Host tools in the settings drawer. The host gets timer and tap count, reset / Next tester, role switch (Owner/Manager), wallet states, and loading/empty/error screen toggles. Testers never see them; leave Host tools off on tester phones. There is no logo long-press. (~~?flow=single&demo=1~~ and ~~?demo=1~~ link flags, dropped.)
5. **~~Each timed run records which flow was used~~**~~ (wizard or single-screen).~~ Dropped 16 Oct 2026: wizard only, so no flow tracking.
6. **Car type under "Other":** optional text field.
7. **Notes:** each problem gets an optional, collapsed "Add note"; the one overall note stays, also collapsed.
8. **Custom time:** booking quick-time chips end with "Other day", which opens a date and time picker.
9. **"By when":** optional chip on Fix soon and Can wait (2 weeks, 1 month, 3 months); later this drives reminders.
10. **Owner WhatsApp reminder** shows only for cars with pending issues and no booking.
11. **Pending Tega's final word:** owner's phone optional, with a "No phone yet" tag and "Add a number first" on share and booking (current lean: optional).

## 1. Decisions this spec follows (Tega, 16 Oct 2026)

1. **Fee:** list price ₦500 per completed booking; a field marketer's discount code makes it ₦200 for early workshops.
2. **Booking notices:** by email and WhatsApp.
3. **Credit:** free credit at the start; no real payments until at least 2 workshops use Auto Book daily. The wallet is display-only in the prototype.
4. **Who uses what:** mechanics use a web app; owners use WhatsApp (messages and links).
5. **Marking an issue done outside Auto Book (AGREED):** one-tap reason chips **Fixed elsewhere / Owner declined / No longer needed**; history shows the label **"Marked outside Auto Book"** with the reason.
6. **Roles:** Owner (Oga) and manager roles from day one; only the Owner sees the wallet and billing ([Idea brief](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car), engineering foundations).
7. **Credit rules (once payments go live):** bookings keep working when credit runs out, with top-up warnings, and a balance owed builds up; at **₦5,000 owed, no new bookings, but existing bookings can still be completed**; settled at the next top-up (brief).

Scope from the [Idea brief](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car): the **job card is v1** (screens M1–M7); **booking and the wallet are v2** (screens M8–M10). Both are prototyped so we can test them, but v1 is what we test first.

## 2. Build rules (all screens)

1. **Stack:** Next.js (App Router), shadcn/ui components, Tailwind. All data comes from one local file `data/dummy.ts`; state is kept in the browser only (`useState`/`localStorage`). No API, no login, no backend.
2. **Mobile-first:** design at 360 px wide; one column; one main job per screen ([GOV.UK, deep dive #6](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977/Top+10+booking+UIs+deep+dives)).
3. **Tap targets:** every tappable thing at least **48 px tall**, full width for main buttons, 8 px gap between targets. WCAG 2.2's enhanced target-size criterion asks for at least 44 × 44 CSS px ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)); 48 is our margin for greasy hands.
4. **Colour + word:** urgency always shows a word as well as a colour: **Fix now** (red), **Fix soon** (amber), **Can wait** (green).
5. **Typing is last:** any text input sits at the bottom of the screen and is optional unless stated.
6. **No big media:** no maps, no photos, system fonts only (principle 5).
7. **Tap counter for testing:** a tap counter and timer show in the corner when you turn on Host tools in the settings drawer; reset with Host tools between testers. (~~?demo=1~~ / ~~?flow=wizard&demo=1~~; ~~?flow=single&demo=1~~ dropped.)
8. **Look and feel:** all colours, type, spacing, radius, icons and component states come from the [UI design spec](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63078414/UI+design+spec+look+and+feel).
9. **Copy language:** plain English by default. A toggle `EN | PG` in the header switches key strings to Pidgin (section 7). **The Pidgin strings are untested drafts**; validate them on visits before relying on them. Store all strings in `data/copy.ts` keyed by id, with `en` and `pg` values.
10. **Host tools switches (prototype only):** turn on Host tools in the settings drawer to flip role (Owner/Manager), wallet state (normal / low / out / owed ₦5,000), and simulate loading/empty/error states, so testers can see each state.

## 3. Dummy data (`data/dummy.ts`)

All names, plates and numbers below are invented test data, not real people.

1. **Workshop:** "Emeka Auto Clinic", Oga: Emeka, Surulere (dummy).
2. **Cars:**
    1. Toyota Corolla 2010, plate **KJA 123 AB**, owner **Chidi Okafor**, 0803 000 0001. Pending from last visit: "Brake pads" (Fix soon).
    2. Honda Accord 2008, plate **LND 456 CD**, owner **Ejiro Ade**, 0803 000 0002. No pending issues.
    3. Toyota Camry 2012, plate **APP 789 EF**, owner **Bisi Lawal**, 0803 000 0003. Pending: "Shock absorbers" (Fix now), "Wiper blades" (Can wait).
3. **Issue chips (PLACEHOLDER, validate on visits):** Brakes, Shock absorbers, Engine oil, Oil leak, Battery, Tyres, AC, Sensor / check light, Wipers, Lights, Suspension, Other. We found no source listing the most common faults at Lagos workshops, so this list is our guess; the visit script asks mechanics to correct it.
4. **Car-model chips (PLACEHOLDER, validate on visits):** Toyota Corolla, Toyota Camry, Honda Accord, Lexus RX, Toyota Sienna, Other. We did **not** find a reliable source for the most common car models in Lagos, so these are unsourced placeholders; replace with what workshops actually see.
5. **Model chips after a make is picked:** once a make is picked, model chips show the model only (e.g. "Corolla", "RX"), never wrap, and the full make plus model is saved.
6. **Slots:** today 2pm, today 4pm, tomorrow 10am, tomorrow 12pm, tomorrow 3pm.
7. **Wallet:** free credit "5 bookings" (the brief's 5 free completed bookings); list fee ₦500; dummy discount code **EARLY200** gives ₦200 (code invented for the prototype). Top-up pack of 10: ₦5,000 list, ₦2,000 with a code (brief).
8. **Users:** Emeka (Owner/Oga, sees wallet), Tunde (Manager, no wallet). Dummy phone 0803 000 0000.

## 4. Mechanic screens (web app)

### S1. Welcome / sign up

1. **Purpose:** create the workshop in under a minute; the person signing up is the **Owner**.
2. **Layout:** logo + one line; 3 inputs stacked; primary button at the bottom.
3. **Components:** `Input` ×3, `Button`.
4. **Copy:**
    1. Title: "Set up your workshop"
    2. Labels: "Workshop name", "Your name", "Your phone (WhatsApp)"
    3. Helper: "You'll be the Owner. Only the Owner sees money."
    4. Optional: "Have a code from our team?" (link opens M12)
    5. Button: "Start"
5. **Taps:** "Start" → S2 (prototype skips SMS code; a real build would verify the phone).

### S2. Add your team (optional)

1. **Purpose:** add a manager without giving them money access.
2. **Layout:** short explainer; list of team members; "+ Add person"; "Skip for now".
3. **Components:** `Card` per person with role `Badge`, `Sheet` for add (name, phone, role `ToggleGroup`: **Owner** / **Manager**).
4. **Copy:**
    1. Title: "Who else works here?"
    2. Role help: "Manager: logs cars and books. Owner: all of that plus wallet and billing."
    3. Buttons: "+ Add person", "Skip for now", "Done"
5. **Taps:** Done/Skip → M1.
6. **Role rules (both screens and nav):** Manager never sees the Wallet tab, M10–M12, or fee settings; if a Manager reaches a wallet URL they see "Only the Owner can see this."

### M1. Today (home)

1. **Purpose:** start a job fast; see today's cars.
2. **Components:** header (workshop name), big `Button` "+ New job", `Card` list of recent cars, bottom nav (`Today`, `Bookings`, `Wallet`).
3. **Copy:**
    1. Title: "Today"
    2. Button: "+ New job"
    3. List heading: "Recent cars"
    4. Card: "KJA 123 AB · Corolla · Chidi" + badge "1 pending"
4. **Taps:** "+ New job" → M2. A car card → M5 (that car's job card). Nav → M8 / M10.

### M2. Find or add car

1. **Purpose:** pick the car in 1–2 taps.
2. **Components:** `Input` (plate search, large, uppercase), `Card` results, `Button` "New car".
3. **Copy:**
    1. Title: "Which car?"
    2. Input placeholder: "Type plate, e.g. KJA"
    3. Empty result: "No car found"
    4. Button: "+ New car"
4. **Behaviour:** results filter from the 2nd character. The 3 most recent cars show before typing.
5. **Taps:** a result → M4 with that car's pending issues pre-ticked. "+ New car" → M3.

### M3. New car

1. **Purpose:** add a car with the 4 fields the brief needs (owner name and phone, plate, model).
2. **Components:** `Input` ×3 (plate, owner name, owner phone with numeric keypad), model `ToggleGroup` chips, `Button` "Next".
3. **Copy:**
    1. Title: "New car"
    2. Labels: "Plate number", "Car" (chips), "Owner's name", "Owner's phone (WhatsApp)"
    3. Button: "Next"
    4. Error: "Add the plate number" / "Check the phone number"
4. **Taps:** "Next" → M4. Back → M2.

### M4. Issues and urgency

1. **Purpose:** tap the issues found and how urgent each is.
2. **Components:** chip grid (`ToggleGroup`, 2 per row), and under each picked chip a 3-way `ToggleGroup`: Fix now / Fix soon / Can wait (default **Fix soon**). Optional `Textarea` at the bottom. Sticky `Button` "Save job".
3. **Copy:**
    1. Title: "What did you find?"
    2. Helper: "Tap all that apply"
    3. Pending from last time: banner "From last visit" above pre-ticked chips
    4. Optional note label: "Note (optional)"
    5. Button: "Save job"
4. **Taps:** chip toggles on/off; urgency toggles; "Save job" → M5 with toast "Saved".

### M5. Job card (car record, mechanic view)

1. **Purpose:** see and update the car's issues; mark done/pending; share.
2. **Components:** car header, list of issues each with urgency `Badge` and a `Switch`-style two-button toggle **Pending / Done**, `Button` "Send to owner", `Button` (secondary) "Book a time", link "History".
3. **Copy:**
    1. Header: "KJA 123 AB · Toyota Corolla 2010 · Chidi Okafor"
    2. Issue row: "Brake pads · Fix soon · \[Pending\] \[Done\]"
    3. Buttons: "Send to owner on WhatsApp", "Book a time"
    4. Link: "See history"
4. **Taps:**
    1. "Done" → marks done here (logged in Auto Book).
    2. Long-press or "⋯" on an issue → "Fixed outside Auto Book?" → M6.
    3. "Send to owner on WhatsApp" → M7.
    4. "Book a time" → M8.
    5. "See history" → M5h.

### M6. Outside-fix reason chips (agreed)

1. **Purpose:** keep history honest when an issue is closed without work in Auto Book; a little effort, but only one tap (brief; agreed by Tega 16 Oct 2026).
2. **Components:** `Sheet` (bottom drawer) with 3 large chips and "Cancel".
3. **Copy:**
    1. Title: "Why is this closed?"
    2. Chips: "Fixed elsewhere", "Owner declined", "No longer needed"
    3. Cancel: "Cancel"
4. **Taps:** a chip → back to M5; issue shows grey badge **"Marked outside Auto Book"** + reason. Cancel → M5, nothing changes.

### M5h. History

1. **Purpose:** the car's "family doctor" record.
2. **Components:** timeline list grouped by visit date.
3. **Copy (dummy):**
    1. "12 Sep 2026 · Brake pads · Fix soon · Pending"
    2. "12 Sep 2026 · Engine oil · Done"
    3. "16 Oct 2026 · Wiper blades · Marked outside Auto Book (Owner declined)"
4. **Taps:** Back → M5.

### M7. Share owner link

1. **Purpose:** send the car record to the owner on WhatsApp.
2. **Components:** preview `Card` of the message; `Button` "Open WhatsApp"; `Button` (secondary) "Copy link".
3. **Copy:** preview text: "Hello Chidi, this is Emeka Auto Clinic. Your Corolla (KJA 123 AB) record: 1 thing to fix soon. See it here: autobook.example/c?slug=kja123ab"
4. **Taps:** "Open WhatsApp" → in the prototype, goes to the mock O1 (in a real build it would open a `wa.me` link with the text pre-filled, per [deep dive #7](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64126977/Top+10+booking+UIs+deep+dives)). "Copy link" → toast "Link copied".

### M8. Book a time (v2)

1. **Purpose:** put a job into a time slot (from the app, a phone call, or "bring it now").
2. **Components:** slot chips (next free first), `Button` "Bring it now", issue checklist (pre-ticked from pending), fee line, `Button` "Book".
3. **Copy:**
    1. Title: "When should Chidi come?"
    2. Chips: "Today 4pm", "Tomorrow 10am", "Tomorrow 12pm", "Other day" (in the prototype "Today"/"Tomorrow" are fixed labels, not real dates)
    3. Big button: "Bring it now"
    4. Fee line: "Booking fee when completed: ₦200 (code EARLY200)" or "₦500" if no code. **Hidden for Managers** (Owner only).
    5. Notice line: "Chidi gets a notice on WhatsApp and email"
    6. Button: "Book"
4. **Taps:** a chip + "Book" → M9. "Bring it now" → M9 with time = now.

### M9. Booked + schedule

1. **Purpose:** confirm, and show the day's slots.
2. **Components:** success `Alert`, schedule list, per booking `Button`s "Completed", "Cancelled", "No-show".
3. **Copy:**
    1. Alert: "Booked: Tomorrow 10am. Notice sent to Chidi (WhatsApp + email)."
    2. Row: "Tomorrow 10am · KJA 123 AB · Brake pads"
    3. On "Completed": toast "Completed. ₦200 used from free credit."
    4. On "Cancelled"/"No-show": toast "No fee charged."
4. **Taps:** "Completed" → decrements wallet (M10). Row → M5.

### M10. Wallet (Owner only; display only)

1. **Purpose:** show free credit and the fee; enter the field marketer's code. No real payments (decision 3).
2. **Components:** balance `Card`, fee `Card`, `Input` + `Button` for code, info text.
3. **Copy:**
    1. Balance: "Free credit: 5 completed bookings left"
    2. Fee card before code: "Booking fee: ₦500 per completed booking"
    3. Fee card after code: "Booking fee: ~~₦500~~ **₦200** per completed booking" (no "(early workshop code)" suffix)
    4. Code input label: "Have a code from our team?" Placeholder: "Enter code" Button: "Apply"
    5. Success: "Code applied. You pay ₦200 instead of ₦500." Error: "That code didn't work. Check with the person who gave it."
    6. Info: "Logging cars is always free. You only pay for completed bookings." "Top-up is coming later."
4. **Taps:** "Apply" with EARLY200 → success state; anything else → error. "Have a code?" link → M12. The top-up button "Top up (coming later)" is **tappable** and opens the top-up screen (M11), where **"I've sent it" stays disabled** while credit is free.
5. **Setting (from the brief):** switch "Show booking fee on customer invoice" (off by default).

### M10b. Low-credit warnings (shown on M1, M8 and M10)

These rules apply once payments go live; in the prototype they're shown via the demo switch.

| # | State | Where | Copy | Effect |
| --- | --- | --- | --- | --- |
| 1 | 1 booking of credit left | amber banner on M1, M10 | "1 free booking left. Top up soon." | none |
| 2 | Credit used up, owing under ₦5,000 | amber banner on M1, M8, M10 | "Your credit is used up. You owe ₦\[amount\]. Bookings still work. Top up to clear it." | none; owed amount grows per completed booking |
| 3 | Owing ₦5,000 or more | red banner on M1, M8; "Book" disabled | "You owe ₦5,000. You can't add new bookings until you top up. You can still complete your existing bookings." | M8 "Book" and "Bring it now" disabled; M9 "Completed" still works; logging (M2–M7) always works |

Only the Owner sees amounts; a Manager sees: "Ask the Owner to top up. You can still log cars and complete existing bookings."

### M11. Top up (Owner only; display-only)

1. **Purpose:** show how top-up will work. No real payments until at least 2 workshops use Auto Book daily (decision 3).
2. **Layout:** pack card; bank-transfer details card (dummy); disabled button; info line.
3. **Copy:**
    1. Title: "Top up"
    2. Pack: "10 bookings for ₦5,000" or, with a code, "10 bookings for ₦2,000 (early workshop price)"
    3. Transfer card: "Send ₦\[amount\] by bank transfer to: \[Bank\] · \[Account number\] · Auto Book \[workshop\]" (all placeholders)
    4. Banner: "Top-up isn't switched on yet. You're on free credit for now."
    5. Button (disabled): "I've sent it"
4. **Taps:** Back → M10.

### M12. Discount code (Owner only)

1. **Purpose:** enter the field marketer's code; see ₦500 → ₦200.
2. **Layout:** one input, one button, result card.
3. **Copy:**
    1. Title: "Enter your code"
    2. Helper: "Got a code from our team? It lowers your booking fee."
    3. Placeholder: "e.g. EARLY200"; Button: "Apply"
    4. Success card: "Code applied. Your fee: ~~₦500~~ **₦200** per completed booking. Packs of 10: ₦2,000."
    5. Error: "That code didn't work. Check it with the person who gave it."
4. **Taps:** Apply → success or error; "Done" → M10 showing the new fee.

## 5. Owner screens (WhatsApp + link)

### O1. WhatsApp message mock

1. **Purpose:** test whether the owner understands the message and taps the link. Built as a static page styled like a WhatsApp chat (green header, bubble); clearly labelled "Prototype mock" in the corner.
2. **Messages (dummy):**
    1. Record share: as in M7.
    2. Booking notice: "Hello Chidi, Emeka Auto Clinic booked your Corolla (KJA 123 AB) for Tomorrow 10am: Brake pads. Need to change? Reply here or call 0803 000 0000. Record: autobook.example/c?slug=kja123ab"
    3. Reminder (v2): "Hello Chidi, your brake pads were marked Fix soon on 12 Sep. Want to book? autobook.example/c?slug=kja123ab"
3. **Taps:** the link → O2.
4. **Email:** a second mock (plain email layout) with the same booking-notice text, reachable from a toggle on O1, to compare channels.

### O2. Car record page (owner view, no login)

1. **Purpose:** owner sees what's wrong and how urgent; books.
2. **Components:** car header, issues grouped by urgency with coloured `Badge` + word, history accordion, `Button` "Book a fix", `Button` (secondary) "Chat with Emeka on WhatsApp".
3. **Copy:**
    1. Title: "Your Toyota Corolla · KJA 123 AB"
    2. Subtitle: "Looked after by Emeka Auto Clinic"
    3. Group headings: "Fix now", "Fix soon", "Can wait", "Done"
    4. Row: "Brake pads · Fix soon · found 12 Sep 2026"
    5. Outside-fix row: "Wiper blades · Marked outside Auto Book (Owner declined)"
4. **Taps:** "Book a fix" → O3. "Chat" → back to O1 mock.

### O3. Owner picks a time (v2)

1. **Purpose:** book in 2 taps, no typing (owner is already known from the link).
2. **Components:** slot chips, `Button` "Book this time".
3. **Copy:** Title "Pick a time"; chips as M8; button "Book this time"; note "No need to fill anything. Emeka will see it."
4. **Taps:** chip + button → O4.

### O4. Owner booked

1. **Copy:** "Done! Tomorrow 10am at Emeka Auto Clinic. We've sent this to your WhatsApp and email."
2. **Taps:** "Back to my car" → O2 (now shows "Booked: Tomorrow 10am").

## 6. Empty, loading and error states (every screen)

General: loading shows skeleton bars (no spinners longer than 1 s without text); errors say what happened and what to do, in plain words; nothing is lost on error (the prototype keeps input in state).

| # | Screen | Empty | Loading | Error |
| --- | --- | --- | --- | --- |
| 1 | S1 Sign up | n/a | button "Setting up…" | "Add your workshop name" / "Check the phone number" |
| 2 | S2 Team | "Just you for now. Add a manager anytime." | skeleton cards | "Couldn't add. Check the phone number." |
| 3 | M1 Today | "No cars yet. Tap + New job to add your first car." | 3 skeleton cards | "Can't load. Check your data and try again." \[Try again\] |
| 4 | M2 Which car? | "No car found. Add it as a new car." + \[+ New car\] | skeleton results | "Search isn't working right now. Add as new car." |
| 5 | M3 New car | n/a | "Saving…" | field messages: "Add the plate number", "Check the phone number" |
| 6 | M4 Issues | if no chip picked, Save disabled + "Tap at least one problem" | "Saving…" | "Not saved. Tap Save job again." (input kept) |
| 7 | M5 Job card | "No problems logged yet." \[Add problems\] | skeleton rows | "Can't load this car. Try again." |
| 8 | M5h History | "This is the first visit." | skeleton timeline | "Can't load history. Try again." |
| 9 | M6 Reason chips | n/a | chip shows check on tap | "Couldn't save. Try again." |
| 10 | M7 Share | n/a | n/a | no WhatsApp: "WhatsApp didn't open. Copy the link instead." \[Copy link\] |
| 11 | M8 Book | no free slots: "No free time left today. Pick another day." | skeleton chips | owed ≥ ₦5,000: see M10b row 3 |
| 12 | M9 Schedule | "No bookings yet." | skeleton rows | "Couldn't update. Try again." |
| 13 | M10 Wallet | n/a | skeleton cards | "Can't load wallet. Try again." |
| 14 | M11 Top up | n/a | n/a | n/a (display-only) |
| 15 | M12 Code | n/a | "Checking…" | "That code didn't work. Check it with the person who gave it." |
| 16 | O1 WhatsApp mock | n/a | n/a | n/a |
| 17 | O2 Car record | "Nothing to fix right now. Your car is in good shape." | skeleton | expired/wrong link: "This link isn't working. Ask Emeka Auto Clinic for a new one." |
| 18 | O3 Pick a time | "No free times this week. Chat with Emeka." \[Chat\] | skeleton chips | slot taken: "That time just went. Pick another." |
| 19 | O4 Booked | n/a | n/a | n/a |

## 7. Copy: English (default) and Pidgin (toggle, UNTESTED)

The Pidgin column is our draft and has **not been tested** with users or checked by a native speaker. Validate on visits before relying on it.

| # | String id | English (default) | Pidgin (untested) |
| --- | --- | --- | --- |
| 1 | home.newJob | + New job | + New work |
| 2 | car.which | Which car? | Which motor? |
| 3 | car.new | + New car | + New motor |
| 4 | issues.title | What did you find? | Wetin you see? |
| 5 | issues.help | Tap all that apply | Press all wey concern am |
| 6 | urg.now | Fix now | Fix am now |
| 7 | urg.soon | Fix soon | Fix am soon |
| 8 | urg.wait | Can wait | E fit wait |
| 9 | issue.done | Done | Don finish |
| 10 | issue.pending | Pending | Never finish |
| 11 | job.save | Save job | Save the work |
| 12 | outside.title | Why is this closed? | Why una close am? |
| 13 | outside.elsewhere | Fixed elsewhere | Dem fix am for another place |
| 14 | outside.declined | Owner declined | Owner no gree |
| 15 | outside.notNeeded | No longer needed | E no need again |
| 16 | outside.label | Marked outside Auto Book | Dem mark am outside Auto Book |
| 17 | share.wa | Send to owner on WhatsApp | Send am give owner for WhatsApp |
| 18 | book.title | When should Chidi come? | When Chidi go come? |
| 19 | book.now | Bring it now | Bring am now |
| 20 | wallet.owed5k | You owe ₦5,000. You can't add new bookings until you top up. You can still complete your existing bookings. | You don owe ₦5,000. You no fit add new booking until you top up. You fit still finish the ones wey dey already. |
| 21 | code.applied | Code applied. You pay ₦200 instead of ₦500. | Code don work. Na ₦200 you go pay, no be ₦500. |

Owner-facing WhatsApp messages stay in English in the prototype (the owner audience is private car owners comfortable with a web app, per the brief).

## 8. Tasks to time, with target taps

Targets are our estimates from the flow sketch, to be checked in the field, not measured results. Timer starts on the first tap after the task is read.

| # | Task (read to tester) | Start | Target taps | Target typing | Target time |
| --- | --- | --- | --- | --- | --- |
| 1 | "Chidi's Corolla is back. Add brakes, Fix now, and save." | M1 | ≤ 7 | 2–3 plate characters | ≤ 30 s |
| 2 | "A new car came in: \[card with plate, owner, phone\]. Add shocks Fix now and oil Can wait." | M1 | ≤ 10 | 4 fields | ≤ 60 s |
| 3 | "Mark the brake pads done." | M5 | 1 | 0 | ≤ 10 s |
| 4 | "Bisi's Camry (APP 789 EF): the owner fixed the wipers somewhere else. Show that." | M5 (Bisi's Camry) | 2–3 | 0 | ≤ 15 s |
| 5 | "Send Chidi his car record on WhatsApp." | M5 | 2 | 0 | ≤ 15 s |
| 6 | "Book Chidi for tomorrow 10am." | M5 | 3 | 0 | ≤ 20 s |
| 7 | "You were given code EARLY200. Use it and tell me the fee." | M1 | 4 | 1 field | ≤ 30 s |
| 8 | Owner: "You got this message. What does your car need? Book a time." | O1 | 3 | 0 | ≤ 30 s |
| 9 | "Sign up as the Oga, then find where the money is." | S1 | ≤ 8 | 3 fields | ≤ 60 s |

## 9. Out of scope for the prototype

1. Real WhatsApp/email sending, payments, accounts, multi-tenant data, roles.
2. Voice and photo input (post-MVP per the brief).

## Notes from the built prototype (16 Oct 2026)

1. Record link format is `/c?slug=…` (e.g. `/c?slug=kja123ab`).
2. "Today" and "Tomorrow" on slot chips are fixed labels in the prototype.
3. "Top up (coming later)" is tappable and opens the top-up screen (M11); on M11, "I've sent it" stays disabled while credit is free.
4. The fee line on M8 is hidden for Managers.
5. Timed task 4 uses Bisi's Camry (APP 789 EF), because Chidi's wipers are already "Owner declined" in the dummy data.
6. Host tools (timer and tap count, reset / Next tester, role switch, wallet states, loading/empty/error toggles): turn on Host tools in the settings drawer; leave them off for testers. No logo long-press. (~~?demo=1~~ link flag dropped.)
7. **Live prototype:** <https://autobk.pages.dev> (QR code for visits: see the [Workshop visit script](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64323594/Workshop+visit+script)).
8. **QA tickets:** AB-2 to AB-19 on the [AB board](https://ewvie.atlassian.net/jira/software/projects/AB/boards/10).

## 10. Deferred for now

1. **Checks on bookings routed around Auto Book are deferred:** no stale-account flags and no customer caps in the prototype or the first release.
2. **Why:** workshops start on free credit, so there is no fee to dodge yet; checks would only add friction (decided 16 Oct 2026, see the brief).
3. **Revisit when payments go live** (after at least 2 workshops use Auto Book daily).
4. Also deferred: real top-up/payments (wallet provider leaning Bach, not needed now), reminders scheduling logic, voice and photo input.
5. **Several cars per time slot (workshop capacity):** a workshop may take more than one car in a time range. Deferred until after the workshop visits, because the prototype only needs to test whether logging and booking feel fast. The data already gives each slot a capacity, starting at 1, so this becomes a setting later rather than a rebuild. Ticket: [AB-19](https://ewvie.atlassian.net/browse/AB-19).

## Decisions 16 Oct 2026 (afternoon)

1. One design only: the WhatsApp-style wizard at the plain link <https://autobk.pages.dev>, with no ?flow= link or switch.
2. New direction: WhatsApp-style layout. Jobs list looks like a chat list (plate, car, problems, time, urgency dot red/amber/green); a '+' floating button starts the wizard.
3. Car page reads like a chat history grouped by date; each problem is a plain row with a visible tap circle to mark done (swipe as an extra shortcut) and a visible ⋯ for other options; a fixed bottom bar holds add problem, book a time and Send on WhatsApp.
4. Workshop name moves into the settings drawer; no brand in the header.
5. Standard phone-app text sizes (about 15–16px body, 20px titles) with tap areas still at least 48px.
6. Blue brand colour, not WhatsApp green.
7. Screens should switch instantly with no network wait (single-page app).
8. Body type stays first and owner phone stays optional unless Tega says otherwise.
9. Engineer choices accepted 16 Oct: no swipe yet (tap circle only), car page visits run oldest at top like a chat and open scrolled to the latest, no Done tab, '+' opens plate search first.
10. Booking flow (approved by Tega 16 Oct): one booking per visit, not per problem. Car page calendar icon → Which day? (Today / Tomorrow / next working day / Pick another day, one tap moves on) → What time? (slot grid, full slots greyed) → Check and send (time, car, owner; all pending problems ticked by default; 'Change which problems' to untick; fee line 'Booking fee when completed: ₦200'; one button 'Book and send on WhatsApp'). Per-problem notes or dates live only in that problem's ⋯ menu.
11. 'By when?' step removed from the wizard.
12. No language screen at start; app opens in English and the English/Pidgin switch is only in settings.

## Logging flow (signed-off decisions, 16 Oct 2026)

1. Logging is for work that is done or being done now. It has NO urgency. Booking is for future work.
2. Each log is one visit, holding one or more work items. Each item has its own status (Done or In progress) and defaults to Done.
3. Required fields: plate; car the first time it is seen (brand screen, e.g. Toyota, then a model-and-year screen, e.g. Corolla 2025); work done as chips plus 'Other'; cost per item (not one total). Cost is per item only, with no one-total option; labour is entered as its own line (e.g. Labour ₦10,000), and there is no separate service-charge field.
4. Cost may be blank while an item is In progress but is required to mark it Done. Cost can be edited after Save, e.g. when extra parts are added.
5. Filled in automatically: date, workshop, mechanic.
6. Owner fields are optional on Check and save under a small "Owner (optional)" heading: First name, Last name and WhatsApp number, all optional. WhatsApp is used to send the receipt. As the mechanic types a name or number, matching past customers appear as suggestions to tap, so a returning customer can be reselected. If the plate is already known, the owner is pre-filled.
7. Not for now: photos, mileage, payment status.
8. 'Anything to fix later?' is hidden for now; after Save, show 'Saved' and return to Home. It returns when booking is ready.
9. Screen order:

   1. Plate.

   2. Brand (new car only).

   3. Model and year (new car only).

   4a. What did you work on? (one item, chips).

   4b. Done or In progress.

   4c. Cost, plus an optional note. Cost is required if the item is Done; if it is In progress, there is a 'Skip for now' button.

   4d. Anything else? 'Add another' loops back to 4a; 'No, next' goes on to step 5.

   5. Check and save. Under a small "Owner (optional)" heading: First name, Last name and WhatsApp number, all optional. WhatsApp is used to send the receipt. As the mechanic types a name or number, matching past customers appear as suggestions to tap, so a returning customer can be reselected. If the plate is already known, the owner is pre-filled. Buttons: if a WhatsApp number is filled in, the main button is "Save and send receipt" with a smaller "Just save" under it; if there is no number, there is only "Save". Back arrow at the top left of each step; tapping "Other" opens a text field; step 5 lists each item before the total. No step labels such as "1 of 6" in the app.

   6. 'Anything to fix later?' is hidden for now; after Save, show 'Saved' and return to Home. It returns when booking is ready.
10. Rule: one question per screen.

## Jobs (signed-off decisions, 16 Oct 2026)

### A. Jobs list (tab stays named 'Jobs')

1. Header 'Jobs' with one 'Filter' button top right showing a count badge of active filters. All filters live inside it; no filter chip rows on the page.
2. Big total for the active filters, e.g. 'Made · 12 jobs ₦185,000', plus a small line '₦40,000 waiting on jobs in progress'.
3. Active filters show under the total as small chips with ✕ to remove in one tap.
4. Each job is a soft rounded card (light grey #f8fafc, 16px radius, generous padding, gap between cards): plate and car + work on the left, amount and a Done/In progress pill on the right. Generous white space throughout.
5. Filter opens a tall overlay sheet (\~88% of screen height), title 'Filter' with ✕. Sections: DATE (Today, This week, This month, Last 3 months, Custom range) and CAR BRAND (brand chips). No work-type filter, no status filter. Footer: 'Clear' and 'Show results' (no amount on the button). Generous white space in the sheet.
6. Modern smaller mobile type is fine: rows 14px, details 12px. Filter chips in the sheet are 56px tall, same as all chips; main buttons stay 56px.

### B. Job page (tapping a job)

1. Full page, not a slide-up. Back control is a chevron icon (lucide ChevronLeft, 24px, 2px stroke, colour #0f172a) inside a 48px tap area, not a text arrow — this applies to every back button in the app — plus breadcrumb 'Jobs › \<plate\>'. ⋯ menu top right.
2. Top: plate, car (e.g. Toyota Corolla 2015), customer name (tap opens customer page with all their cars and visits) and visit date.
3. WORK list: each item with cost and Done/In progress pill, then total ('Total so far' while open).
4. Tapping an In progress item opens a small panel asking only for cost (if blank) with 'Mark done'. Done items can be tapped to edit while the job is open.
5. 'Earlier visits' for this customer at the bottom (history is per customer for MVP, not per car); tap opens that visit.
6. A job is one unit: while any item is in progress the job is open and fully editable. Footer: '+ Add item' and 'Send update' (receipts sent while open are updates).
7. When every item is Done, the main button becomes 'Complete job' with '+ Add item' still available. Completion is never automatic. Adding a new item makes the job open again and hides 'Complete job' until it is Done.
8. 'Complete job' opens a full-page check 'Complete this job?' listing items and total with the note 'Once completed, changes aren't possible.' Buttons: 'Complete and send final receipt' and 'Not yet'.
9. After completing: tag '🔒 Completed · receipt sent \<date\>' when a receipt was sent, or '🔒 Completed · no receipt sent' when none was (a job with no customer number shows 'no receipt sent', never 'receipt sent'). WhatsApp opens with the final receipt when one is sent; edit controls are gone. The completed job is fully locked — no one can add a correction in the demo (corrections deferred to the real build with roles). ⋯ menu: first item is 'Resend receipt' when a receipt was already sent (allowed for everyone, not locked); on jobs with no receipt sent the label is 'Send receipt' and it asks for the WhatsApp number first. After send: toast 'Receipt sent' and status line 'Completed · receipt sent \<date\>' (latest send). Menu may also show 'Add correction' and 'Delete job'.
10. In the demo the user is a mechanic, so tapping either 'Add correction' or 'Delete job' shows: 'You don't have the privilege to do this, contact admin.' and nothing changes.
11. Use the word 'complete', never 'close'.

## Side menu (signed-off decisions, 16 Oct 2026)

1. Header order: workshop name (bold), phone, then 'Felicia Davis · Manager' as signed-in user.
2. Menu keeps only: that header, Language toggle, Wallet, Log out.
3. No Help or Team (coming soon). Host tools (Reset demo data, Owner view (demo)) is not a menu row — it is hidden behind a 2-second press on the workshop name.

## Booking (paused, 16 Oct 2026)

1. Booking stays visible but is disabled for now.
2. Tapping Book opens a simple full page: title 'Booking is coming soon', line 'We're building something exciting to help you fill your workshop. For now, log your jobs.', one main button 'Log a car' that opens the logging flow, plus back arrow.
3. No booking steps are reachable.

### Open questions

1. Does urgency stay as an optional tag on bookings, or is it dropped?
2. Should the Jobs tab be renamed to Cars?

## Further reading

1. [UI design spec: look and feel](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63078414/UI+design+spec+look+and+feel)
2. [Workshop visit script](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64323594/Workshop+visit+script)
3. [Visit timing sheet](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64225290/Visit+timing+sheet)
4. [Design principles & first flow sketch](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch)
5. [UI library comparison & recommendation](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63602701/UI+library+comparison+recommendation)
6. [UX research & design playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work)
7. [Idea brief: Auto Book](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)
