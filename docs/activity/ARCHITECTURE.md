# LayerBook Architecture: The Task & Activity Domain Model

> **Status:** Core System Architecture  
> **Scope:** Domain Model, Execution Engine, State Aggregation, and Root-Cause Intelligence  
> **Core Thesis:** *Passive logging only records symptoms after damage is done. LayerBook's **Task Engine** encodes Farm SOPs as stateful, pre-filtered execution templates—giving attendants zero-ambiguity guidance while giving owners shift-level accountability and biological root-cause forensics.*

---

## 1. The Architectural Problem: Passive Logbooks vs. Operational Reality

Legacy agricultural ERPs and basic farm logbooks fail because they model farm operations as **passive, open-ended data entry**:

1. **Absence of Signal on Omission:** A passive logbook only records what was entered; it cannot natively represent what was **supposed** to happen at 7:00 AM in Pen 2 but was skipped.
2. **No Chain of Custody:** When production drops 15% on Thursday, a passive ledger only shows Thursday's lower crate count. It cannot attribute whether the Tuesday night water check was skipped, whether Wednesday morning feeding was incomplete, or which shift was on duty when early warning signs appeared.
3. **Structured Rhythm vs. Unscheduled Events:** Farm operations run in two concurrent modes:
   * **Scheduled SOPs (90% of execution):** Recurring, shift-bound routines (`Morning`, `Afternoon`, `Evening`, `Night`) defined by management.
   * **Ad-Hoc Observations (10% of execution):** Unscheduled events discovered between routines (e.g., spotting dead birds or abnormal manure at 1:15 PM).

---

## 2. Core Domain Primitives

LayerBook resolves this tension through four foundational domain primitives:

### 2.1. Observation Modules (`ModuleType`)
The atomic data-capture units of a poultry house. Each module captures raw physical observations (never premature diagnoses):
* `feed` — Quantity dispensed (`bags` or `kg`).
* `eggs` — Graded good harvest (`Large`, `Medium`, `Pullet`, `Jumbo`) + optional cracked breakdown (`pcs` or `crates`).
* `water` — Inline meter volume (`litres`).
* `mortality` — Cage-level dead bird counts + optional carcass photo evidence.
* `droppings` — Cage/Row-level manure condition (`watery`, `bloody`, `greenish`) + optional tray photo evidence.

### 2.2. Task Definition (`TaskDefinition`) — *The Core Unlock*
A manager-defined Standard Operating Procedure (SOP) bound to a pen and shift window.
* **Properties:**
  * `id`: Unique template identifier (e.g., `morning-routine`).
  * `shift`: Operational window (`Morning` | `Afternoon` | `Evening` | `Night`).
  * `requiredModules`: Non-empty subset of `ModuleType[]` (e.g., `["feed", "eggs"]` for `Afternoon Routine`, or `["water", "mortality", "droppings"]` for `Night Check`).
  * `assignedRole` / `shiftOwner`: The attendant or shift crew accountable for execution.
* **Architectural Role:** Acts as both a **pre-filter on the execution engine** (restricting scope to `requiredModules`) and a **stateful compliance contract** (`Open` $\rightarrow$ `Partial` $\rightarrow$ `Done`).

### 2.3. Activity Pass (`ActivityPass`)
An immutable event emitted whenever an attendant completes a pass through a pen house. Every entry into a pen—whether triggered by a **Task** or initiated as a **Generic Log**—produces a single atomic `ActivityPass` record:
* **Properties:**
  * `id`, `penId`, `timestamp`, `attendantId`, `shift`.
  * `origin`: `"task"` (linked via `taskDefinitionId`) or `"generic"` (ad-hoc pass).
  * `payload`: Recorded module values (`feed`, `eggs`, `water`, `mortality[]`, `droppings[]`).
  * `hasIncident`: Boolean flag derived automatically (`mortality.count > 0 || droppings.length > 0`).

### 2.4. Daily Pen State (`DailyPenState`)
The materialized daily projection for a given `(penId, date)` pair, computed deterministically by folding all `ActivityPass` events for that day against the pen's active `TaskDefinition[]` schedule:
* **Cumulative Totals:** Total crates harvested, total cracked eggs, total feed dispensed, total water consumed, total mortality, and active droppings anomalies.
* **Task Compliance Matrix:** Live state (`Open`, `Partial`, `Done`) for every scheduled `TaskDefinition` on that pen.

---

## 3. System Data Flow: One Execution Engine, Two Entry Lenses

LayerBook uses a single **Pen Execution Engine** driven by two distinct entry lenses:

