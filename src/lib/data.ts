// Dummy data only (invented). Stored in localStorage.
export type Urg = "now" | "soon" | "wait";
export type Problem = { id: string; name: string; urg: Urg; done?: boolean; day: string };
export type LogItem = { id: string; name: string; status: "done" | "progress"; cost: number | null; note?: string; urg?: Urg };
export type Owner = { first: string; last: string; phone: string };
export type Correction = { id: string; text: string; amount: number; reason: string; by: string; date: string };
export type Visit = { id: string; date: string; items: LogItem[]; owner?: Owner; completed?: string; receiptSent?: string; corrections?: Correction[] }; // date = ISO yyyy-mm-dd
export type Car = { id: string; plate: string; model: string; year?: string; owner?: string; ownerLast?: string; phone?: string; time: string; problems: Problem[]; visits?: Visit[] };
export type Booking = { id: string; carId: string; day: "today" | "tomorrow"; time: string; status: "ok" | "wait"; date?: string; items?: string[]; urg?: Record<string, Urg>; costs?: Record<string, number | null>; notes?: Record<string, string> };
export type Tx = { label: string; when: string; amt: number };
export type Due = { carId: string; reason: string; week: "this" | "next"; sent?: boolean };
export type DB = { due: Due[]; booked: number; cameBack: number; signedUp: boolean; workshop: string; phone: string; area: string; lang: "en" | "pcm"; hostTools: boolean; balance: number; fee: number; code?: string; cars: Car[]; bookings: Booking[]; tx: Tx[] };
const p = (id: string, name: string, urg: Urg, done = false, day = "Today"): Problem => ({ id, name, urg, done, day });
export const seed = (): DB => withJobs({
  signedUp: true, workshop: "Mama Ngozi Autos", phone: "0803 555 0101", area: "Ikeja", lang: "en", hostTools: false,
  balance: 4600, fee: 500,
  cars: [
    { id: "c1", plate: "KJA 123 AB", model: "Toyota Corolla", year: "2015", owner: "Chidi", ownerLast: "Okafor", phone: "0803 123 4567", time: "10:42", problems: [p("a", "Brakes", "now"), p("b", "Suspension", "soon"), p("c", "Oil leak", "soon", true), p("d", "Engine oil", "wait", true, "12 Sep")] },
    { id: "c2", plate: "APP 789 EF", model: "Lexus RX", year: "2012", owner: "Bisi", ownerLast: "Adeyemi", phone: "0802 222 3344", time: "09:15", problems: [p("e", "Shock absorbers", "soon")] },
    { id: "c3", plate: "LND 456 CD", model: "Toyota Sienna", year: "2010", owner: "Emeka", ownerLast: "Nwosu", phone: "0805 777 8899", time: "Yesterday", problems: [p("f", "Suspension", "wait")] },
    { id: "c4", plate: "EKY 221 GH", model: "Honda Accord", year: "2018", owner: "Funke", ownerLast: "Bello", phone: "0809 444 5566", time: "Tue", problems: [p("g", "AC", "soon")] },
    ...([["c5", "KTU 310 JK", "Toyota Camry", "Segun", "Tyres", "soon"], ["c6", "LSR 882 MN", "Toyota Hilux", "Kunle", "Engine oil", "wait"], ["c7", "FKJ 104 PQ", "Toyota Highlander", "Ada", "Battery", "wait"],
      ["c8", "AAA 521 BC", "Honda Civic", "Musa", "Engine oil", "wait"], ["c9", "BDG 777 KL", "Kia Rio", "Ifeoma", "Brakes", "soon"], ["c10", "EPE 640 RT", "Hyundai Elantra", "Tunde", "Lights", "wait"],
      ["c11", "GGE 218 XY", "Nissan Altima", "Chioma", "Engine oil", "wait"], ["c12", "JJJ 902 DE", "Toyota RAV4", "Yemi", "Suspension", "soon"], ["c13", "KRD 345 FG", "Lexus ES", "Ngozi O.", "Engine oil", "wait"],
      ["c14", "MUS 118 HJ", "Ford Explorer", "Obinna", "Tyres", "wait"], ["c15", "SMK 455 LM", "Toyota Corolla", "Amaka", "AC", "wait"], ["c16", "YAB 703 NP", "Honda Accord", "Femi", "Battery", "wait"]] as const)
      .map(([id, plate, model, owner, pr, u]) => ({ id, plate, model, owner, phone: "0806 000 " + id.slice(1).padStart(4, "0"), time: "Sep", problems: [p(id + "p", pr, u as Urg, true, "Sep")] })),
  ],
  due: ([["c1", "Oil change due", "this"], ["c3", "Service due", "this"], ["c2", "Brakes, fix soon", "this"], ["c4", "Oil change due", "this"], ["c5", "Tyres, fix soon", "this"], ["c6", "Service due", "this"],
    ["c7", "Battery check", "this"], ["c8", "Oil change due", "this"], ["c9", "Brakes, fix soon", "this"], ["c10", "Service due", "this"], ["c11", "Oil change due", "this"], ["c12", "Suspension, fix soon", "this"],
    ["c13", "Oil change due", "next"], ["c14", "Tyres check", "next"], ["c15", "AC service due", "next"], ["c16", "Battery check", "next"]] as const).map(([carId, reason, week]) => ({ carId, reason, week })),
  booked: 4, cameBack: 8,
  bookings: [
    { id: "b1", carId: "c1", day: "today", time: "10:00", status: "ok" },
    { id: "b2", carId: "c2", day: "today", time: "1:00", status: "wait" },
    { id: "b3", carId: "c3", day: "tomorrow", time: "9:00", status: "ok" },
    { id: "b4", carId: "c4", day: "tomorrow", time: "11:00", status: "wait" },
  ],
  tx: [{ label: "KJA 123 AB", when: "Today", amt: -200 }, { label: "LND 456 CD", when: "Yesterday", amt: -200 }, { label: "APP 789 EF", when: "Tue", amt: -200 }, { label: "Free credit", when: "1 Oct", amt: 5000 }],
});
function withJobs(db: DB): DB {
  DUMMY_JOBS.forEach(([cid, ago, items, done], n) => { const c = db.cars.find(x => x.id === cid); if (!c) return;
    const date = isoAgo(ago); (c.visits ||= []).push({ id: "j" + n, date, owner: { first: c.owner || "", last: c.ownerLast || "", phone: c.phone || "" }, items: items.map(([name, status, cost], k) => ({ id: `j${n}i${k}`, name, status, cost, ...(status === "progress" ? { urg: (name === "Engine" ? "now" : name === "Labour" ? "wait" : "soon") as Urg } : {}) })), ...(done ? { completed: date } : {}) }); });
  return db;
}
export const PROBLEMS = ["Brakes", "Engine oil", "Oil leak", "Battery", "Tyres", "AC", "Shock absorbers", "Suspension", "Lights", "Sensor/check light", "Wipers", "Other"];
export const BRANDS: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Sienna", "Hilux"], Honda: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "Fit"],
  Lexus: ["RX", "ES", "GX", "LX", "IS", "NX"], Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Accent", "Creta"], Kia: ["Rio", "Sorento", "Sportage", "Picanto", "Cerato", "Soul"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLK", "ML", "GLE", "S-Class"], Nissan: ["Altima", "Sentra", "Pathfinder", "X-Trail", "Almera", "Rogue"], Ford: ["Focus", "Explorer", "Escape", "Edge", "Ranger", "Fusion"],
};
export const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
export const CODE = "EARLY200";

