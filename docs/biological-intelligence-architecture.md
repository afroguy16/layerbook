# LayerBook: Biological Intelligence & Early Warning Architecture

> **Objective:** Bridge executive unit economics (Net Feed Margin) with clinical flock biology (mortality prevention, early infection detection, heat stress defense) into a unified mobile operating companion for commercial layer farms.

---

## 1. Feature Analysis: Biological Vitals Matrix

| Feature | The What (Clinical Definition) | The Why (Commercial & Biological Stakes) | Minimum Data Requirements (Input) | Output / Intelligence Triggered |
| :--- | :--- | :--- | :--- | :--- |
| **1. Water-to-Feed Leading Indicator** | Tracks the volumetric ratio of water drunk ($L$) to feed eaten ($kg$) per pen daily. Baseline is typically $1.8:1$ to $2.1:1$ at 25°C. | **48-Hour Early Warning Engine:** Laying hens do not drop egg production or die the day they contract a pathogen (Gumboro, ND, Coccidiosis, or Enteritis). They stop eating and drastically spike or drop water consumption **24 to 48 hours before** clinical mortality or egg drop occurs. Detecting an abnormal ratio ($>3.0:1$) gives the farmer a 2-day head start to administer electrolytes or antibiotics before losing crates. | 1. Bags of feed fed (or $kg$).<br>2. Water consumed ($L$ from pen meter or tank level). | • **Vitals Badge:** `Ratio: 2.1:1 (Normal)` vs `3.8:1 (Critical Spike)`.<br>• **Early Warning Banner:** *"High ratio detected in Pen 2 (+81% above standard). Inspect gut health."* |
| **2. Thermal Stress & Water Temp Defense** | Tracks peak afternoon pen ambient temperature and warns of overhead tank overheating. | **The Anorexia & Prolapse Trap:** Commercial black plastic overhead tanks in Nigeria reach 38°C–42°C under direct midday sun. Hens refuse to drink hot water. If water intake stops, feed intake immediately collapses (anorexia). When dehydrated birds attempt to lay eggs during peak thermal spikes, severe cloacal prolapse occurs, leading to fatal cannibalism and flock crashes. | 1. Peak afternoon temperature (°C from simple wall thermometer).<br>2. *Optional:* Overhead water tank temperature. | • **Thermal Alert:** *"36°C Peak Reached in Pen 2."*<br>• **Action Nudge:** *"Drain & flush overhead lines with cool underground water."* |
| **3. 5-Point Emergency Intervention Protocol** | A situational tactical modal that activates when biological vitals (temperature, mortality surge, or water-to-feed ratio) breach safe thresholds. | **Actionable Vet Command Center:** When a disaster strikes (e.g. 15 birds dead or 38°C heatwave), uneducated pen attendants panic, administer random multivitamins, or do nothing until the owner arrives on Saturday. The 5-point protocol delivers structured, standardized SOP instructions right to the attendant's phone. | Triggered automatically by:<br>• Mortality $>0.2\%$ in a single day.<br>• Temperature $\ge 35^\circ\text{C}$.<br>• Water:Feed ratio $\ge 3.2:1$. | **Modal Protocol Checklist:**<br>1. Flush water lines below 25°C.<br>2. Withdraw afternoon feed (reduce metabolic heat).<br>3. Administer sodium bicarbonate/Vitamin C in night water.<br>4. Inspect droppings for bloody/brown mucoid enteritis.<br>5. Check curtain height and cross-ventilation. |
| **4. Pen-Level Flock Age & Strain Curves** | A per-pen registry tracking flock breed (Isa Brown, Bovans, Lohmann), age in weeks, and bird population. | **Separating Feed Theft from Natural Lay Declines:** A flock at 28 weeks should produce at 92% HDP on 115g/bird. A flock at 68 weeks naturally drops to 74% HDP on 120g/bird. Without age-calibrated curves, an owner cannot distinguish between an aging pen and attendants stealing feed bags. | 1. Pen ID / Name.<br>2. Breed strain.<br>3. Age in weeks.<br>4. Current active bird count. | • **Target vs. Actual Lay Rate:** Expected HDP curve benchmarked against global breed standards.<br>• **True Feed Variance:** Flagging feed leakage calibrated against the flock's specific age curve. |

---

## 2. The Attendant Data-Collection Reality Check (Zero-Friction Street Physics)

A biological system fails if it demands 15 minutes of clinical data entry from tired pen attendants. If an attendant has to look for probes or do mental math, they will either abandon the tool or fabricate numbers from their room. 

To guarantee clean, trustworthy data, we separate automated ambient ingestion from 20-second manual field inputs:

### A. The Temperature Solution: Dual Ingestion Architecture
1. **Primary / Automated (Zero Attendant Friction):**
   - Nigerian layer houses are open-sided netting structures; pen ambient temperatures track local outdoor heat within $\pm 1.5^\circ\text{C}$.
   - Upon initial farm onboarding, the owner inputs the farm's geographic cluster (e.g. *Odeda, Ogun State* or *Epe, Lagos* or *Afijio, Oyo*).
   - The LayerBook backend automatically queries the local hourly weather grid to capture peak afternoon heat (2:00 PM – 3:30 PM).
   - **Attendant burden: 0 seconds.** The app alerts the owner of impending heat stress and water refusal without requiring anyone to touch a thermometer.
2. **Secondary / Optional Override:**
   - For farms with physical hanging min/max thermometers inside the pen, managers can optionally key in the exact localized reading: `[ 35 ] °C`. If left blank, it seamlessly defaults to the automated geographic reading.

### B. The Water Intake Reality: Tank Fractions vs. Liters
- Attendants do not read digital flow meters. Nigerian pens utilize dedicated overhead Geepee/plastic tanks (typically 500L or 1,000L).
- The input allows dual entry: either raw Liters (`[ 750 ] L`) or simple tank levels (`[ 3/4 tank ]`), eliminating measurement friction.

### C. The 20-Second Evening Pen Card
```
┌────────────────────────────────────────────────────────┐
│             DAILY 20-SECOND PEN INPUT CARD             │
├────────────────────────────────────────────────────────┤
│  Pen: [ Pen 2 — Isa Brown (Wk 34)                    ] │
│                                                        │
│  1. Feed Opened:     [  8  ] bags (25kg)               │
│  2. Crates Picked:   [ 46  ] crates (graded or total)  │
│  3. Dead Birds:      [  3  ] mortality count           │
│  4. Water Reading:   [ 3/4 ] tank or [ 750 ] Liters    │
│  5. Pen Temp:        [Auto: 34.2°C via Odeda Weather]  │
│                                                        │
│  [ Save & Submit Pen Record ]                          │
└────────────────────────────────────────────────────────┘
```

---

## 3. Recommended Phased Rollout

1. **Tier 1 (Instant Commercial Hook):** Net Feed Margin + Crates by Grade + Mortality Counter.
2. **Tier 2 (Early Warning Shield):** Water-to-Feed Ratio + High Temp Thermal Interventions.
3. **Tier 3 (Clinical Farm Dossier):** Post-Mortem Photo Evidence + Historical Flock Age Curves.
