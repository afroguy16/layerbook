"use client";
import { ChevronLeft, X } from "lucide-react";
// Logging flow, built from /workspace/mock/log.html (steps 1-3) and log5.html (4a-5). Styles copied from those files.
import { useState, createContext, useContext, type ReactNode } from "react";
import { LOG_BRANDS, LOG_YEARS, WORK, BRANDS, type DB, type Car, type LogItem, type Owner, type Urg } from "@/lib/data";

export type LogDraft = { plate: string; carId?: string; brand: string; model: string; year: string; items: LogItem[]; cur: { name: string; status: "done" | "progress"; cost: string; note: string; urg?: Urg }; phone: string; first: string; last: string };
export const emptyLog = (): LogDraft => ({ plate: "", brand: "", model: "", year: "", items: [], cur: { name: "", status: "done", cost: "", note: "" }, phone: "", first: "", last: "" });
export const naira = (n: number) => "₦" + n.toLocaleString("en-NG");
const norm = (p: string) => p.toUpperCase().replace(/\s/g, "");
const lastOwner = (c: Car): Owner => c.visits?.find(v => v.owner)?.owner || { first: c.owner || "", last: c.ownerLast || "", phone: c.phone || "" };
// Past customers from dummy data + saved logs, de-duplicated by name + number.
const customers = (db: DB): Owner[] => { const m = new Map<string, Owner>();
  for (const c of db.cars) for (const o of [...(c.visits || []).map(v => v.owner), { first: c.owner || "", last: c.ownerLast || "", phone: c.phone || "" }])
    if (o && (o.first || o.phone)) { const k = `${o.first} ${o.last}|${o.phone}`.toLowerCase(); if (!m.has(k)) m.set(k, o); }
  return [...m.values()]; };

/* ---- urgency (shared: logging, car page, jobs, bookings) ---- */
const URG_L = { en: { now: "Critical", soon: "Fix soon", wait: "Can wait" }, pcm: { now: "E serious", soon: "Fix am soon", wait: "E fit wait" } };
export const urgLang = { v: "en" as "en" | "pcm" };
export const URG_C: Record<Urg, string> = { now: "bg-[#fee2e2] text-[#b91c1c]", soon: "bg-[#fef3c7] text-[#92400e]", wait: "bg-[#dcfce7] text-[#166534]" };
export const urgText = (u: Urg) => URG_L[urgLang.v][u];
export const UrgTag = ({ u }: { u?: Urg }) => u ? <span className={`inline-block whitespace-nowrap text-[12px] font-semibold px-[9px] py-1 rounded-[10px] ml-2 ${URG_C[u]}`}>{urgText(u)}</span> : null;
/** Urgency of a named item on a car: open problem first, then latest in-progress job item. */
export const urgOf = (c: Car | undefined, name: string): Urg | undefined => { if (!c) return; const p = c.problems.find(x => !x.done && x.name === name); if (p) return p.urg;
  for (const v of c.visits || []) { const i = v.items.find(x => x.name === name && x.status === "progress" && x.urg); if (i) return i.urg; } };
/* ---- ✕ exit for multi-step flows: App provides the handler ---- */
export const ExitCtx = createContext<null | (() => void)>(null);
export const ExitX = () => { const f = useContext(ExitCtx); return f ? <button aria-label="Close" onClick={f} className="ml-auto w-12 h-12 flex items-center justify-center text-[#0f172a]"><X size={24} strokeWidth={2} /></button> : null; };
/* ---- mockup primitives (.p .n h2 .in .c .s .b .g .r .t .w .m .k) ---- */
export const Page = ({ n, title, onBack, children }: { n: string; title: string; onBack: () => void; children: ReactNode }) =>
  <div className="relative flex-1 min-h-0 bg-white px-[18px] pt-[22px] pb-[100px] overflow-y-auto" style={{ fontFamily: "Inter,Helvetica,Arial,sans-serif" }}>
    <div className="flex items-center mb-[6px]"><button aria-label="Back" onClick={onBack} className="-ml-[14px] -my-[14px] w-12 h-12 text-[18px] text-[#0f172a] flex items-center justify-center"><ChevronLeft size={24} strokeWidth={2} /></button><span className="ml-auto -mr-[14px] -my-[14px]"><ExitX /></span></div>
    <h2 className="text-[21px] font-bold mt-1 mb-[14px] text-[#0f172a]">{title}</h2>{children}</div>;
