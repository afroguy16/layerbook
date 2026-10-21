---
title: "UI design spec: look and feel"
source: https://ewvie.atlassian.net/wiki/spaces/AB/pages/63078414
confluence_page_id: 63078414
version: 3
version_date: 2026-10-16T14:47:34.612Z
version_message: "Add Sizes source of truth (16 Oct 2026); align button/chip radius"
exported: 2026-10-16 (read-only export; edit in Confluence, not here)
---

# UI design spec: look and feel

*Context: visual tokens, component states and wireframes for the Auto Book prototype, ready to paste into a shadcn/ui theme; pairs with *[*Prototype spec: screen by screen*](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64127033/Prototype+spec+screen+by+screen)* (16 Oct 2026).*

## 1. Rules behind the look

1. **Calm and clean** ("Apple-style simple and sleek", [Idea brief](https://ewvie.atlassian.net/wiki/spaces/AB/pages/62750721/Idea+brief+Auto+Book+family+doctor+for+your+car)): white background, one blue for actions, colour only where it means something.
2. **Colour always comes with a word.** Urgency is never shown by colour alone.
3. **Big and tappable** for greasy hands and bright sun.
4. **Light:** system fonts, icons as inline SVG, no images.

## 2. Colour palette and contrast

Contrast ratios were calculated by us with the WCAG relative-luminance formula. WCAG AA needs at least **4.5:1** for normal text and 3:1 for large text ([W3C: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)). Every text pair below passes AA for normal text.

| Token | Hex | Use | Text pair | Ratio | AA |
| --- | --- | --- | --- | --- | --- |
| `background` | #FFFFFF | page | `foreground` #111827 | 17.74 | Pass |
| `foreground` | #111827 | main text | on white | 17.74 | Pass |
| `muted-foreground` | #4B5563 | helper text | on white | 7.56 | Pass |
| `primary` | #1D4ED8 | main buttons, links | white text on it | 6.70 | Pass |
| `destructive` | #B42318 | errors | on white | 6.57 | Pass |
| `border` | #D0D5DD | card/input borders (decorative) | vs white | 1.47 | n/a (not text) |
| `input-border` | #98A2B3 | input outlines | vs white | 2.58 | Below 3:1 for UI components; use 2px width + label. Open item: darken if testing shows inputs are hard to see |
| `urgent-now` (Fix now) | #B42318 | solid chip | white text | 6.57 | Pass |
| `urgent-now-soft` | #FEE4E2 | soft badge bg | text #B42318 | 5.45 | Pass |
| `urgent-soon` (Fix soon) | #F79009 | solid chip | text #111827 | 7.56 | Pass (use dark text, not white) |
| `urgent-soon-soft` | #FEF0C7 | soft badge bg | text #7A2E0E | 8.32 | Pass |
| `urgent-wait` (Can wait) | #067647 | solid chip | white text | 5.69 | Pass |
| `urgent-wait-soft` | #DCFAE6 | soft badge bg | text #067647 | 5.11 | Pass |
| `outside` (Marked outside Auto Book) | #F2F4F7 | grey badge bg | text #344054 | 9.49 | Pass |
| `wa-header` (owner mock only) | #075E54 | WhatsApp-style header | white text | 7.67 | Pass |

Each urgency chip also has a distinct icon (see section 6) so colour-blind users have a third cue.

### shadcn/ui theme (paste into `app/globals.css`)

shadcn/ui themes through semantic CSS variables such as `background`, `foreground` and `primary` ([shadcn/ui theming](https://ui.shadcn.com/docs/theming)). Hex values are given; convert to the colour format your shadcn version expects.

```
:root {
  --background: #FFFFFF;
  --foreground: #111827;
  --card: #FFFFFF;
  --card-foreground: #111827;
  --primary: #1D4ED8;
  --primary-foreground: #FFFFFF;
  --secondary: #F2F4F7;
  --secondary-foreground: #111827;
  --muted: #F2F4F7;
  --muted-foreground: #4B5563;
  --destructive: #B42318;
  --border: #D0D5DD;
  --input: #98A2B3;
  --ring: #1D4ED8;
  --radius: 0.75rem;
  /* Auto Book extras */
  --urgent-now: #B42318;   --urgent-now-fg: #FFFFFF;
  --urgent-now-soft: #FEE4E2; --urgent-now-soft-fg: #B42318;
  --urgent-soon: #F79009;  --urgent-soon-fg: #111827;
  --urgent-soon-soft: #FEF0C7; --urgent-soon-soft-fg: #7A2E0E;
  --urgent-wait: #067647;  --urgent-wait-fg: #FFFFFF;
  --urgent-wait-soft: #DCFAE6; --urgent-wait-soft-fg: #067647;
  --outside: #F2F4F7;      --outside-fg: #344054;
}
```

Dark mode: not in the prototype.

## 3. Type scale

System font stack (no download): `-apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

| # | Token | Size / line height | Weight | Use |
| --- | --- | --- | --- | --- |
| 1 | `text-title` | 24 / 32 px | 700 | screen title ("What did you find?") |
| 2 | `text-plate` | 22 / 28 px | 700, letter-spacing 0.05em | plate numbers |
| 3 | `text-heading` | 18 / 26 px | 600 | section headings, card titles |
| 4 | `text-body` | 16 / 24 px | 400 | body, inputs (16 px also stops iOS zooming into inputs) |
| 5 | `text-button` | 17 / 24 px | 600 | buttons and chips |
| 6 | `text-small` | 14 / 20 px | 400 | helper text, timestamps (never smaller) |

## 4. Spacing, sizes and radius

1. **Spacing scale (4 px base):** 4, 8, 12, 16, 24, 32 px. Screen side padding 16 px; gap between cards 12 px; gap between tap targets at least 8 px.
2. **Tap targets:**
    1. Apple: default 44 × 44 pt for iOS controls ([Apple HIG: Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)).
    2. Android/Material: at least 48 × 48 dp ([Android Developers: accessibility](https://developer.android.com/guide/topics/ui/accessibility/apps)).
    3. WCAG 2.2 enhanced: at least 44 × 44 CSS px ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)).
    4. **Auto Book rule: 48 px minimum height for everything tappable; main buttons 56 px tall and full width; issue chips 56 px tall.**
3. **Radius:** `--radius` 12 px for cards; main buttons 16 px corner radius; chips fully rounded (9999 px) with 18 px side padding; 9999 px (pill) for badges only.
4. **Elevation:** no shadows except the bottom sticky button bar (1 px top border + subtle shadow).

## Sizes (source of truth, 16 Oct 2026)

1. Main buttons: 56px tall, 16px corner radius, full width.
2. Chips: 56px tall, fully rounded, 18px side padding.
3. Inputs: 56px tall, 14px radius.
4. Accent blue: #2563eb.
5. One question per screen.
6. Where this page and the testing rules disagree, this page and the mockups (/workspace/mock/log.html, log5.html) win.

## 5. Component states

| # | Component | Default | Pressed / selected | Disabled | Loading | Error |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Primary button (56 px) | blue bg, white text | darker blue (#1E40AF), 98% scale | grey bg #F2F4F7, text #4B5563, label stays | spinner + label "Saving…", not tappable | n/a (errors show above) |
| 2 | Secondary button | white bg, 2 px blue border, blue text | light blue bg #EFF4FF | as primary disabled | spinner | n/a |
| 3 | Issue chip (56 px) | white, 2 px border #98A2B3, label | blue border + blue tint #EFF4FF + check icon | n/a | n/a | n/a |
| 4 | Urgency toggle (3 segments) | white segments with icon + word | selected segment takes solid urgency colour + its text colour | n/a | n/a | red outline + "Pick how urgent" if none (only if default removed) |
| 5 | Card (car) | white, 1 px border, 12 px radius | light grey bg on press | n/a | skeleton: grey bars for plate and name | n/a |
| 6 | Input | 2 px #98A2B3 border, label above | focus: 2 px blue ring | grey bg | n/a | red border, red message below, icon |
| 7 | Badge | soft colour + dark text + icon | n/a | n/a | n/a | n/a |
| 8 | Toast | dark bg #111827, white text, bottom | n/a | n/a | n/a | error toast uses red bg #B42318 |

All focus states show a visible 2 px blue ring.

## 6. Icons

1. **Set:** [Lucide](https://lucide.dev/) (shadcn/ui's default icon set), imported per icon so only used icons ship.
2. **Size:** 24 px in chips and buttons, 20 px in badges; stroke 2.
3. **Key icons:** Fix now `alert-triangle`; Fix soon `clock`; Can wait `check-circle`; Done `check`; Marked outside `external-link`; Add `plus`; Search `search`; WhatsApp share `message-circle`; Wallet `wallet`; Calendar `calendar`; Back `chevron-left`. Icon names should be checked against the current Lucide list at build time.
4. Icons always have a text label next to them; no icon-only buttons except Back (which has an aria-label).

## 7. Wireframes (key screens)

Screen IDs match the [screen spec](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64127033/Prototype+spec+screen+by+screen). 360 px wide; `[ ]` = button/chip; `( )` = input.

### M1 Today

```
+--------------------------------+
| Emeka Auto Clinic      [EN|PG] |
| Today                          |
| [        + New job           ] |  56px primary
| Recent cars                    |
| +----------------------------+ |
| | KJA 123 AB      (1 pending)| |  card
| | Corolla · Chidi            | |
| +----------------------------+ |
| | LND 456 CD                 | |
| +----------------------------+ |
|--------------------------------|
| Today | Bookings | Wallet*     |  *Wallet only for Owner role
+--------------------------------+
```

### M2 Which car?

```
| < Which car?                   |
| ( Type plate, e.g. KJA       ) |
| [ KJA 123 AB · Corolla      ] |
| [ APP 789 EF · Camry        ] |
| [        + New car           ] |
```

### M4 What did you find?

```
| < What did you find?           |
| From last visit                |
| [x Brake pads ][  Battery    ] |
|  [!Now][◷Soon*][✓Wait]         |  urgency under picked chip
| [  Engine oil ][  Tyres      ] |
| [  Shocks     ][  AC         ] |
| ...                            |
| Note (optional) (           )  |
|================================|
| [         Save job           ] |  sticky
```

### M5 Job card

```
| < KJA 123 AB                   |
| Toyota Corolla 2010 · Chidi    |
| Brake pads   (◷ Fix soon)      |
|   [ Pending* ][ Done ]   [...] |
| Wipers  (↗ Marked outside)     |
| [ Send to owner on WhatsApp  ] |
| [ Book a time                ] |  secondary
| See history >                  |
```

### M6 Why is this closed? (bottom sheet)

```
|--------------------------------|
| Why is this closed?            |
| [ Fixed elsewhere            ] |
| [ Owner declined             ] |
| [ No longer needed           ] |
| Cancel                         |
```

### M8 Book a time

```
| < When should Chidi come?      |
| [Today 4pm][Tomorrow 10am]     |
| [Tomorrow 12pm][Other day]     |
| [        Bring it now        ] |
| Fee when completed: N200 (code)|
| Notice: WhatsApp + email       |
| [            Book            ] |
```

### M10 Wallet (Owner role only)

```
| Wallet                         |
| +----------------------------+ |
| | Free credit: 5 bookings left| |
| +----------------------------+ |
| Booking fee: ~~N500~~ N200     |
| Have a code from our team?     |
| ( Enter code ) [ Apply ]       |
| [ Top up (coming later)      ] |  disabled until payments live
```

### O1 WhatsApp mock / O2 car record

```
| [green] Emeka Auto Clinic      |   | Your Toyota Corolla        |
|  +--------------------------+  |   | KJA 123 AB                 |
|  | Hello Chidi, ... 1 thing |  |   | Looked after by Emeka...   |
|  | to fix soon. See it here:|  |   | Fix soon                   |
|  | autobook.example/c/...   |  |   |  (◷) Brake pads · 12 Sep   |
|  +--------------------------+  |   | [      Book a fix        ] |
```

Empty, loading and error states for each screen are listed in the screen spec, section 6.

## Further reading

1. [Prototype spec: screen by screen](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64127033/Prototype+spec+screen+by+screen)
2. [UI library comparison & recommendation](https://ewvie.atlassian.net/wiki/spaces/AB/pages/63602701/UI+library+comparison+recommendation)
3. [Design principles & first flow sketch](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64159745/Design+principles+first+flow+sketch)
4. [UX research & design playbook](https://ewvie.atlassian.net/wiki/spaces/AB/pages/64028673/UX+research+design+playbook+how+we+ll+work)
