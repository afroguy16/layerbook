"use client";
import React, { useState } from "react";
import { theme } from "@/lib/theme";

export function V7App() {
  const [drawer, setDrawer] = useState<boolean>(false);
  
  // Drill-down bottom sheet state
  const [activeSheet, setActiveSheet] = useState<"pen2" | "store" | "photo" | null>(null);

  // Baseline feed price (configured via drawer)
  const [feedPrice, setFeedPrice] = useState<number>(14500);
  const [priceInput, setPriceInput] = useState<string>("14500");

  // Core Math
  const totalCrates = 202;
  const grossEggSales = 1020900;
  const bagsFedToday = 31;
  const feedCostToday = bagsFedToday * feedPrice;
  const netFeedMargin = grossEggSales - feedCostToday;
  const feedCostPerCrate = Math.round(feedCostToday / totalCrates);

  const storeBalance = 92;
  const storeRunwayDays = (storeBalance / bagsFedToday).toFixed(1);

  return (
    <div className="min-h-dvh flex justify-center bg-[#e5e7eb] font-sans antialiased text-[#0f172a]">
      <div 
        style={{ fontFamily: theme.homeFont }}
        className="relative w-full max-w-[480px] h-dvh bg-white flex flex-col overflow-hidden select-none shadow-sm"
      >
        
        {/* ================= 1. AUTOBOOK HEADER ================= */}
        <div className="shrink-0 bg-white h-[60px] flex items-center justify-between px-6 pt-2 z-10">
          <button 
            aria-label="Menu" 
            onClick={() => setDrawer(true)} 
            className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold bg-[#eaf0fe] text-[#1e3a8a] active:scale-95 transition-transform"
          >
            AL
          </button>
          
          <button 
            aria-label="More" 
            onClick={() => setDrawer(true)} 
            className="w-10 h-10 flex items-center justify-center text-[22px] text-[#94a3b8] active:scale-95 transition-transform"
          >
            ⋮
          </button>
        </div>

        {/* ================= 2. AUTOBOOK MAIN DASHBOARD BODY ================= */}
        <div className="flex-1 overflow-y-auto">
          
          {/* THE CASH ANCHOR */}
          <div className="px-6 pt-4">
            <div className="text-[13px] text-[#64748b] font-medium">Net feed margin today</div>
            <div className="flex items-baseline gap-2 mt-2 mb-1.5">
              <div className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                ₦{(netFeedMargin / 1000).toFixed(0)}k
              </div>
              <div className="text-[17px] font-semibold text-[#64748b]">
                / {totalCrates} crates sold
              </div>
            </div>
            <div className="text-[15px] text-[#64748b]">
              Egg sales minus 31 bags feed @ ₦{(feedPrice / 1000).toFixed(1)}k
            </div>
          </div>

          {/* DUAL AUTOBOOK CARDS: UNIT COST & PEN 2 ANOMALY */}
          <div className="flex gap-3 px-6 pt-6">
            <div 
              onClick={() => setActiveSheet("pen2")}
              className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug cursor-pointer active:scale-[0.99] transition-transform ${theme.card}`}
            >
              <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">
                ₦{feedCostPerCrate.toLocaleString()}
              </b>
              feed cost per crate · 2.23 FCR
            </div>

            <div 
              onClick={() => setActiveSheet("pen2")}
              className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug cursor-pointer active:scale-[0.99] transition-transform ${theme.card}`}
            >
              <b className="block text-[24px] text-[#b91c1c] font-bold tracking-[-0.5px] mb-0.5">
                +1.4 bags
              </b>
              overfed in Pen 2 (₦20.3k leak)
            </div>
          </div>

          {/* LIVE FEED STORE COUNTDOWN STRIP */}
          <div 
            onClick={() => setActiveSheet("store")}
            className="mx-6 mt-3 px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex items-center justify-between text-[12.5px] cursor-pointer active:bg-slate-100 transition-colors"
          >
            <span className="text-slate-600 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Feed store: <b>{storeBalance} bags left</b>
            </span>
            <span className="text-slate-400 font-mono text-[12px]">{storeRunwayDays} days runway →</span>
          </div>

          {/* CRATES BY GRADE BREAKDOWN */}
          <div className="px-6 pt-6 pb-1">
            <h3 className="text-[17px] font-bold text-[#0f172a]">Crates by grade</h3>
          </div>

          <div className="pb-8">
            <div className="flex items-center gap-3.5 mx-6 h-16 border-b border-[#f1f5f9]">
              <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>
                LG
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-[15px] font-semibold text-[#0f172a]">Large · 82 crates</b>
                <span className="block text-[13px] text-[#64748b] truncate mt-0.5">₦5,200/crate · ₦426,400</span>
              </span>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center text-[13px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +6.2%
                </span>
                <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 mx-6 h-16 border-b border-[#f1f5f9]">
              <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>
                MD
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-[15px] font-semibold text-[#0f172a]">Medium · 65 crates</b>
                <span className="block text-[13px] text-[#64748b] truncate mt-0.5">₦5,000/crate · ₦325,000</span>
              </span>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center text-[13px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  -3.8%
                </span>
                <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 mx-6 h-16 border-b border-[#f1f5f9]">
              <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>
                PL
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-[15px] font-semibold text-[#0f172a]">Pullet · 35 crates</b>
                <span className="block text-[13px] text-[#64748b] truncate mt-0.5">₦4,500/crate · ₦157,500</span>
              </span>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center text-[13px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  -12.5%
                </span>
                <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 mx-6 h-16">
              <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>
                JB
              </span>
              <span className="min-w-0 flex-1">
                <b className="block text-[15px] font-semibold text-[#0f172a]">Jumbo · 20 crates</b>
                <span className="block text-[13px] text-[#64748b] truncate mt-0.5">₦5,600/crate · ₦112,000</span>
              </span>
              <div className="text-right shrink-0">
                <span className="inline-flex items-center text-[13px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +4.1%
                </span>
                <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
              </div>
            </div>
          </div>

        </div>

        {/* ================= 3. AUTOBOOK SLIDE-OUT MENU (DRAWER) ================= */}
        {drawer && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex justify-start"
            onClick={() => setDrawer(false)}
          >
            <div 
              className="w-[82%] max-w-[340px] h-full bg-white shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-left duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div>
                {/* Header in Drawer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[#1e3a8a] bg-[#eaf0fe]">
                      AL
                    </span>
                    <div>
                      <b className="block text-[15px] text-[#0f172a] leading-tight">Adeyemi Layers</b>
                      <span className="text-[12px] text-[#64748b]">7,390 Birds · 77 Cages</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setDrawer(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                {/* Feed Baseline Configuration */}
                <div className="py-5 border-b border-slate-100">
                  <label className="block text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Feed Price Baseline
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[14px]">₦</span>
                      <input 
                        type="text" 
                        value={priceInput}
                        onChange={(e) => setPriceInput(e.target.value)}
                        className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 font-bold text-[15px] text-[#0f172a] focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        const val = parseInt(priceInput.replace(/\D/g, ""), 10);
                        if (!isNaN(val) && val > 0) setFeedPrice(val);
                      }}
                      className="h-10 px-3.5 rounded-xl bg-[#0f172a] text-white font-medium text-[13px]"
                    >
                      Save
                    </button>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <button 
                      onClick={() => { setPriceInput("14500"); setFeedPrice(14500); }}
                      className="px-2 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700"
                    >
                      ₦14.5k (Mash)
                    </button>
                    <button 
                      onClick={() => { setPriceInput("17500"); setFeedPrice(17500); }}
                      className="px-2 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700"
                    >
                      ₦17.5k
                    </button>
                    <button 
                      onClick={() => { setPriceInput("19500"); setFeedPrice(19500); }}
                      className="px-2 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700"
                    >
                      ₦19.5k
                    </button>
                  </div>
                </div>

                {/* Audit & Verification Links */}
                <div className="py-4 space-y-3 text-[14px]">
                  <div className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                    Daily Evidence
                  </div>
                  <div 
                    onClick={() => { setDrawer(false); setActiveSheet("photo"); }}
                    className="flex items-center justify-between py-2 text-slate-700 cursor-pointer hover:text-black"
                  >
                    <span>Carcass Proof (Row B Cage 4)</span>
                    <span className="text-[12px] text-emerald-600 font-semibold">3 Photos →</span>
                  </div>
                  <div 
                    onClick={() => { setDrawer(false); setActiveSheet("store"); }}
                    className="flex items-center justify-between py-2 text-slate-700 cursor-pointer hover:text-black"
                  >
                    <span>Store Delivery Reconciliation</span>
                    <span className="text-[12px] text-slate-500 font-mono">120 in · 92 left →</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-100">
                LayerBook V7 · AutoBook Architecture
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. PEN 2 DRILL-DOWN SHEET ================= */}
        {activeSheet === "pen2" && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setActiveSheet(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Pen 2 Intake Audit</h3>
                  <span className="text-[12px] text-[#64748b]">1,450 birds · 15 Battery Cages</span>
                </div>
                <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-3.5 text-[13px]">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 text-[12.5px] leading-relaxed">
                  <b>Appetite Variance:</b><br />
                  1,450 hens typically consume 6.6 bags (115g/bird). 8.0 bags logged today (138g/bird). The extra 1.4 bags (35kg / ₦20,300) was siphoned or wasted.
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Eggs collected:</span>
                  <b className="text-[#0f172a]">38 crates (78.6% lay)</b>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Attendant on duty:</span>
                  <b className="text-[#0f172a]">Musa Ibrahim</b>
                </div>

                <div className="flex justify-between items-center py-1">
                  <div>
                    <span className="text-slate-500 block">Dead birds logged:</span>
                    <span className="text-[11.5px] text-red-600 font-medium">3 birds in Row B · Cage 4</span>
                  </div>
                  <button 
                    onClick={() => setActiveSheet("photo")}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium text-[12px] hover:bg-slate-200 transition-colors"
                  >
                    View Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. STORE DRILL-DOWN SHEET ================= */}
        {activeSheet === "store" && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setActiveSheet(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-[16px] font-bold text-[#0f172a]">Feed Store Reconciliation</h3>
                <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-2.5 text-[13px]">
                <div className="flex justify-between text-slate-600">
                  <span>Delivered Monday:</span>
                  <b>120 bags</b>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Fed yesterday:</span>
                  <span>-28 bags</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Fed today (all pens):</span>
                  <span>-31 bags</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-[#0f172a] text-[14px]">
                  <span>Physical Store Balance:</span>
                  <span className="text-emerald-700">{storeBalance} bags</span>
                </div>
                <p className="text-[11.5px] text-slate-400 pt-1 leading-snug">
                  At 31 bags daily, your current stock will run out in ~{storeRunwayDays} days.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. CARCASS PHOTO PROOF MODAL ================= */}
        {activeSheet === "photo" && (
          <div 
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5"
            onClick={() => setActiveSheet("pen2")}
          >
            <div 
              className="w-full max-w-[340px] bg-white rounded-3xl p-5 text-left shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <b className="text-[14px] text-[#0f172a] block">Mortality Verification</b>
                  <span className="text-[11px] text-slate-400">Pen 2 · Row B · Cage 4</span>
                </div>
                <button onClick={() => setActiveSheet("pen2")} className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-2">
                <div className="h-36 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-1">
                  <span className="text-[24px]">📸</span>
                  <span className="text-[11px] font-medium text-slate-600">Slit-Keel Timestamped Photo</span>
                  <span className="text-[10px] text-slate-400">08:24 AM · Musa Ibrahim</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Photo verification ensures live healthy hens are not stolen under the guise of natural mortality.
                </p>
              </div>

              <button 
                onClick={() => setActiveSheet("pen2")}
                className="w-full h-10 rounded-xl bg-[#0f172a] text-white font-medium text-[13px]"
              >
                Back to Pen 2
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