```
┌─────────────────────────────────────┐    ┌─────────────────────────────────────┐
│     1. TASK-DRIVEN ENTRY (90%)      │    │    2. GENERIC AD-HOC ENTRY (10%)    │
│    (Manager-Defined Task SOPs)      │    │     (Unscheduled Pen Visits)        │
├─────────────────────────────────────┤    ├─────────────────────────────────────┤
│ • Input: (penId, TaskDefinition)    │    │ • Input: (penId)                    │
│ • Scope: Pre-filtered to            │    │ • Scope: Unfiltered                 │
│   TaskDefinition.requiredModules    │    │   (All 5 modules available)         │
│ • Stateful: Evaluates completion    │    │ • Stateless: No compliance state    │
│   against requiredModules           │    │   evaluation                        │
└──────────────────┬──────────────────┘    └──────────────────┬──────────────────┘
                   │                                          │
                   └────────────────────┬─────────────────────┘
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │          PEN EXECUTION ENGINE            │
                   │  Captures module payloads for a single   │
                   │  pen visit & emits atomic ActivityPass   │
                   └────────────────────┬─────────────────────┘
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │        IMMUTABLE ACTIVITY LEDGER         │
                   │         (Append-Only Event Log)          │
                   └─────────┬──────────────────────┬─────────┘
                             │                      │
              ┌──────────────┴───┐              ┌───┴──────────────┐
              ▼                  │              │                  ▼
┌──────────────────────────────┐ │              │ ┌──────────────────────────────┐
│  DAILY STATE PROJECTION      │ │              │ │  TASK COMPLIANCE & FORENSICS │
│  • Cumulative Pen/Farm KPIs  │◄┘              └►│  • Open / Partial / Done     │
│  • Real-Time Incident Totals │                  │  • Shift Accountability      │
└──────────────────────────────┘                  │  • Lag Correlation Engine    │
                                                  └──────────────────────────────┘
```

---

## 4. State Machine & Evaluation Rules for `Tasks`

Unlike Generic Activities (which are stateless append-only events), every scheduled **Task Instance** (`penId` + `date` + `TaskDefinition`) is evaluated as a deterministic state machine:

1. **`OPEN`:**
   * Zero `ActivityPass` records exist for `(penId, date, shift)` covering any of `requiredModules`.
2. **`PARTIAL`:**
   * At least one module in `requiredModules` has been recorded for `(penId, date, shift)`, but one or more required modules remain unrecorded.
   * Re-entering a `PARTIAL` task scopes execution to the remaining unfulfilled modules (or allows amending already-logged modules) until the contract is satisfied.
3. **`DONE`:**
   * Every module specified in `TaskDefinition.requiredModules` has been satisfied for `(penId, date, shift)`.

### Cross-Contribution Rule
If an attendant logs `Feed` via an ad-hoc Generic Pass during the `Afternoon` shift window, the state projection engine can optionally credit that observation toward the `Afternoon Routine` task's `feed` requirement—preventing duplicate data entry while preserving the audit trail of how the data was captured.

---

## 5. Operational Accountability & Root-Cause Forensics

Because the **Task Engine** records both **positive execution** (what was logged) and **omission/latency** (which required checks were left `Open`, left `Partial`, or logged late), the architecture supports three levels of operational intelligence:

### Level 1: Real-Time Shift Accountability ("Who Is Dropping the Ball")
* Every `TaskDefinition` is bound to a shift window (`Morning`, `Afternoon`, `Evening`, `Night`) and an assigned attendant.
* Management can query compliance rates across pens, shifts, and staff:
  * *Completion Rate:* `% of scheduled tasks reaching DONE within shift window`.
  * *Partial/Skip Rate:* Identification of specific modules (e.g., `water` or `droppings`) that an attendant habitually skips.

### Level 2: Cage-Level Spatial Localization
* Because `mortality` and `droppings` payloads are indexed by `(penId, rowId, cageId)` rather than just house-wide totals, the system isolates localized anomalies (e.g., a blocked nipple drinker or localized coccidiosis outbreak in `Row B · Cages B1–B4`) before they spread across the pen.

### Level 3: Biological Lag & Root-Cause Correlation
In layer production, physiological outcomes (`eggCrates`, `crackedPcs`, `mortality`) lag behind environmental and husbandry failures by **24 to 72 hours**. By joining the **Task Compliance Matrix** with the **Observation Ledger**, the system can trace an anomaly backward across time:

```
[Day T - 48h]  Task: Pen 2 · Night Check        → Status: OPEN (Skipped by Shift B)
[Day T - 36h]  Task: Pen 2 · Morning Routine    → Status: PARTIAL (Feed logged; Water skipped)
[Day T - 24h]  Pass: Pen 2 · Generic Log        → Observation: Watery droppings (Row A)
[Day T]        Outcome: Pen 2 · Egg Harvest     → 24% drop in crates + spike in cracked shells
```

Instead of presenting Thursday's production drop as an unexplained variance, the architecture links the outcome directly to the upstream SOP breaches at `T - 48h` and `T - 36h` and attributes the exact shift watch responsible.
