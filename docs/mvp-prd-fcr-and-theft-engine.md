# LayerBook MVP PRD: The FCR & Anti-Theft Reconciliation Engine

> **Product Thesis:** 60% to 70% of all profit losses on mid-sized Nigerian layer farms (500–10,000 birds) come from two intertwined sources: **Rank #1: FCR Degradation from Substandard/Adulterated Feed (35%–45%)** and **Rank #2: Employee Pilferage & Fraud (15%–25%)**. Because farm workers routinely disguise theft as "poor feed performance" or "disease mortality," LayerBook acts as an automated **Biological & Inventory Truth Engine** that separates bad feed from human theft using everyday Nigerian farm units (`25kg bags` and `30-egg graded crates`).

---

## 1. The Street-Physics Mathematical Engine (How We Calculate Without Scales)

Nigerian farmhands do not weigh total egg mass in kilograms—they count **30-egg crates** sorted by grade (`Pullet`, `Medium`, `Large`, `Jumbo`) and **25kg feed bags**. LayerBook converts these street units into clinical poultry metrics behind the scenes.

### A. Converting Graded Crates into Egg Mass ($\text{kg}$)
Standard Nigerian commercial crate weights (30 eggs, excluding tray weight):
* **Pullet Crate:** $\approx 1.35\text{ kg}$ ($45\text{g}/\text{egg}$)
* **Medium Crate:** $\approx 1.65\text{ kg}$ ($55\text{g}/\text{egg}$)
* **Large Crate:** $\approx 1.85\text{ kg}$ ($61.6\text{g}/\text{egg}$)
* **Jumbo Crate:** $\approx 2.05\text{ kg}$ ($68.3\text{g}/\text{egg}$)
* *(Fallback if ungraded total crates are entered: $1.75\text{ kg/crate}$)*

$$\text{Total Egg Mass (kg)} = (\text{Crates}_{\text{PL}} \times 1.35) + (\text{Crates}_{\text{MD}} \times 1.65) + (\text{Crates}_{\text{LG}} \times 1.85) + (\text{Crates}_{\text{JB}} \times 2.05)$$

### B. Core Daily Metrics Computed Automatically
1. **Feed Intake per Bird ($\text{g/bird/day}$):**
   $$\text{Intake (g/bird)} = \frac{\text{Bags Opened} \times 25,000\text{g}}{\text{Active Living Birds in Pen}}$$
   * *Biological Standard:* $110\text{g} - 120\text{g}$ per bird/day for mature layers.
2. **True Feed Conversion Ratio ($\text{FCR}$):**
   $$\text{FCR} = \frac{\text{Bags Opened} \times 25\text{ kg}}{\text{Total Egg Mass (kg)}}$$
   * *Optimal Benchmark:* $2.0 - 2.2$
   * *Warning (Substandard Feed / Leakage):* $2.4 - 2.5$
   * *Critical Capital Sink:* $\ge 2.6$
3. **Bags-to-Crates Ratio & Real Feed Cost per Crate ($\text{₦/crate}$):**
   $$\text{Crates per Bag} = \frac{\text{Total Crates Picked}}{\text{Bags Opened}}$$
   $$\text{Feed Cost per Crate (₦)} = \frac{\text{Bags Opened} \times \text{Feed Price per Bag (₦)}}{\text{Total Crates Picked}}$$
4. **Hen-Day Production ($\text{HDP \%}$):**
   $$\text{HDP \%} = \left( \frac{\text{Total Crates Picked} \times 30 + \text{Loose/Cracked Eggs}}{\text{Active Living Birds in Pen}} \right) \times 100$$

---

## 2. The Forensic Diagnostic Matrix (Separating Bad Feed from Worker Theft)

When farm margins drop, the owner needs to know **why**. The Truth Engine runs 6 deterministic rules on every daily log submission:

