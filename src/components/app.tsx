"use client";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState, useCallback, useRef, type ReactNode } from "react";
import { seed, PROBLEMS, BRANDS, YEARS, CODE, type DB, type Car, type Urg, type Problem } from "@/lib/data";
import { tr, type T } from "@/lib/copy";
import { theme } from "@/lib/theme";
import { Nav, type Tab } from "@/components/nav";
import { LogFlow, ExitCtx, ExitX, urgLang, emptyLog, Page, Chip, Btn, K, UrgTag, type LogDraft } from "@/components/log";
import { BookFlow, BookingsTab, BookingDetail, FastBook, emptyBook, openIssues, bkItems, bkUrg, bkDate, type BookDraft } from "@/components/book";
import { JobsList, JobPage, CustomerPage, BookingSoon, noFilters, allJobs, fmt, type Filters } from "@/components/jobs";
import { CarHealthRecord } from "@/components/car";

const KEY = "autobook-v5d";
const BTN = theme.btn;
const URG: Record<Urg, { c: string; bg: string; k: "fixNow" | "fixSoon" | "canWait"; s: "notSafe" | "w2" | "nextSvc" }> = {
  now: { c: "#dc2626", bg: "#fef2f2", k: "fixNow", s: "notSafe" }, soon: { c: "#b45309", bg: "#fdf4ec", k: "fixSoon", s: "w2" }, wait: { c: "#16a34a", bg: "#f0fdf4", k: "canWait", s: "nextSvc" },
};
const AV: Record<string, string> = { c1: "🚗", c2: "🚙", c3: "🚐", c4: "🚗" };

type Draft = { plate: string; brand: string; model: string; year: string; probs: string[]; urg: Record<string, Urg>; owner: string; phone: string };
const emptyDraft = (): Draft => ({ plate: "", brand: "", model: "", year: "", probs: [], urg: {}, owner: "", phone: "" });

