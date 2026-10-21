"use client";
import { ChevronLeft } from "lucide-react";
// AB-22: Jobs list, job page, completion, corrections, customer page, booking paused. Spec: Confluence 64127033 v18.
import { useState, type ReactNode } from "react";
import { WORK, TODAY, isoAgo, type DB, type Car, type Visit, type LogItem } from "@/lib/data";
import { Page, Chip, Btn, K, inCls, ownCls, StatusTag, naira, LogFlow, UrgTag } from "@/components/log";

const F = { fontFamily: "Inter,Helvetica,Arial,sans-serif" };
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const fmt = (iso: string) => { const [, m, d] = iso.split("-"); return `${+d} ${MON[+m - 1]}`; };
export type Job = { v: Visit; car: Car };
export const allJobs = (db: DB): Job[] => db.cars.flatMap(car => (car.visits || []).map(v => ({ v, car }))).sort((a, b) => b.v.date.localeCompare(a.v.date) || b.v.id.localeCompare(a.v.id));
const total = (v: Visit) => v.items.reduce((s, i) => s + (i.cost || 0), 0) + (v.corrections || []).reduce((s, c) => s + c.amount, 0);
const open = (v: Visit) => v.items.some(i => i.status === "progress");
const brand = (c: Car) => c.model.split(" ")[0];
const custKey = (v: Visit, c: Car) => (v.owner?.phone || c.phone || "").replace(/\D/g, "") || `${v.owner?.first || c.owner || ""}`.toLowerCase() || "unknown";
const custName = (v: Visit, c: Car) => `${v.owner?.first || c.owner || ""} ${v.owner?.last || c.ownerLast || ""}`.trim();
const Pill = ({ v }: { v: Visit }) => v.completed ? <span className="text-[11px] px-2 py-[3px] rounded-[10px] bg-[#e2e8f0] text-[#334155]">🔒 Completed</span> : <StatusTag s={open(v) ? "progress" : "done"} />;
const waText = (db: DB, j: Job, kind: "update" | "final") => {
  const { v, car } = j; const first = v.owner?.first || car.owner;
  const lines = v.items.map(i => `• ${i.name}: ${i.cost != null ? naira(i.cost) : "cost to follow"} (${i.status === "done" ? "done" : "in progress"})`)
    .concat((v.corrections || []).map(c => `• Correction – ${c.text}: ${c.amount < 0 ? "−" : ""}${naira(Math.abs(c.amount))}`));
  return `${first ? `Hello ${first},\n` : ""}${kind === "final" ? "Final receipt" : "Update"} from ${db.workshop}\n${car.model}${car.year ? " " + car.year : ""} · ${car.plate}\n${fmt(v.date)} 2026\n\n${lines.join("\n")}\n\n${kind === "final" ? "Total" : "Total so far"}: ${naira(total(v))}\nThank you!`;
};
const openWa = (phone: string, text: string) => { const n = phone.replace(/\D/g, "").replace(/^0/, "234"); window.open(`https://wa.me/${n}?text=${encodeURIComponent(text)}`, "_blank"); };