| Rule ID | Trigger Condition | Diagnosis: Bad Feed (#1) vs. Theft (#2) | Owner Alert Message |
| :--- | :--- | :--- | :--- |
| **RULE 1: The Biological Appetite Ceiling (Feed Siphoning)** | Pen logs $>130\text{g/bird/day}$ (e.g. $>5.2$ bags per $1,000$ birds) in tropical ambient temps ($>28^\circ\text{C}$). | **#2 WORKER THEFT / WASTE:** A $1.9\text{kg}$ layer hen physically cannot consume $130\text{g}+$ of mash in Nigerian heat. Extra bags were siphoned or spilled. | 🔴 **Feed Diversion Alert (Pen 2):** Logged 8 bags ($138\text{g/bird}$). Biologically impossible at $32^\circ\text{C}$. Est. **+1.4 bags (₦20.3k)** missing or wasted today. |
| **RULE 2: The "Egg Mine" Morning Drop (Crate Pilferage)** | Morning collection (11 AM) drops $>8\%$ vs. 7-day rolling baseline while feed intake and yesterday's shell quality remain normal, OR morning pickup is $<70\%$ of total daily eggs. | **#2 WORKER THEFT ("Egg Mine"):** Healthy hens lay $80\%+$ of eggs before noon. A sudden single-morning drop without preceding anorexia indicates hidden/buried crates. | 🔴 **Morning Pickup Anomaly (Pen 1):** Morning lay dropped by 4 crates ($-14\%$) with zero feed/water anomaly. Inspect pen litter/sand for hidden crates. |
| **RULE 3: The Cracked-Egg Loophole** | Logged `Cracked / Broken Eggs` exceed $1.5\%$ of total daily eggs collected in a pen. | **#2 WORKER PILFERAGE:** Staff intentionally crack eggs to classify them as damaged goods for personal take-home consumption. | 🟠 **Excess Breakage (Pen 2):** 45 cracked eggs logged ($2.4\%$ vs $1.0\%$ limit). Verify physical broken shells before authorizing staff disposal. |
| **RULE 4: The Carcass & Cage Hotspot Gate** | Any `Mortality` $>0$ logged without a timestamped post-mortem/slit-carcass photo + Cage ID, OR $\ge 2$ deaths in the same Cage unit within 48h. | **#2 FAKE MORTALITY ("Suya Scam") / #3 CONTAGION HOTSPOT:** Prevents workers from strangling healthy hens to sell to roasters, and pinpoints localized disease spread (e.g. leaky nipple drinker or viral cluster in Row B, Cage 4). | 🔴 **Unverified Mortality / Cage Hotspot:** 3 dead birds logged in Pen 2 (`Row B · Cage 4`). Require slit-carcass photo and inspect Cage 4 drinker line & adjacent cages. |
| **RULE 5: Cross-Pen FCR Decay (Adulterated / Poor Feed)** | Rolling 5-day FCR degrades above $2.45$ across **all pens simultaneously**, accompanied by a downward shift in egg grades (`Large` $\rightarrow$ `Medium`) while `g/bird` stays normal ($110\text{g}-122\text{g}$). | **#1 SUBSTANDARD FEED / MYCOTOXINS:** Workers aren't stealing bags ($g/\text{bird}$ is normal), but the feed lacks amino acids (lysine/methionine) or contains sand/aflatoxins. | 🟣 **Feed Quality Decay (Batch #2):** Birds are eating normal volume ($116\text{g/bird}$), but FCR degraded from $2.1$ to $2.55$ across all pens. Your ₦14,500 feed is costing **₦2,850/crate** (up +₦490/crate). Suspect low protein or mycotoxins. |
| **RULE 6: The 10% Anorexia Early Warning** | Pen feed intake drops $\ge 10\%$ below 7-day average (e.g. $<100\text{g/bird}$). | **#3 EARLY DISEASE INCUBATION:** Pro-inflammatory cytokines suppressing appetite 48–72 hours before egg drop or mortality. | 🟡 **Early Health Warning (Pen 3):** Feed intake dropped $-12\%$ today. Flock may be incubating infection or suffering acute heat stress. Check water ratio & night breathing. |

---

## 3. The Physical Housing Hierarchy: Pen (House) $\rightarrow$ Row (Line) $\rightarrow$ Cage Unit

To align 100% with how Nigerian poultry houses are constructed and operated, LayerBook separates **Pen-level bulk inputs** from **Cage-level biological pinpointing**:

1. **Why Setup Uses Battery Cage Units (96 or 120 Birds/Cage):**
   - Commercial layer farms in Nigeria buy and install standard 3-tier (**96-bird**) or 4-tier (**120-bird**) A-frame/H-frame battery cage units bolted end-to-end into long **Rows (Lines)**.
   - During onboarding, the owner or farm builder simply enters:
     * `Pen 1`: **[ 20 Cage Units ]** $\times$ **[ 96 birds/cage ]** = **1,920 birds capacity** (arranged in Rows A & B).
   - This speaks the exact language of farm equipment builders and eliminates manual capacity math.
2. **Why Daily Feed & Egg Collection Stay at the Pen Level:**
   - A single 96-bird cage consumes only $\sim 11\text{kg}$ of feed per day ($<0.5$ bag), and feed troughs run continuously down an entire row of cages. Attendants pour 25kg bags down the continuous trough and cannot weigh feed per individual cage.
   - Logging feed bags and crate pickups at the **Pen (House)** level keeps daily data entry under 20 seconds.
3. **Why Mortality & Disease Tagging Drop Down to the Specific Cage Unit:**
   - While feed is poured across the whole pen, **birds die in a specific cage** and **bloody/green droppings appear under a specific cage**.
   - Infectious outbreaks (Newcastle, Avian Influenza, Coccidiosis) or mechanical failures (blocked nipple drinkers) always start in a single cage unit (e.g. `Row B · Cage 4`) and spread to neighboring cages (`Cage 3` and `Cage 5`) over the next 48 hours.
   - When logging mortality or dropping anomalies, the attendant taps the **Row & Cage #** (`Cage 4`), turning LayerBook into a spatial disease-spread radar without adding daily bookkeeping bloat.

---

## 4. End-to-End Progressive Disclosure Architecture (`4.A`, `4.B`, `4.C`)

Following AutoBook's core interaction law, LayerBook **never presents a multi-field form on a single screen**. Every workflow uses progressive disclosure:
1. **In Wizards (`/setup` & `/log`):** One question per screen using full-width `<Chip>` buttons where tapping a choice automatically advances to the next step—and conditional follow-ups only appear when an anomaly occurs.
2. **In the Owner Dashboard (`/?v=3`):** 3-Second Headline $\rightarrow$ Quiet Dual Cards $\rightarrow$ Tappable Pen Rows $\rightarrow$ Bottom-Sheet Evidence Drill-Down.

---

### 4.A: Flow 1 — First-Time Farm & Cage Setup (`/setup/...`)
*A 4-tap onboarding wizard where each tap auto-advances:*

* **Step `4.A.1` (`/setup/cages`) — "How are your cages built?"**
  * `<Chip>` `96 birds per cage` *(right: `3-tier standard`)* $\rightarrow$ auto-advances
  * `<Chip>` `120 birds per cage` *(right: `4-tier standard`)*
  * `<Chip>` `Deep litter` *(right: `Floor system`)*
* **Step `4.A.2` (`/setup/pens`) — "How many cages in Pen 1?"**
  * `<Chip>` `15 cages` *(right: `1,440 birds`)*
  * `<Chip>` `20 cages` *(right: `1,920 birds`)* $\rightarrow$ auto-advances
  * `<Chip>` `25 cages` *(right: `2,400 birds`)*
* **Step `4.A.3` (`/setup/feed`) — "Current feed bag price (25kg)?"**
  * `<Chip>` `₦14,500 / bag` *(right: `Self / Toll-milled`)* $\rightarrow$ auto-advances
  * `<Chip>` `₦17,500 / bag` *(right: `Wholesale depot`)*
  * `<Chip>` `₦19,500 / bag` *(right: `Retail commercial`)*
* **Step `4.A.4` (`/setup/store`) — "Bags currently in your feed store?"**
  * `<Chip>` `100 bags` *(right: `~3 days runway`)* $\rightarrow$ saves & opens Owner Dashboard.

---

### 4.B: Flow 2 — The 20-Second Manager Evening Log (`/log/...`)
*One question per screen. Conditional branching ensures healthy days take only 5 taps:*

```
[4.B.1: Which pen?] ──► [4.B.2: Bags opened?] ──► [4.B.3: Morning vs Afternoon Crates]
                                                                 │
      ┌──────────────────────────────────────────────────────────┘
      ▼
[4.B.4: Grade Split & Cracked] ──► [4.B.5: Any dead birds today?]
                                           │
                      ┌────────────────────┴────────────────────┐
                      │ (If 0 dead — 90% of days)               │ (ONLY if ≥ 1 dead bird)
                      ▼                                         ▼
            [4.B.6: Check & Lock]                     [4.B.5b: Which Cage + Snap Photo]
                                                                │
                                                                ▼
                                                      [4.B.6: Check & Lock]
```

* **Step `4.B.1` (`/log/pen`) — "Which pen?"**
  * Tap `Pen 1 (20 cages · 1,920 birds)` $\rightarrow$ advances to `/log/feed`.
* **Step `4.B.2` (`/log/feed`) — "Feed bags taken from store"**
  * Subtitle shows live store inventory: *`100 bags currently in store`*.
  * Tap `8 bags` *(right: `200 kg · 104g/bird`)* $\rightarrow$ advances to `/log/eggs`.
* **Step `4.B.3` (`/log/eggs`) — "Crates collected today"**
  * Quick split for **Morning Pickup (11 AM)** vs **Afternoon Pickup (4 PM)** (powers Rule 2: "Egg Mine" morning drop detection).
* **Step `4.B.4` (`/log/grades`) — "Grades & cracked eggs"**
  * Pre-filled from yesterday's baseline so the manager only adjusts deltas (`Large`, `Medium`, `Pullet`, `Jumbo`, and `Cracked count`).
* **Step `4.B.5` (`/log/mortality`) — "Any dead birds today?"**
  * Tap **`0 birds (All healthy)`** $\rightarrow$ **Skips straight to `/log/review`!**
  * **Conditional Step `4.B.5b` (`/log/hotspot` — ONLY shown if mortality $\ge 1$):**
    1. *"Which cage unit?"* $\rightarrow$ Tap `Row B · Cage 4`
    2. *"Attach slit-carcass photo"* $\rightarrow$ Tap `[ 📷 Snap Photo ]` (required to unlock the Next button).
* **Step `4.B.6` (`/log/review`) — "Check and lock"**
  * Displays single summary card: **Computed FCR (`2.14`)**, **Updated Store Balance (`92 bags left`)**, and any triggered warning badge.
  * Primary CTA: **`Lock & Send WhatsApp Slip`** (locks record against nighttime tampering).

---

### 4.C: Flow 3 — Owner Verdict Dashboard Progressive Disclosure (`/?v=3`)
*Three calm layers of depth so the screen never looks cluttered:*

* **Layer 1: The 3-Second Executive Glance (Home Tab)**
  * **Headline:** `₦571k` `/ 202 crates sold` *(Net feed margin calculated live from the owner's `₦14,500` feed bag price)*.
  * **Primary Action:** `Send WhatsApp EOD slip`.
  * **Dual Quiet Cards:**
    * Left Card: **`₦2,225`** (`feed cost per crate · 2.18 FCR`)
    * Right Card: **`+1.4 bags`** (`overfed in Pen 2 · ₦20.3k`) OR **`92 bags`** (`left in store room`).
  * **Crates by Grade List:** Clean 4-row list (`LG`, `MD`, `PL`, `JB`) with week-on-week `%` trend pills on the right.
* **Layer 2: The 10-Second Forensic Audit (Feed Check & HDP Tabs)**
  * Separates **Rank #1 (Feed Quality / FCR Decay)** from **Rank #2 (Staff Siphoning / Egg Mines / Cracked Loophole)** per pen (`Pen 1: Optimal 115g/bird`, `Pen 2: +1.4 bags / 138g/bird leak`).
  * Shows **Cage Hotspot Alerts** (`Row B · Cage 4 flagged for repeat mortality`).
* **Layer 3: The 30-Second Visual Proof (Flock Log 2-Column Grid + Tap Sheet)**
  * Clean 2-column icon grid with **Titles Only** (`Post-Mortem Log`, `Shell & Cracks`, `Flock Uniformity`, `Water Intake`, `Gut & Droppings`, `Vaccine Schedule`).
  * Tapping any card slides up a quiet bottom sheet with the timestamped carcass photo, chromatic dropping selector, or feed waybill.

---

## 5. Why This Specific MVP Wins Both Farmers and the 916k-Follower Builder

1. **Speaks the Exact Language of Cage Builders (`96-Bird / 120-Bird Sets`):**
   - Equipment suppliers and farm builders sell battery cages by the unit (`20 sets of 96-bird cages`). Seeing a Pen Builder that calculates flock baselines directly from **Cage Units** makes the 916k-follower builder feel like this software was custom-engineered for his business.
2. **Instant Personalization During Demo:**
   - When he opens the link, he taps **Feed Price** and sees `₦14,500` (or edits it to whatever his client pays). The entire app recalculates FCR, Net Margin, and Cost per Crate in real time.
3. **Solves the Absentee Owner's #1 Fear (Store & Pen Reconciliation):**
   - If the owner buys 100 bags of feed on Monday, the app tracks the **Store Countdown** (`100 bags` $\rightarrow$ `69 bags` $\rightarrow$ `38 bags`). The attendant cannot quietly steal 5 bags from the store room because the app reconciles **Bags Bought vs. Bags Fed to Pens**.
4. **Zero Hardware Required:**
   - Uses standard `25kg bags` and `30-egg graded crates` to compute scientific **FCR ($2.12$)** and **Grams per Bird ($116\text{g}$)** without requiring the farm to buy digital egg scales or automated feed weighers.

---

## 6. Technical Implementation Plan (Next.js Local-First State)

1. **Unified Reactive Store (`useFarmStore`):**
   - Persist farm configuration (feed price per bag, crate prices by grade, store bag inventory, pen populations) and daily logs in `localStorage` so any edits made in `/log` or `Settings` immediately reflect on the Owner Dashboard.
2. **Interactive Demo Mode:**
   - Allow the user to tap **"+ Log Today's Pen"** or **"Edit Feed Price (₦14,500)"** right from the app so prospective customers testing the link on Instagram can experience the live calculations with their own farm numbers.
