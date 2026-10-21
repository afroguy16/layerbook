# Jira: project AB

Read-only export from https://ewvie.atlassian.net (16 Oct 2026). Edit tickets in Jira, not here.

## AB-21: Build the logging flow (pixel perfect to UX mockups)

- Link: https://ewvie.atlassian.net/browse/AB-21
- Status: To Do · Priority: Medium · Assignee: Unassigned · Updated: 2026-10-16T15:55:37.992+0100

Build the approved logging flow exactly as in Studio UX Research's mockups and the "Logging flow" section of the spec: https://ewvie.atlassian.net/wiki/spaces/AB/pages/64127033/Prototype+spec+screen+by+screen

Mockups on the box: /workspace/mock/log.png, /workspace/mock/log4.png, plus UX's latest update with 4c note and receipt wording.

Done means:

1. One question per screen: 1 Plate, 2 Brand (new cars only), 3 Model and year (new cars only), 4a Work done, 4b Done or In progress, 4c Cost plus optional note (cost required if Done, "Skip for now" if In progress), 4d Anything else (Add another or Next), 5 Check and save with total and optional owner WhatsApp for the receipt.
2. A known plate skips from 1 to 4a.
3. One log per visit holds several items; cost per item only, labour is its own line, no one-total option, no photo.
4. Cost editable after Save.
5. Step 6 (Anything to fix later) hidden; after Save show "Saved" and return to Home.
6. Pixel-perfect match to the mockups at one phone width, checked side by side by QA.
7. No push to the main link without Tega's explicit "push" for this build.

Booking flow is parked until logging is solid.

— Nori \[bot\]

## AB-22: Build the Jobs list and job page (from UX spec)

- Link: https://ewvie.atlassian.net/browse/AB-22
- Status: To Do · Priority: Medium · Assignee: Unassigned · Updated: 2026-10-16T16:20:31.080+0100

Build from UX's Jobs section in the Prototype spec page 64127033, with no new mockups. Key decisions (Oct 16 2026):

1. Jobs list: total for the active filters at the top, plus money waiting on in-progress jobs. There's one Filter button that opens a tall sheet with Date and Car brand only, and active filters show as chips with an ✕. Jobs are soft cards with generous white space and smaller modern text.
2. Tapping a job opens a full page with a back arrow and a breadcrumb (Jobs › plate). It's not a slide-up.
3. The job page shows the car, the customer (tapping opens their page), the items with cost and status, the total, the customer's earlier visits, "+ Add item" and "Send update".
4. Tapping an In progress item opens a small panel that asks for its cost and has a "Mark done" button.
5. The whole job is one unit. Once every item is Done, a "Complete job" button appears and the mechanic must tap it, since it never happens automatically. A check page ("Complete this job?") offers "Complete and send final receipt" or "Not yet". After that the job shows as Completed and is locked, and changes go in only as corrections.
6. Delete is blocked in the demo with "You don't have the privilege to delete this, contact admin."
7. QA does a light check. It goes to the main link only on Tega's "push".

— Nori \[bot\]

## Other AB tickets (index)

| Key | Summary | Status | Priority |
|---|---|---|---|
| [AB-1](https://ewvie.atlassian.net/browse/AB-1) | Clickable prototype: 19 screens (Next.js + shadcn/ui, static export) | HOD Review | Medium |
| [AB-2](https://ewvie.atlassian.net/browse/AB-2) | Manager can open Top up screen by URL | To Do | High |
| [AB-3](https://ewvie.atlassian.net/browse/AB-3) | EN/PG toggle buttons are 44px tall (below 48px minimum) | To Do | High |
| [AB-4](https://ewvie.atlassian.net/browse/AB-4) | Pidgin mode leaves multiple UI strings in English | To Do | High |
| [AB-5](https://ewvie.atlassian.net/browse/AB-5) | M3 model chips labels differ from spec and Camry wraps | To Do | Medium |
| [AB-6](https://ewvie.atlassian.net/browse/AB-6) | M12 stale code result overwrites new Apply | To Do | Medium |
| [AB-7](https://ewvie.atlassian.net/browse/AB-7) | Toasts persist across navigation and cover content | To Do | Medium |
| [AB-8](https://ewvie.atlassian.net/browse/AB-8) | M4 regroups freshly picked chip under From last visit during save | To Do | Medium |
| [AB-9](https://ewvie.atlassian.net/browse/AB-9) | Toasts persist across navigation and cover content | To Do | High |
| [AB-10](https://ewvie.atlassian.net/browse/AB-10) | M4 regroups freshly picked chip during save | To Do | High |
| [AB-11](https://ewvie.atlassian.net/browse/AB-11) | Wallet owed banner shows fixed ₦5,000 vs card ₦5,500 | To Do | Low |
| [AB-12](https://ewvie.atlassian.net/browse/AB-12) | Invoice-fee control is 28px checkbox instead of switch | To Do | Low |
| [AB-13](https://ewvie.atlassian.net/browse/AB-13) | M12 success text and M10 fee card copy differ from spec | To Do | Low |
| [AB-14](https://ewvie.atlassian.net/browse/AB-14) | Demo panel reopens on every page load after Hide; long-press fails on Wallet | To Do | Medium |
| [AB-15](https://ewvie.atlassian.net/browse/AB-15) | Debug tap/timer pill overlaps headers and truncates workshop name at 360px | To Do | Medium |
| [AB-16](https://ewvie.atlassian.net/browse/AB-16) | Timer shows '⏱ -1s' on first load | To Do | Low |
| [AB-17](https://ewvie.atlassian.net/browse/AB-17) | O1 WhatsApp mock shows booking/reminder messages for never-booked car | To Do | Medium |
| [AB-18](https://ewvie.atlassian.net/browse/AB-18) | M10 offers discount code twice (inline field and Have a code? link) | To Do | Low |
| [AB-19](https://ewvie.atlassian.net/browse/AB-19) | Multiple cars per time slot (slot capacity) | To Do | Low |
| [AB-20](https://ewvie.atlassian.net/browse/AB-20) | KJA 123 AB record shows done Engine oil as 'Fix soon' | To Do | Low |

Note: AB-2…AB-20 were raised against the earlier v2 prototype (19-screen build); several screens they mention (top up by URL, M4 urgency chips, demo panel/timer pill) no longer exist in v5. Re-check before working on them.