export const Chip = ({ on, onClick, children }: { on?: boolean; onClick: () => void; children: ReactNode }) =>
  <button onClick={onClick} className={`inline-flex items-center h-14 px-[18px] border-[1.5px] rounded-full mr-[6px] mb-2 text-[15px] ${on ? "bg-[#2563eb] text-white border-[#2563eb]" : "border-[#cbd5e1] text-[#0f172a]"}`}>{children}</button>;
export const Btn = ({ onClick, children, gray, bottom = 22, disabled }: { onClick: () => void; children: ReactNode; gray?: boolean; bottom?: number; disabled?: boolean }) =>
  <button disabled={disabled} onClick={onClick} style={{ bottom }} className={`absolute left-[18px] right-[18px] h-14 rounded-2xl font-bold text-[17px] flex items-center justify-center disabled:opacity-40 ${gray ? "bg-[#f1f5f9] text-[#0f172a]" : "bg-[#2563eb] text-white"}`}>{children}</button>;
export const K = ({ children }: { children: ReactNode }) => <div className="text-[13px] text-[#64748b] mt-[10px] mb-1">{children}</div>;
export const ownCls = "w-full border-2 border-[#cbd5e1] focus:border-[#2563eb] rounded-[14px] h-14 text-[17px] px-[14px] outline-none placeholder:text-[#94a3b8]";
export const inCls = "w-full border-2 border-[#2563eb] rounded-[14px] h-14 font-bold px-[14px] outline-none text-[#0f172a]";
export const StatusTag = ({ s }: { s: "done" | "progress" }) => <span className={`text-[12px] px-[9px] py-1 rounded-[10px] ${s === "done" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#92400e]"}`}>{s === "done" ? "Done" : "In progress"}</span>;
const ItemRow = ({ it }: { it: LogItem }) => <div className="flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px]"><span>{it.name} {it.cost != null ? naira(it.cost) : <span className="text-[#64748b] text-[13px]">₦ — </span>}</span><span className="flex items-center">{it.status === "progress" && <UrgTag u={it.urg || "soon"} />}<span className="ml-2"><StatusTag s={it.status} /></span></span></div>;

