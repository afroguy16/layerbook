"use client";
// AB-24: mechanic booking flow (spec 64127033 v26, "Booking flow (mechanic) — AB-23"). Reuses logging UI/components.
import { useState } from "react";
import { WORK, TODAY, isoAgo, type DB, type Car, type Booking, type Urg } from "@/lib/data";
import type { T } from "@/lib/copy";
import { Page, Chip, Btn, K, inCls, LogFlow, UrgTag, urgOf, naira } from "@/components/log";
import { ChevronLeft } from "lucide-react";
import { fmt } from "@/components/jobs";

export type BookWorkItem = { name: string; urg: Urg; cost: number | null; note?: string };
export type BookDraft = { carId?: string; plate: string; brand: string; model: string; year: string; work: string[]; items: BookWorkItem[]; other: string; date: string; pick: boolean; time: string; rid?: string };
export const emptyBook = (carId?: string): BookDraft => ({ carId, plate: "", brand: "", model: "", year: "", work: [], items: [], other: "", date: "", pick: false, time: "" });
const MORNING = ["8am", "9am", "10am", "11am"], AFTERNOON = ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
const TOMORROW = isoAgo(-1);
export const dayLabel = (t: T, iso: string) => iso === TODAY ? t("today") : iso === TOMORROW ? t("tomorrow") : fmt(iso);
/** Open fix-later items for a car: old-style pending problems + In progress items on open jobs. */
export const openIssues = (c?: Car) => !c ? [] : [...new Set([...c.problems.filter(p => !p.done).map(p => p.name), ...(c.visits || []).filter(v => !v.completed).flatMap(v => v.items.filter(i => i.status === "progress").map(i => i.name))])];
export const waLink = (phone: string, msg: string) => `https://wa.me/${phone.replace(/\D/g, "").replace(/^0/, "234")}?text=${encodeURIComponent(msg)}`;
const carOf = (db: DB, d: BookDraft) => d.carId ? db.cars.find(c => c.id === d.carId) : undefined;
const carName = (db: DB, d: BookDraft) => { const c = carOf(db, d); return c ? `${c.model}${c.year ? " " + c.year : ""}` : `${d.brand} ${d.model} ${d.year}`.trim(); };
export const bookingMsg = (t: T, owner: string, car: string, plate: string, iso: string, time: string, work: string[]) =>
  `Hi ${owner || "there"}, your ${car} (${plate}) is booked for ${dayLabel(t, iso).toLowerCase()} ${time}: ${work.join(", ").toLowerCase()}. We'll remind you the day before.`;