/* ---------------- Jobs list ---------------- */
export type Filters = { date: string; from: string; to: string; brands: string[] };
export const noFilters = (): Filters => ({ date: "", from: "", to: "", brands: [] });
const DATES: [string, string][] = [["today", "Today"], ["week", "This week"], ["month", "This month"], ["3m", "Last 3 months"], ["custom", "Custom range"]];
const inDate = (iso: string, f: Filters) => {
  if (!f.date) return true; if (f.date === "today") return iso === TODAY; if (f.date === "week") return iso >= isoAgo(6); if (f.date === "month") return iso >= TODAY.slice(0, 8) + "01";
  if (f.date === "3m") return iso >= isoAgo(90); return (!f.from || iso >= f.from) && (!f.to || iso <= f.to);
};
export function JobsList({ db, f, setF, go, openDrawer, nav }: { db: DB; f: Filters; setF: (f: Filters) => void; go: (p: string) => void; openDrawer: () => void; nav: ReactNode }) {
  const [sheet, setSheet] = useState<Filters | null>(null);
  const jobs = allJobs(db).filter(j => inDate(j.v.date, f) && (!f.brands.length || f.brands.includes(brand(j.car))));
  const made = jobs.reduce((s, j) => s + j.v.items.filter(i => i.status === "done").reduce((a, i) => a + (i.cost || 0), 0) + (j.v.corrections || []).reduce((a, c) => a + c.amount, 0), 0);
  const waiting = jobs.filter(j => open(j.v)).reduce((s, j) => s + j.v.items.filter(i => i.status === "progress").reduce((a, i) => a + (i.cost || 0), 0), 0);
  const active: [string, () => void][] = [
    ...(f.date ? [[f.date === "custom" ? `${f.from ? fmt(f.from) : "…"} – ${f.to ? fmt(f.to) : "…"}` : DATES.find(d => d[0] === f.date)![1], () => setF({ ...f, date: "", from: "", to: "" })] as [string, () => void]] : []),
    ...f.brands.map(b => [b, () => setF({ ...f, brands: f.brands.filter(x => x !== b) })] as [string, () => void]),
  ];
  const brands = [...new Set(allJobs(db).map(j => brand(j.car)))].sort();
  return <div style={F} className="flex-1 flex flex-col min-h-0 relative">
    <div className="shrink-0 h-[60px] flex items-center px-5 pt-2 gap-2">
      <button aria-label="Menu" onClick={openDrawer} className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold bg-[#eaf0fe] text-[#1e3a8a]">{db.workshop.split(" ").map(w => w[0]).slice(0, 2).join("")}</button>
      <h1 className="flex-1 text-[22px] font-bold tracking-[-0.4px]">Jobs</h1>
      <button onClick={() => setSheet({ ...f })} className="relative h-11 px-4 rounded-full border border-[#e2e8f0] text-[14px] font-semibold flex items-center gap-2">Filter{active.length > 0 && <span className="min-w-5 h-5 px-1 rounded-full bg-[#2563eb] text-white text-[11px] flex items-center justify-center">{active.length}</span>}</button>
    </div>
    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="pt-4 text-[13px] text-[#64748b] font-medium">Made · {jobs.length} job{jobs.length === 1 ? "" : "s"}</div>
      <div className="text-[34px] font-bold tracking-[-1px] leading-tight">{naira(made)}</div>
      <div className="text-[13px] text-[#64748b]">{naira(waiting)} waiting on jobs in progress</div>
      {active.length > 0 && <div className="flex flex-wrap gap-2 pt-3">{active.map(([l, x]) => <button key={l} onClick={x} className="h-8 pl-3 pr-2 rounded-full bg-[#eff6ff] text-[#1e3a8a] text-[12px] font-semibold flex items-center gap-1">{l}<span className="w-6 h-6 flex items-center justify-center text-[13px]">✕</span></button>)}</div>}
      <div className="space-y-3 pt-5">{jobs.map(({ v, car }) => <button key={v.id} onClick={() => go(`/job/${v.id}`)} className="w-full flex items-start gap-3 rounded-2xl bg-[#f8fafc] p-4 text-left active:bg-[#f1f5f9]">
        <span className="flex-1 min-w-0"><b className="block text-[14px] font-semibold">{car.plate}</b><span className="block text-[12px] text-[#64748b] truncate mt-0.5">{car.model} · {v.items.map(i => i.name).join(", ")}</span><span className="block text-[12px] text-[#94a3b8] mt-1">{fmt(v.date)}</span></span>
        <span className="flex flex-col items-end gap-1.5"><b className="text-[14px] font-semibold">{naira(total(v))}</b><Pill v={v} /></span></button>)}
        {jobs.length === 0 && <div className="text-center text-[14px] text-[#64748b] pt-10">No jobs for these filters.</div>}</div>
    </div>
    {nav}
    {sheet && <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40"><div className="h-[88%] bg-white rounded-t-[24px] flex flex-col">
      <div className="flex items-center px-6 pt-5 pb-2"><h2 className="flex-1 text-[20px] font-bold">Filter</h2><button aria-label="Close filter" onClick={() => setSheet(null)} className="w-12 h-12 -mr-3 text-[20px]">✕</button></div>
      <div className="flex-1 overflow-y-auto px-6">
        <div className="text-[12px] font-semibold tracking-[0.08em] text-[#64748b] pt-4 pb-3">DATE</div>
        <div className="flex flex-wrap gap-2">{DATES.map(([k, l]) => <button key={k} onClick={() => setSheet({ ...sheet, date: sheet.date === k ? "" : k })} className={`h-14 px-5 rounded-full text-[14px] border ${sheet.date === k ? "bg-[#2563eb] border-[#2563eb] text-white" : "border-[#cbd5e1]"}`}>{l}</button>)}</div>
        {sheet.date === "custom" && <div className="flex gap-3 pt-3">{(["from", "to"] as const).map(k => <label key={k} className="flex-1 text-[12px] text-[#64748b]">{k === "from" ? "From" : "To"}<input type="date" aria-label={k} value={sheet[k]} onChange={e => setSheet({ ...sheet, [k]: e.target.value })} className="mt-1 w-full h-12 rounded-[12px] border border-[#cbd5e1] px-3 text-[14px] text-[#0f172a]" /></label>)}</div>}
        <div className="text-[12px] font-semibold tracking-[0.08em] text-[#64748b] pt-8 pb-3">CAR BRAND</div>
        <div className="flex flex-wrap gap-2">{brands.map(b => <button key={b} onClick={() => setSheet({ ...sheet, brands: sheet.brands.includes(b) ? sheet.brands.filter(x => x !== b) : [...sheet.brands, b] })} className={`h-14 px-5 rounded-full text-[14px] border ${sheet.brands.includes(b) ? "bg-[#2563eb] border-[#2563eb] text-white" : "border-[#cbd5e1]"}`}>{b}</button>)}</div>
      </div>
      <div className="flex gap-3 p-5 border-t border-[#f1f5f9]"><button onClick={() => setSheet(noFilters())} className="h-14 px-6 rounded-2xl bg-[#f1f5f9] font-semibold text-[16px]">Clear</button>
        <button onClick={() => { setF(sheet); setSheet(null); }} className="flex-1 h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[16px]">Show results</button></div>
    </div></div>}
  </div>;
}

/* ---------------- Job page and sub-pages ---------------- */
type Up = (f: (d: DB) => DB) => void;
const findJob = (db: DB, id: string): Job | undefined => allJobs(db).find(j => j.v.id === id);
const mutV = (up: Up, id: string, f: (v: Visit) => void) => up(d => { for (const c of d.cars) for (const v of c.visits || []) if (v.id === id) f(v); return d; });
const Head = ({ crumb, onBack, menu }: { crumb: ReactNode; onBack: () => void; menu?: () => void }) =>
  <div className="shrink-0 h-14 flex items-center px-2 border-b border-[#f1f5f9]"><button aria-label="Back" onClick={onBack} className="w-12 h-12 text-[18px] flex items-center justify-center"><ChevronLeft size={24} strokeWidth={2} /></button>
    <div className="flex-1 text-[13px] text-[#64748b] truncate">{crumb}</div>{menu && <button aria-label="More" onClick={menu} className="w-12 h-12 text-[20px] text-[#0f172a]">⋯</button>}</div>;
const Sec = ({ children }: { children: ReactNode }) => <div className="text-[11px] font-semibold tracking-[0.08em] text-[#64748b] pt-6 pb-2">{children}</div>;

export function JobPage({ db, id, sub, step, up, go, back, flash }: { db: DB; id: string; sub?: string; step?: string; up: Up; go: (p: string) => void; back: () => void; flash: (m: string) => void }) {
  const j = findJob(db, id);
  const [panel, setPanel] = useState<{ item: LogItem; cost: string } | null>(null);
  const [menu, setMenu] = useState(false);
  const [add, setAdd] = useState({ name: "", status: "done" as "done" | "progress", cost: "" });
  const [ask, setAsk] = useState<string | null>(null);
  const [cor, setCor] = useState({ text: "", amount: "", minus: false, reason: "" });
  if (!j) return <div className="p-6">Job not found. <button className="text-[#2563eb]" onClick={back}>Back</button></div>;
  const { v, car } = j; const locked = !!v.completed; const name = custName(v, car); const key = custKey(v, car); const phone = v.owner?.phone || car.phone || "";
  const allDone = !open(v);
  // A receipt can only have been sent if there is a customer number.
  const sentOn = phone.replace(/\D/g, "") ? (v.receiptSent || v.completed) : undefined;
  const savePhone = (num: string) => { mutV(up, id, x => { x.owner = { first: x.owner?.first || "", last: x.owner?.last || "", phone: num }; }); up(d => { const cc = d.cars.find(z => z.id === car.id); if (cc && !cc.phone) cc.phone = num; return d; }); };
  const sendReceipt = (num: string) => { openWa(num, waText(db, j, "final")); mutV(up, id, x => { x.receiptSent = TODAY; }); flash("Receipt sent"); };

  if (sub === "receipt") return <Page n="" title="Send receipt" onBack={back}>
    <K>Customer&apos;s WhatsApp number (to send the receipt)</K><input aria-label="Customer WhatsApp" autoFocus inputMode="tel" value={ask || ""} placeholder="080..." onChange={e => setAsk(e.target.value)} className={ownCls} />
    <Btn bottom={90} disabled={(ask || "").replace(/\D/g, "").length < 10} onClick={() => { const num = (ask || "").trim(); savePhone(num); sendReceipt(num); history.back(); }}>Send receipt</Btn>
    <Btn gray onClick={back}>Skip</Btn></Page>;

  if (sub === "complete") return <Page n="" title="Complete this job?" onBack={back}>
    {v.items.map(i => <div key={i.id} className="flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px]"><span>{i.name} {i.cost != null ? naira(i.cost) : "₦ —"}</span><span className="flex items-center gap-1">{i.status === "progress" && <UrgTag u={i.urg || "soon"} />}<StatusTag s={i.status} /></span></div>)}
    <div className="flex justify-between items-center py-[10px] text-[15px]">Total<b>{naira(total(v))}</b></div>
    <K>Once completed, changes aren&apos;t possible.</K>
    {ask !== null && <><K>Customer&apos;s WhatsApp number (to send the receipt)</K><input aria-label="Customer WhatsApp" autoFocus inputMode="tel" value={ask} placeholder="080..." onChange={e => setAsk(e.target.value)} className={ownCls} /></>}
    <Btn bottom={90} disabled={ask !== null && ask.replace(/\D/g, "").length < 10} onClick={() => {
      const num = phone || (ask || "").trim(); if (!num) { setAsk(""); return; }
      mutV(up, id, x => { x.completed = TODAY; x.receiptSent = TODAY; if (!phone) { x.owner = { first: x.owner?.first || "", last: x.owner?.last || "", phone: num }; } });
      if (!phone) up(d => { const cc = d.cars.find(z => z.id === car.id); if (cc && !cc.phone) cc.phone = num; return d; });
      openWa(num, waText(db, { v: { ...v, completed: TODAY }, car }, "final")); history.back(); flash("Completed · final receipt sent"); }}>Complete and send final receipt</Btn>
    {ask !== null ? <Btn gray onClick={() => { mutV(up, id, x => { x.completed = TODAY; }); history.back(); flash("Completed"); }}>Skip</Btn> : <Btn gray onClick={back}>Not yet</Btn>}</Page>;

  if (sub === "add") return <LogFlow step={step || "work"} db={db} up={up} go={go} back={back} done={back} base={`/job/${id}/add`}
    onItem={it => { mutV(up, id, x => { x.items.push(it); }); history.go(-3); flash("Item added"); }} />;

  if (sub === "correct") { setTimeout(back); return null; }
  if (sub === "correct-disabled") return <Page n="" title="Add correction" onBack={back}>
    <K>What changed?</K><input aria-label="Correction" value={cor.text} placeholder="e.g. Extra brake fluid" onChange={e => setCor({ ...cor, text: e.target.value })} className={`${inCls} text-[17px] font-normal`} />
    <K>Amount</K><div className="flex gap-2">{[false, true].map(m => <Chip key={String(m)} on={cor.minus === m} onClick={() => setCor({ ...cor, minus: m })}>{m ? "− Take off" : "+ Add"}</Chip>)}</div>
    <input aria-label="Amount" inputMode="numeric" value={cor.amount} placeholder="₦" onChange={e => setCor({ ...cor, amount: e.target.value.replace(/\D/g, "") })} className={`${inCls} text-[22px]`} />
    <K>Reason</K><input aria-label="Reason" value={cor.reason} placeholder="e.g. Forgot to log" onChange={e => setCor({ ...cor, reason: e.target.value })} className={`${inCls} text-[17px] font-normal`} />
    <Btn disabled={!cor.text.trim() || !cor.amount || !cor.reason.trim()} onClick={() => { mutV(up, id, x => { (x.corrections ||= []).push({ id: "r" + Date.now(), text: cor.text.trim(), amount: (cor.minus ? -1 : 1) * Number(cor.amount), reason: cor.reason.trim(), by: "Mechanic", date: TODAY }); }); setCor({ text: "", amount: "", minus: false, reason: "" }); back(); flash("Correction added"); }}>Save correction</Btn></Page>;

  const earlier = allJobs(db).filter(x => x.v.id !== id && custKey(x.v, x.car) === key && x.v.date <= v.date);
  return <div style={F} className="flex-1 flex flex-col min-h-0 relative">
    <Head crumb={<><button className="min-h-12" onClick={() => go("/jobs")}>Jobs</button> › <button className="min-h-12 font-bold text-[#2563eb]" onClick={() => go(`/car/${car.id}`)}>{car.plate} ›</button></>} onBack={back} menu={() => setMenu(true)} />
    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="flex items-center justify-between pt-4">
        <button onClick={() => go(`/car/${car.id}`)} className="text-left">
          <div className="text-[24px] font-bold tracking-[-0.5px] text-[#0f172a]">{car.plate}</div>
          <div className="text-[14px] text-[#334155]">{car.model}{car.year ? " " + car.year : ""}</div>
        </button>
        <button onClick={() => go(`/car/${car.id}`)} className="h-9 px-3 rounded-xl bg-[#eff6ff] text-[#2563eb] text-[12px] font-semibold flex items-center">
          Health Plan ›
        </button>
      </div>
      <div className="flex items-center gap-2 pt-1 text-[13px] text-[#64748b]">{name ? <button onClick={() => go(`/customer/${key}`)} className="text-[#2563eb] font-semibold min-h-10">{name} ›</button> : <span>No customer</span>}<span>· {fmt(v.date)}</span></div>
      {locked && <div className="mt-2 inline-block text-[12px] px-3 py-1.5 rounded-[10px] bg-[#f1f5f9] text-[#334155]">🔒 Completed{sentOn ? ` · receipt sent ${fmt(sentOn)}` : ` ${fmt(v.completed!)} · no receipt sent`}</div>}
      <Sec>WORK</Sec>
      {v.items.map(i => <button key={i.id} disabled={locked} onClick={() => setPanel({ item: i, cost: i.cost != null ? String(i.cost) : "" })} className="w-full flex items-center gap-3 min-h-14 border-b border-[#f1f5f9] text-left">
        <span className="flex-1 text-[14px]">{i.name}</span><span className="text-[14px] font-semibold">{i.cost != null ? naira(i.cost) : <span className="text-[#94a3b8] font-normal">₦ —</span>}</span>{i.status === "progress" && <UrgTag u={i.urg || "soon"} />}<StatusTag s={i.status} /></button>)}
      {(v.corrections || []).map(c => <div key={c.id} className="flex items-start gap-3 py-3 border-b border-[#f1f5f9]"><span className="flex-1 text-[14px]">Correction: {c.text}<span className="block text-[12px] text-[#64748b]">{c.by} · {fmt(c.date)} · {c.reason}</span></span><span className="text-[14px] font-semibold">{c.amount < 0 ? "−" : "+"}{naira(Math.abs(c.amount))}</span></div>)}
      <div className="flex items-center py-3 text-[14px]"><span className="flex-1 text-[#64748b]">{locked ? "Total" : "Total so far"}</span><b className="text-[18px]">{naira(total(v))}</b></div>
      <Sec>EARLIER VISITS</Sec>
      {earlier.length ? earlier.map(x => <button key={x.v.id} onClick={() => go(`/job/${x.v.id}`)} className="w-full flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-4 mb-2 text-left"><span className="flex-1 min-w-0"><b className="block text-[14px]">{fmt(x.v.date)} · {x.car.plate}</b><span className="block text-[12px] text-[#64748b] truncate">{x.v.items.map(i => i.name).join(", ")}</span></span><b className="text-[14px]">{naira(total(x.v))}</b></button>)
        : <div className="text-[13px] text-[#94a3b8]">No earlier visits.</div>}
    </div>
    {!locked && <div className="shrink-0 p-4 border-t border-[#f1f5f9] flex flex-col gap-2">
      {allDone ? <><button onClick={() => go(`/job/${id}/complete`)} className="h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[16px]">Complete job</button>
        <button onClick={() => go(`/job/${id}/add/work`)} className="h-12 rounded-2xl bg-[#f1f5f9] font-semibold text-[15px]">+ Add item</button></>
        : <div className="flex gap-2"><button onClick={() => go(`/job/${id}/add/work`)} className="flex-1 h-14 rounded-2xl bg-[#f1f5f9] font-semibold text-[15px]">+ Add item</button>
          <button onClick={() => { if (!phone) { flash("Add a number first"); return; } openWa(phone, waText(db, j, "update")); flash("Update sent"); }} className="flex-1 h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[15px]">Send update</button></div>}
    </div>}
    {panel && <div className="absolute inset-0 z-40 flex flex-col justify-end bg-black/40" onClick={() => setPanel(null)}><div className="bg-white rounded-t-[24px] p-5 pb-6" onClick={e => e.stopPropagation()}>
      <div className="flex items-center"><b className="flex-1 text-[17px]">{panel.item.name}</b>{panel.item.status === "progress" && <UrgTag u={panel.item.urg || "soon"} />}<StatusTag s={panel.item.status} /></div>
      <K>Cost</K><input aria-label="Item cost" autoFocus inputMode="numeric" value={panel.cost} placeholder="₦" onChange={e => setPanel({ ...panel, cost: e.target.value.replace(/\D/g, "") })} className={`${inCls} text-[22px]`} />
      <div className="flex gap-2 pt-4">{panel.item.status === "progress" && <button onClick={() => { mutV(up, id, x => { const it = x.items.find(q => q.id === panel.item.id)!; it.cost = panel.cost ? Number(panel.cost) : null; }); setPanel(null); }} className="h-14 px-5 rounded-2xl bg-[#f1f5f9] font-semibold">Save cost</button>}
        <button disabled={!panel.cost} onClick={() => { mutV(up, id, x => { const it = x.items.find(q => q.id === panel.item.id)!; it.cost = Number(panel.cost); it.status = "done"; }); setPanel(null); }} className="flex-1 h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[16px] disabled:opacity-40">{panel.item.status === "progress" ? "Mark done" : "Save"}</button></div>
    </div></div>}
    {menu && <div className="absolute inset-0 z-40 bg-black/30" onClick={() => setMenu(false)}><div className="absolute right-3 top-14 w-56 bg-white rounded-2xl shadow-xl py-2" onClick={e => e.stopPropagation()}>
      {locked && <button onClick={() => { setMenu(false); if (phone) sendReceipt(phone); else go(`/job/${id}/receipt`); }} className="w-full h-12 px-4 text-left text-[15px]">{sentOn ? "Resend receipt" : "Send receipt"}</button>}
      {locked && <button onClick={() => { setMenu(false); flash("You don't have the privilege to do this, contact admin."); }} className="w-full h-12 px-4 text-left text-[15px]">Add correction</button>}
      <button onClick={() => { setMenu(false); flash("You don't have the privilege to do this, contact admin."); }} className="w-full h-12 px-4 text-left text-[15px] text-[#dc2626]">Delete job</button></div></div>}
  </div>;
}

export function CustomerPage({ db, k, go, back }: { db: DB; k: string; go: (p: string) => void; back: () => void }) {
  const js = allJobs(db).filter(j => custKey(j.v, j.car) === k); const f = js[0];
  const cars = [...new Map(js.map(j => [j.car.id, j.car])).values()];
  return <div style={F} className="flex-1 flex flex-col min-h-0"><Head crumb="Customer" onBack={back} />
    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <div className="pt-4 text-[24px] font-bold">{f ? custName(f.v, f.car) || "Customer" : "Customer"}</div><div className="text-[13px] text-[#64748b]">{f?.v.owner?.phone || f?.car.phone}</div>
      <Sec>CARS</Sec>{cars.map(c => <div key={c.id} className="flex items-center min-h-12 border-b border-[#f1f5f9] text-[14px]"><b className="flex-1">{c.plate}</b><span className="text-[#64748b]">{c.model}{c.year ? " " + c.year : ""}</span></div>)}
      <Sec>VISITS</Sec>{js.map(x => <button key={x.v.id} onClick={() => go(`/job/${x.v.id}`)} className="w-full flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-4 mb-2 text-left"><span className="flex-1 min-w-0"><b className="block text-[14px]">{fmt(x.v.date)} · {x.car.plate}</b><span className="block text-[12px] text-[#64748b] truncate">{x.v.items.map(i => i.name).join(", ")}</span></span><span className="flex flex-col items-end gap-1"><b className="text-[14px]">{naira(total(x.v))}</b><Pill v={x.v} /></span></button>)}
    </div></div>;
}

export function BookingSoon({ go, back }: { go: (p: string) => void; back: () => void }) {
  return <Page n="" title="Booking is coming soon" onBack={back}>
    <div className="text-[15px] text-[#64748b] leading-relaxed">We&apos;re building something exciting to help you fill your workshop. For now, log your jobs.</div>
    <Btn onClick={() => go("/log/plate")}>Log a car</Btn></Page>;
}