export function LogFlow({ step, db, up, go, back, done, base = "/log", onItem, onCar, init }: { init?: LogDraft; step: string; db: DB; up: (f: (d: DB) => DB) => void; go: (p: string) => void; back: () => void; done: () => void; base?: string; onItem?: (it: LogItem) => void; onCar?: (c: { carId?: string; plate: string; brand: string; model: string; year: string }) => void }) {
  const [d, setD] = useState<LogDraft>(() => init || emptyLog());
  const [other, setOther] = useState("");
  const [typed, setTyped] = useState(false);
  const known = (p: string) => db.cars.find(c => norm(c.plate) === norm(p));
  const carLabel = () => { const c = d.carId && db.cars.find(x => x.id === d.carId); return c ? `${c.model}${c.year ? " " + c.year : ""}` : `${d.brand} ${d.model} ${d.year}`.trim(); };
  const cur = d.cur; const setCur = (c: Partial<LogDraft["cur"]>) => setD({ ...d, cur: { ...cur, ...c } });

  if (step === "plate") return <Page n="1 of 6" title="Car plate" onBack={back}>
    <input aria-label="Car plate" autoFocus value={d.plate} placeholder="LND 482 KJ" onChange={e => setD({ ...d, plate: e.target.value.toUpperCase() })} className={`${inCls} text-[24px] tracking-[2px] placeholder:text-[#cbd5e1]`} />
    {(() => { const c = known(d.plate); return c ? <div className="text-[15px] font-semibold text-[#0f172a] mt-[10px]">{c.model}{c.year ? " " + c.year : ""} <span className="text-[#16a34a]">✓</span></div> : null; })()}
    <Btn disabled={norm(d.plate).length < 4} onClick={() => { const c = known(d.plate); if (c) { const o = lastOwner(c); setD({ ...d, plate: c.plate, carId: c.id, first: o.first, last: o.last, phone: o.phone }); if (onCar) { onCar({ carId: c.id, plate: c.plate, brand: "", model: "", year: "" }); return; } go(base + "/work"); } else { setD({ ...d, carId: undefined, first: "", last: "", phone: "" }); go(base + "/brand"); } }}>Next</Btn></Page>;

  if (step === "brand") return <Page n="2 of 6 · new car only" title="Which brand?" onBack={back}>
    {[...Object.keys(LOG_BRANDS), "Other"].map(b => <Chip key={b} on={d.brand === b} onClick={() => setD({ ...d, brand: b, model: d.brand === b ? d.model : "" })}>{b}</Chip>)}
    {d.brand === "Other" && <input aria-label="Brand" value={other} placeholder="Brand" onChange={e => setOther(e.target.value)} className={`${inCls} text-[17px] mt-2`} />}
    <Btn disabled={!d.brand || (d.brand === "Other" && !other.trim())} onClick={() => { if (d.brand === "Other") setD({ ...d, brand: other.trim() }); go(base + "/model"); }}>Next</Btn></Page>;

  if (step === "model") {
    const brandKey = d.brand && (Object.keys(LOG_BRANDS).find(b => b.toLowerCase() === d.brand.toLowerCase()) || Object.keys(BRANDS).find(b => b.toLowerCase() === d.brand.toLowerCase()));
    const models = (brandKey && (LOG_BRANDS[brandKey] || BRANDS[brandKey])) || ["Corolla", "Camry", "RAV4", "Accord", "Civic", "RX", "ES", "Sedan", "SUV"];
    return (
      <Page n="3 of 6 · new car only" title="Model and year" onBack={back}>
        {models.map(m => (
          <Chip key={m} on={d.model === m} onClick={() => setD({ ...d, model: m })}>
            {m}
          </Chip>
        ))}
        <K>Year</K>
        {[...LOG_YEARS, "Other year"].map(y => (
          <Chip
            key={y}
            on={d.year === y || (y === "Other year" && !!d.year && !LOG_YEARS.includes(d.year))}
            onClick={() => setD({ ...d, year: y === "Other year" ? "" : y, ...(y === "Other year" ? { year: " " } : {}) })}
          >
            {y}
          </Chip>
        ))}
        {d.year && !LOG_YEARS.includes(d.year) && (
          <input
            aria-label="Year"
            inputMode="numeric"
            maxLength={4}
            value={d.year.trim()}
            placeholder="2015"
            onChange={e => setD({ ...d, year: e.target.value.replace(/\D/g, "") || " " })}
            className={`${inCls} text-[17px] mt-2`}
          />
        )}
        <Btn
          disabled={!d.model.trim() || !d.year.trim()}
          onClick={() => {
            if (onCar) {
              onCar({ plate: d.plate.trim(), brand: d.brand, model: d.model.trim(), year: d.year.trim() });
              return;
            }
            go(base + "/work");
          }}
        >
          Next
        </Btn>
      </Page>
    );
  }

  if (step === "work") return <Page n="4a" title="What did you work on?" onBack={back}>
    {WORK.map(w => <Chip key={w} on={cur.name === w || (w === "Other" && !!cur.name && !WORK.includes(cur.name))} onClick={() => setCur({ name: w === "Other" ? " " : w })}>{w}</Chip>)}
    {cur.name && !WORK.includes(cur.name) && <input aria-label="Work" autoFocus value={cur.name.trim()} placeholder="e.g. AC gas" onChange={e => setCur({ name: e.target.value || " " })} className={`${inCls} text-[17px] mt-2`} />}
    <Btn disabled={!cur.name.trim()} onClick={() => go(base + "/status")}>Next</Btn></Page>;

  if (step === "status") return <Page n={`4b · ${cur.name.trim()}`} title="Is it done?" onBack={back}>
    <button onClick={() => { setCur({ status: "done" }); go(base + "/cost"); }} className="absolute left-[18px] right-[18px] top-[110px] h-20 rounded-2xl text-[20px] font-bold bg-[#dcfce7] text-[#166534]">✓ Done</button>
    <button onClick={() => { setCur({ status: "progress", urg: cur.urg || "soon" }); go(base + "/cost"); }} className="absolute left-[18px] right-[18px] top-[210px] h-20 rounded-2xl text-[20px] font-bold bg-[#fef3c7] text-[#92400e]">In progress</button></Page>;

  if (step === "cost") {
    const val = Number(cur.cost.replace(/\D/g, "")) || 0; const isDone = cur.status === "done";
    const add = (cost: number | null) => { if (onItem) { onItem({ id: "i" + Date.now(), name: cur.name.trim(), status: cur.status, cost, note: cur.note.trim() || undefined, ...(cur.status === "progress" ? { urg: cur.urg || "soon" } : {}) }); setD(emptyLog()); return; } setD({ ...d, items: [...d.items, { id: "i" + Date.now(), name: cur.name.trim(), status: cur.status, cost, note: cur.note.trim() || undefined, ...(cur.status === "progress" ? { urg: cur.urg || "soon" } : {}) }], cur: { name: "", status: "done", cost: "", note: "" } }); go(base + "/more"); };
    return <Page n={`4c · ${cur.name.trim()} · ${isDone ? "Done" : "In progress"}`} title="How much?" onBack={back}>
      <div className={`${inCls} text-[30px] flex items-center tracking-[2px]`}><span>₦&nbsp;</span><input aria-label="Cost" autoFocus inputMode="numeric" value={cur.cost} placeholder="0" onChange={e => { const n = e.target.value.replace(/\D/g, ""); setCur({ cost: n ? Number(n).toLocaleString("en-NG") : "" }); }} className="flex-1 min-w-0 outline-none bg-transparent placeholder:text-[#cbd5e1]" /></div>
      {!isDone && <><K>How urgent?</K>{(["now", "soon", "wait"] as Urg[]).map(u => <Chip key={u} on={(cur.urg || "soon") === u} onClick={() => setCur({ urg: u })}>{urgText(u)}</Chip>)}</>}
      <K>Note (optional)</K>
      <textarea aria-label="Note" value={cur.note} placeholder="e.g. used Toyota original pads" onChange={e => setCur({ note: e.target.value })} className="w-full border-2 border-[#cbd5e1] rounded-[14px] h-20 text-[15px] px-[14px] pt-3 outline-none resize-none placeholder:text-[#94a3b8]" />
      {!isDone && <Btn gray bottom={90} onClick={() => add(null)}>Skip for now</Btn>}
      <Btn disabled={isDone && !val} onClick={() => add(val || null)}>Next</Btn></Page>;
  }

  if (step === "more") return <Page n="4d" title="Anything else?" onBack={back}>
    {d.items.map(it => <ItemRow key={it.id} it={it} />)}
    <Btn gray bottom={90} onClick={() => go(base + "/work")}>+ Add another</Btn><Btn disabled={!d.items.length} onClick={() => go(base + "/check")}>No, next</Btn></Page>;

  if (step === "check") {
    const total = d.items.reduce((s, i) => s + (i.cost || 0), 0); const nd = d.items.filter(i => i.status === "done").length, np = d.items.length - nd;
    const c = d.carId ? db.cars.find(x => x.id === d.carId) : undefined;
    const save = (send: boolean) => {
      const id = c?.id || "c" + Date.now(); const owner: Owner = { first: d.first.trim(), last: d.last.trim(), phone: d.phone.trim() };
      const visit = { id: "v" + Date.now(), date: new Date().toISOString().slice(0, 10), items: d.items, ...(owner.first || owner.last || owner.phone ? { owner } : {}) };
      const phone = d.phone.trim();
      up(db2 => { const ex = db2.cars.find(x => x.id === id);
        if (ex) { ex.visits = [visit, ...(ex.visits || [])]; ex.time = "Now"; if (owner.phone) ex.phone = owner.phone; if (owner.first) { ex.owner = owner.first; ex.ownerLast = owner.last || undefined; } db2.cars = [ex, ...db2.cars.filter(x => x.id !== id)]; }
        else db2.cars.unshift({ id, plate: d.plate.trim(), model: `${d.brand} ${d.model}`.trim(), year: d.year.trim(), phone: owner.phone || undefined, owner: owner.first || undefined, ownerLast: owner.last || undefined, time: "Now", problems: [], visits: [visit] } as Car);
        return db2; });
      if (send && d.phone.trim()) {
        const lines = d.items.map(i => `• ${i.name}: ${i.cost != null ? naira(i.cost) : "cost to follow"} (${i.status === "done" ? "done" : "in progress"})`);
        const text = `${owner.first ? `Hello ${owner.first},\n` : ""}Receipt from ${db.workshop}\n${carLabel()} · ${d.plate.trim()}\n16 Oct 2026\n\n${lines.join("\n")}\n\nTotal: ${naira(total)}\nThank you!`;
        const num = phone.replace(/\D/g, "").replace(/^0/, "234");
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, "_blank");
      }
      setD(emptyLog()); done();
    };
    return <Page n="5" title="Check and save" onBack={back}>
      <div className="flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px]">{carLabel()}<span className="text-[#64748b] text-[13px]">{d.plate.trim()}</span></div>
      {d.items.map(it => <ItemRow key={it.id} it={it} />)}
      <div className="flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px]">{[nd && `${nd} done`, np && `${np} in progress`].filter(Boolean).join(" · ")}<b>{naira(total)}</b></div>
      <div className="text-[15px] font-bold text-[#0f172a] mt-4 mb-1">Owner (optional)</div>
      {([["first", "First name"], ["last", "Last name"]] as const).map(([k, l]) => <input key={k} aria-label={l} value={d[k]} placeholder={l} onChange={e => { setTyped(true); setD({ ...d, [k]: e.target.value }); }} className={`${ownCls} mb-2`} />)}
      <K>Owner&apos;s WhatsApp (optional, to send the receipt)</K>
      <input aria-label="Owner's WhatsApp" inputMode="tel" value={d.phone} placeholder="080..." onChange={e => { setTyped(true); setD({ ...d, phone: e.target.value }); }} className={ownCls} />
      {typed && (() => { const q = [d.first, d.last].map(x => x.trim().toLowerCase()).filter(Boolean); const qp = d.phone.replace(/\D/g, "");
        const hits = customers(db).filter(o => { const nm = `${o.first} ${o.last}`.toLowerCase(); const same = o.first === d.first.trim() && o.last === d.last.trim() && o.phone === d.phone.trim();
          return !same && (q.length || qp.length >= 3) && q.every(x => nm.includes(x)) && (qp.length < 3 || o.phone.replace(/\D/g, "").includes(qp)); }).slice(0, 4);
        return hits.length ? <div className="mt-2">{hits.map(o => <Chip key={o.first + o.last + o.phone} onClick={() => { setD({ ...d, first: o.first, last: o.last, phone: o.phone }); setTyped(false); }}><span className="font-semibold">{`${o.first} ${o.last}`.trim()}</span>{o.phone && <span className="text-[#64748b] ml-2 text-[13px]">{o.phone}</span>}</Chip>)}</div> : null; })()}
      {d.phone.trim() ? <><div className="h-[60px]" />
        <Btn bottom={82} onClick={() => save(true)}>Save and send receipt</Btn>
        <button onClick={() => save(false)} className="absolute left-[18px] right-[18px] bottom-[22px] h-12 rounded-2xl bg-[#f1f5f9] text-[#0f172a] font-semibold text-[15px]">Just save</button></>
        : <Btn onClick={() => save(false)}>Save</Btn>}</Page>;
  }
  return null;
}

