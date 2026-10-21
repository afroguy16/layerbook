"use client";
import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { 
  Activity, 
  Layers, 
  Scale, 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2,
  DollarSign
} from "lucide-react";
import { theme } from "@/lib/theme";
import { SEED_FARM, type FarmDB, type DailyLog } from "@/lib/farm-data";
import { LogWizard } from "@/components/log-wizard";
import { OwnerProDashboard } from "@/components/owner-pro-dashboard";
import { NigerianOwnerDashboard } from "@/components/nigerian-owner-dashboard";
import { Flow3OwnerDashboard } from "@/components/flow3-owner-dashboard";
import { UrgTag, ExitCtx } from "@/components/primitives";

export default function LayerBookApp() {
  const [db, setDb] = useState<FarmDB>(SEED_FARM);
  const [route, setRoute] = useState<string>("/");
  const [showProtocol, setShowProtocol] = useState<boolean>(false);
  const [drawer, setDrawer] = useState<boolean>(false);

  const [version, setVersion] = useState<string>("1");

  // Hash & query routing mirroring AutoBook
  useEffect(() => {
    const syncRoute = () => {
      setRoute(location.hash.slice(1) || "/");
      const sp = new URLSearchParams(window.location.search);
      setVersion(sp.get("v") || "1");
    };
    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  const go = (p: string) => {
    location.hash = p;
  };
  const back = () => history.back();

  const latestLog = db.logs[db.logs.length - 1];
  const ratio = latestLog ? latestLog.ratio : 2.0;
  const isCritical = ratio >= 3.8 || (latestLog && latestLog.peakTempC >= 36);
  const isAmber = ratio >= 2.6;

  const handleNewLog = (log: DailyLog) => {
    setDb(prev => ({
      ...prev,
      logs: [...prev.logs, log]
    }));
  };

  // Active tab selection
  const currentTab = route === "/pens" ? "pens" : route === "/margin" ? "margin" : "radar";

  return (
    <div className="min-h-dvh flex justify-center bg-[#e5e7eb]">
      <div 
        style={{ fontFamily: theme.listFont }}
        className="relative w-full max-w-[480px] h-dvh bg-white flex flex-col overflow-hidden text-[#0f172a] select-none"
      >
        <ExitCtx.Provider value={route.startsWith("/log") ? () => go("/") : null}>
          
          {/* SCREEN ROUTING */}
          {(() => {
            // Flow 3: PRD Section 4.C Owner Verdict Dashboard (?v=4)
            if (version === "4") {
              return <Flow3OwnerDashboard go={go} />;
            }

            // Flow 0b: Nigerian Authentic Vocab Edition (?v=3)
            if (version === "3") {
              return <NigerianOwnerDashboard go={go} />;
            }

            // Flow 0: User 2 - Farm Owner Pro Dashboard (?v=2)
            if (version === "2") {
              return <OwnerProDashboard go={go} />;
            }

            // Flow 1: Multi-Step Log-a-Day Wizard (Attendant 15-Sec Flow)
            if (route.startsWith("/log/")) {
              const step = route.split("/")[2] || "pen";
              return (
                <LogWizard 
                  step={step} 
                  db={db} 
                  go={go} 
                  back={back} 
                  onComplete={handleNewLog} 
                />
              );
            }

            // Flow 2: Owner WhatsApp Alert Link Mock (/o/wa)
            if (route === "/o/wa") {
              return (
                <div className="flex-1 flex flex-col bg-[#efeae2]">
                  <div className="h-5 shrink-0 bg-[#374151] text-white text-[10px] tracking-wider flex items-center justify-center">
                    FARM OWNER'S WHATSAPP
                  </div>
                  <div className="h-14 shrink-0 flex items-center gap-3 px-3 bg-[#f8fafc] border-b border-[#e5e7eb]">
                    <button 
                      aria-label="Back" 
                      onClick={() => go("/")} 
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <span className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center text-sm">
                      🐓
                    </span>
                    <div>
                      <b className="text-[15px] block leading-tight">{db.farmName}</b>
                      <span className="text-[11px] text-slate-500">Attendant Evening Report</span>
                    </div>
                  </div>

                  <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                    <div className="max-w-[85%] rounded-2xl p-3 text-[13px] bg-white shadow-xs space-y-1.5">
                      <div className="font-bold text-red-600 flex items-center gap-1">
                        <AlertTriangle size={15} />
                        <span>Pre-Mortality Alert: Pen 1</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed">
                        Evening log for <b>Pen 1 (Bovans Brown)</b> recorded a water:feed spike of <b>{ratio} : 1</b> ({latestLog?.waterLiters}L water vs {latestLog?.feedKg}kg feed at {latestLog?.peakTempC}°C).
                      </p>
                      <p className="text-slate-700">
                        Status: <b className="text-red-600">CRITICAL RISK</b>. High danger of severe heat prostration and early viremia incubation before day-4 mortality.
                      </p>
                      <div className="pt-2 border-t border-slate-100">
                        <button 
                          onClick={() => {
                            setShowProtocol(true);
                          }} 
                          className="mt-1 text-blue-600 font-bold block"
                        >
                          layerbook.ng/pen-1/radar
                        </button>
                      </div>
                      <div className="text-right text-[10px] text-slate-400">17:42</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white border-t border-slate-200">
                    <button 
                      onClick={() => go("/")} 
                      className="w-full h-12 rounded-xl bg-blue-600 text-white font-bold text-[14px]"
                    >
                      Open Health Radar
                    </button>
                  </div>
                </div>
              );
            }

            // Flow 3: Tab 2 - Pens Roster View (/pens)
            if (route === "/pens") {
              return (
                <div className="flex-1 flex flex-col min-h-0 bg-white">
                  <div className="shrink-0 h-14 bg-white border-b border-[#f1f5f9] px-4 flex items-center justify-between">
                    <b className="text-[18px]">Farm Pens</b>
                    <button onClick={() => setDrawer(true)} className="w-10 h-10 flex items-center justify-center text-[20px]">
                      ⋮
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto divide-y divide-[#f1f5f9]">
                    {db.pens.map(p => (
                      <div key={p.id} className="p-4 flex items-center justify-between active:bg-slate-50">
                        <div>
                          <b className="text-[16px] text-slate-900 block">{p.name}</b>
                          <div className="text-[13px] text-slate-500 mt-0.5">
                            {p.flockSize.toLocaleString()} birds · {p.breed} · Wk {p.ageWeeks}
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1">
                            {p.housing} · Baseline {p.baselineFeedKg}kg / {p.baselineWaterL}L
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-slate-300" />
                      </div>
                    ))}
                  </div>

                  {/* Nav */}
                  <Nav go={go} tab={currentTab} />
                </div>
              );
            }

            // Flow 4: Tab 3 - Feed-to-Egg Margin Over Feed (/margin)
            if (route === "/margin") {
              const eggRevenue = (latestLog?.eggsCrates || 63) * 4500; // ₦4,500 per crate
              const feedCost = (latestLog?.feedKg || 242) * 650; // ₦650 per kg
              const marginOverFeed = eggRevenue - feedCost;

              return (
                <div className="flex-1 flex flex-col min-h-0 bg-white">
                  <div className="shrink-0 h-14 bg-white border-b border-[#f1f5f9] px-4 flex items-center justify-between">
                    <b className="text-[18px]">Daily Feed Margin</b>
                    <button onClick={() => setDrawer(true)} className="w-10 h-10 flex items-center justify-center text-[20px]">
                      ⋮
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="p-4 rounded-2xl bg-[#f4f6fa]">
                      <div className="text-[12px] font-semibold text-slate-500 uppercase">Margin Over Feed (Today)</div>
                      <div className="text-[38px] font-black text-emerald-600 mt-1 leading-none">
                        ₦{marginOverFeed.toLocaleString()}
                      </div>
                      <div className="text-[12px] text-slate-500 mt-1.5">
                        Egg Revenue minus Feed Cost (60–70% of Farm OPEX)
                      </div>
                    </div>

                    <div className="divide-y divide-[#f1f5f9] border-t border-b border-[#f1f5f9] py-1 text-[14px]">
                      <div className="flex justify-between py-2.5">
                        <span className="text-slate-500">Egg Revenue ({latestLog?.eggsCrates} crates @ ₦4,500)</span>
                        <b className="text-slate-900">₦{eggRevenue.toLocaleString()}</b>
                      </div>
                      <div className="flex justify-between py-2.5">
                        <span className="text-slate-500">Feed Cost ({latestLog?.feedKg}kg @ ₦650/kg)</span>
                        <b className="text-red-600">-₦{feedCost.toLocaleString()}</b>
                      </div>
                      <div className="flex justify-between py-2.5 font-bold">
                        <span>Net Daily Feed Margin</span>
                        <span className="text-emerald-600">₦{marginOverFeed.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[12px] leading-relaxed">
                      <b>Feed Conversion Health Warning:</b> Subclinical infections (viremia, mycotoxicosis) cause birds to eat without synthesizing eggs. Tracking daily ratio safeguards your ₦{marginOverFeed.toLocaleString()} daily margin.
                    </div>
                  </div>

                  {/* Nav */}
                  <Nav go={go} tab={currentTab} />
                </div>
              );
            }

            // Flow 5: Tab 1 - Main Home / Health Radar Tab (Default)
            return (
              <div className="flex-1 flex flex-col min-h-0 bg-white">
                
                {/* Header (Workshop Profile / Settings Drawer) */}
                <div className="shrink-0 h-14 bg-white border-b border-[#f1f5f9] px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button 
                      onClick={() => setDrawer(true)}
                      className="w-9 h-9 rounded-full bg-[#f4f6fa] text-[#1e3a8a] flex items-center justify-center font-bold text-xs"
                    >
                      {db.farmName.split(" ").map(w => w[0]).slice(0, 2).join("")}
                    </button>
                    <div>
                      <b className="text-[16px] block leading-tight">{db.farmName}</b>
                      <span className="text-[12px] text-[#64748b]">Pen 1 · Bovans Brown · Wk 32</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setDrawer(true)} 
                    aria-label="Farm settings"
                    className="w-10 h-10 flex items-center justify-center text-[22px] text-slate-700"
                  >
                    ⋮
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 pt-4 pb-24">
                  <div className="text-[13px] text-[#64748b] font-medium">Water-to-Feed Leading Indicator</div>
                  <div className="text-[54px] font-bold tracking-[-2px] leading-none mt-2 mb-1 text-[#0f172a]">
                    {ratio} <span className="text-[24px] font-semibold text-[#64748b] tracking-normal">: 1</span>
                  </div>
                  <div className="text-[14px] text-[#64748b]">
                    {isCritical 
                      ? "Critical surge (+102% over 2.0 baseline). Severe thermal / early viremia threat."
                      : "Flock within homeostatic parameters."}
                  </div>



                  {/* AutoBook Dual Summary Cards */}
                  <div className="flex gap-3 pt-6">
                    <div className="flex-1 rounded-2xl p-4 text-[13px] text-[#64748b] bg-[#f4f6fa]">
                      <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-tight mb-0.5">
                        {latestLog ? latestLog.feedKg : 242}kg
                      </b>
                      Feed (-15% Anorexic)
                    </div>
                    <div className="flex-1 rounded-2xl p-4 text-[13px] text-[#64748b] bg-[#f4f6fa]">
                      <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-tight mb-0.5">
                        {latestLog ? latestLog.waterLiters : 980}L
                      </b>
                      Water (~401ml/bird)
                    </div>
                  </div>

                  {/* Recent Logs List (AutoBook DueRow Parity) */}
                  <div className="flex justify-between items-baseline pt-6 mb-2">
                    <h3 className="text-[17px] font-bold text-[#0f172a]">Recent Pen Logs</h3>
                    <button onClick={() => go("/log/pen")} className="text-[13px] text-[#2563eb] font-semibold">
                      + Log pen
                    </button>
                  </div>

                  <div className="divide-y divide-[#f1f5f9]">
                    {db.logs.slice().reverse().map(l => {
                      const lRatio = l.ratio;
                      const isHigh = lRatio >= 3.5;
                      return (
                        <div key={l.id} className="flex items-center gap-3.5 h-16">
                          <span className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 bg-[#f4f6fa] text-[#1e3a8a]">
                            P1
                          </span>
                          <div className="flex-1 min-w-0">
                            <b className="block text-[15px] font-semibold text-[#0f172a]">
                              {l.date} ({l.time})
                            </b>
                            <span className="block text-[13px] text-[#64748b] truncate">
                              {l.feedKg}kg feed · {l.waterLiters}L water · {l.peakTempC}°C
                            </span>
                          </div>
                          <div className="text-right">
                            <b className={`block text-[15px] ${isHigh ? "text-[#dc2626]" : "text-[#0f172a]"}`}>
                              {lRatio} : 1
                            </b>
                            <span className="text-[11px] text-[#64748b]">
                              {l.eggsCrates} crates
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Nav */}
                <Nav go={go} tab={currentTab} />
              </div>
            );
          })()}

        </ExitCtx.Provider>

        {/* PROTOCOL MODAL */}
        {showProtocol && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center px-4" onClick={() => setShowProtocol(false)}>
            <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()} className="w-full max-w-[380px] rounded-3xl bg-white p-5 shadow-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="font-bold text-[16px] text-red-600 flex items-center gap-2">
                  <ShieldAlert size={18} />
                  <span>5-Point Emergency Protocol</span>
                </div>
                <button onClick={() => setShowProtocol(false)} className="text-slate-400 font-bold">✕</button>
              </div>

              <div className="space-y-2 text-[13px] text-slate-700">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-900 border border-red-100">
                  <b>1. Flush water lines below 25°C:</b> Overhead black tanks heat up; warm water triggers feed refusal.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-800">
                  <b>2. Withdraw feed 6h pre-peak:</b> Prevent digestion heat increment during hottest hours.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-800">
                  <b>3. Midnight feeding (12:00 – 1:30 AM):</b> Cool-hour intake restores the 10% feed deficit.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 text-slate-800">
                  <b>4. Add water-soluble electrolytes:</b> Prevents respiratory alkalosis from panting.
                </div>
              </div>

              <button 
                onClick={() => setShowProtocol(false)} 
                className="w-full h-12 rounded-xl bg-[#2563eb] text-white font-bold text-[14px]"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        )}

        {/* SETTINGS DRAWER (AutoBook Drawer Parity) */}
        {drawer && (
          <div className="absolute inset-0 z-50 flex">
            <div className="w-[80%] bg-white h-full flex flex-col shadow-2xl">
              <div className="px-5 pt-8 pb-4 border-b border-slate-100 bg-slate-50">
                <div className="text-[18px] font-bold text-slate-900">{db.farmName}</div>
                <div className="text-[13px] text-slate-500 mt-0.5">{db.phone}</div>
                <div className="text-[13px] text-slate-500">{db.managerName} · Farm Manager</div>
              </div>

              <div className="divide-y divide-slate-100 flex-1 overflow-y-auto text-[15px]">
                <div role="button" onClick={() => { setDrawer(false); go("/"); }} className="px-5 py-4 flex items-center gap-3">
                  <span>📊</span> <span>Health Radar</span>
                </div>
                <div role="button" onClick={() => { setDrawer(false); go("/pens"); }} className="px-5 py-4 flex items-center gap-3">
                  <span>🐓</span> <span>Pens Roster</span>
                </div>
                <div role="button" onClick={() => { setDrawer(false); go("/margin"); }} className="px-5 py-4 flex items-center gap-3">
                  <span>💰</span> <span>Feed-to-Egg Margin</span>
                </div>
                <div role="button" onClick={() => { setDrawer(false); go("/o/wa"); }} className="px-5 py-4 flex items-center gap-3">
                  <span>📱</span> <span>Owner WhatsApp Alert View</span>
                </div>
                <div role="button" onClick={() => { setDrawer(false); setShowProtocol(true); }} className="px-5 py-4 flex items-center gap-3">
                  <span>🛡️</span> <span>Emergency Protocols</span>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 text-[12px] text-slate-400">
                LayerBook v1.0 · Commercial Layer Companion
              </div>
            </div>
            <div className="flex-1 bg-black/40" onClick={() => setDrawer(false)} />
          </div>
        )}

      </div>
    </div>
  );
}

function Nav({ go, tab }: { go: (p: string) => void; tab: "radar" | "pens" | "margin" }) {
  return (
    <div className="shrink-0 h-[72px] bg-white border-t border-[#f1f5f9] flex items-start pt-2 px-3 z-10">
      <button 
        onClick={() => go("/")} 
        className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium transition-colors ${tab === "radar" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
      >
        <Activity size={22} strokeWidth={tab === "radar" ? 2.2 : 1.8} />
        <span>Radar</span>
      </button>

      <button 
        onClick={() => go("/pens")} 
        className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium transition-colors ${tab === "pens" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
      >
        <Layers size={22} strokeWidth={tab === "pens" ? 2.2 : 1.8} />
        <span>Pens</span>
      </button>

      {/* Central (+) FAB Button */}
      <div className="w-[72px] flex justify-center -mt-3">
        <button 
          aria-label="+ Log pen" 
          onClick={() => go("/log/pen")} 
          className={`w-[54px] h-[54px] rounded-full flex items-center justify-center border-4 border-white ${theme.fab} active:scale-95 transition-all`}
        >
          <Plus size={26} strokeWidth={2.6} />
        </button>
      </div>

      <button 
        onClick={() => go("/margin")} 
        className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium transition-colors ${tab === "margin" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
      >
        <Scale size={22} strokeWidth={tab === "margin" ? 2.2 : 1.8} />
        <span>Feed Margin</span>
      </button>
    </div>
  );
}
