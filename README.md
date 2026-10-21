# LayerBook

> **Offline-first daily operations and early-warning console for commercial layer farms.**

LayerBook gives poultry farm owners real-time visibility into their daily feed costs, egg collection, and flock health—replacing fragmented paper notebooks with a simple mobile console.

---

## The Core Thesis

In commercial layer farming, feed accounts for 70–80% of all operating expenditure. Small operational leaks—an attendant overfeeding by a single bag per pen daily, unrecorded egg breakage, or delayed disease detection—quietly drain millions of Naira before monthly paper accounts are balanced.

LayerBook bridges this gap with a simple operational contract:
- **At the Pens (Frontline):** Supervisors log eggs collected, feed fed, water intake, and mortality in under two minutes per pen daily.
- **On the Phone (Owner):** Farm owners get immediate real-time unit economics—net margin over feed, warehouse inventory runway, and biological early-warning flags for thermal or pathogen stress.

---

## Documentation

- **[Product Requirements Document](docs/mvp-prd-fcr-and-theft-engine.md):** Feed conversion economics, anti-theft mechanics, and operational specifications.
- **[Biological Intelligence Architecture](docs/biological-intelligence-architecture.md):** Epidemiological vitals, water-to-feed ratios, and thermal stress thresholds.
- **[Product Research Synthesis](docs/product-research-synthesis.md):** Analysis of commercial poultry farming challenges in Nigeria.

---

## Quickstart

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS v4
- **Platform:** Mobile-first, PWA-ready