export function BookFlow({ step, db, t, d, setD, up, go, back, flash }: { step: string; db: DB; t: T; d: BookDraft; setD: (d: BookDraft) => void; up: (f: (x: DB) => DB) => void; go: (p: string) => void; back: () => void; flash: (m: string) => void }) {
  const [last, setLast] = useState<{ msg: string; rem: string; ws: string } | null>(null);
  const [cur, setCur] = useState<{ name: string; urg: Urg; cost: string; note: string }>({ name: "", urg: "soon", cost: "", note: "" });
  const [subStep, setSubStep] = useState<"item" | "urgency" | "cost">("item");
  const [adding, setAdding] = useState(false);
  const [other, setOther] = useState("");
  const [isOther, setIsOther] = useState(false);

  const work = [...(d.items && d.items.length ? d.items.map(i => i.name) : d.work.filter(w => w !== "Other")), ...(d.work.includes("Other") && d.other.trim() ? [d.other.trim()] : [])];

  if (step === "plate" || step === "brand" || step === "model")
    return <LogFlow step={step} db={db} up={up} go={go} back={back} done={back} base="/bk" onCar={c => { setD({ ...emptyBook(c.carId), ...c, work: [], items: [] }); go("/bk/work"); }} />;

  if (step === "work") {
    const pre = openIssues(carOf(db, d));
    const STANDARD_WORK = ["Brake pads", "Oil change", "AC", "Engine", "Tyres", "Wheel alignment", "Other"];
    const chips = [...new Set([...pre, ...STANDARD_WORK])];

    // Screen 4: Anything else? (Summary list of configured items)
    if (d.items && d.items.length > 0 && !adding) {
      return (
        <Page n="" title={t("anythingElse")} onBack={back}>
          <div className="space-y-0">
            {d.items.map(it => (
              <div key={it.name} className="flex justify-between items-center border-b border-[#e2e8f0] py-3.5 text-[15px]">
                <span className="text-[#0f172a]">
                  <span className="font-semibold">{it.name}</span>
                  {it.cost != null && it.cost > 0 ? (
                    <span className="ml-2 font-normal text-[#0f172a]">{naira(it.cost)}</span>
                  ) : null}
                </span>
                <span className={`inline-block whitespace-nowrap text-[12px] font-semibold px-2.5 py-1 rounded-[10px] ${it.urg === "now" ? "bg-[#fee2e2] text-[#b91c1c]" : it.urg === "wait" ? "bg-[#f1f5f9] text-[#334155]" : "bg-[#fef3c7] text-[#92400e]"}`}>
                  {it.urg === "now" ? t("fixNow") : it.urg === "wait" ? t("canWait") : t("fixSoon")}
                </span>
              </div>
            ))}
          </div>
          <Btn gray bottom={90} onClick={() => { setAdding(true); setSubStep("item"); setCur({ name: "", urg: "soon", cost: "", note: "" }); setOther(""); setIsOther(false); }}>
            {t("addAnother")}
          </Btn>
          <Btn disabled={!d.items.length} onClick={() => go("/bk/day")}>
            {t("noNext")}
          </Btn>
        </Page>
      );
    }

    // Screen 2: How urgent?
    if (subStep === "urgency") {
      return (
        <Page n="" title={t("howUrgent")} onBack={() => setSubStep("item")}>
          <div className="space-y-3 mt-4">
            <button
              onClick={() => { setCur({ ...cur, urg: "now" }); setSubStep("cost"); }}
              className="w-full h-[68px] rounded-2xl bg-[#fee2e2] text-[#b91c1c] font-bold text-[18px] flex items-center justify-center active:opacity-80"
            >
              {t("fixNow")}
            </button>
            <button
              onClick={() => { setCur({ ...cur, urg: "soon" }); setSubStep("cost"); }}
              className="w-full h-[68px] rounded-2xl bg-[#fef3c7] text-[#92400e] font-bold text-[18px] flex items-center justify-center active:opacity-80"
            >
              {t("fixSoon")}
            </button>
            <button
              onClick={() => { setCur({ ...cur, urg: "wait" }); setSubStep("cost"); }}
              className="w-full h-[68px] rounded-2xl bg-[#f1f5f9] text-[#334155] font-bold text-[18px] flex items-center justify-center active:opacity-80"
            >
              {t("canWait")}
            </button>
          </div>
        </Page>
      );
    }

    // Screen 3: Estimated cost
    if (subStep === "cost") {
      const commitItem = () => {
        const cNum = Number(cur.cost.replace(/\D/g, ""));
        const newItem: BookWorkItem = {
          name: cur.name.trim(),
          urg: cur.urg,
          cost: cur.cost ? cNum : null,
          note: cur.note.trim() || undefined,
        };
        const prev = d.items || [];
        const nextItems = [...prev.filter(x => x.name !== newItem.name), newItem];
        setD({ ...d, items: nextItems, work: nextItems.map(x => x.name) });
        setCur({ name: "", urg: "soon", cost: "", note: "" });
        setOther("");
        setIsOther(false);
        setAdding(false);
        setSubStep("item");
      };

      return (
        <Page n="" title={t("estCost")} onBack={() => setSubStep("urgency")}>
          <div className="w-full h-16 rounded-[16px] border-2 border-[#2563eb] px-4 flex items-center text-[24px] font-bold text-[#0f172a] mt-2">
            <span>₦&nbsp;</span>
            <input
              aria-label="Estimated cost"
              autoFocus
              inputMode="numeric"
              value={cur.cost}
              placeholder="0"
              onChange={e => {
                const n = e.target.value.replace(/\D/g, "");
                setCur({ ...cur, cost: n ? Number(n).toLocaleString("en-NG") : "" });
              }}
              className="flex-1 min-w-0 outline-none bg-transparent placeholder:text-[#cbd5e1]"
            />
          </div>
          <div className="text-[13px] text-[#64748b] mt-5 mb-1.5">{t("noteOpt")}</div>
          <input
            aria-label="Note"
            value={cur.note}
            placeholder={t("noteEg")}
            onChange={e => setCur({ ...cur, note: e.target.value })}
            className="w-full border-2 border-[#cbd5e1] focus:border-[#2563eb] rounded-[16px] h-14 text-[16px] px-[14px] outline-none placeholder:text-[#94a3b8]"
          />
          <Btn onClick={commitItem}>{t("next")}</Btn>
        </Page>
      );
    }

    // Screen 1: What needs fixing?
    const onPickBack = () => {
      setIsOther(false);
      setOther("");
      if (d.items && d.items.length > 0) {
        setAdding(false);
      } else {
        back();
      }
    };

    return (
      <Page n="" title={t("bkFixing")} onBack={onPickBack}>
        {chips.map(w => {
          const isSelected = w === "Other" ? isOther : cur.name === w;
          return (
            <Chip
              key={w}
              on={isSelected}
              onClick={() => {
                if (w === "Other") {
                  setIsOther(true);
                  setCur({ ...cur, name: other.trim() });
                } else {
                  setIsOther(false);
                  setOther("");
                  const u = urgOf(carOf(db, d), w);
                  setCur({ ...cur, name: w, urg: u || cur.urg });
                }
              }}
            >
              {w}
              {urgOf(carOf(db, d), w) ? <UrgTag u={urgOf(carOf(db, d), w)} /> : null}
            </Chip>
          );
        })}
        {isOther && (
          <input
            aria-label="Work"
            autoFocus
            value={other}
            placeholder="e.g. Wheel alignment"
            onChange={e => {
              setOther(e.target.value);
              setCur({ ...cur, name: e.target.value });
            }}
            className={`${inCls} text-[17px] mt-2`}
          />
        )}
        {pre.length > 0 && <div className="text-[13px] text-[#64748b] mt-3">{t("fixLaterPre")}</div>}
        <Btn disabled={!cur.name.trim()} onClick={() => setSubStep("urgency")}>
          {t("next")}
        </Btn>
      </Page>
    );
  }
  if (step === "day") {
    return (
      <Page n="" title={t("bkDay")} onBack={back}>
        <Chip on={!d.pick && d.date === TODAY} onClick={() => setD({ ...d, date: TODAY, pick: false })}>
          {t("today")}
        </Chip>
        <Chip on={!d.pick && d.date === TOMORROW} onClick={() => setD({ ...d, date: TOMORROW, pick: false })}>
          {t("tomorrow")}
        </Chip>
        <Chip on={d.pick} onClick={() => setD({ ...d, pick: true, date: d.pick ? d.date : "" })}>
          {t("bkPick")}
        </Chip>
        {d.pick && (
          <input
            type="date"
            aria-label="Date"
            min={TODAY}
            value={d.date}
            onChange={e => setD({ ...d, date: e.target.value })}
            className={`${inCls} text-[17px] font-normal mt-2`}
          />
        )}
        <Btn disabled={!d.date} onClick={() => go("/bk/time")}>
          {t("next")}
        </Btn>
      </Page>
    );
  }

  if (step === "time") {
    return (
      <Page n="" title={t("bkTime")} onBack={back}>
        <K>{t("morning")}</K>
        {MORNING.map(h => (
          <Chip key={h} on={d.time === h} onClick={() => setD({ ...d, time: h })}>
            {h}
          </Chip>
        ))}
        <K>{t("afternoon")}</K>
        {AFTERNOON.map(h => (
          <Chip key={h} on={d.time === h} onClick={() => setD({ ...d, time: h })}>
            {h}
          </Chip>
        ))}
        <Btn
          disabled={!d.time}
          onClick={() => {
            if (!d.rid) {
              go("/bk/check");
              return;
            }
            const B = db.bookings.find(b => b.id === d.rid);
            const car = B && db.cars.find(c => c.id === B.carId);
            const rid = d.rid;
            up(x => {
              const b = x.bookings.find(y => y.id === rid);
              if (b) {
                b.date = d.date;
                b.time = d.time;
                b.day = d.date === TODAY ? "today" : "tomorrow";
              }
              return x;
            });
            if (car?.phone && B) {
              window.open(
                waLink(car.phone, bookingMsg(t, car.owner || "", `${car.model}${car.year ? " " + car.year : ""}`, car.plate, d.date, d.time, B.items || openIssues(car))),
                "_blank"
              );
            }
            setD(emptyBook());
            history.go(-2);
            flash(t("bkMoved"));
          }}
        >
          {t(d.rid ? "bkResched" : "next")}
        </Btn>
      </Page>
    );
  }

  if (step === "check") {
    const row = "flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px]";
    const checkItems = d.items && d.items.length ? d.items : work.map(w => ({ name: w, urg: urgOf(carOf(db, d), w) || "soon", cost: null }));
    return (
      <Page n="" title={t("bkCheck")} onBack={back}>
        <div className={row}>
          {carName(db, d)}
          <span className="text-[#64748b] text-[13px]">{d.plate}</span>
        </div>
        {checkItems.map(it => (
          <div key={it.name} className={row}>
            <span>
              <b>{it.name}</b>
              {it.cost != null && it.cost > 0 ? (
                <span className="ml-2 text-[#64748b]">{naira(it.cost)}</span>
              ) : null}
            </span>
            <UrgTag u={it.urg} />
          </div>
        ))}
        <div className={row}>
          {dayLabel(t, d.date)}
          <b>{d.time}</b>
        </div>
        <Btn
          onClick={() => {
            let id = d.carId;
            const car = carOf(db, d);
            if (!id) {
              id = "c" + Date.now();
              const nc: Car = {
                id,
                plate: d.plate,
                model: `${d.brand} ${d.model}`.trim(),
                year: d.year,
                time: "Now",
                problems: [],
              };
              up(x => {
                x.cars.unshift(nc);
                return x;
              });
            }
            const cid = id;
            const urgMap: Record<string, Urg> = {};
            const costsMap: Record<string, number | null> = {};
            const notesMap: Record<string, string> = {};
            if (d.items && d.items.length) {
              d.items.forEach(it => {
                urgMap[it.name] = it.urg;
                if (it.cost != null) costsMap[it.name] = it.cost;
                if (it.note) notesMap[it.name] = it.note;
              });
            } else {
              work.forEach(w => {
                const u = urgOf(car, w);
                if (u) urgMap[w] = u;
              });
            }
            up(x => {
              x.bookings.push({
                id: "b" + Date.now(),
                carId: cid,
                date: d.date,
                items: work,
                urg: urgMap,
                costs: costsMap,
                notes: notesMap,
                time: d.time,
                day: d.date === TODAY ? "today" : "tomorrow",
                status: "ok",
              });
              return x;
            });
            const owner = car?.owner || "";
            const msg = bookingMsg(t, owner, carName(db, d), d.plate, d.date, d.time, work);
            const rem = `Hi ${owner || "there"}, reminder: your ${carName(db, d)} (${d.plate}) is booked for tomorrow ${d.time}. See you at ${db.workshop}.`;
            setLast({ msg, rem, ws: db.workshop });
            if (car?.phone) window.open(waLink(car.phone, msg), "_blank");
            location.replace("#/bk/booked");
            flash(t("bkDone"));
          }}
        >
          {t("bkBook")}
        </Btn>
      </Page>
    );
  }

  if (step === "booked") {
    return (
      <Page n="" title="" onBack={() => { location.replace("#/bookings"); }}>
        <div className="flex flex-col items-center text-center pt-10">
          <div className="text-[22px] font-bold text-[#0f172a]">{t("bkDone")}</div>
          <div className="text-[14px] text-[#64748b] mt-2 max-w-[260px]">{t("bkDoneSub")}</div>
        </div>
        {last && (
          <div className="mt-8 rounded-[18px] bg-[#efeae2] p-3 space-y-2">
            <div className="text-[11px] font-semibold text-[#64748b] tracking-[0.06em]">
              {t("bkWaPreview").toUpperCase()}
            </div>
            <div className="max-w-[90%] rounded-[10px] bg-white px-3 py-2 text-[14px] leading-snug shadow-sm">
              <b className="block text-[13px]">{last.ws}</b>
              {last.msg}
            </div>
            <div className="text-[11px] text-[#64748b] pt-1">{t("bkReminder")}</div>
            <div className="max-w-[90%] rounded-[10px] bg-white px-3 py-2 text-[14px] leading-snug shadow-sm">
              <b className="block text-[13px]">{last.ws}</b>
              {last.rem}
            </div>
          </div>
        )}
      </Page>
    );
  }
  return null;
}

