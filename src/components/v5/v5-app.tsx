"use client";
import React, { useState } from "react";

export function V5App() {
  const [activeTab, setActiveTab] = useState<"today" | "pens" | "store" | "flock">("today");
  
  // Feed Price setting (can be edited/toggled)
  const [feedPrice, setFeedPrice] = useState<number>(14500);
  const [isEditingPrice, setIsEditingPrice] = useState<boolean>(false);
  const [priceInput, setPriceInput] = useState<string>("14500");

  // Selection for drill-down / details
  const [selectedPen, setSelectedPen] = useState<number | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState<boolean>(false);

  // Core Numbers
  const totalCrates = 202;
  const grossEggSales = 1018500; // 82 LG + 65 MD + 35 PL + 20 JB
  const bagsFedToday = 31;
  const feedCostToday = bagsFedToday * feedPrice;
  const netProfitAfterFeed = grossEggSales - feedCostToday;
  const feedCostPerCrate = Math.round(feedCostToday / totalCrates);

  // Store data
  const storeDelivery = 120;
  const storeUsed = 28; // before today
  const storeToday = 31;
  const storeBalance = 92;
  const daysOfFeedLeft = (storeBalance / bagsFedToday).toFixed(1);

  const handleSavePrice = () => {
    const val = parseInt(priceInput.replace(/\D/g, ""), 10);
    if (!isNaN(val) && val > 0) {
      setFeedPrice(val);
    }
    setIsEditingPrice(false);
  };

  const copyDailyReport = () => {
    const text = `*Adeyemi Farms — Daily Farm Summary*
📅 Tuesday, 20 Oct

🥚 *Eggs Collected:* 202 crates (₦${grossEggSales.toLocaleString()})
• Large: 82 crates
• Medium: 65 crates
• Pullet: 35 crates
• Jumbo: 20 crates

🌾 *Feed Used:* 31 bags (₦${feedCostToday.toLocaleString()} @ ₦${feedPrice.toLocaleString()}/bag)
• Pen 1 (1,920 birds): 10 bags (115g/bird) - OK
• Pen 2 (1,450 birds): 8 bags (138g/bird) - ⚠️ +1.4 bags higher than normal
• Pen 3 (4,020 birds): 13 bags (112g/bird) - OK

💰 *Net After Feed:* ₦${netProfitAfterFeed.toLocaleString()}
🎯 *Feed Cost Per Crate:* ₦${feedCostPerCrate.toLocaleString()} / crate

📦 *Feed Store:* 92 bags remaining (~${daysOfFeedLeft} days left)
🐔 *Mortality:* 3 birds (Pen 2, Row B, Cage 4 - Photos logged)
🥚 *Cracked:* 28 eggs (0.4% - Normal)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedWhatsApp(true);
      setTimeout(() => setCopiedWhatsApp(false), 2500);
    }
  };

  return (
    <div className="min-h-dvh flex justify-center bg-[#f4f5f7] font-sans antialiased text-[#111827]">
      <div className="relative w-full max-w-[440px] h-dvh bg-white flex flex-col overflow-hidden select-none shadow-md">
        
        {/* ================= HEADER ================= */}
        <header className="shrink-0 bg-white border-b border-gray-100 px-5 pt-4 pb-3 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-bold text-gray-900 tracking-tight leading-none">Adeyemi Farms</h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[12px] text-gray-500 mt-1">7,390 Layers · Day 42 in Lay</p>
          </div>

          {/* Feed Price Badge */}
          <button 
            onClick={() => {
              setPriceInput(feedPrice.toString());
              setIsEditingPrice(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-200/80 transition-colors text-left"
          >
            <span className="text-[11px] text-gray-500 font-medium">Feed:</span>
            <span className="text-[12px] font-bold text-gray-900">₦{(feedPrice / 1000).toFixed(1)}k</span>
            <span className="text-[10px] text-gray-400">▾</span>
          </button>
        </header>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-1 overflow-y-auto pb-6">

          {/* ================= TAB 1: TODAY (OVERVIEW) ================= */}
          {activeTab === "today" && (
            <div className="px-5 pt-4 space-y-4">
              
              {/* Hero Earnings Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-medium text-slate-300 uppercase tracking-wider">Today's Net After Feed</span>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    202 crates
                  </span>
                </div>
                
                <div className="flex items-baseline gap-2 my-1">
                  <span className="text-[38px] font-extrabold tracking-tight leading-none">
                    ₦{netProfitAfterFeed.toLocaleString()}
                  </span>
                </div>

                <p className="text-[12px] text-slate-400 mt-1">
                  ₦1,018,500 egg sales minus ₦{feedCostToday.toLocaleString()} feed cost
                </p>

                <div className="mt-4 pt-3.5 border-t border-slate-700/60 flex items-center justify-between text-[12.5px]">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Feed Cost / Crate</span>
                    <span className="font-bold text-white text-[14px]">₦{feedCostPerCrate.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[11px]">Daily Feed Burn</span>
                    <span className="font-bold text-white text-[14px]">31 bags</span>
                  </div>
                </div>
              </div>

              {/* Alert Pill (If any pen has an issue) */}
              <div 
                onClick={() => setActiveTab("pens")}
                className="rounded-xl p-3 bg-amber-50/90 border border-amber-200/90 flex items-center justify-between cursor-pointer active:bg-amber-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                  <div className="text-left">
                    <p className="text-[12.5px] font-semibold text-amber-950 leading-tight">Pen 2 fed 8 bags today</p>
                    <p className="text-[11.5px] text-amber-800">1.4 bags higher than standard for 1,450 birds</p>
                  </div>
                </div>
                <span className="text-[11.5px] font-semibold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">Check →</span>
              </div>

              {/* Store Runway Pill */}
              <div 
                onClick={() => setActiveTab("store")}
                className="rounded-xl p-3 bg-gray-50 border border-gray-200/80 flex items-center justify-between cursor-pointer active:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[15px]">🌾</span>
                  <div className="text-left">
                    <p className="text-[12.5px] font-semibold text-gray-900 leading-tight">Feed Store Balance</p>
                    <p className="text-[11.5px] text-gray-500">92 bags left in store (~{daysOfFeedLeft} days supply)</p>
                  </div>
                </div>
                <span className="text-[12px] font-bold text-emerald-700">Good</span>
              </div>

              {/* Egg Production Breakdown */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-4">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                  <h3 className="text-[14px] font-bold text-gray-900">Today's Egg Crates</h3>
                  <span className="text-[12px] text-gray-500">202 crates total</span>
                </div>

                <div className="space-y-2.5 text-[13px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900">Large</span>
                      <span className="text-gray-400 text-[11px] ml-1.5">(₦5,200/crate)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">₦426,400</span>
                      <b className="w-14 text-right text-gray-900 font-bold">82 crates</b>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900">Medium</span>
                      <span className="text-gray-400 text-[11px] ml-1.5">(₦5,000/crate)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">₦325,000</span>
                      <b className="w-14 text-right text-gray-900 font-bold">65 crates</b>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900">Pullet</span>
                      <span className="text-gray-400 text-[11px] ml-1.5">(₦4,500/crate)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">₦157,500</span>
                      <b className="w-14 text-right text-gray-900 font-bold">35 crates</b>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-gray-900">Jumbo</span>
                      <span className="text-gray-400 text-[11px] ml-1.5">(₦5,600/crate)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">₦112,000</span>
                      <b className="w-14 text-right text-gray-900 font-bold">20 crates</b>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Share Button */}
              <button 
                onClick={copyDailyReport}
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[13.5px] flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-xs"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/>
                </svg>
                {copiedWhatsApp ? "Copied to Clipboard! ✓" : "Copy WhatsApp Report"}
              </button>

            </div>
          )}

          {/* ================= TAB 2: PENS (FEED & EGGS BY PEN) ================= */}
          {activeTab === "pens" && (
            <div className="px-5 pt-4 space-y-3.5">
              <div>
                <h2 className="text-[17px] font-bold text-gray-900">Daily Pen Records</h2>
                <p className="text-[12px] text-gray-500">Check how much feed each pen took today</p>
              </div>

              {/* Pen 1 */}
              <div 
                onClick={() => setSelectedPen(1)}
                className="rounded-2xl p-4 bg-white border border-gray-200/80 cursor-pointer active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                  <div>
                    <h3 className="text-[14.5px] font-bold text-gray-900">Pen 1</h3>
                    <span className="text-[11.5px] text-gray-500">1,920 birds · 20 cages</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Normal ✓
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-left">
                  <div>
                    <span className="block text-[11px] text-gray-400">Feed Fed</span>
                    <b className="text-[13.5px] text-gray-900">10 bags</b>
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-400">Per Bird</span>
                    <b className="text-[13.5px] text-gray-900">115g</b>
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-400">Eggs Laid</span>
                    <b className="text-[13.5px] text-gray-900">54 crates</b>
                  </div>
                </div>
              </div>

              {/* Pen 2 (Flagged) */}
              <div 
                onClick={() => setSelectedPen(2)}
                className="rounded-2xl p-4 bg-amber-50/50 border-2 border-amber-300 cursor-pointer active:bg-amber-100/50 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200/80">
                  <div>
                    <h3 className="text-[14.5px] font-bold text-amber-950">Pen 2</h3>
                    <span className="text-[11.5px] text-amber-800">1,450 birds · 15 cages</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                    +1.4 Bags Extra
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-left mb-2.5">
                  <div>
                    <span className="block text-[11px] text-amber-800/80">Feed Fed</span>
                    <b className="text-[13.5px] text-amber-950">8 bags</b>
                  </div>
                  <div>
                    <span className="block text-[11px] text-amber-800/80">Per Bird</span>
                    <b className="text-[13.5px] text-red-600 font-bold">138g</b>
                  </div>
                  <div>
                    <span className="block text-[11px] text-amber-800/80">Eggs Laid</span>
                    <b className="text-[13.5px] text-amber-950">38 crates</b>
                  </div>
                </div>

                <p className="text-[11.5px] text-amber-900 bg-white/80 p-2 rounded-lg border border-amber-200/80 leading-snug">
                  ⚠️ 1,450 birds usually eat 6.5 bags. 8 bags is 35kg higher than normal. Tap to inspect.
                </p>
              </div>

              {/* Pen 3 */}
              <div 
                onClick={() => setSelectedPen(3)}
                className="rounded-2xl p-4 bg-white border border-gray-200/80 cursor-pointer active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                  <div>
                    <h3 className="text-[14.5px] font-bold text-gray-900">Pen 3</h3>
                    <span className="text-[11.5px] text-gray-500">4,020 birds · 42 cages</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Normal ✓
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-left">
                  <div>
                    <span className="block text-[11px] text-gray-400">Feed Fed</span>
                    <b className="text-[13.5px] text-gray-900">13 bags</b>
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-400">Per Bird</span>
                    <b className="text-[13.5px] text-gray-900">112g</b>
                  </div>
                  <div>
                    <span className="block text-[11px] text-gray-400">Eggs Laid</span>
                    <b className="text-[13.5px] text-gray-900">110 crates</b>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================= TAB 3: STORE (FEED INVENTORY) ================= */}
          {activeTab === "store" && (
            <div className="px-5 pt-4 space-y-4">
              <div>
                <h2 className="text-[17px] font-bold text-gray-900">Feed Store Room</h2>
                <p className="text-[12px] text-gray-500">Track delivery, bags issued, and physical stock</p>
              </div>

              {/* Big Balance Box */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-5">
                <span className="text-[11.5px] font-semibold text-gray-400 uppercase tracking-wider block">Bags Remaining</span>
                <div className="flex items-baseline gap-2 mt-1 mb-1">
                  <span className="text-[40px] font-black text-gray-900 leading-none">92</span>
                  <span className="text-[16px] font-bold text-gray-500">bags in store</span>
                </div>
                <p className="text-[12.5px] text-emerald-700 font-medium">
                  Enough for about 3 days (based on 31 bags/day)
                </p>

                {/* Arithmetic breakdown */}
                <div className="mt-4 pt-3.5 border-t border-gray-100 space-y-2 text-[13px]">
                  <div className="flex justify-between text-gray-600">
                    <span>Delivered Monday</span>
                    <b>120 bags</b>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Issued Yesterday</span>
                    <span>-28 bags</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Issued Today</span>
                    <span>-31 bags</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-gray-900">
                    <span>Physical Stock Count</span>
                    <span className="text-emerald-700">92 bags (Match ✓)</span>
                  </div>
                </div>
              </div>

              {/* Simple Safety Note */}
              <div className="rounded-xl p-3.5 bg-blue-50/70 border border-blue-200/80 text-[12.5px] text-blue-900 leading-relaxed">
                <b className="block text-[13px] font-bold text-blue-950 mb-0.5">Why this matters:</b>
                If bags are taken out of the store without being signed into Pen 1, 2, or 3, the physical count will immediately fall below 92 bags.
              </div>
            </div>
          )}

          {/* ================= TAB 4: FLOCK (MORTALITY & EGG PICKUP) ================= */}
          {activeTab === "flock" && (
            <div className="px-5 pt-4 space-y-4">
              <div>
                <h2 className="text-[17px] font-bold text-gray-900">Flock & Daily Audit</h2>
                <p className="text-[12px] text-gray-500">Pickup timing, dead birds, and cracked eggs</p>
              </div>

              {/* Egg Pickup Timing */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
                  <h3 className="text-[14px] font-bold text-gray-900">Egg Pickup Times</h3>
                  <span className="text-[11.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Normal Timing</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="block text-[11px] text-gray-400">Morning (11 AM)</span>
                    <b className="text-[16px] text-gray-900">168 crates</b>
                    <span className="block text-[11px] text-gray-500 mt-0.5">83% of today's total</span>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="block text-[11px] text-gray-400">Evening (4 PM)</span>
                    <b className="text-[16px] text-gray-900">34 crates</b>
                    <span className="block text-[11px] text-gray-500 mt-0.5">17% of today's total</span>
                  </div>
                </div>

                <p className="text-[11.5px] text-gray-500 leading-snug">
                  Layers naturally drop 80%+ of their eggs in the morning. Consistent morning numbers confirm eggs are not being hidden or delayed.
                </p>
              </div>

              {/* Mortality Log */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-4">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                  <h3 className="text-[14px] font-bold text-gray-900">Dead Birds Today</h3>
                  <b className="text-[14px] text-gray-900">3 birds</b>
                </div>

                <div className="flex items-center justify-between py-1.5 text-[12.5px] text-gray-700">
                  <span>Location:</span>
                  <b>Pen 2 · Row B · Cage 4</b>
                </div>

                <div className="flex items-center justify-between py-1.5 text-[12.5px] text-gray-700">
                  <span>Suspected reason:</span>
                  <span className="text-amber-800 font-medium">Heat / Drinker nipple blocked</span>
                </div>

                <button 
                  onClick={() => setShowPhotoModal(true)}
                  className="w-full mt-3 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-[12.5px] font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>📷</span> View 2 Carcass Photos
                </button>
              </div>

              {/* Cracked Eggs */}
              <div className="rounded-2xl bg-white border border-gray-200/80 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900">Cracked / Broken Eggs</h3>
                  <p className="text-[11.5px] text-gray-500 mt-0.5">28 eggs today (0.4% · within normal 1.5% limit)</p>
                </div>
                <span className="text-[12px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">Safe</span>
              </div>

            </div>
          )}

        </main>

        {/* ================= BOTTOM NAVIGATION ================= */}
        <nav className="shrink-0 h-[64px] bg-white border-t border-gray-100 px-3 flex items-center justify-around z-10">
          <button 
            onClick={() => setActiveTab("today")}
            className={`flex flex-col items-center gap-1 w-16 text-[11px] font-medium transition-colors ${
              activeTab === "today" ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="text-[18px]">📊</span>
            <span>Today</span>
          </button>

          <button 
            onClick={() => setActiveTab("pens")}
            className={`flex flex-col items-center gap-1 w-16 text-[11px] font-medium transition-colors ${
              activeTab === "pens" ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="text-[18px]">🏚️</span>
            <span>Pens</span>
          </button>

          <button 
            onClick={() => setActiveTab("store")}
            className={`flex flex-col items-center gap-1 w-16 text-[11px] font-medium transition-colors ${
              activeTab === "store" ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="text-[18px]">🌾</span>
            <span>Store</span>
          </button>

          <button 
            onClick={() => setActiveTab("flock")}
            className={`flex flex-col items-center gap-1 w-16 text-[11px] font-medium transition-colors ${
              activeTab === "flock" ? "text-gray-900 font-bold" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="text-[18px]">🐔</span>
            <span>Flock</span>
          </button>
        </nav>

        {/* ================= EDIT PRICE MODAL ================= */}
        {isEditingPrice && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center">
            <div className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <b className="text-[16px] text-gray-900">Change Feed Price</b>
                <button onClick={() => setIsEditingPrice(false)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-3">
                <label className="block text-[12px] font-medium text-gray-600">Price per 25kg bag (₦)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[15px]">₦</span>
                  <input 
                    type="text" 
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 rounded-xl border border-gray-300 font-bold text-[18px] text-gray-900 focus:outline-none focus:border-blue-500"
                    placeholder="14500"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button 
                    onClick={() => setPriceInput("14500")}
                    className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[12px] font-semibold text-gray-800"
                  >
                    ₦14,500 (Self-mill)
                  </button>
                  <button 
                    onClick={() => setPriceInput("17500")}
                    className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[12px] font-semibold text-gray-800"
                  >
                    ₦17,500 (Depot)
                  </button>
                  <button 
                    onClick={() => setPriceInput("19500")}
                    className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-[12px] font-semibold text-gray-800"
                  >
                    ₦19,500 (Retail)
                  </button>
                </div>
              </div>

              <button 
                onClick={handleSavePrice}
                className="w-full h-12 rounded-xl bg-gray-900 text-white font-semibold text-[14px] mt-2"
              >
                Save Price
              </button>
            </div>
          </div>
        )}

        {/* ================= PEN DETAIL MODAL ================= */}
        {selectedPen && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center" onClick={() => setSelectedPen(null)}>
            <div className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <b className="text-[16px] text-gray-900">Pen {selectedPen} Details</b>
                <button onClick={() => setSelectedPen(null)} className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-3 text-[13px]">
                {selectedPen === 2 ? (
                  <>
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[12px] leading-relaxed">
                      <b>Why is Pen 2 flagged?</b><br />
                      Pen 2 has 1,450 birds. Expected intake is 115g per bird (6.6 bags). Today 8.0 bags were logged. The attendant should account for the remaining 1.4 bags (35kg).
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Pen Supervisor:</span>
                      <b className="text-gray-900">Musa Ibrahim</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Feeding Time:</span>
                      <b className="text-gray-900">07:15 AM & 02:30 PM</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Dead birds today:</span>
                      <b className="text-red-600">3 birds (Row B Cage 4)</b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Pen Status:</span>
                      <b className="text-emerald-700">Healthy & Within Standard</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Intake per bird:</span>
                      <b className="text-gray-900">{selectedPen === 1 ? "115g" : "112g"} (Standard 110–118g)</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-500">Mortality today:</span>
                      <b className="text-gray-900">0 birds</b>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= PHOTO AUDIT MODAL ================= */}
        {showPhotoModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setShowPhotoModal(false)}>
            <div className="w-full max-w-[380px] bg-white rounded-3xl p-5 text-left shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <b className="text-[15px] text-gray-900 block">Mortality Verification</b>
                  <span className="text-[11px] text-gray-500">Pen 2 · Row B · Cage 4</span>
                </div>
                <button onClick={() => setShowPhotoModal(false)} className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-3">
                <div className="h-44 rounded-2xl bg-gray-100 border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-1.5">
                  <span className="text-[28px]">📸</span>
                  <span className="text-[12px] font-medium text-gray-500">Carcass Photo 1 (Slit-Keel Timestamped)</span>
                  <span className="text-[10px] text-gray-400">08:24 AM · Geotagged to Farm Pen 2</span>
                </div>
                <p className="text-[11.5px] text-gray-600 leading-snug">
                  Logging a timestamped carcass photo prevents healthy birds from being taken out and sold.
                </p>
              </div>

              <button 
                onClick={() => setShowPhotoModal(false)}
                className="w-full h-11 rounded-xl bg-gray-900 text-white font-semibold text-[13px]"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