function useHash() {
  const [h, setH] = useState("/");
  useEffect(() => { const f = () => setH(location.hash.slice(1) || "/"); f(); addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  return h;
}
const go = (p: string) => { location.hash = p; };
const back = () => history.back();

/* ---------- primitives (styles copied from /workspace/mock/*.html) ---------- */
function Top({ title, sub, onBack, right }: { title: string; sub?: string; onBack?: () => void; right?: ReactNode }) {
  return <div className="h-14 shrink-0 flex items-center px-2 border-b border-[#f1f5f9] bg-white text-[#0f172a]">
    {onBack ? <button aria-label="Back" onClick={onBack} className="-ml-1 w-12 h-12 text-[18px] text-[#0f172a] flex items-center justify-center"><ChevronLeft size={24} strokeWidth={2} /></button> : <div className="w-2" />}
    <div className="flex-1 min-w-0"><div className="text-[17px] font-semibold leading-tight truncate text-[#0f172a]">{title}</div>{sub && <div className="text-[13px] truncate text-[#64748b]">{sub}</div>}</div>
    {right || <ExitX />}
  </div>;
}
const Q = ({ q, s }: { q: string; s?: string }) => <><div className="text-[20px] font-semibold px-4 pt-5 pb-1 text-[#0f172a]">{q}</div>{s && <div className="text-[14px] text-[#64748b] px-4 pb-3">{s}</div>}</>;
function Ch({ on, onClick, children, right, center }: { on?: boolean; onClick: () => void; children: ReactNode; right?: ReactNode; center?: boolean }) {
  return <button onClick={onClick} className={`inline-flex items-center h-14 px-[18px] border-[1.5px] rounded-full mr-[6px] mb-2 text-[15px] ${on ? "bg-[#2563eb] text-white border-[#2563eb]" : "border-[#cbd5e1] text-[#0f172a]"}`}>
    <span>{children}</span>{right && <span className="ml-2 text-[13px] opacity-75">{right}</span>}
  </button>;
}
const Bar = ({ children }: { children: ReactNode }) => <div className="shrink-0 p-4 border-t border-[#f1f5f9] bg-white">{children}</div>;
const Body = ({ children }: { children: ReactNode }) => <div className="flex-1 overflow-y-auto">{children}</div>;
const Link = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => <button onClick={onClick} className="w-full min-h-[48px] text-[14px] text-[#2563eb]">{children}</button>;
const Tag = ({ u, t }: { u: Urg; t: T }) => <UrgTag u={u} />;
const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => <input {...p} className="mx-4 w-[calc(100%-32px)] h-14 rounded-2xl border-2 border-[#2563eb] px-4 text-[17px] outline-none text-[#0f172a]" />;

function QuickScreen({ t, title, sub, items, idx, onPick, onBack }: { t: T; title: string; sub?: string; items: string[]; idx: number; onPick: (u: Urg) => void; onBack: () => void }) {
  return <Page n={`${idx + 1} of ${items.length}`} title="How urgent?" onBack={onBack}>
    <div className="text-[14px] text-[#64748b] -mt-2 mb-4">{items[idx]} {sub ? `· ${sub}` : ""}</div>
    <div className="space-y-3 mt-4">
      <button onClick={() => onPick("now")} className="w-full h-[68px] rounded-2xl bg-[#fee2e2] text-[#b91c1c] font-bold text-[18px] flex items-center justify-center active:opacity-80">
        Critical
      </button>
      <button onClick={() => onPick("soon")} className="w-full h-[68px] rounded-2xl bg-[#fef3c7] text-[#92400e] font-bold text-[18px] flex items-center justify-center active:opacity-80">
        Fix soon
      </button>
      <button onClick={() => onPick("wait")} className="w-full h-[68px] rounded-2xl bg-[#f1f5f9] text-[#334155] font-bold text-[18px] flex items-center justify-center active:opacity-80">
        Can wait
      </button>
    </div>
  </Page>;
}
function ProblemGrid({ t, sel, toggle }: { t: T; sel: string[]; toggle: (p: string) => void }) {
  return <div className="px-4">{PROBLEMS.map(p => <Chip key={p} on={sel.includes(p)} onClick={() => toggle(p)}>{p}</Chip>)}</div>;
}

/* ---------- app ---------- */
export default function App() {
  const route = useHash();
  const [db, setDb] = useState<DB | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [drawer, setDrawer] = useState(false);
  const [jf, setJf] = useState<Filters>(noFilters);
  const [bd, setBd] = useState<BookDraft>(() => emptyBook());
  const [logInit, setLogInit] = useState<{ k: string; d: LogDraft; bid: string } | null>(null);
  const [ask, setAsk] = useState(false);
  const origin = useRef("/"); const prev = useRef("/");
  const isFlow = (r: string) => { const [a, b] = r.split("/").filter(Boolean); return ["log", "bk", "new", "add", "fastbook"].includes(a) || (a === "book" && !!b) ? b !== "booked" : false; };
  useEffect(() => { if (isFlow(route) && !isFlow(prev.current) && !prev.current.startsWith("/bk/")) origin.current = prev.current; prev.current = route; setAsk(false); }, [route]);
  const [toast, setToast] = useState<{ msg: string; undo?: () => void } | null>(null);
  // flow-local state
  const [bk, setBk] = useState({ day: "", time: "" });
  const [top, setTop] = useState({ amt: 5000, code: "", how: "bank" });
  const [su, setSu] = useState({ phone: "+234 803 555 0101", code: "", name: "", area: "" });
  const [ow, setOw] = useState({ day: "", time: "", name: "Chidi", phone: "0803 123 4567" });

  useEffect(() => { try { const s = localStorage.getItem(KEY); setDb(s ? JSON.parse(s) : seed()); } catch { setDb(seed()); } }, []);
  useEffect(() => { if (db) localStorage.setItem(KEY, JSON.stringify(db)); }, [db]);
  const up = useCallback((f: (d: DB) => DB) => setDb(d => (d ? f(structuredClone(d)) : d)), []);
  const flash = (msg: string, undo?: () => void) => { setToast({ msg, undo }); setTimeout(() => setToast(x => (x?.msg === msg ? null : x)), 4000); };
  if (!db) return <Frame><div /></Frame>;
  // One reminder action everywhere (Home, Cars due back, booking detail): same WhatsApp message as /o/later.
  const remind = (ids: string[]) => { const cs = ids.map(i => db.cars.find(c => c.id === i)).filter(Boolean) as Car[]; if (!cs.length) return;
    up(d => ({ ...d, due: d.due.map(x => ids.includes(x.carId) ? { ...x, sent: true } : x) }));
    flash(cs.length === 1 ? tr(db.lang)("remindedTo", { o: cs[0].owner || cs[0].plate }) : tr(db.lang)("remindedN", { n: cs.length })); };
  const plus = () => { setLogInit(null); go("/log/plate"); };
  const t = tr(db.lang); urgLang.v = db.lang;
  const discard = () => { setAsk(false); setBd(emptyBook()); setDraft(emptyDraft()); setLogInit(null); location.replace("#" + origin.current); };
  const seg = route.split("/").filter(Boolean);
  const car = (id: string) => db.cars.find(c => c.id === id);

  const screen = (() => {
    const [a, b, c, d] = seg;
    /* ----- Flow 6: sign up ----- */
    if (!db.signedUp && a !== "signup" && a !== "o") { setTimeout(() => go("/signup/phone")); return null; }
    if (a === "signup") {
      if (b === "phone") return <><Top title={t("welcome")} /><Body><Q q={t("yourPhone")} s={t("smsCode")} /><Input inputMode="tel" value={su.phone} onChange={e => setSu({ ...su, phone: e.target.value })} /></Body><Bar><button className={BTN} onClick={() => go("/signup/code")}>{t("sendCode")}</button></Bar></>;
      if (b === "code") return <><Top title={t("welcome")} onBack={back} /><Body><Q q={t("enterCode")} s={t("sentTo", { p: su.phone })} />
        <div className="relative mx-4"><div className="flex gap-2">{[0, 1, 2, 3, 4, 5].map(i => <div key={i} className={`w-12 h-12 rounded-[10px] border flex items-center justify-center text-[20px] ${i === su.code.length ? "border-2 border-[#2563eb]" : "border-[#cbd5e1]"}`}>{su.code[i] || ""}</div>)}</div>
          <input aria-label="Code" autoFocus inputMode="numeric" maxLength={6} value={su.code} className="absolute inset-0 opacity-0" onChange={e => { const v = e.target.value.replace(/\D/g, ""); setSu({ ...su, code: v }); if (v.length === 6) go("/signup/name"); }} /></div>
        <div className="text-center text-[14px] text-[#2563eb] pt-4">{t("again")}</div></Body></>;
      if (b === "name") return <><Top title={t("welcome")} onBack={back} /><Body><Q q={t("wsName")} s={t("ownersSee")} /><Input autoFocus value={su.name} placeholder="Mama Ngozi Autos" onChange={e => setSu({ ...su, name: e.target.value })} /></Body><Bar><button disabled={!su.name.trim()} className={BTN} onClick={() => go("/signup/area")}>{t("next")}</button></Bar></>;
      if (b === "area") return <><Top title={t("welcome")} onBack={back} /><Body><Q q={t("area")} s="Lagos" /><div className="px-4 space-y-2">{["Lekki", "Ikeja", "Surulere", "Yaba", t("other")].map(x =>
        <Ch key={x} on={su.area === x} onClick={() => { setSu({ ...su, area: x }); up(d => ({ ...d, signedUp: true, workshop: su.name.trim(), phone: su.phone, area: x, cars: [], bookings: [], due: [], cameBack: 0, tx: [{ label: "Free credit", when: "Today", amt: 5000 }], balance: 5000 })); go("/jobs"); }}>{x}</Ch>)}</div></Body></>;
    }
    /* ----- AB-22: jobs, job page, customer, booking paused ----- */
    if (a === "job") return <JobPage key={b} db={db} id={b} sub={c} step={d} up={up} go={go} back={back} flash={flash} />;
    if (a === "customer") return <CustomerPage db={db} k={b} go={go} back={back} />;
    if (a === "bk") return <BookFlow step={b} db={db} t={t} d={bd} setD={setBd} up={up} go={go} back={back} flash={flash} />;
    if (a === "booking" && b) return <BookingDetail db={db} t={t} id={b} up={up} back={back} flash={flash}
      startJob={(B, x) => { const v = x.visits?.find(v => v.owner)?.owner; setLogInit({ k: "s" + Date.now(), bid: B.id, d: { ...emptyLog(), plate: x.plate, carId: x.id, first: v?.first || x.owner || "", last: v?.last || x.ownerLast || "", phone: v?.phone || x.phone || "",
        items: bkItems(B, x).map((w, i) => ({ id: "i" + Date.now() + i, name: w, status: "progress" as const, cost: B.costs?.[w] ?? null, note: B.notes?.[w] ?? undefined, urg: bkUrg(B, x, w) || "soon" })) } }); go("/log/more"); }}
      resched={B => go(`/fastbook/${B.carId}`)} />;
    if (a === "bookings") return <BookingsTab go={go} db={db} t={t} start={() => go("/fastbook")} openDrawer={() => setDrawer(true)} nav={<Nav t={t} tab="bookings" go={go} onPlus={plus} />} />;
    if (a === "soon" || (a === "book" && !b)) return <BookingSoon go={(p) => location.replace("#" + p)} back={back} />;
    /* ----- Logging flow (AB-21): + tab ----- */
    if (a === "log") return <LogFlow key={logInit?.k || "log"} init={logInit?.d} step={b} db={db} up={up} go={go} back={back} done={() => { const bid = logInit?.bid; if (bid) up(x => ({ ...x, bookings: x.bookings.filter(y => y.id !== bid) })); setLogInit(null); location.replace(bid ? "#/jobs" : "#/"); flash("Saved"); }} />;
    /* ----- Flow 1: new car ----- */
    if (a === "new") {
      const T1 = (onBack = back) => <Top title={t("newCar")} onBack={onBack} />;
      if (b === "plate") {
        const q = draft.plate.toUpperCase().replace(/\s/g, "");
        const hits = q ? db.cars.filter(x => x.plate.replace(/\s/g, "").startsWith(q)) : db.cars.slice(0, 3);
        return <>{T1()}<Body><Q q={t("plate")} /><Input autoFocus value={draft.plate} placeholder="KJA 456 ZZ" onChange={e => setDraft({ ...draft, plate: e.target.value.toUpperCase() })} />
          {hits.length > 0 && <div className="px-4 pt-4 pb-1 text-[12px] text-[#64748b]">{t("onFile")}</div>}
          {hits.map(x => <button key={x.id} onClick={() => go(`/car/${x.id}`)} className="w-full flex items-center gap-3 px-4 h-[60px] border-b border-[#f1f5f9] text-left"><span className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center text-[18px]">{AV[x.id] || "🚗"}</span><span><b className="text-[15px] block">{x.plate}</b><span className="text-[13px] text-[#64748b]">{x.model}{x.owner ? ` · ${x.owner}` : ""}</span></span></button>)}
          {q && <Link onClick={() => go("/new/brand")}>{t("notHere", { p: draft.plate })}</Link>}</Body>
          <Bar><button disabled={q.length < 4} className={BTN} onClick={() => go("/new/brand")}>{t("next")}</button></Bar></>;
      }
      if (b === "brand") return <>{T1()}<Body><Q q={t("brand")} s={draft.plate} /><div className="grid grid-cols-2 gap-2 px-4">{[...Object.keys(BRANDS), t("other")].map(x =>
        <Ch key={x} center on={draft.brand === x} onClick={() => { setDraft({ ...draft, brand: x, model: draft.brand === x ? draft.model : "" }); go("/new/model"); }}>{x}</Ch>)}</div></Body></>;
      if (b === "model") {
        const models = BRANDS[draft.brand];
        return <>{T1()}<Body><Q q={t("modelYear")} s={`${draft.brand} · ${draft.plate}`} />
          <div className="px-4 pb-1 text-[12px] text-[#64748b]">{t("model")}</div>
          {models ? <div className="grid grid-cols-2 gap-2 px-4">{models.map(m => <Ch key={m} center on={draft.model === m} onClick={() => setDraft({ ...draft, model: m })}>{m}</Ch>)}</div>
            : <Input value={draft.model} placeholder="e.g. Peugeot 406" onChange={e => setDraft({ ...draft, model: e.target.value })} />}
          <div className="px-4 pt-4 pb-1 text-[12px] text-[#64748b]">{t("year")}</div>
          <div className="grid grid-cols-4 gap-2 px-4">{[...YEARS, "Other year"].map(y => <div key={y} className={y === "Other year" ? "col-span-2" : ""}><Ch center on={draft.year === y} onClick={() => setDraft({ ...draft, year: y })}><span className="w-full text-center">{y}</span></Ch></div>)}</div>
          <div className="h-4" /></Body><Bar><button disabled={!draft.model || !draft.year} className={BTN} onClick={() => go("/new/problems")}>{t("next")}</button></Bar></>;
      }
      if (b === "problems") return <>{T1()}<Body><Q q={t("found")} s={t("tapAll")} /><ProblemGrid t={t} sel={draft.probs} toggle={p => setDraft({ ...draft, probs: draft.probs.includes(p) ? draft.probs.filter(x => x !== p) : [...draft.probs, p] })} /><div className="h-4" /></Body>
        <Bar><button disabled={!draft.probs.length} className={BTN} onClick={() => go("/new/quick/0")}>{t("picked", { n: draft.probs.length })}</button></Bar></>;
      if (b === "quick") { const i = +c; return <QuickScreen t={t} title={t("newCar")} items={draft.probs} idx={i} onBack={back} onPick={u => { setDraft({ ...draft, urg: { ...draft.urg, [draft.probs[i]]: u } }); go(i + 1 < draft.probs.length ? `/new/quick/${i + 1}` : "/new/owner"); }} />; }
      if (b === "owner") return <>{T1()}<Body><Q q={t("owner")} s={t("bothOpt")} />
        <div className="px-4 pb-1 pt-2 text-[12px] text-[#64748b]">{t("name")}</div><Input value={draft.owner} placeholder="Chidi" onChange={e => setDraft({ ...draft, owner: e.target.value })} />
        <div className="px-4 pb-1 pt-4 text-[12px] text-[#64748b]">{t("wa")}</div><Input inputMode="tel" value={draft.phone} placeholder="0803 123 4567" onChange={e => setDraft({ ...draft, phone: e.target.value })} /></Body>
        <Bar><Link onClick={() => { setDraft({ ...draft, owner: "", phone: "" }); go("/new/review"); }}>{t("skip")}</Link><button className={BTN} onClick={() => go("/new/review")}>{t("next")}</button></Bar></>;
      if (b === "review") {
        const Row = ({ k, v, r }: { k: string; v: ReactNode; r?: ReactNode }) => <div className="flex items-center gap-4 min-h-[52px] px-4 border-b border-[#f1f5f9]"><span className="w-12 text-[12px] text-[#64748b]">{k}</span><span className="flex-1 text-[15px]">{v}</span>{r}</div>;
        const save = () => {
          const id = "c" + Date.now();
          const nc: Car = { id, plate: draft.plate.trim(), model: draft.brand === t("other") ? draft.model : `${draft.brand} ${draft.model}`, year: draft.year, owner: draft.owner || undefined, phone: draft.phone || undefined, time: "Now", problems: draft.probs.map((p, i) => ({ id: id + i, name: p, urg: draft.urg[p] || "soon", day: "Today" })) };
          up(d => ({ ...d, cars: [nc, ...d.cars] })); setDraft(emptyDraft()); location.replace(`#/car/${id}`); flash(t("addedTo", { p: nc.plate }));
        };
        return <><Top title={t("checkSave")} onBack={back} /><Body>
          <Row k="Plate" v={<b className="text-[16px]">{draft.plate}</b>} r={<button className="text-[14px] text-[#2563eb] min-h-[48px]" onClick={() => go("/new/plate")}>{t("change")}</button>} />
          <Row k={t("car")} v={`${draft.brand === t("other") ? "" : draft.brand + " "}${draft.model} ${draft.year}`} />
          <div className="px-4 pt-3 text-[12px] text-[#64748b]">{t("problems")}</div>
          {draft.probs.map(p => <div key={p} className="flex items-center min-h-[48px] px-4 border-b border-[#f1f5f9] text-[15px]">{p}<span className="ml-auto"><Tag u={draft.urg[p] || "soon"} t={t} /></span></div>)}
          <Row k={t("owner")} v={draft.owner || draft.phone ? [draft.owner, draft.phone].filter(Boolean).join(" · ") : "—"} /></Body>
          <Bar><button className={BTN} onClick={save}>{t("save")}</button></Bar></>;
      }
    }
    /* ----- Flow 2: add problem ----- */
    /* ----- Flow 2: add problem ----- */
    if (a === "add" && car(b)) {
      const x = car(b)!;
      if (c === "problems") {
        return (
          <Page n="" title={t("addProblem")} onBack={back}>
            <div className="text-[14px] text-[#64748b] -mt-2 mb-4">{x.plate} · {x.model}</div>
            {PROBLEMS.map(p => (
              <Chip
                key={p}
                on={draft.probs.includes(p)}
                onClick={() =>
                  setDraft({
                    ...draft,
                    probs: draft.probs.includes(p)
                      ? draft.probs.filter(y => y !== p)
                      : [...draft.probs, p],
                  })
                }
              >
                {p}
              </Chip>
            ))}
            <Btn
              disabled={!draft.probs.length}
              onClick={() => go(`/add/${b}/quick/0`)}
            >
              {t("picked", { n: draft.probs.length })}
            </Btn>
          </Page>
        );
      }
      if (c === "quick") {
        const i = +d;
        return (
          <QuickScreen
            t={t}
            title={t("addProblem")}
            sub={`${x.plate} · ${x.model}`}
            items={draft.probs}
            idx={i}
            onBack={back}
            onPick={u => {
              setDraft({ ...draft, urg: { ...draft.urg, [draft.probs[i]]: u } });
              go(i + 1 < draft.probs.length ? `/add/${b}/quick/${i + 1}` : `/add/${b}/check`);
            }}
          />
        );
      }
      if (c === "check") {
        const row = "flex justify-between items-center border-b border-[#e2e8f0] py-[10px] text-[15px]";
        return (
          <Page n="" title={t("checkSave")} onBack={back}>
            <div className="text-[14px] text-[#64748b] -mt-2 mb-4">Adding to {x.plate} · {x.model}</div>
            {draft.probs.map(p => (
              <div key={p} className={row}>
                <span>{p}</span>
                <UrgTag u={draft.urg[p] || "soon"} />
              </div>
            ))}
            <Btn
              onClick={() => {
                const ids = draft.probs.map((p, i) => `${b}-n${Date.now()}${i}`);
                const added: Problem[] = draft.probs.map((p, i) => ({
                  id: ids[i],
                  name: p,
                  urg: draft.urg[p] || "soon",
                  day: "Today",
                }));
                up(dd => {
                  dd.cars.find(y => y.id === b)!.problems.unshift(...added);
                  return dd;
                });
                setDraft(emptyDraft());
                history.go(-(draft.probs.length + 2));
                flash(t("addedTo", { p: x.plate }), () =>
                  up(dd => {
                    const y = dd.cars.find(z => z.id === b)!;
                    y.problems = y.problems.filter(q => !ids.includes(q.id));
                    return dd;
                  })
                );
              }}
            >
              {t("save")}
            </Btn>
          </Page>
        );
      }
    }
    /* ----- Trinity Pillar 1: Car Health Record (Mechanic & Owner views) ----- */
    if (a === "car" && car(b)) {
      return <CarHealthRecord db={db} carId={b} mode="mechanic" go={go} back={back} up={up} flash={flash} t={t} />;
    }
    if (a === "c" && car(b)) {
      return <CarHealthRecord db={db} carId={b} mode="owner" go={go} back={back} up={up} flash={flash} t={t} />;
    }
    /* ----- Trinity Pillar 2: Fast 1-Screen Slot Booking (M8) ----- */
    if (a === "fastbook") {
      return <FastBook db={db} carId={b} t={t} up={up} go={go} back={back} flash={flash} />;
    }
    /* ----- Flow 3b: book a car (one-screen fast slot booking) ----- */
    if (a === "book" && car(b)) {
      return <FastBook db={db} carId={b} t={t} up={up} go={go} back={back} flash={flash} />;
    }
    /* ----- Flow 3: booking detail ----- */
    if (a === "booking") {
      const B = db.bookings.find(z => z.id === b); const x = B && car(B.carId);
      if (B && x) return <><Top title={t("booking")} onBack={back} /><Body>
        <div className="m-4 p-4 bg-[#f8fafc] rounded-[14px] text-[15px] leading-relaxed"><b className="text-[17px]">{t(B.day)}, {B.time}</b><br />{x.plate} · {x.model}<br />{x.owner && <>{t("owner")}: {x.owner} · {x.phone}<br /></>}<Status s={B.status} t={t} /></div>
        <div className="px-4 text-[13px] text-[#64748b]">{t("problems")}</div>
        {x.problems.filter(p => !p.done).map(p => <div key={p.id} className="flex items-center h-[52px] px-4 border-b border-[#f1f5f9] text-[16px]">{p.name}<span className="ml-auto"><Tag u={p.urg} t={t} /></span></div>)}</Body>
        <div className="shrink-0 p-3 border-t border-[#e5e7eb] space-y-2"><button className={BTN} onClick={() => remind([x.id])}>{t("remind")}</button>
          <button className={theme.ghost} onClick={() => { setBk({ day: "", time: "" }); up(dd => ({ ...dd, bookings: dd.bookings.filter(z => z.id !== b) })); location.replace(`#/book/${x.id}/day`); }}>{t("resched")}</button>
          <button className="h-12 w-full text-[14px] text-[#64748b]" onClick={() => { const old = db.bookings; up(dd => ({ ...dd, bookings: dd.bookings.filter(z => z.id !== b) })); back(); flash(t("cancelled"), () => up(dd => ({ ...dd, bookings: old }))); }}>{t("cancel")}</button></div></>;
    }
    /* ----- Flow 4: wallet ----- */
    if (a === "wallet") {
      const fee = db.code === CODE ? 200 : db.fee; const n = (v: number) => v.toLocaleString("en-NG");
      if (!b) return <><Top title={t("wallet")} onBack={back} /><Body><div className="px-4 pt-4 text-[13px] text-[#64748b]">{t("balance")}</div><div className="px-4 text-[34px] font-bold text-[#1e3a8a]">₦{n(db.balance)}</div>
        <div className="px-4 text-[13px] text-[#64748b]">{t("freeStart")}<br />{t("feeLine", { f: fee })}</div><div className="px-4 pt-4 pb-1 text-[12px] text-[#64748b]">{t("recent")}</div>
        {db.tx.map((x, i) => <div key={i} className="flex items-center px-4 h-[52px] border-b border-[#f1f5f9]"><div><div className="text-[15px]">{x.label}</div><div className="text-[12px] text-[#64748b]">{x.when}</div></div><span className={`ml-auto text-[13px] ${x.amt > 0 ? "text-[#16a34a]" : ""}`}>{x.amt > 0 ? "+" : "−"}₦{n(Math.abs(x.amt))}</span></div>)}</Body>
        <Bar><button className={BTN} onClick={() => go("/wallet/topup")}>{t("topUp")}</button></Bar></>;
      if (b === "topup") return <><Top title={t("topUp")} onBack={back} /><Body><Q q={t("howMuch")} s={`${t("balance")} ₦${n(db.balance)}`} /><div className="px-4 space-y-2">{[2000, 5000, 10000].map(v => <Ch key={v} on={top.amt === v} right={t("bk", { n: Math.floor(v / fee) })} onClick={() => setTop({ ...top, amt: v })}>₦{n(v)}</Ch>)}</div>
        <Link onClick={() => go("/wallet/code")}>{t("haveCode")}</Link></Body><Bar><button className={BTN} onClick={() => go("/wallet/pay")}>{t("next")} · ₦{n(top.amt)}</button></Bar></>;
      if (b === "code") { const ok = top.code.trim().toUpperCase() === CODE; return <><Top title={t("topUp")} onBack={back} /><Body><Q q={t("haveCode")} /><Input autoFocus value={top.code} placeholder={CODE} onChange={e => setTop({ ...top, code: e.target.value.toUpperCase() })} />
        {top.code && <div className={`px-4 pt-2 text-[14px] font-medium ${ok ? "text-[#16a34a]" : "text-[#dc2626]"}`}>{ok ? "✓ " + t("codeOk") : t("codeBad")}</div>}
        {ok && <div className="m-4 p-4 bg-[#f8fafc] rounded-[14px]"><div className="text-[14px]">{t("perBooking")}</div><span className="line-through text-[#94a3b8] text-[14px]">₦500</span> <b className="text-[17px] text-[#16a34a]">₦200</b></div>}</Body>
        <Bar><button disabled={!ok} className={BTN} onClick={() => { up(d => ({ ...d, code: CODE })); back(); }}>{t("next")}</button></Bar></>; }
      if (b === "pay") return <><Top title="Pay" onBack={back} /><Body><Q q={t("payHow")} s={`₦${n(top.amt)} top up`} /><div className="px-4 space-y-2"><Ch on={top.how === "bank"} right={t("instant")} onClick={() => setTop({ ...top, how: "bank" })}>🏦 {t("bank")}</Ch><Ch on={top.how === "card"} onClick={() => setTop({ ...top, how: "card" })}>💳 {t("card")}</Ch></div></Body>
        <Bar><button className={BTN} onClick={() => { up(d => ({ ...d, balance: d.balance + top.amt, tx: [{ label: t("topUp"), when: "Today", amt: top.amt }, ...d.tx] })); location.replace("#/wallet/done"); }}>{t("pay", { a: n(top.amt) })}</button></Bar></>;
      if (b === "done") return <><Top title={t("wallet")} /><Body><div className="flex flex-col items-center pt-24"><div className="w-[60px] h-[60px] rounded-full bg-[#dcfce7] text-[#16a34a] text-[34px] flex items-center justify-center">✓</div><div className="pt-5 text-[18px] font-bold">{t("paid", { a: n(top.amt) })}</div><div className="text-[13px] text-[#64748b]">{t("newBal", { b: n(db.balance) })}</div></div></Body>
        <Bar><button className={BTN} onClick={() => history.go(-3)}>{t("done")}</button></Bar></>;
    }
    /* ----- Flow 7: owner side (demo) ----- */
    if (a === "o") {
      const x = db.cars.find(z => z.id === "c1") || db.cars[0]; if (!x) { setTimeout(() => go("/")); return null; }
      const open = x.problems.filter(p => !p.done); const days = [["Today", "Fri 16 Oct"], ["Tomorrow", "Sat 17 Oct"], ["Monday", "19 Oct"]];
      const WA = ({ children, input = true }: { children: ReactNode; input?: boolean }) => <><Label s="OWNER'S WHATSAPP" /><div className="h-14 shrink-0 flex items-center gap-3 px-2 bg-[#f8fafc] border-b border-[#e5e7eb]"><button aria-label="Back" onClick={() => go("/")} className="w-12 h-12 flex items-center justify-center"><ChevronLeft size={24} strokeWidth={2} /></button><span className="w-9 h-9 rounded-full bg-[#dbeafe] flex items-center justify-center">🔧</span><b className="text-[16px]">{db.workshop}</b></div>
        <div className="flex-1 overflow-y-auto bg-[#efeae2] p-3 space-y-2">{children}</div>{input && <div className="p-2 bg-[#f8fafc]"><div className="h-11 rounded-full bg-white border border-[#e5e7eb] px-4 flex items-center text-[14px] text-[#94a3b8]">Message</div></div>}</>;
      const Msg = ({ me, time, children }: { me?: boolean; time: string; children: ReactNode }) => <div className={`max-w-[80%] rounded-[10px] px-3 py-2 text-[14px] leading-snug shadow-sm ${me ? "ml-auto bg-[#d9fdd3]" : "bg-white"}`}>{children}<div className="text-right text-[11px] text-[#94a3b8]">{time}</div></div>;
      const Br = ({ children }: { children: ReactNode }) => <><Label s="OWNER'S BROWSER" /><div className="px-3 py-1 bg-[#f8fafc]"><div className="h-8 rounded-full bg-[#eef2f7] px-3 flex items-center text-[13px] text-[#475569]">🔒 autobook.ng/b/x7k2</div></div>{children}</>;
      const sub = `${x.model} · ${open.map(p => p.name).join(", ")}`;
      const dayLbl = days.find(z => z[0] === ow.day)?.[1] || "";
      if (b === "wa") return <WA><Msg time="10:45">Hello {x.owner || "there"}, we checked your <b>{x.model} ({x.plate})</b>:<br />{open.map(p => <span key={p.id}>{p.urg === "now" ? "🔴" : p.urg === "soon" ? "🟠" : "🟢"} {p.name} – {t(URG[p.urg].k).toLowerCase()}<br /></span>)}<br />Reply <b>1</b> to book, <b>2</b> to call me</Msg>
        <Msg me time="10:52">1</Msg><Msg time="10:52">See your car health plan & book a fix:<br /><button className="text-[#2563eb] underline font-semibold min-h-[32px]" onClick={() => go("/c/" + x.id)}>autobook.ng/c/{x.plate.toLowerCase().replace(/\s/g, "")}</button></Msg></WA>;
      if (b === "day") return <Br><Body><Q q="Which day?" s={sub} /><div className="px-4 space-y-2">{[...days, ["Another day", ""]].map(([l, s]) => <Ch key={l} on={ow.day === l} right={s} onClick={() => { setOw({ ...ow, day: l }); go("/o/time"); }}>{l}</Ch>)}</div></Body></Br>;
      if (b === "time") return <Br><Body><Q q="What time?" s={dayLbl} /><div className="grid grid-cols-2 gap-2 px-4">{["9:00", "10:00", "11:00", "12:00", "2:00 pm", "3:00 pm"].map(z => <Ch key={z} on={ow.time === z} onClick={() => { setOw({ ...ow, time: z }); go("/o/details"); }}>{z}</Ch>)}</div></Body></Br>;
      if (b === "details") return <Br><Body><Q q="Your name and phone" s={`${dayLbl}, ${ow.time}`} /><div className="px-4 pb-1 text-[12px] text-[#64748b]">Name</div><Input value={ow.name} onChange={e => setOw({ ...ow, name: e.target.value })} />
        <div className="px-4 pb-1 pt-4 text-[12px] text-[#64748b]">Phone</div><Input inputMode="tel" value={ow.phone} onChange={e => setOw({ ...ow, phone: e.target.value })} /></Body>
        <Bar><button disabled={!ow.name || !ow.phone} className={BTN} onClick={() => go("/o/done")}>Book {dayLbl}, {ow.time}</button></Bar></Br>;
      if (b === "done") return <WA><Msg time="10:54">✅ Booked: {dayLbl}, {ow.time} at the workshop<br />{x.model} · {open.map(p => p.name).join(", ")}</Msg><Msg me time="10:55">Thank you 🙏</Msg>
        <button className="block mx-auto mt-6 text-[13px] text-[#2563eb] min-h-[48px]" onClick={() => go("/o/later")}>Show reminder later →</button></WA>;
      if (b === "later") return <WA><div className="text-center text-[12px] text-[#64748b]">2 weeks later</div><Msg time="09:00">Your {x.model} {(open[0]?.name || "car").toLowerCase()} still need{open[0] ? "" : "s"} fixing. Book: autobook.ng/b/x7k2</Msg></WA>;
    }
    /* ----- Tabs: Home / Jobs / Bookings (+ Cars due back list) ----- */
    if (a === "due") return <DueList db={db} t={t} remind={remind} />;
    const tab: Tab = a === "jobs" ? "jobs" : "home";
    if (tab === "jobs") return <JobsList db={db} f={jf} setF={setJf} go={go} openDrawer={() => setDrawer(true)} nav={<Nav t={t} tab={tab} go={go} onPlus={plus} />} />;
    return <><Tabs db={db} t={t} tab={tab} remind={remind} openDrawer={() => setDrawer(true)} /><Nav t={t} tab={tab} go={go} onPlus={plus} /></>;
  })();

  return <Frame>
    <ExitCtx.Provider value={isFlow(route) ? () => setAsk(true) : null}>{screen}</ExitCtx.Provider>
    {ask && <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center px-8" onClick={() => setAsk(false)}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} className="w-full max-w-[300px] rounded-2xl bg-white p-5 shadow-xl">
        <div className="text-[17px] font-bold text-[#0f172a] text-center">{t(seg[0] === "bk" ? "discardBk" : "discardJob")}</div>
        <div className="flex gap-2 mt-5"><button onClick={() => setAsk(false)} className="flex-1 h-12 rounded-xl bg-[#f1f5f9] font-semibold text-[15px]">{t("keepGoing")}</button>
          <button onClick={discard} className="flex-1 h-12 rounded-xl bg-[#dc2626] text-white font-semibold text-[15px]">{t("discard")}</button></div></div></div>}
    {toast && <div className="absolute left-3 right-3 bottom-20 z-30 h-12 rounded-[10px] bg-[#1f2937] text-white flex items-center px-4 text-[14px]">{toast.msg}{toast.undo && <button className="ml-auto text-[#93c5fd] font-medium min-h-[48px] px-2" onClick={() => { toast.undo!(); setToast(null); }}>{t("undo")}</button>}</div>}
    {drawer && <Drawer db={db} t={t} close={() => setDrawer(false)} up={up} />}
  </Frame>;
}

const Label = ({ s }: { s: string }) => <div className="h-5 shrink-0 bg-[#374151] text-white text-[10px] tracking-wider flex items-center justify-center">{s}</div>;
const Status = ({ s, t }: { s: "ok" | "wait"; t: T }) => <span className={`inline-block text-[12px] px-2 rounded-full ${s === "ok" ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fef3c7] text-[#92400e]"}`}>{s === "ok" ? t("confirmed") : t("waiting")}</span>;

function Frame({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh flex justify-center"><div style={{ fontFamily: theme.listFont }} className="relative w-full max-w-[480px] h-dvh bg-white flex flex-col overflow-hidden text-[#0f172a] select-none">{children}</div></div>;
}

const ini = (plate: string) => plate.slice(0, 2);
const Chev = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round"><path d="m9 18 6-6-6-6" /></svg>;
const WaIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z" /></svg>;
function DueRow({ db, d, right }: { db: DB; d: DB["due"][number]; right: ReactNode }) {
  const c = db.cars.find(x => x.id === d.carId); if (!c) return null;
  return <div className="flex items-center gap-3.5 mx-6 h-16 border-b border-[#f1f5f9] last:border-0">
    <button onClick={() => go(`/car/${c.id}`)} className="flex-1 min-w-0 flex items-center gap-3.5 h-full text-left"><span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>{ini(c.plate)}</span>
      <span className="min-w-0"><b className="block text-[15px] font-semibold">{c.plate}</b><span className="block text-[13px] text-[#64748b] truncate mt-0.5">{d.reason} · {c.model.split(" ").slice(1).join(" ") || c.model}</span></span></button>{right}</div>;
}
function Tabs({ db, t, tab, remind, openDrawer }: { db: DB; t: T; tab: Tab; remind: (ids: string[]) => void; openDrawer: () => void }) {
  const Head = ({ title }: { title?: string }) => title
    ? <div className={`${theme.header} shrink-0 h-14 flex items-center pl-4`}><span className="text-[20px] font-semibold flex-1">{title}</span><button aria-label={t("search")} className="w-12 h-12 text-[18px]">🔍</button><button aria-label="Menu" onClick={openDrawer} className="w-12 h-12 text-[22px]">⋮</button></div>
    : <div className="shrink-0 bg-white h-[60px] flex items-center px-6 pt-2"><button aria-label="Menu" onClick={openDrawer} className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold bg-[#eaf0fe] text-[#1e3a8a]">{db.workshop.split(" ").map(w => w[0]).slice(0, 2).join("")}</button></div>;
  if (tab === "home") {
    const week = db.due.filter(d => d.week === "this"); const left = week.filter(d => !d.sent);
    return <div style={{ fontFamily: theme.homeFont }} className="flex-1 flex flex-col min-h-0"><Head /><Body><div className="px-6 pt-4"><div className="text-[13px] text-[#64748b] font-medium">{t("dueWeek")}</div><div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2.5 mb-2">{week.length}</div><div className="text-[15px] text-[#64748b]">{t("fillWeek")}</div>
      <button disabled={!left.length} onClick={() => remind(left.map(d => d.carId))} className={theme.btn + " mt-5 flex items-center justify-center gap-2"}><WaIcon />{left.length ? t("remindAll") : t("allSent")}</button></div>
      <div className="flex gap-3 px-6 pt-6">{[[db.bookings.length, t("bookedTT"), "/bookings"], [db.cameBack, t("cameBack"), "/jobs"]].map(([n, l, to]) => <button key={String(l)} onClick={() => go(String(to))} className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}><b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">{n}</b>{l}</button>)}</div>
      <div className="flex justify-between items-baseline px-6 pt-6"><h3 className="text-[17px] font-bold">{t("upNext")}</h3><button onClick={() => go("/due")} className="text-[13px] text-[#2563eb] font-semibold min-h-[48px]">{t("seeAll")}</button></div>
      {week.slice(0, 3).map(d => <DueRow key={d.carId} db={db} d={d} right={<Chev />} />)}</Body></div>;
  }
  if (tab === "jobs") return <><Head title="Auto Book" /><Body>{db.cars.length === 0 ? <div className="flex flex-col items-center text-center pt-20 px-8"><div className="text-[44px]">🔧</div><div className="text-[18px] font-bold pt-2">{t("noCars")}</div><div className="text-[14px] text-[#64748b] pt-1">{t("noCarsSub")}</div><div className="pt-10 text-[26px] text-[#2563eb] animate-bounce">↓</div></div>
      : db.cars.filter(c => c.problems.some(p => !p.done) || c.time !== "Sep" || c.visits?.length).map(c => { const o = c.problems.filter(p => !p.done); const u = o.some(p => p.urg === "now") ? "#dc2626" : o.some(p => p.urg === "soon") ? "#f59e0b" : "#16a34a"; return <button key={c.id} onClick={() => go(`/car/${c.id}`)} className="w-full flex items-center gap-3 h-[72px] px-4 border-b border-[#f1f5f9] text-left active:bg-[#f8fafc]">
        <span className={`w-11 h-11 rounded-full flex items-center justify-center text-[20px] shrink-0 ${theme.av}`}>{AV[c.id] || "🚗"}</span>
        <span className="flex-1 min-w-0"><b className="text-[16px] font-semibold block">{c.plate}</b><span className="block text-[14px] text-[#64748b] truncate">{c.model} · {(c.visits?.[0]?.items.map(i => i.name) || (o.length ? o : c.problems).map(p => p.name)).join(", ") || "—"}</span></span>
        <span className="text-right text-[12px] text-[#64748b]">{c.time}<br /><span className="inline-block w-2.5 h-2.5 rounded-full mt-1.5" style={{ background: o.length ? u : "#cbd5e1" }} /></span></button>; })}</Body></>;
  return <><Head title={t("bookings")} /><Body>{(["today", "tomorrow"] as const).map(d => { const list = db.bookings.filter(b => b.day === d); return <div key={d}><div className="px-4 pt-3 pb-1 text-[13px] text-[#64748b]">{t(d)} · {d === "today" ? "Fri 16 Oct" : "Sat 17 Oct"}</div>
      {list.length === 0 && <div className="px-4 py-3 text-[14px] text-[#94a3b8]">—</div>}
      {list.map(b => { const c = db.cars.find(x => x.id === b.carId); if (!c) return null; const n = c.problems.filter(p => !p.done).length; return <button key={b.id} onClick={() => go(`/booking/${b.id}`)} className="w-full flex items-center gap-4 h-[72px] px-4 border-b border-[#f1f5f9] text-left">
        <b className="w-12 text-[16px]">{b.time}</b><span className="flex-1"><b className="block text-[16px] font-semibold">{c.plate}</b><span className="text-[14px] text-[#64748b]">{c.model}</span></span>
        <span className="text-right"><Status s={b.status} t={t} /><br /><span className="text-[12px] text-[#64748b]">{n} problem{n === 1 ? "" : "s"}</span></span></button>; })}</div>; })}</Body></>;
}
function DueList({ db, t, remind }: { db: DB; t: T; remind: (ids: string[]) => void }) {
  const [w, setW] = useState<"this" | "next">("this");
  const list = db.due.filter(d => d.week === w); const left = list.filter(d => !d.sent);
  return <div style={{ fontFamily: theme.homeFont }} className="flex-1 flex flex-col min-h-0"><div className="h-[60px] shrink-0 flex items-center px-3 pt-2"><button aria-label="Back" onClick={back} className="w-12 h-12 text-[22px] flex items-center justify-center"><ChevronLeft size={24} strokeWidth={2} /></button></div>
    <div className={`${theme.title} px-6 pt-1`}>{t("dueBack")}</div><div className="px-6 text-[15px] text-[#64748b]">{t(w === "this" ? "nThis" : "nNext", { n: list.length })}</div>
    <div className="flex bg-[#f4f6fa] rounded-xl p-1 mx-6 mt-4 mb-2">{(["this", "next"] as const).map(k => <button key={k} onClick={() => setW(k)} className={`flex-1 h-10 rounded-[9px] text-[13px] font-semibold ${w === k ? "bg-white text-[#0f172a] shadow-[0_1px_3px_#0f172a1a]" : "text-[#64748b]"}`}>{t(k === "this" ? "thisWeek" : "nextWeek")}</button>)}</div>
    <Body>{list.map(d => <DueRow key={d.carId} db={db} d={d} right={<button disabled={d.sent} onClick={() => remind([d.carId])} className={`shrink-0 h-12 px-4 text-[13px] font-semibold ${d.sent ? "text-[#16a34a]" : "text-[#2563eb]"}`}><span className={`inline-block rounded-2xl px-3.5 py-1.5 ${d.sent ? "" : "border-[1.5px] border-[#c7d7fb]"}`}>{d.sent ? t("sentBtn") : t("remindBtn")}</span></button>} />)}<div className="h-4" /></Body>
    <div className="shrink-0 px-6 pt-3 pb-5"><button disabled={!left.length} onClick={() => remind(left.map(d => d.carId))} className={theme.btn + " flex items-center justify-center gap-2"}><WaIcon />{left.length ? t("remindAllN", { n: left.length }) : t("allSent")}</button></div></div>;
}

function Drawer({ db, t, close, up }: { db: DB; t: T; close: () => void; up: (f: (d: DB) => DB) => void }) {
  const R = ({ icon, label, right, onClick, red }: { icon: string; label: string; right?: ReactNode; onClick?: () => void; red?: boolean }) =>
    <div role="button" onClick={onClick} className="flex items-center gap-4 h-14 px-4 border-b border-[#f1f5f9] text-[16px]"><span className="w-6">{icon}</span><span className={red ? "text-[#dc2626]" : ""}>{label}</span><span className="ml-auto">{right}</span></div>;
  const nav = (p: string) => { close(); go(p); };
  const lp = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  return <div className="absolute inset-0 z-40 flex"><div className="w-[80%] bg-white h-full flex flex-col shadow-xl">
    <div className={`${theme.header} px-4 pt-8 pb-4`}>
      {/* Host tools (for timed test visits): long-press the workshop name for 2s to toggle. Hidden from testers. */}
      <div className="text-[18px] font-bold select-none" onContextMenu={e => e.preventDefault()}
        onPointerDown={() => { lp.current = setTimeout(() => { up(d => ({ ...d, hostTools: !d.hostTools })); }, 2000); }}
        onPointerUp={() => clearTimeout(lp.current)} onPointerLeave={() => clearTimeout(lp.current)} onPointerCancel={() => clearTimeout(lp.current)}>{db.workshop}</div>
      <div className={`text-[13px] ${theme.headerSub}`}>{db.phone}</div><div className={`text-[13px] ${theme.headerSub}`}>Felicia Davis · Manager</div></div>
    {db.hostTools && <><div className="px-4 pt-3 pb-1 text-[11px] font-semibold tracking-[0.08em] text-[#64748b]">HOST TOOLS</div><R icon="📱" label={t("ownerView")} onClick={() => nav("/o/wa")} /><R icon="♻️" label={t("reset")} onClick={() => { localStorage.removeItem(KEY); location.hash = "/"; location.reload(); }} /></>}
    <R icon="🌐" label={t("language")} right={<span className="flex rounded-[10px] border border-[#cbd5e1] overflow-hidden text-[14px]">{(["en", "pcm"] as const).map(l => <button key={l} onClick={() => up(d => ({ ...d, lang: l }))} className={`h-10 px-3 ${db.lang === l ? "bg-[#2563eb] text-white" : ""}`}>{l === "en" ? "English" : "Pidgin"}</button>)}</span>} />
    <R icon="💰" label={t("wallet")} onClick={() => nav("/wallet")} right={<span className="text-[14px] text-[#64748b]">₦{db.balance.toLocaleString("en-NG")}</span>} />
    <R icon="↪" label={t("logout")} red onClick={() => { up(d => ({ ...d, signedUp: false })); nav("/signup/phone"); }} />
  </div><div className="flex-1 bg-black/45" onClick={close} /></div>;
}