// Logging flow chips (from /workspace/mock/log.html + log5.html)
export const LOG_BRANDS: Record<string, string[]> = {
  Toyota: ["Corolla", "Camry", "RAV4", "Highlander"], Honda: ["Accord", "Civic", "CR-V", "Pilot"], Lexus: ["RX", "ES", "GX", "LX"], Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe"],
  Kia: ["Rio", "Sorento", "Sportage", "Cerato"], Mercedes: ["C-Class", "E-Class", "GLK", "ML"], Ford: ["Focus", "Explorer", "Escape", "Edge"],
};
export const LOG_YEARS = ["2026", "2025", "2024", "2023"];
export const WORK = ["Brake pads", "Oil change", "AC", "Engine", "Tyres", "Labour", "Other"];

// ---- Dummy jobs (visits) for the Jobs tab. Dates relative to TODAY. ----
export const TODAY = "2026-10-16";
export const isoAgo = (days: number) => { const d = new Date(TODAY + "T12:00:00"); d.setDate(d.getDate() - days); return d.toISOString().slice(0, 10); };
type JI = [string, "done" | "progress", number | null];
export const DUMMY_JOBS: [string, number, JI[], boolean][] = [
  ["c1", 0, [["Brake pads", "done", 25000], ["Labour", "done", 10000], ["AC", "progress", null]], false],
  ["c2", 0, [["Oil change", "done", 18000], ["Labour", "done", 5000]], false],
  ["c3", 1, [["Engine", "progress", 40000], ["Labour", "progress", null]], false],
  ["c4", 3, [["AC", "done", 30000], ["Labour", "done", 8000]], true],
  ["c5", 4, [["Tyres", "done", 60000]], true],
  ["c1", 9, [["Oil change", "done", 15000]], true],
  ["c6", 12, [["Oil change", "done", 20000], ["Labour", "done", 5000]], true],
  ["c7", 20, [["Battery", "done", 45000]], true],
  ["c9", 26, [["Brake pads", "done", 22000], ["Labour", "done", 7000]], true],
  ["c2", 40, [["Engine", "done", 55000]], true],
  ["c12", 55, [["Tyres", "done", 48000]], true],
  ["c10", 70, [["Oil change", "done", 16000]], true],
  ["c3", 85, [["AC", "done", 28000]], true],
];
