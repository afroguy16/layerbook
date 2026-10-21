// LayerBook dummy data & types: modeled on commercial layer farms in Nigeria
// Parity with AutoBook architecture & types.

export type Urg = "now" | "soon" | "wait";

export interface PenRecord {
  id: string;
  name: string;
  breed: string;
  flockSize: number;
  ageWeeks: number;
  housing: "Open-sided" | "Battery cage" | "Deep litter" | "Environmentally controlled";
  baselineFeedKg: number;
  baselineWaterL: number;
  lastVisit?: string;
}

export interface DailyLog {
  id: string;
  penId: string;
  date: string; // ISO date
  time: string;
  feedBags: number; // 25kg bags
  feedKg: number;
  waterLiters: number;
  ratio: number; // water:feed
  peakTempC: number;
  mortality: number;
  eggsCrates: number; // 30 eggs per crate
  droppingsColor?: "normal" | "green_biliverdin" | "bloody_coccidiosis" | "yellow_viral" | "white_renal";
  auditorySnicking?: boolean;
  notes?: string;
  receiptSent?: boolean;
}

export interface FarmDB {
  farmName: string;
  managerName: string;
  phone: string;
  state: string; // e.g. "Oyo", "Ogun"
  lang: "en" | "pcm";
  subStatus: "active" | "trial" | "unpaid";
  monthlyFee: number; // ₦10,000
  pens: PenRecord[];
  logs: DailyLog[];
  interventions: {
    id: string;
    title: string;
    urg: Urg;
    trigger: string;
    action: string;
    protocol: string[];
  }[];
}

export const SEED_FARM: FarmDB = {
  farmName: "Adeyemi Commercial Layers",
  managerName: "Segun Adeyemi",
  phone: "0803 456 7890",
  state: "Oyo State",
  lang: "en",
  subStatus: "trial",
  monthlyFee: 10000,
  pens: [
    {
      id: "pen-1",
      name: "Pen 1 (Bovans Brown)",
      breed: "Bovans Brown",
      flockSize: 2444,
      ageWeeks: 32,
      housing: "Open-sided",
      baselineFeedKg: 285,
      baselineWaterL: 570,
      lastVisit: "Today"
    },
    {
      id: "pen-2",
      name: "Pen 2 (Isa Brown)",
      breed: "Isa Brown",
      flockSize: 1850,
      ageWeeks: 24,
      housing: "Battery cage",
      baselineFeedKg: 215,
      baselineWaterL: 430,
      lastVisit: "Yesterday"
    },
    {
      id: "pen-3",
      name: "Pen 3 (Pullets)",
      breed: "Lohmann Brown",
      flockSize: 3100,
      ageWeeks: 18,
      housing: "Deep litter",
      baselineFeedKg: 310,
      baselineWaterL: 620,
      lastVisit: "16 Oct"
    }
  ],
  logs: [
    {
      id: "log-1",
      penId: "pen-1",
      date: "2026-10-15",
      time: "17:30",
      feedBags: 11.2,
      feedKg: 280,
      waterLiters: 580,
      ratio: 2.07,
      peakTempC: 29,
      mortality: 1,
      eggsCrates: 69,
      droppingsColor: "normal",
      receiptSent: true
    },
    {
      id: "log-2",
      penId: "pen-1",
      date: "2026-10-16",
      time: "17:30",
      feedBags: 11.0,
      feedKg: 275,
      waterLiters: 610,
      ratio: 2.22,
      peakTempC: 31,
      mortality: 2,
      eggsCrates: 68,
      droppingsColor: "normal",
      receiptSent: true
    },
    {
      id: "log-3",
      penId: "pen-1",
      date: "2026-10-17",
      time: "17:30",
      feedBags: 10.4,
      feedKg: 260,
      waterLiters: 780,
      ratio: 3.00,
      peakTempC: 34,
      mortality: 2,
      eggsCrates: 66,
      droppingsColor: "normal",
      receiptSent: true
    },
    {
      id: "log-4",
      penId: "pen-1",
      date: "2026-10-18",
      time: "17:30",
      feedBags: 9.7,
      feedKg: 242,
      waterLiters: 980,
      ratio: 4.05,
      peakTempC: 36,
      mortality: 3,
      eggsCrates: 63,
      droppingsColor: "green_biliverdin",
      auditorySnicking: true,
      receiptSent: true
    }
  ],
  interventions: [
    {
      id: "heat-stress",
      title: "Acute Heat Stress & Panting Prostration",
      urg: "now",
      trigger: "Water:Feed > 3.5:1 and Temp > 32°C",
      action: "Flush water lines below 25°C & withdraw afternoon feed",
      protocol: [
        "Flush black overhead tanks & nipple lines immediately; water >30°C causes acute feed refusal.",
        "Withdraw feed from birds 6 hours before afternoon peak heat (12:00 PM – 4:30 PM) to avoid digestive heat spike.",
        "Implement midnight feeding: turn lights on for 1.5 hours (12:00 AM – 1:30 AM) during cool diurnal drop.",
        "Add water-soluble electrolytes and Vitamin C to combat respiratory alkalosis."
      ]
    },
    {
      id: "anorexic-pyrexia",
      title: "Systemic Viremia / Newcastle Disease Incubation",
      urg: "now",
      trigger: "Sudden >10% Feed Drop with Water Spike (No Ambient Heat)",
      action: "Inspect nocturnal droppings for biliverdin & isolate pen",
      protocol: [
        "Check nocturnal manure belts during 8:30 PM golden hour for bright/dark green feces (biliverdin bile excretion).",
        "Conduct silent auditory walkthrough after lights-out; listen for continuous soft rattling / snicking.",
        "Contact farm veterinary doctor for emergency sero-titer test (HI titer check) and ring vaccination.",
        "Isolate pen tools and attendant boots to prevent lateral viral transfer to Pen 2 & 3."
      ]
    }
  ]
};

export const COMMON_PENS = [
  "Pen 1 (Bovans Brown)",
  "Pen 2 (Isa Brown)",
  "Pen 3 (Pullets)",
  "Pen 4 (Broiler / Layer)"
];

export const FEED_PRESETS = [
  { bags: 8, kg: 200 },
  { bags: 9, kg: 225 },
  { bags: 10, kg: 250 },
  { bags: 11, kg: 275 },
  { bags: 12, kg: 300 },
  { bags: 13, kg: 325 }
];

export const WATER_PRESETS = [
  { label: "400 L", val: 400 },
  { label: "500 L", val: 500 },
  { label: "600 L", val: 600 },
  { label: "750 L", val: 750 },
  { label: "900 L", val: 900 },
  { label: "1,100 L", val: 1100 }
];

export const TEMP_PRESETS = [
  { label: "26°C (Cool)", val: 26 },
  { label: "29°C (Normal)", val: 29 },
  { label: "32°C (Warm)", val: 32 },
  { label: "35°C (Panting)", val: 35 },
  { label: "38°C (Extreme)", val: 38 }
];
