"use client";
// AB-28 / PROP-006: Trinity Pillar 1 — Car Health Record (O2 Owner View & M5 Mechanic Job Card)
// Strictly follows Grok Bot design language: pure white canvas, <Page> padding, flat rows, <UrgTag>, <Btn>.
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { type DB, type Car, type Problem, type Urg, TODAY } from "@/lib/data";
import { Page, Chip, Btn, K, UrgTag, ExitX, naira } from "@/components/log";
import { fmt, allJobs } from "@/components/jobs";
import type { T } from "@/lib/copy";

export const openProblems = (c: Car): Problem[] => c.problems.filter(p => !p.done);

export const waCarLink = (phone: string, msg: string) =>
  `https://wa.me/${phone.replace(/\D/g, "").replace(/^0/, "234")}?text=${encodeURIComponent(msg)}`;

export function CarHealthRecord({
  db,
  carId,
  mode = "mechanic",
  go,
  back,
  up,
  flash,
  t,
}: {
  db: DB;
  carId: string;
  mode?: "mechanic" | "owner";
  go: (p: string) => void;
  back: () => void;
  up: (f: (d: DB) => DB) => void;
  flash: (m: string) => void;
  t: T;
}) {
  const [showHistory, setShowHistory] = useState(false);
  const car = db.cars.find(c => c.id === carId);

  if (!car) {
    return (
      <div className="p-6 text-center text-[#64748b]">
        Car not found.{" "}
        <button className="text-[#2563eb]" onClick={back}>
          Back
        </button>
      </div>
    );
  }

  const open = car.problems.filter(p => !p.done);
  const done = car.problems.filter(p => p.done);

  const fixNow = open.filter(p => p.urg === "now");
  const fixSoon = open.filter(p => p.urg === "soon");
  const canWait = open.filter(p => p.urg === "wait");

  const toggleProblem = (pid: string) => {
    up(d => {
      const c = d.cars.find(x => x.id === carId);
      if (c) {
        const pr = c.problems.find(x => x.id === pid);
        if (pr) pr.done = !pr.done;
      }
      return d;
    });
    flash("Updated car record");
  };

  const ownerName = car.owner || "Owner";
  const carTitle = `${car.model}${car.year ? " " + car.year : ""}`;
  const phone = car.phone || "";

  const buildWaSummary = () => {
    const lines = open.map(
      p =>
        `• ${p.name}: ${p.urg === "now" ? "Fix now (Critical)" : p.urg === "soon" ? "Fix soon" : "Can wait"}`
    );
    return `Hello ${ownerName},\nHere is your car health check from ${db.workshop}\n${carTitle} · ${car.plate}\n\n${lines.join(
      "\n"
    )}\n\nSee full record & book: autobook.ng/c/${car.id}\nThank you!`;
  };

  const row = "flex justify-between items-center border-b border-[#e2e8f0] py-[11px] text-[15px] min-h-12";
  const sm = "flex-1 h-12 rounded-2xl bg-[#f1f5f9] text-[#0f172a] font-semibold text-[15px] flex items-center justify-center";

  return (
    <div
      className="relative flex-1 min-h-0 bg-white px-[18px] pt-[22px] pb-[100px] overflow-y-auto flex flex-col"
      style={{ fontFamily: "Inter,Helvetica,Arial,sans-serif" }}
    >
      {/* Top Navigation */}
      <div className="flex items-center mb-[6px]">
        <button
          aria-label="Back"
          onClick={back}
          className="-ml-[14px] -my-[14px] w-12 h-12 text-[18px] text-[#0f172a] flex items-center justify-center"
        >
          <ChevronLeft size={24} strokeWidth={2} />
        </button>
        <span className="text-[13px] text-[#64748b] ml-1">
          {mode === "owner" ? "Car Health Plan" : "Car Record"}
        </span>
        <span className="ml-auto -mr-[14px] -my-[14px]">
          <ExitX />
        </span>
      </div>

      {/* Screen Title */}
      <h2 className="text-[21px] font-bold mt-1 mb-1 text-[#0f172a]">{car.plate}</h2>
      <div className="text-[14px] text-[#64748b] mb-4">
        {carTitle} {car.owner && `· ${car.owner}`} · {db.workshop}
      </div>

      {/* Group 1: Fix Now */}
      {fixNow.length > 0 && (
        <>
          <K>FIX NOW (CRITICAL)</K>
          {fixNow.map(p => (
            <div key={p.id} className={row}>
              <span className="font-semibold text-[#0f172a]">{p.name}</span>
              <div className="flex items-center gap-2">
                <UrgTag u="now" />
                {mode === "mechanic" && (
                  <button
                    onClick={() => toggleProblem(p.id)}
                    className="text-[13px] text-[#2563eb] font-semibold ml-2 min-h-[36px]"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Group 2: Fix Soon */}
      {fixSoon.length > 0 && (
        <>
          <K>FIX SOON</K>
          {fixSoon.map(p => (
            <div key={p.id} className={row}>
              <span className="text-[#0f172a]">{p.name}</span>
              <div className="flex items-center gap-2">
                <UrgTag u="soon" />
                {mode === "mechanic" && (
                  <button
                    onClick={() => toggleProblem(p.id)}
                    className="text-[13px] text-[#2563eb] font-semibold ml-2 min-h-[36px]"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Group 3: Can Wait */}
      {canWait.length > 0 && (
        <>
          <K>CAN WAIT</K>
          {canWait.map(p => (
            <div key={p.id} className={row}>
              <span className="text-[#0f172a]">{p.name}</span>
              <div className="flex items-center gap-2">
                <UrgTag u="wait" />
                {mode === "mechanic" && (
                  <button
                    onClick={() => toggleProblem(p.id)}
                    className="text-[13px] text-[#2563eb] font-semibold ml-2 min-h-[36px]"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          ))}
        </>
      )}

      {/* Empty State */}
      {open.length === 0 && (
        <div className="text-[14px] text-[#64748b] py-6">
          All diagnosed issues are resolved. Car is in good health.
        </div>
      )}

      {/* Past Resolved Items Accordion */}
      {done.length > 0 && (
        <div className="pt-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-[13px] text-[#2563eb] font-semibold min-h-[36px]"
          >
            {showHistory ? "Hide resolved items" : `See past resolved items (${done.length}) ›`}
          </button>
          {showHistory && (
            <div className="mt-1">
              {done.map(p => (
                <div key={p.id} className={row}>
                  <span className="text-slate-400 line-through">{p.name}</span>
                  <span className="text-[12px] px-2 py-0.5 rounded-[10px] bg-[#f1f5f9] text-[#64748b]">
                    Resolved
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex-1 min-h-6" />

      {/* Action Buttons */}
      {mode === "owner" ? (
        <div className="space-y-2 mt-4">
          <button
            onClick={() => go(`/fastbook/${car.id}`)}
            className="w-full h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[17px] flex items-center justify-center active:scale-[0.98] transition-transform"
          >
            Book a fix
          </button>
          <button
            onClick={() => {
              if (db.phone) {
                window.open(
                  waCarLink(db.phone, `Hello ${db.workshop}, I have a question about my ${carTitle} (${car.plate})`),
                  "_blank"
                );
              }
            }}
            className="w-full h-12 rounded-2xl bg-[#f1f5f9] text-[#0f172a] font-semibold text-[15px] flex items-center justify-center"
          >
            Chat on WhatsApp
          </button>
        </div>
      ) : (
        <div className="space-y-2 mt-4">
          <button
            onClick={() => {
              if (phone) {
                window.open(waCarLink(phone, buildWaSummary()), "_blank");
                flash("WhatsApp message prepared");
              } else {
                flash("No owner phone number on file");
              }
            }}
            className="w-full h-14 rounded-2xl bg-[#2563eb] text-white font-bold text-[17px] flex items-center justify-center active:scale-[0.98] transition-transform"
          >
            Send to owner on WhatsApp
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => go(`/fastbook/${car.id}`)}
              className={sm}
            >
              Book a time
            </button>
            <button
              onClick={() => go(`/add/${car.id}/problems`)}
              className={sm}
            >
              + Add item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
