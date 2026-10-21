"use client";
import React, { useState } from "react";

export function V6App() {
  // Farm Settings (Metadata hidden in drawer/modal, NOT cluttering header)
  const [feedPrice, setFeedPrice] = useState<number>(14500);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [priceDraft, setPriceDraft] = useState<string>("14500");

  // Progressive Disclosure Sheets
  const [activeSheet, setActiveSheet] = useState<"pen2" | "store" | "eggs" | "photo" | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Core Farm Math
  const totalCrates = 202;
  const grossEggSales = 1018500;
  const bagsFedToday = 31;
  const feedCostToday = bagsFedToday * feedPrice;
  const netReturn = grossEggSales - feedCostToday;
  const feedCostPerCrate = Math.round(feedCostToday / totalCrates);
  
  const storeBalance = 92;
  const storeDays = (storeBalance / bagsFedToday).toFixed(1);

  const copySummary = () => {
    const text = `*Adeyemi Layers — Today's Summary*
📅 Tue, 20 Oct

💰 Net after feed: ₦${netReturn.toLocaleString()}
🥚 202 crates collected
🌾 31 bags fed (₦${feedCostPerCrate.toLocaleString()} / crate)

⚠️ Pen 2: 8 bags logged (+1.4 bags extra)
📦 Store: 92 bags left (~3 days)
🐔 Mortality: 3 birds (photos logged)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-dvh flex justify-center bg-[#f8f9fa] font-sans antialiased text-[#111827]">
      <div className="relative w-full max-w-[420px] h-dvh bg-white flex flex-col justify-between overflow-hidden select-none shadow-sm">
        
        {/* ================= QUIET APPLE HEADER ================= */}
        <header className="px-6 pt-6 pb-2 flex items-center justify-between">
          <div>
            <h1 className="text-[17px] font-semibold text-gray-900 tracking-tight">Adeyemi Layers</h1>
            <p className="text-[12px] text-gray-400 font-medium">Today · 20 Oct</p>
          </div>
          
          <button 
            onClick={() => {
              setPriceDraft(feedPrice.toString());
              setShowSettings(true);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="Settings"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </header>

        {/* ================= THE PRIMARY INSTRUMENT ================= */}
        <main className="flex-1 px-6 flex flex-col justify-center py-2 space-y-6">

          {/* 1. THE ONE ANCHOR (What did the farm make today?) */}
          <div className="text-center py-3">
            <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-widest block mb-1">
              Net After Feed Today
            </span>
            <div className="text-[52px] font-extrabold tracking-tight text-gray-900 leading-none">
              ₦{netReturn.toLocaleString()}
            </div>
            <span className="text-[13px] text-gray-400 mt-2 block font-medium">
              Gross sales minus daily feed burn
            </span>
          </div>

          {/* 2. THE THREE NUMBERS (The Equation Behind It) */}
          <div className="grid grid-cols-3 divide-x divide-gray-100 py-3.5 bg-gray-50/80 rounded-2xl border border-gray-100">
            <div className="text-center px-2">
              <span className="text-[11px] font-medium text-gray-400 block mb-0.5">Eggs Picked</span>
              <b className="text-[17px] font-bold text-gray-900">{totalCrates}</b>
              <span className="text-[11px] text-gray-500 block">crates</span>
            </div>

            <div className="text-center px-2">
              <span className="text-[11px] font-medium text-gray-400 block mb-0.5">Feed Fed</span>
              <b className="text-[17px] font-bold text-gray-900">{bagsFedToday}</b>
              <span className="text-[11px] text-gray-500 block">bags</span>
            </div>

            <div className="text-center px-2">
              <span className="text-[11px] font-medium text-gray-400 block mb-0.5">Feed / Crate</span>
              <b className="text-[17px] font-bold text-gray-900">₦{feedCostPerCrate.toLocaleString()}</b>
              <span className="text-[11px] text-gray-500 block">unit cost</span>
            </div>
          </div>

          {/* 3. THE LEAK CHECK (Earned its spot: Tells if money leaked) */}
          <div 
            onClick={() => setActiveSheet("pen2")}
            className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between cursor-pointer active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <div className="text-left">
                <p className="text-[13px] font-semibold text-amber-950 leading-tight">Pen 2: 8 bags logged</p>
                <p className="text-[11.5px] text-amber-800/80">1.4 bags higher than standard for 1,450 birds</p>
              </div>
            </div>
            <span className="text-[12px] font-bold text-amber-900">Inspect →</span>
          </div>

          {/* 4. THE TWO SUPPORTING PULSES (Store & Eggs) */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Store Runway */}
            <div 
              onClick={() => setActiveSheet("store")}
              className="p-3.5 rounded-2xl bg-white border border-gray-150 cursor-pointer active:bg-gray-50 transition-colors text-left"
            >
              <span className="text-[11px] font-medium text-gray-400 block mb-1">Feed Store</span>
              <b className="text-[18px] font-bold text-gray-900 leading-tight block">{storeBalance} bags</b>
              <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">~{storeDays} days left</span>
            </div>

            {/* Egg Split */}
            <div 
              onClick={() => setActiveSheet("eggs")}
              className="p-3.5 rounded-2xl bg-white border border-gray-150 cursor-pointer active:bg-gray-50 transition-colors text-left"
            >
              <span className="text-[11px] font-medium text-gray-400 block mb-1">Morning Pickup</span>
              <b className="text-[18px] font-bold text-gray-900 leading-tight block">168 crates</b>
              <span className="text-[11px] text-gray-500 mt-0.5 block">83% of daily total</span>
            </div>

          </div>

        </main>

        {/* ================= BOTTOM ACTION ================= */}
        <footer className="px-6 pb-6 pt-2">
          <button 
            onClick={copySummary}
            className="w-full h-12 rounded-xl bg-gray-900 hover:bg-black text-white font-medium text-[13.5px] flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            {copied ? "Copied Daily Summary ✓" : "Share Daily Summary"}
          </button>
        </footer>

        {/* ================= PROGRESSIVE DISCLOSURE: PEN 2 SHEET ================= */}
        {activeSheet === "pen2" && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setActiveSheet(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-[16px] font-bold text-gray-900">Pen 2 Inspection</h3>
                  <span className="text-[12px] text-gray-400">1,450 Isa Brown · 15 Battery Cages</span>
                </div>
                <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-3.5 text-[13px]">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/90 text-amber-950 text-[12.5px] leading-relaxed">
                  <b>Feed Intake Check:</b><br />
                  1,450 hens typically consume 6.6 bags (115g/bird). 8.0 bags was signed out today. The extra 1.4 bags (35kg) was either spilled or removed from the house.
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Eggs collected:</span>
                  <b className="text-gray-900">38 crates (78.6% lay)</b>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Attendant on duty:</span>
                  <b className="text-gray-900">Musa Ibrahim</b>
                </div>

                <div className="flex justify-between items-center py-1">
                  <div>
                    <span className="text-gray-500 block">Dead birds logged:</span>
                    <span className="text-[11.5px] text-red-600 font-medium">3 birds in Row B · Cage 4</span>
                  </div>
                  <button 
                    onClick={() => setActiveSheet("photo")}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium text-[12px] hover:bg-gray-200 transition-colors"
                  >
                    View Photo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PROGRESSIVE DISCLOSURE: STORE SHEET ================= */}
        {activeSheet === "store" && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setActiveSheet(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-gray-900">Feed Store Ledger</h3>
                <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-2.5 text-[13px]">
                <div className="flex justify-between text-gray-600">
                  <span>Delivered Monday:</span>
                  <b>120 bags</b>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Fed yesterday:</span>
                  <span>-28 bags</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Fed today (all pens):</span>
                  <span>-31 bags</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-gray-900 text-[14px]">
                  <span>Physical Store Balance:</span>
                  <span className="text-emerald-700">{storeBalance} bags</span>
                </div>
                <p className="text-[11.5px] text-gray-400 pt-1 leading-snug">
                  At 31 bags daily, your current stock will run out in ~3 days.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= PROGRESSIVE DISCLOSURE: EGGS SHEET ================= */}
        {activeSheet === "eggs" && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setActiveSheet(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-gray-900">Today's Egg Pickup</h3>
                <button onClick={() => setActiveSheet(null)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-2.5 text-[13px]">
                <div className="flex justify-between text-gray-600">
                  <span>Morning Pick (11 AM):</span>
                  <b>168 crates (83%)</b>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Evening Pick (4 PM):</span>
                  <b>34 crates (17%)</b>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-gray-900">
                  <span>Total Collected:</span>
                  <span>202 crates</span>
                </div>
                <div className="flex justify-between text-gray-500 text-[12px]">
                  <span>Cracked / Broken:</span>
                  <span>28 eggs (0.4% · Safe)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PROGRESSIVE DISCLOSURE: PHOTO MODAL ================= */}
        {activeSheet === "photo" && (
          <div 
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5"
            onClick={() => setActiveSheet("pen2")}
          >
            <div 
              className="w-full max-w-[340px] bg-white rounded-3xl p-5 text-left shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <b className="text-[14px] text-gray-900 block">Carcass Proof</b>
                  <span className="text-[11px] text-gray-400">Pen 2 · Row B · Cage 4</span>
                </div>
                <button onClick={() => setActiveSheet("pen2")} className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-2">
                <div className="h-36 rounded-xl bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-1">
                  <span className="text-[24px]">📷</span>
                  <span className="text-[11px] font-medium text-gray-500">Slit-Keel Timestamped Photo</span>
                  <span className="text-[10px] text-gray-400">08:24 AM · Musa Ibrahim</span>
                </div>
              </div>

              <button 
                onClick={() => setActiveSheet("pen2")}
                className="w-full h-10 rounded-xl bg-gray-900 text-white font-medium text-[13px]"
              >
                Back to Pen 2
              </button>
            </div>
          </div>
        )}

        {/* ================= METADATA / SETTINGS MODAL ================= */}
        {showSettings && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setShowSettings(false)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-[16px] font-bold text-gray-900">Farm Baseline Settings</h3>
                <button onClick={() => setShowSettings(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-3">
                <label className="block text-[12px] font-medium text-gray-500">Feed Price per 25kg Bag (₦)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[15px]">₦</span>
                  <input 
                    type="text" 
                    value={priceDraft}
                    onChange={(e) => setPriceDraft(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 rounded-xl border border-gray-200 font-bold text-[17px] text-gray-900 focus:outline-none focus:border-gray-900"
                    placeholder="14500"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => setPriceDraft("14500")}
                    className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-[11.5px] font-medium text-gray-700 border border-gray-100"
                  >
                    ₦14,500 (Self-mill)
                  </button>
                  <button 
                    onClick={() => setPriceDraft("17500")}
                    className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-[11.5px] font-medium text-gray-700 border border-gray-100"
                  >
                    ₦17,500 (Depot)
                  </button>
                  <button 
                    onClick={() => setPriceDraft("19500")}
                    className="flex-1 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-[11.5px] font-medium text-gray-700 border border-gray-100"
                  >
                    ₦19,500 (Retail)
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  const val = parseInt(priceDraft.replace(/\D/g, ""), 10);
                  if (!isNaN(val) && val > 0) setFeedPrice(val);
                  setShowSettings(false);
                }}
                className="w-full h-12 rounded-xl bg-gray-900 text-white font-medium text-[13.5px] mt-2"
              >
                Save Baseline
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
