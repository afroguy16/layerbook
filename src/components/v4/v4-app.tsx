"use client";
import React, { useState } from "react";

export function V4App() {
  const [tab, setTab] = useState<"pulse" | "forensics" | "store" | "proof">("pulse");
  
  // Interactive Feed Price toggle matching his 14,500 correction
  const [feedPrice, setFeedPrice] = useState<number>(14500);
  const [showPricePicker, setShowPricePicker] = useState<boolean>(false);
  
  // Detail sheet state for drill-downs
  const [activePenSheet, setActivePenSheet] = useState<"P1" | "P2" | "P3" | null>(null);
  const [activeProofSheet, setActiveProofSheet] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Exact math from the pulse specification:
  // Gross Egg Cash = ₦1,020,900 (202 crates)
  // 31 bags @ feedPrice (31 * 14500 = ₦449,500)
  // Net Operating Feed Margin = ₦1,020,900 - ₦449,500 = ₦571,400
  // True Unit Cost = ₦449,500 / 202 = ₦2,225 / crate
  const totalCrates = 202;
  const grossEggCash = 1020900;
  const bagsFedToday = 31;
  const feedCostBurn = bagsFedToday * feedPrice;
  const netFeedMargin = grossEggCash - feedCostBurn;
  const trueUnitCost = Math.round(feedCostBurn / totalCrates);

  // Store Gauge state
  const bagsOnDelivery = 120;
  const bagsFedSoFar = 28; // before today's evening draw
  const bagsPhysicalLeft = 92;
  const storeRunwayDays = (bagsPhysicalLeft / bagsFedToday).toFixed(1); // 2.9 days

  const waText = `*Adeyemi Commercial Layers — Operational Pulse*
📅 Tuesday, 20 Oct
💵 Gross Egg Cash: ₦${grossEggCash.toLocaleString()} (202 crates)
🌾 Feed Cost Burn: ₦${feedCostBurn.toLocaleString()} (31 bags @ ₦${(feedPrice / 1000).toFixed(1)}k)
✨ Net Operating Feed Margin: ₦${netFeedMargin.toLocaleString()}
🎯 True Unit Cost: ₦${trueUnitCost.toLocaleString()} / crate
📦 Store Runway: ${bagsPhysicalLeft} bags left (${storeRunwayDays} days)
🚨 Pen 2 Leak: +1.4 bags overfed (138g/bird vs 115g standard) · ₦20,300 lost
📍 Hotspot: Row B · Cage 4 flagged (3 mortalities)
_LayerBook Biological & Inventory Truth Engine_`;

  const copyWhatsApp = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(waText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-dvh flex justify-center bg-[#f1f3f5] font-sans antialiased text-[#0f172a]">
      <div className="relative w-full max-w-[480px] h-dvh bg-white flex flex-col overflow-hidden select-none shadow-sm">
        
        {/* ================= 1. HEADER (QUIET EXECUTIVE BAR) ================= */}
        <div className="shrink-0 h-15 bg-white border-b border-[#f1f5f9] px-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#eff6ff] text-[#1d4ed8] font-bold text-[13px] flex items-center justify-center">
              AL
            </span>
            <div>
              <b className="block text-[15px] font-semibold text-[#0f172a] leading-tight">Adeyemi Commercial Layers</b>
              <span className="block text-[11px] text-[#64748b]">77 Battery Cages · 7,390 Birds</span>
            </div>
          </div>
          <button 
            onClick={() => setShowPricePicker(true)}
            className="text-[12px] font-semibold text-[#1d4ed8] bg-[#eff6ff] hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors"
          >
            ₦{(feedPrice / 1000).toFixed(1)}k/bag ▾
          </button>
        </div>

        {/* ================= 2. BODY CONTENT (SCROLLABLE PROGRESSIVE TABS) ================= */}
        <div className="flex-1 overflow-y-auto">

          {/* ================= TAB 1: THE CORE FINANCIAL & BIOLOGICAL PULSE ================= */}
          {tab === "pulse" && (
            <div className="flex flex-col">
              {/* Primary Anchor Headline: Cold Truth */}
              <div className="px-6 pt-5 pb-2">
                <span className="text-[13px] font-medium text-[#64748b] block">Net Operating Feed Margin</span>
                <div className="flex items-baseline gap-2 mt-2 mb-1.5">
                  <span className="text-[54px] font-extrabold tracking-[-2px] leading-none text-[#0f172a]">
                    ₦{(netFeedMargin / 1000).toFixed(0)}k
                  </span>
                  <span className="text-[17px] font-semibold text-[#64748b]">
                    / {totalCrates} crates
                  </span>
                </div>
                <span className="text-[13.5px] text-[#64748b]">
                  ₦{(grossEggCash / 1000000).toFixed(2)}M egg sales minus 31 bags feed burn @ ₦{(feedPrice / 1000).toFixed(1)}k
                </span>

                {/* WhatsApp Primary Dispatch */}
                <button 
                  onClick={copyWhatsApp}
                  className="w-full mt-5 h-12 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-[0.99] transition-all shadow-xs"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/>
                  </svg>
                  {copied ? "Copied EOD slip to clipboard! ✓" : "Send WhatsApp EOD slip"}
                </button>
              </div>

              {/* The 4 Cold Truth Metrics Cards */}
              <div className="grid grid-cols-2 gap-3 px-6 pt-4">
                <div className="rounded-2xl p-4 bg-[#f8fafc] border border-slate-200/80 text-left">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Gross Egg Cash</span>
                  <b className="block text-[21px] font-bold text-[#0f172a] tracking-tight mb-0.5">
                    ₦{grossEggCash.toLocaleString()}
                  </b>
                  <span className="text-[12px] text-[#64748b] block">{totalCrates} crates collected</span>
                </div>

                <div className="rounded-2xl p-4 bg-[#f8fafc] border border-slate-200/80 text-left">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Feed Cost Burn</span>
                  <b className="block text-[21px] font-bold text-[#b91c1c] tracking-tight mb-0.5">
                    ₦{feedCostBurn.toLocaleString()}
                  </b>
                  <span className="text-[12px] text-[#64748b] block">{bagsFedToday} bags eaten today</span>
                </div>

                <div className="rounded-2xl p-4 bg-[#eff6ff] border border-blue-200/80 text-left">
                  <span className="text-[11px] font-bold text-blue-500 uppercase tracking-wider block mb-1">True Unit Cost</span>
                  <b className="block text-[21px] font-bold text-[#1e3a8a] tracking-tight mb-0.5">
                    ₦{trueUnitCost.toLocaleString()}
                  </b>
                  <span className="text-[12px] text-blue-700 block">feed cost per crate</span>
                </div>

                <div 
                  onClick={() => setTab("forensics")}
                  className="rounded-2xl p-4 bg-rose-50 border border-rose-200/80 text-left cursor-pointer active:scale-[0.98] transition-transform"
                >
                  <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider block mb-1">Active Pen Leak</span>
                  <b className="block text-[21px] font-bold text-[#b91c1c] tracking-tight mb-0.5">
                    +1.4 bags
                  </b>
                  <span className="text-[12px] text-rose-800 font-semibold block">overfed in Pen 2 (₦20.3k) →</span>
                </div>
              </div>

              {/* Instant Store Runway Strip (Tappable to Store Gauge) */}
              <div 
                onClick={() => setTab("store")}
                className="mx-6 mt-4 p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200/80 flex items-center justify-between cursor-pointer active:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[13px] text-slate-700 font-medium">
                    Store Runway: <b>{bagsPhysicalLeft} bags left</b>
                  </span>
                </div>
                <span className="text-[12px] text-slate-500 font-mono">
                  {storeRunwayDays} days buffer →
                </span>
              </div>

              {/* Egg Grades Breakdown */}
              <div className="px-6 pt-6 pb-2">
                <h3 className="text-[17px] font-bold text-[#0f172a]">Crates by grade</h3>
              </div>

              <div className="divide-y divide-[#f1f5f9] px-6 pb-6">
                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <b className="block text-[14.5px] font-semibold text-[#0f172a]">Large · 82 crates</b>
                    <span className="text-[12.5px] text-[#64748b]">₦5,200/crate · ₦426,400</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">+6.2%</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">vs last wk</span>
                  </div>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <b className="block text-[14.5px] font-semibold text-[#0f172a]">Medium · 65 crates</b>
                    <span className="text-[12.5px] text-[#64748b]">₦5,000/crate · ₦325,000</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full inline-block">-3.8%</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">vs last wk</span>
                  </div>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <b className="block text-[14.5px] font-semibold text-[#0f172a]">Pullet · 35 crates</b>
                    <span className="text-[12.5px] text-[#64748b]">₦4,500/crate · ₦157,500</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">-12.5%</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">vs last wk</span>
                  </div>
                </div>

                <div className="py-3.5 flex items-center justify-between">
                  <div>
                    <b className="block text-[14.5px] font-semibold text-[#0f172a]">Jumbo · 20 crates</b>
                    <span className="text-[12.5px] text-[#64748b]">₦5,600/crate · ₦112,000</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">+4.1%</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">vs last wk</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: THE PEN FORENSIC MATRIX (WHERE IS MONEY LEAKING?) ================= */}
          {tab === "forensics" && (
            <div className="flex flex-col">
              <div className="px-6 pt-5 pb-3">
                <span className="text-[13px] font-medium text-[#64748b] block">Primary Inspection Engine</span>
                <h2 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] mt-0.5">
                  The Pen Forensic Matrix
                </h2>
                <span className="text-[13px] text-[#64748b] block mt-1">
                  Cross-checks daily bags poured against biological appetite limits
                </span>
              </div>

              {/* The Pen Rows (Direct from your exact specification) */}
              <div className="px-6 space-y-3 pb-6">
                
                {/* Pen 1 Card */}
                <div 
                  onClick={() => setActivePenSheet("P1")}
                  className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80 cursor-pointer active:scale-[0.99] transition-transform text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <b className="text-[16px] text-[#0f172a]">Pen 1 (1,920 birds · 20 cages)</b>
                    <span className="text-[12px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">✓ Normal</span>
                  </div>
                  <div className="text-[13.5px] text-slate-600 font-mono flex items-center gap-2 flex-wrap">
                    <span>10 bags</span>
                    <span>→</span>
                    <span>115g/bird</span>
                    <span>→</span>
                    <span>FCR 2.15</span>
                    <span>→</span>
                    <span className="text-emerald-600 font-bold">Optimal</span>
                  </div>
                </div>

                {/* Pen 2 Card: The Active Leak */}
                <div 
                  onClick={() => setActivePenSheet("P2")}
                  className="p-4 rounded-2xl bg-rose-50 border border-rose-300/80 cursor-pointer active:scale-[0.99] transition-transform text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <b className="text-[16px] text-rose-950 font-bold">Pen 2 (1,450 birds · 15 cages)</b>
                    <span className="text-[12px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full animate-pulse">🔴 Overfed / Siphoned</span>
                  </div>
                  <div className="text-[13.5px] text-rose-900 font-mono flex items-center gap-2 flex-wrap mb-2">
                    <span>8 bags</span>
                    <span>→</span>
                    <span className="font-bold underline">138g/bird</span>
                    <span>→</span>
                    <span className="font-bold text-rose-700">+1.4 bags (₦20,300)</span>
                  </div>
                  <div className="text-[12px] text-rose-800 leading-snug bg-white/70 p-2.5 rounded-xl border border-rose-200">
                    ⚠️ At 32°C, 1.9kg hens cannot physically eat 138g. Extra 1.4 bags was siphoned out or spilled. Tap to view Cage Hotspot proof.
                  </div>
                </div>

                {/* Pen 3 Card */}
                <div 
                  onClick={() => setActivePenSheet("P3")}
                  className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80 cursor-pointer active:scale-[0.99] transition-transform text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <b className="text-[16px] text-[#0f172a]">Pen 3 (4,020 birds · 42 cages)</b>
                    <span className="text-[12px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">✓ Normal</span>
                  </div>
                  <div className="text-[13.5px] text-slate-600 font-mono flex items-center gap-2 flex-wrap">
                    <span>13 bags</span>
                    <span>→</span>
                    <span>112g/bird</span>
                    <span>→</span>
                    <span>FCR 2.19</span>
                    <span>→</span>
                    <span className="text-emerald-600 font-bold">Optimal</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= TAB 3: THE STORE & FEED RUNWAY GAUGE ================= */}
          {tab === "store" && (
            <div className="flex flex-col">
              <div className="px-6 pt-5 pb-3">
                <span className="text-[13px] font-medium text-[#64748b] block">Inventory & Theft Prevention</span>
                <h2 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] mt-0.5">
                  The Store Runway Gauge
                </h2>
                <span className="text-[13px] text-[#64748b] block mt-1">
                  Bags Delivered minus Bags Logged = Store Discrepancy
                </span>
              </div>

              <div className="px-6 space-y-4 pb-6">
                {/* Store Stock Card */}
                <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Physical Count Left</span>
                      <b className="text-[32px] font-extrabold text-[#0f172a] leading-tight">{bagsPhysicalLeft} bags</b>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Runway</span>
                      <b className="text-[22px] font-bold text-emerald-600 leading-tight">{storeRunwayDays} days</b>
                    </div>
                  </div>

                  <div className="pt-3 space-y-2 text-[13.5px] text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bags on Delivery Day</span>
                      <b>{bagsOnDelivery} bags</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Bags Fed So Far</span>
                      <b>-{bagsFedSoFar} bags</b>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-[#0f172a]">
                      <span>Expected Balance</span>
                      <span>{bagsOnDelivery - bagsFedSoFar} bags</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Physical Audit Count</span>
                      <span>{bagsPhysicalLeft} bags (0 variance)</span>
                    </div>
                  </div>
                </div>

                {/* Audit Integrity Protection */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 text-[13px] leading-relaxed">
                  <b className="block text-[14px] text-blue-900 mb-1">🔒 Store Lock Integrity</b>
                  If an attendant takes bags without logging them to a pen, the physical count falls below the expected balance, immediately flagging <b>Store Room Pilferage</b> before bags leave the farm gate.
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: PHYSICAL CAGE HOTSPOT & EVIDENCE PROOF ================= */}
          {tab === "proof" && (
            <div className="flex flex-col">
              <div className="px-6 pt-5 pb-3">
                <span className="text-[13px] font-medium text-[#64748b] block">Physical Cage Map & Records</span>
                <h2 className="text-[24px] font-extrabold tracking-tight text-[#0f172a] mt-0.5">
                  Cage Hotspot & Proof
                </h2>
                <span className="text-[13px] text-[#64748b] block mt-1">
                  Direct physical proof: carcass photos & lay timing checks
                </span>
              </div>

              <div className="px-6 space-y-3.5 pb-6">
                
                {/* Active Hotspot Banner */}
                <div 
                  onClick={() => setActiveProofSheet("hotspot_cage4")}
                  className="p-4 rounded-2xl bg-amber-50 border border-amber-300/80 cursor-pointer active:scale-[0.99] transition-transform text-left"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <b className="text-[15.5px] font-bold text-amber-950">Row B · Cage 4 Flagged</b>
                    <span className="text-[11.5px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">3 Mortalities</span>
                  </div>
                  <p className="text-[13px] text-amber-900 leading-snug">
                    Pen 2 · Isa Brown. Tap to inspect the verified post-mortem slit-carcass photo and drinker pressure check.
                  </p>
                </div>

                {/* Lay Timing Integrity Card */}
                <div 
                  onClick={() => setActiveProofSheet("lay_timing")}
                  className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 cursor-pointer active:scale-[0.99] transition-transform text-left"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <b className="text-[15.5px] font-bold text-[#0f172a]">Morning vs. Afternoon Lay Ratio</b>
                    <span className="text-[11.5px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">83% Morning</span>
                  </div>
                  <p className="text-[13px] text-slate-600 leading-snug">
                    168 crates morning (11 AM) vs 34 crates afternoon (4 PM). Normal endocrine ovulation; zero "egg mine" burial detected.
                  </p>
                </div>

                {/* 2-Column Physical Proof Matrix */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div 
                    onClick={() => setActiveProofSheet("carcass_photo")}
                    className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 cursor-pointer active:bg-slate-100 transition-colors text-left"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Carcass Proof</span>
                    <b className="text-[14px] text-[#0f172a] block">Slit-Breast Gate</b>
                    <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">✓ 3 photos locked</span>
                  </div>

                  <div 
                    onClick={() => setActiveProofSheet("cracked_audit")}
                    className="p-3.5 rounded-2xl bg-[#f8fafc] border border-slate-200 cursor-pointer active:bg-slate-100 transition-colors text-left"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Breakage Gate</span>
                    <b className="text-[14px] text-[#0f172a] block">Cracked Count</b>
                    <span className="text-[11px] text-slate-500 block mt-0.5">28 eggs (1.4% safe)</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* ================= 3. BOTTOM TAB BAR (PROGRESSIVE 4-TAB NAVIGATION) ================= */}
        <div className="shrink-0 h-[70px] bg-white border-t border-[#f1f5f9] flex items-start pt-2 px-2 z-10">
          <button 
            onClick={() => setTab("pulse")} 
            className={`flex-1 flex flex-col items-center gap-1 h-13 text-[11px] font-medium transition-colors ${tab === "pulse" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" />
            </svg>
            Pulse
          </button>

          <button 
            onClick={() => setTab("forensics")} 
            className={`flex-1 flex flex-col items-center gap-1 h-13 text-[11px] font-medium transition-colors ${tab === "forensics" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><path d="m14 10-4 4" /><path d="m10 10 4 4" />
            </svg>
            Forensics
          </button>

          <button 
            onClick={() => setTab("store")} 
            className={`flex-1 flex flex-col items-center gap-1 h-13 text-[11px] font-medium transition-colors ${tab === "store" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            Store Gauge
          </button>

          <button 
            onClick={() => setTab("proof")} 
            className={`flex-1 flex flex-col items-center gap-1 h-13 text-[11px] font-medium transition-colors ${tab === "proof" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/>
            </svg>
            Cage Proof
          </button>
        </div>

        {/* ================= 4. PEN FORENSIC DRILL-DOWN SHEET ================= */}
        {activePenSheet && (
          <div 
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center"
            onClick={() => setActivePenSheet(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto text-left"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <b className="text-[17px] text-[#0f172a]">Pen {activePenSheet} Forensic Breakdown</b>
                <button onClick={() => setActivePenSheet(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold">✕</button>
              </div>

              <div className="pt-4 space-y-3.5 text-[14px]">
                {activePenSheet === "P2" ? (
                  <>
                    <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-[13px] leading-relaxed">
                      <b className="block text-rose-900 font-bold mb-1">🔴 The Siphoning Math (138g/bird):</b>
                      1,450 hens in Pen 2 logged 8.0 bags (200kg). Biological maximum for a 1.9kg hen is 115g (6.6 bags). The remaining <b>1.4 bags (35kg / ₦20,300)</b> was physically taken or spilled.
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Pen Housing</span>
                      <b>15 Battery Cages (1,450 birds)</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Egg Output</span>
                      <b>46 crates (79.3% HDP)</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Morning Pickup</span>
                      <b>38 crates (82.6% lay ratio)</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Mortality Cluster</span>
                      <b className="text-rose-600">3 birds in Row B · Cage 4</b>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13px] leading-relaxed">
                      <b>✓ Pen 100% Within Biological Standard.</b>
                      <p className="mt-1 text-slate-600">Feed eaten matches breed curves (112g–115g/bird). Zero feed diversion or unrecorded mortality detected.</p>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Flock Capacity</span>
                      <b>{activePenSheet === "P1" ? "20 Cages (1,920 birds)" : "42 Cages (4,020 birds)"}</b>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Daily Intake</span>
                      <b>{activePenSheet === "P1" ? "10 bags (115g/bird · FCR 2.15)" : "13 bags (112g/bird · FCR 2.19)"}</b>
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={() => setActivePenSheet(null)}
                className="w-full mt-5 h-12 rounded-xl bg-slate-900 text-white font-semibold text-[14px]"
              >
                Close Audit
              </button>
            </div>
          </div>
        )}

        {/* ================= 5. PHYSICAL CAGE & PROOF DRILL-DOWN SHEET ================= */}
        {activeProofSheet && (
          <div 
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center"
            onClick={() => setActiveProofSheet(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto text-left"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <b className="text-[17px] text-[#0f172a]">
                  {activeProofSheet === "hotspot_cage4" && "Physical Hotspot: Row B · Cage 4"}
                  {activeProofSheet === "carcass_photo" && "Slit-Carcass Verification Gate"}
                  {activeProofSheet === "lay_timing" && "Lay Timing & Anti-Egg-Mine Check"}
                  {activeProofSheet === "cracked_audit" && "Cracked Egg Loophole Audit"}
                </b>
                <button onClick={() => setActiveProofSheet(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">✕</button>
              </div>

              {activeProofSheet === "hotspot_cage4" && (
                <div className="pt-4 space-y-3.5 text-[14px]">
                  <div className="p-3 rounded-2xl bg-slate-100 aspect-video flex flex-col items-center justify-center text-slate-400 font-mono text-[12px] border border-dashed border-slate-300">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="mt-2 text-slate-600 font-bold">[ Slit Carcass Photo #P2-C4 ]</span>
                    <span className="text-[10px] text-slate-400">Captured Oct 20, 16:42 · GPS Verified on Farm</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Physical Cage Location</span>
                    <b>Pen 2 · Tier 2 · Row B · Cage 4</b>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Mortality Cause Check</span>
                    <b className="text-amber-700">Suspected Nipple Drinker Clog</b>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 text-[12px] text-amber-900 leading-relaxed border border-amber-200">
                    ⚠️ <b>Action Required:</b> Cage 4 had 2 mortalities yesterday and 3 today. Check drinker nipple flow rate (minimum 70ml/min) and adjacent Cage 3 and Cage 5.
                  </div>
                </div>
              )}

              {activeProofSheet === "carcass_photo" && (
                <div className="pt-4 space-y-3 text-[14px]">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-[13px] leading-relaxed">
                    <b>Anti-Roadside-Sale Gate:</b> Farmhands cannot log "mortality" to cover up live bird theft. The app forces a photo of the opened/slit carcass before the daily record locks.
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Photos Logged Today</span>
                    <b className="text-emerald-700">3 verified carcasses</b>
                  </div>
                </div>
              )}

              {activeProofSheet === "lay_timing" && (
                <div className="pt-4 space-y-3 text-[14px]">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800">
                      <span className="block text-[11px]">Morning (11 AM)</span>
                      <b className="text-[18px]">168 crates (83%)</b>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 text-slate-800">
                      <span className="block text-[11px]">Afternoon (4 PM)</span>
                      <b className="text-[18px]">34 crates (17%)</b>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-600">
                    Hens lay 80%+ before noon. When farmhands bury crates in litter ("egg mines"), morning pickup drops abnormally. Today is clean.
                  </div>
                </div>
              )}

              {activeProofSheet === "cracked_audit" && (
                <div className="pt-4 space-y-3 text-[14px]">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13px]">
                    <b>✓ Breakage Rate: 1.4% (28 eggs)</b>
                    <p className="mt-1 text-slate-600">Safe threshold is &lt;1.5%. No staff breakage loophole flagged today.</p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setActiveProofSheet(null)}
                className="w-full mt-5 h-12 rounded-xl bg-slate-900 text-white font-semibold text-[14px]"
              >
                Close Record
              </button>
            </div>
          </div>
        )}

        {/* ================= 6. INTERACTIVE FEED PRICE TOGGLE MODAL ================= */}
        {showPricePicker && (
          <div 
            className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center px-6"
            onClick={() => setShowPricePicker(false)}
          >
            <div 
              className="w-full bg-white rounded-3xl p-6 shadow-2xl text-left"
              onClick={e => e.stopPropagation()}
            >
              <b className="text-[17px] text-[#0f172a] block mb-1">Set Your Feed Bag Price</b>
              <span className="text-[12.5px] text-slate-500 block mb-4">
                Updates all Net Margin, FCR, and Cost/Crate calculations instantly
              </span>

              <div className="space-y-2">
                {[
                  { label: "₦14,500 / bag (Toll / Self-Milled)", val: 14500 },
                  { label: "₦17,500 / bag (Wholesale Depot)", val: 17500 },
                  { label: "₦19,530 / bag (Retail Commercial Mash)", val: 19530 }
                ].map(p => (
                  <button
                    key={p.val}
                    onClick={() => {
                      setFeedPrice(p.val);
                      setShowPricePicker(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border text-[14px] font-semibold flex items-center justify-between transition-all ${
                      feedPrice === p.val 
                        ? "border-blue-600 bg-blue-50/60 text-blue-900" 
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{p.label}</span>
                    {feedPrice === p.val && <span>✓</span>}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowPricePicker(false)}
                className="w-full mt-4 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold text-[13.5px]"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
