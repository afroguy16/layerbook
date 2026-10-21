"use client";
import React, { useState } from "react";
import { Page, Chip, Btn, K, UrgTag } from "@/components/primitives";
import { 
  type FarmDB, 
  type DailyLog, 
  COMMON_PENS, 
  FEED_PRESETS, 
  WATER_PRESETS, 
  TEMP_PRESETS 
} from "@/lib/farm-data";

export interface LogWizardDraft {
  pen: string;
  feedKg: number;
  feedBags: number;
  waterLiters: number;
  tempC: number;
  mortality: number;
  eggsCrates: number;
  droppingsColor: "normal" | "green_biliverdin" | "bloody_coccidiosis" | "yellow_viral" | "white_renal";
  auditorySnicking: boolean;
  notes: string;
}

const emptyDraft = (): LogWizardDraft => ({
  pen: "Pen 1 (Bovans Brown)",
  feedKg: 275,
  feedBags: 11,
  waterLiters: 600,
  tempC: 32,
  mortality: 2,
  eggsCrates: 66,
  droppingsColor: "normal",
  auditorySnicking: false,
  notes: ""
});

export function LogWizard({
  step,
  db,
  go,
  back,
  onComplete
}: {
  step: string;
  db: FarmDB;
  go: (path: string) => void;
  back: () => void;
  onComplete: (log: DailyLog) => void;
}) {
  const [draft, setDraft] = useState<LogWizardDraft>(emptyDraft());

  // Screen 1: Which Pen?
  if (step === "pen") {
    return (
      <Page title="Which pen?" onBack={back}>
        <div className="space-y-1">
          {COMMON_PENS.map(p => (
            <Chip 
              key={p} 
              on={draft.pen === p} 
              onClick={() => {
                setDraft({ ...draft, pen: p });
                go("/log/feed");
              }}
            >
              {p}
            </Chip>
          ))}
        </div>
      </Page>
    );
  }

  // Screen 2: Feed Given Today (Bags of 25kg)
  if (step === "feed") {
    return (
      <Page title="Feed given today" onBack={back}>
        <K>Select 25kg bags or tap custom kg</K>
        <div className="space-y-1">
          {FEED_PRESETS.map(f => (
            <Chip 
              key={f.bags} 
              on={draft.feedBags === f.bags} 
              right={`${f.kg} kg`}
              onClick={() => {
                setDraft({ ...draft, feedBags: f.bags, feedKg: f.kg });
                go("/log/water");
              }}
            >
              {f.bags} bags
            </Chip>
          ))}
        </div>
      </Page>
    );
  }

  // Screen 3: Water Consumed Today
  if (step === "water") {
    return (
      <Page title="Water consumed" onBack={back}>
        <K>Litres consumed across drinker lines</K>
        <div className="space-y-1">
          {WATER_PRESETS.map(w => (
            <Chip 
              key={w.val} 
              on={draft.waterLiters === w.val} 
              onClick={() => {
                setDraft({ ...draft, waterLiters: w.val });
                go("/log/temp");
              }}
            >
              {w.label}
            </Chip>
          ))}
        </div>
      </Page>
    );
  }

  // Screen 4: Peak Pen Temperature
  if (step === "temp") {
    return (
      <Page title="Peak afternoon temperature" onBack={back}>
        <K>Ambient pen temp at 2:00 PM</K>
        <div className="space-y-1">
          {TEMP_PRESETS.map(t => (
            <Chip 
              key={t.val} 
              on={draft.tempC === t.val} 
              onClick={() => {
                setDraft({ ...draft, tempC: t.val });
                go("/log/health");
              }}
            >
              {t.label}
            </Chip>
          ))}
        </div>
      </Page>
    );
  }

  // Screen 5: Health & Production Checks
  if (step === "health") {
    return (
      <Page title="Mortality & egg crates" onBack={back}>
        <K>Mortality today</K>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 5, 8].map(m => (
            <Chip 
              key={m} 
              on={draft.mortality === m} 
              onClick={() => setDraft({ ...draft, mortality: m })}
            >
              {m} birds
            </Chip>
          ))}
        </div>

        <K>Egg crates collected</K>
        <div className="flex flex-wrap gap-2">
          {[55, 60, 65, 68, 70, 75].map(e => (
            <Chip 
              key={e} 
              on={draft.eggsCrates === e} 
              onClick={() => setDraft({ ...draft, eggsCrates: e })}
            >
              {e} crates
            </Chip>
          ))}
        </div>

        <Btn onClick={() => go("/log/review")}>
          Next: Review & Save
        </Btn>
      </Page>
    );
  }

  // Screen 6: AutoBook Check and Save (One Screen Review)
  if (step === "review") {
    const computedRatio = Number((draft.waterLiters / (draft.feedKg || 1)).toFixed(2));
    const isCritical = computedRatio >= 3.8 || draft.tempC >= 36;
    const isAmber = computedRatio >= 2.6;

    return (
      <Page title="Check and save" onBack={back}>
        <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 mb-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold text-[16px] text-slate-800">{draft.pen}</span>
            <UrgTag u={isCritical ? "now" : isAmber ? "soon" : "wait"} />
          </div>

          <div className="pt-3 space-y-2 text-[14px]">
            <div className="flex justify-between">
              <span className="text-slate-500">Water:Feed Ratio</span>
              <b className={`text-[16px] ${isCritical ? "text-red-600 font-extrabold" : "text-slate-900"}`}>
                {computedRatio} : 1
              </b>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Feed Given</span>
              <span className="font-semibold text-slate-900">{draft.feedKg} kg ({draft.feedBags} bags)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Water Consumed</span>
              <span className="font-semibold text-slate-900">{draft.waterLiters} Litres</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Peak Temp</span>
              <span className="font-semibold text-slate-900">{draft.tempC}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Production</span>
              <span className="font-semibold text-slate-900">{draft.eggsCrates} crates · {draft.mortality} mort</span>
            </div>
          </div>
        </div>

        {isCritical && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-[13px] mb-4">
            <b>⚠️ 72-Hour Pre-Mortality Alert:</b> Water intake outstripping feed. High thermal / viral risk. Protocol will trigger upon saving.
          </div>
        )}

        <div className="space-y-2">
          <Btn 
            onClick={() => {
              const newLog: DailyLog = {
                id: `log-${Date.now()}`,
                penId: "pen-1",
                date: new Date().toISOString().slice(0, 10),
                time: "Just now",
                feedBags: draft.feedBags,
                feedKg: draft.feedKg,
                waterLiters: draft.waterLiters,
                ratio: computedRatio,
                peakTempC: draft.tempC,
                mortality: draft.mortality,
                eggsCrates: draft.eggsCrates,
                receiptSent: true
              };
              onComplete(newLog);
              go("/o/wa"); // AutoBook pattern: Send WhatsApp alert to owner
            }}
          >
            Save and Send WhatsApp Alert
          </Btn>
        </div>
      </Page>
    );
  }

  return null;
}