/** Bookings tab: entry point + upcoming list (replaces 'Booking is coming soon'). */
export function BookingsTab({ db, t, start, openDrawer, nav, go }: { db: DB; t: T; start: () => void; openDrawer: () => void; nav: React.ReactNode; go: (p: string) => void }) {
  const dateOf = (b: DB["bookings"][number]) => b.date || (b.day === "today" ? TODAY : TOMORROW);
  const list = db.bookings.filter(b => dateOf(b) >= TODAY).sort((a, b) => dateOf(a).localeCompare(dateOf(b)) || parseInt(a.time) - parseInt(b.time));
  const days = [...new Set(list.map(dateOf))];
  return <div style={{ fontFamily: "Inter,Helvetica,Arial,sans-serif" }} className="flex-1 flex flex-col min-h-0">
    <div className="shrink-0 h-[60px] flex items-center px-5 pt-2 gap-2"><button aria-label="Menu" onClick={openDrawer} className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold bg-[#eaf0fe] text-[#1e3a8a]">{db.workshop.split(" ").map(w => w[0]).slice(0, 2).join("")}</button><h1 className="flex-1 text-[22px] font-bold tracking-[-0.4px]">{t("bkTitle")}</h1></div>
    <div className="flex-1 overflow-y-auto px-5 pb-6">
      <button onClick={start} className="w-full h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[17px] mt-3">+ {t("bkStart")}</button>
      <div className="text-[11px] font-semibold tracking-[0.08em] text-[#64748b] pt-6 pb-1">{t("bkUpcoming").toUpperCase()}</div>
      {!list.length && <div className="text-[14px] text-[#94a3b8] py-4">{t("bkNone")}</div>}
      {days.map(day => <div key={day}><div className="text-[13px] text-[#64748b] pt-3 pb-2">{dayLabel(t, day)} · {fmt(day)}</div>
        <div className="space-y-2">{list.filter(b => dateOf(b) === day).map(b => { const c = db.cars.find(x => x.id === b.carId); if (!c) return null; const items = b.items || c.problems.filter(p => !p.done).map(p => p.name);
          return <button key={b.id} onClick={() => go(`/booking/${b.id}`)} className="w-full text-left flex items-center gap-4 rounded-2xl bg-[#f8fafc] p-4 min-h-14 active:bg-[#f1f5f9]"><b className="w-12 text-[14px]">{b.time}</b><span className="flex-1 min-w-0"><b className="block text-[14px]">{c.plate}</b><span className="block text-[12px] text-[#64748b] truncate">{c.model} · {items.join(", ") || "—"}</span></span><span className="text-[#cbd5e1]">›</span></button>; })}</div></div>)}
    </div>{nav}</div>;
}

/** AB-25 booking detail: car, work + urgency, day/time, owner; Start job / Reschedule / Message owner / Cancel booking. */
export const bkDate = (b: Booking) => b.date || (b.day === "today" ? TODAY : TOMORROW);
export const bkItems = (b: Booking, c: Car) => b.items || c.problems.filter(p => !p.done).map(p => p.name);
export const bkUrg = (b: Booking, c: Car, w: string): Urg | undefined => b.urg?.[w] || urgOf(c, w);
export function BookingDetail({ db, t, id, up, back, flash, startJob, resched }: { db: DB; t: T; id: string; up: (f: (x: DB) => DB) => void; back: () => void; flash: (m: string, undo?: () => void) => void; startJob: (b: Booking, c: Car) => void; resched: (b: Booking) => void }) {
  const B = db.bookings.find(b => b.id === id); const c = B && db.cars.find(x => x.id === B.carId);
  const wrap = (ch: React.ReactNode) => <div className="relative flex-1 min-h-0 bg-white px-[18px] pt-[22px] pb-[24px] overflow-y-auto flex flex-col" style={{ fontFamily: "Inter,Helvetica,Arial,sans-serif" }}>
    <div className="flex items-center mb-[6px]"><button aria-label="Back" onClick={back} className="-ml-[14px] -my-[14px] w-12 h-12 flex items-center justify-center"><ChevronLeft size={24} strokeWidth={2} /></button></div>{ch}</div>;
  if (!B || !c) return wrap(<div className="pt-10 text-center text-[#64748b]">{t("bkNone")}</div>);
  const items = bkItems(B, c); const iso = bkDate(B); const row = "flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px] min-h-12";
  const msg = bookingMsg(t, c.owner || "", `${c.model}${c.year ? " " + c.year : ""}`, c.plate, iso, B.time, items);
  const sm = "flex-1 h-12 rounded-2xl bg-[#f1f5f9] text-[#0f172a] font-semibold text-[15px] disabled:opacity-40";
  return wrap(<>
    <h2 className="text-[21px] font-bold mt-1 mb-[14px] text-[#0f172a]">{t("booking")}</h2>
    <div className={row}><span><b>{c.plate}</b> · {c.model}{c.year ? " " + c.year : ""}</span></div>
    <div className={row}>{dayLabel(t, iso)} · {fmt(iso)}<b>{B.time}</b></div>
    <div className={row}>{t("owner")}<span className="text-[#64748b]">{[[c.owner, c.ownerLast].filter(Boolean).join(" "), c.phone].filter(Boolean).join(" · ") || "—"}</span></div>
    {items.map(w => <div key={w} className={row}><span>{w}{B.costs?.[w] != null && B.costs[w]! > 0 ? <span className="ml-2 text-[#64748b]">{naira(B.costs[w]!)}</span> : null}</span><UrgTag u={bkUrg(B, c, w)} /></div>)}
    <div className="flex-1 min-h-6" />
    <button onClick={() => startJob(B, c)} className="w-full h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[17px]">{t("startJob")}</button>
    <div className="flex gap-2 mt-2"><button className={sm} onClick={() => resched(B)}>{t("resched")}</button>
      <button className={sm} disabled={!c.phone} onClick={() => c.phone && window.open(waLink(c.phone, msg), "_blank")}>{t("msgOwner")}</button></div>
    <button className="w-full h-12 mt-2 text-[15px] font-semibold text-[#b91c1c]" onClick={() => { const old = db.bookings; up(x => ({ ...x, bookings: x.bookings.filter(b => b.id !== id) })); back(); flash(t("cancelled"), () => up(x => ({ ...x, bookings: old }))); }}>{t("cancelBk")}</button>
  </>);
}

/** M8: Fast 1-Screen Slot Booking (Trinity Pillar 2) */
export function FastBook({
  db,
  carId,
  t,
  up,
  go,
  back,
  flash,
}: {
  db: DB;
  carId?: string;
  t: T;
  up: (f: (d: DB) => DB) => void;
  go: (p: string) => void;
  back: () => void;
  flash: (m: string) => void;
}) {
  const [selectedCarId, setSelectedCarId] = useState<string>(carId || "");
  const activeCarId = carId || selectedCarId;
  const car = db.cars.find(c => c.id === activeCarId);
  const open = car ? car.problems.filter(p => !p.done) : [];
  const [slot, setSlot] = useState<string>("Tomorrow 10am");
  const [pickDate, setPickDate] = useState("");
  const [isPick, setIsPick] = useState(false);
  const [booked, setBooked] = useState<{ msg: string; rem: string } | null>(null);

  if (!car) {
    return (
      <Page n="" title="Book a car" onBack={back}>
        <div className="text-[14px] text-[#64748b] -mt-2 mb-4">
          Select car on file
        </div>
        {db.cars.map(c => (
          <Chip
            key={c.id}
            on={selectedCarId === c.id}
            onClick={() => setSelectedCarId(c.id)}
          >
            {c.plate} · {c.model}
          </Chip>
        ))}
        <div className="mt-6 pt-4 border-t border-[#f1f5f9]">
          <div className="text-[13px] text-[#64748b] mb-2">Or new customer:</div>
          <Chip on={false} onClick={() => go("/new/plate")}>
            + Add new car
          </Chip>
        </div>
      </Page>
    );
  }

  const carName = `${car.model}${car.year ? " " + car.year : ""}`;
  const ownerName = car.owner || "Owner";

  const handleBook = () => {
    const isNow = slot === "Bring it now";
    const timeVal = isNow ? "Now" : slot === "Other day" ? "10am" : slot.split(" ")[1] || "10am";
    const dateVal = isNow ? TODAY : isPick && pickDate ? pickDate : slot.startsWith("Today") ? TODAY : TOMORROW;
    const dayVal = isNow || slot.startsWith("Today") ? "today" : "tomorrow";

    const urgMap: Record<string, Urg> = {};
    open.forEach(p => {
      urgMap[p.name] = p.urg;
    });

    const newBooking: Booking = {
      id: "b" + Date.now(),
      carId: car.id,
      date: dateVal,
      time: timeVal,
      day: dayVal,
      items: open.map(p => p.name),
      urg: urgMap,
      status: "ok",
    };

    up(x => {
      x.bookings.push(newBooking);
      return x;
    });

    const msg = bookingMsg(
      t,
      car.owner || "",
      carName,
      car.plate,
      dateVal,
      timeVal,
      newBooking.items || []
    );
    const rem = `Hi ${car.owner || "there"}, reminder: your ${carName} (${car.plate}) is booked for tomorrow ${timeVal}. See you at ${db.workshop}.`;

    setBooked({ msg, rem });

    if (car.phone) {
      window.open(waLink(car.phone, msg), "_blank");
    }
    flash("Booking confirmed");
  };

  if (booked) {
    return (
      <Page n="" title="" onBack={() => go("/bookings")}>
        <div className="flex flex-col items-center text-center pt-8">
          <div className="w-14 h-14 rounded-full bg-[#dcfce7] text-[#166534] text-[28px] flex items-center justify-center mb-3">
            ✓
          </div>
          <div className="text-[22px] font-bold text-[#0f172a]">Booked</div>
          <div className="text-[14px] text-[#64748b] mt-1 max-w-[280px]">
            Owner receives WhatsApp confirmation and a reminder before the appointment.
          </div>
        </div>
        <div className="mt-8 rounded-[18px] bg-[#efeae2] p-4 space-y-2">
          <div className="text-[11px] font-semibold text-[#64748b] tracking-[0.06em]">
            WHATSAPP NOTIFICATION
          </div>
          <div className="rounded-[12px] bg-white p-3 text-[14px] leading-snug shadow-sm">
            <b className="block text-[13px] text-[#0f172a] mb-1">{db.workshop}</b>
            {booked.msg}
          </div>
        </div>
        <Btn onClick={() => go("/bookings")}>View in Bookings</Btn>
      </Page>
    );
  }

  const SLOTS = ["Tomorrow 10am", "Today 4pm", "Tomorrow 12pm", "Bring it now", "Other day"];
  const row = "flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px]";

  return (
    <Page n="" title={`When should ${ownerName} come?`} onBack={!carId ? () => setSelectedCarId("") : back}>
      <div className="text-[14px] text-[#64748b] -mt-2 mb-4 flex items-center justify-between">
        <span>{carName} · {car.plate}</span>
        {!carId && (
          <button
            onClick={() => setSelectedCarId("")}
            className="text-[13px] text-[#2563eb] font-semibold"
          >
            Change
          </button>
        )}
      </div>

      {SLOTS.map(s => (
        <Chip
          key={s}
          on={slot === s}
          onClick={() => {
            setSlot(s);
            setIsPick(s === "Other day");
          }}
        >
          {s === "Other day" ? "Other day..." : s}
        </Chip>
      ))}

      {isPick && (
        <input
          type="date"
          aria-label="Pick date"
          min={TODAY}
          value={pickDate}
          onChange={e => setPickDate(e.target.value)}
          className={`${inCls} text-[16px] font-normal mt-2 mb-2`}
        />
      )}

      {open.length > 0 && (
        <div className="mt-4">
          <K>ISSUES TO FIX (FROM HEALTH RECORD)</K>
          {open.map(p => (
            <div key={p.id} className={row}>
              <span>{p.name}</span>
              <UrgTag u={p.urg} />
            </div>
          ))}
        </div>
      )}

      <div className="text-[13px] text-[#64748b] mt-4 mb-2">
        Fee when completed: ₦200 (code EARLY200 applied) · WhatsApp notice sent automatically
      </div>

      <Btn disabled={isPick && !pickDate} onClick={handleBook}>
        Book
      </Btn>
    </Page>
  );
}