/* ---- Car page: visit history with editable cost ---- */
export function Visits({ car, up, flash }: { car: Car; up: (f: (d: DB) => DB) => void; flash: (m: string) => void }) {
  const [edit, setEdit] = useState<{ v: string; i: string; cost: string } | null>(null);
  if (!car.visits?.length) return null;
  const set = (vid: string, iid: string, f: (it: LogItem) => void) => up(d => { const it = d.cars.find(x => x.id === car.id)!.visits!.find(v => v.id === vid)!.items.find(x => x.id === iid)!; f(it); return d; });
  return <div>{car.visits.map(v => <div key={v.id}><div className="px-4 pt-3 pb-1 text-[13px] text-[#64748b]">Visit · {v.date} · {naira(v.items.reduce((s, i) => s + (i.cost || 0), 0))}</div>
    {v.items.map(it => edit?.i === it.id ? <div key={it.id} className="flex items-center gap-2 px-4 py-2 border-b border-[#f1f5f9]">
        <span className="text-[15px] w-24 truncate">{it.name}</span><input aria-label={`Cost ${it.name}`} autoFocus inputMode="numeric" value={edit.cost} placeholder="₦" onChange={e => setEdit({ ...edit, cost: e.target.value.replace(/\D/g, "") })} className="flex-1 min-w-0 h-12 border-2 border-[#2563eb] rounded-[12px] px-3 text-[16px] outline-none" />
        <button className="h-12 px-4 rounded-[12px] bg-[#2563eb] text-white text-[15px] font-semibold" onClick={() => { const n = Number(edit.cost); set(v.id, it.id, x => { x.cost = edit.cost ? n : null; }); setEdit(null); flash("Cost saved"); }}>Save</button></div>
      : <div key={it.id} className="flex items-center gap-2 min-h-14 px-4 border-b border-[#f1f5f9]">
        <button className="flex-1 text-left min-h-12 text-[16px]" onClick={() => setEdit({ v: v.id, i: it.id, cost: it.cost != null ? String(it.cost) : "" })}>{it.name}<span className="block text-[13px] text-[#2563eb]">{it.cost != null ? naira(it.cost) : "Add cost"} · edit</span></button>
        {it.status === "progress" ? <button className="h-12 px-3 text-[13px] font-semibold text-[#166534]" onClick={() => { if (it.cost == null) { setEdit({ v: v.id, i: it.id, cost: "" }); flash("Add the cost first"); return; } set(v.id, it.id, x => { x.status = "done"; }); }}>Mark done</button> : null}
        {it.status === "progress" && <UrgTag u={it.urg || "soon"} />}<StatusTag s={it.status} /></div>)}</div>)}</div>;
}
