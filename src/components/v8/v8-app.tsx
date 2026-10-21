"use client";
import React, { useState } from "react";
import { theme } from "@/lib/theme";

const badgeAv = "bg-[#f7f1ea] text-[#78350f]";

export function V8App() {
  const [tab, setTab] = useState<"today" | "pens" | "store" | "health">("today");
  const [drawer, setDrawer] = useState<boolean>(false);
  const [showCrateComparison, setShowCrateComparison] = useState<boolean>(false);
  const [showEggValueModal, setShowEggValueModal] = useState<boolean>(false);
  const [showFeedCostModal, setShowFeedCostModal] = useState<boolean>(false);
  const [showStockValueModal, setShowStockValueModal] = useState<boolean>(false);
  const [showVaccineModal, setShowVaccineModal] = useState<boolean>(false);
  const [showWaterModal, setShowWaterModal] = useState<boolean>(false);
  const [showTempModal, setShowTempModal] = useState<boolean>(false);
  const [showDeliveriesModal, setShowDeliveriesModal] = useState<boolean>(false);
  const [selectedPen, setSelectedPen] = useState<number | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);

  // Baseline feed price (configured in drawer)
  const [feedPrice, setFeedPrice] = useState<number>(14500);
  const [priceDraft, setPriceDraft] = useState<string>("14500");

  const totalCrates = 202;
  const grossEggSales = 1020900;
  const bagsFedToday = 31.4;
  const feedCostToday = Math.round(bagsFedToday * feedPrice);
  const feedCostPerCrate = Math.round(feedCostToday / totalCrates);
  const storeBalance = 92;
  const stockValue = storeBalance * feedPrice;

  return (
    <div className="min-h-dvh flex justify-center bg-[#e5e7eb] font-sans antialiased text-[#0f172a]">
      <div 
        style={{ fontFamily: theme.homeFont }}
        className="relative w-full max-w-[480px] h-dvh bg-white flex flex-col justify-between overflow-hidden select-none shadow-sm"
      >
        
        {/* ================= 1. AUTOBOOK HEADER ================= */}
        <header className="shrink-0 bg-white h-[60px] flex items-center justify-between px-6 pt-2 z-10">
          <button 
            aria-label="Menu" 
            onClick={() => setDrawer(true)} 
            className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold bg-[#f7f1ea] text-[#78350f] active:scale-95 transition-transform"
          >
            AL
          </button>
        </header>

        {/* ================= 2. BODY CONTENT ================= */}
        <main className="flex-1 overflow-y-auto">

          {/* ================= TAB 1: TODAY ================= */}
          {tab === "today" && (
            <div className="flex flex-col">
              
              {/* PRIMARY HERO: TODAY'S COLLECTION */}
              <div className="px-6 pt-4 pb-2">
                <div className="text-[13px] text-[#64748b] font-medium">Today's Collection</div>
                <div className="flex items-baseline gap-3 mt-2 mb-1 flex-wrap">
                  <span className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                    {totalCrates} crates
                  </span>
                  <button 
                    onClick={() => setShowCrateComparison(true)}
                    className="inline-flex items-center text-[13.5px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full cursor-pointer active:scale-95 transition-transform"
                    title="Tap to view comparison"
                  >
                    ↓ 2.4%
                  </button>
                </div>
              </div>

              {/* DUAL CARDS (CLEAN & BRIGHT - CLICKABLE DRILLDOWN) */}
              <div className="flex gap-3 px-6 pt-5 pb-3">
                <div 
                  onClick={() => setShowEggValueModal(true)}
                  className={`flex-1 text-left rounded-2xl px-5 py-4 ${theme.card} cursor-pointer active:scale-[0.98] transition-transform`}
                >
                  <span className="text-[13px] text-[#64748b] block font-medium mb-1">
                    Egg Value
                  </span>
                  <b className="block text-[25px] text-[#0f172a] font-bold tracking-tight">
                    ₦{grossEggSales.toLocaleString()}
                  </b>
                </div>

                <div 
                  onClick={() => setShowFeedCostModal(true)}
                  className={`flex-1 text-left rounded-2xl px-5 py-4 ${theme.card} cursor-pointer active:scale-[0.98] transition-transform`}
                >
                  <span className="text-[13px] text-[#64748b] block font-medium mb-1">
                    Feed Cost
                  </span>
                  <b className="block text-[25px] text-[#0f172a] font-bold tracking-tight">
                    ₦{feedCostToday.toLocaleString()}
                  </b>
                </div>
              </div>

              {/* SECTION: CRATES BY GRADE */}
              <div className="px-6 pt-5 pb-1">
                <h3 className="text-[17px] font-bold text-[#0f172a]">Crates by grade</h3>
              </div>

              {/* LIST (PURE AUTOBOOK STYLE: AVATAR + CRATES + WOW %) */}
              <div className="divide-y divide-[#f1f5f9] px-6">
                
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${badgeAv}`}>
                      LG
                    </span>
                    <b className="text-[15px] font-semibold text-[#0f172a]">Large · 82 crates</b>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-[12.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +6.2%
                    </span>
                    <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${badgeAv}`}>
                      MD
                    </span>
                    <b className="text-[15px] font-semibold text-[#0f172a]">Medium · 65 crates</b>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-[12.5px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      -3.8%
                    </span>
                    <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${badgeAv}`}>
                      PL
                    </span>
                    <b className="text-[15px] font-semibold text-[#0f172a]">Pullet · 35 crates</b>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-[12.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      -12.5%
                    </span>
                    <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${badgeAv}`}>
                      JB
                    </span>
                    <b className="text-[15px] font-semibold text-[#0f172a]">Jumbo · 20 crates</b>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-[12.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +4.1%
                    </span>
                    <span className="block text-[10px] text-[#94a3b8] mt-0.5">vs last wk</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 2: PENS ================= */}
          {tab === "pens" && (
            <div className="flex flex-col">
              
              {/* PRIMARY HERO: ACTIVE FLOCK */}
              <div className="px-6 pt-4 pb-2">
                <div className="text-[13px] text-[#64748b] font-medium">Active Flock</div>
                <div className="mt-2 mb-1">
                  <span className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                    7,390 birds
                  </span>
                </div>
              </div>

              {/* SECTION: PENS LIST */}
              <div className="px-6 pt-5 pb-1">
                <h3 className="text-[17px] font-bold text-[#0f172a]">Pens breakdown</h3>
              </div>

              {/* CARDS */}
              <div className="px-6 pt-2 space-y-3 pb-8">
                
                {/* Pen 1 */}
                <div 
                  onClick={() => setSelectedPen(1)}
                  className={`p-4 rounded-2xl ${theme.card} cursor-pointer active:scale-[0.99] transition-transform text-left`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <b className="text-[15.5px] text-[#0f172a] font-semibold">Pen 1 · 1,920 birds</b>
                    <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Normal
                    </span>
                  </div>
                  <div className="text-[13.5px] text-[#64748b]">
                    54 crates · 84.4% lay
                  </div>
                </div>

                {/* Pen 2 (Flagged) */}
                <div 
                  onClick={() => setSelectedPen(2)}
                  className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/90 cursor-pointer active:scale-[0.99] transition-transform text-left"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <b className="text-[15.5px] text-amber-950 font-bold">Pen 2 · 1,450 birds</b>
                    <span className="text-[12px] font-bold text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
                      Check
                    </span>
                  </div>
                  <div className="text-[13.5px] text-amber-900/80">
                    38 crates · 78.6% lay
                  </div>
                </div>

                {/* Pen 3 */}
                <div 
                  onClick={() => setSelectedPen(3)}
                  className={`p-4 rounded-2xl ${theme.card} cursor-pointer active:scale-[0.99] transition-transform text-left`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <b className="text-[15.5px] text-[#0f172a] font-semibold">Pen 3 · 4,020 birds</b>
                    <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Normal
                    </span>
                  </div>
                  <div className="text-[13.5px] text-[#64748b]">
                    110 crates · 82.1% lay
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 3: STORE ================= */}
          {tab === "store" && (
            <div className="flex flex-col">
              
              {/* PRIMARY HERO: FEED STORE */}
              <div className="px-6 pt-4 pb-2">
                <div className="text-[13px] text-[#64748b] font-medium">Feed Store</div>
                <div className="flex items-baseline gap-2 mt-2 mb-1 flex-wrap">
                  <span className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                    92 bags
                  </span>
                  <span className="text-[20px] font-semibold text-[#64748b]">
                    / 2.3 tonnes
                  </span>
                </div>
                <div className="text-[15px] text-[#64748b]">
                  ~3 days left
                </div>
              </div>

              {/* DUAL CARDS: STOCK VALUE & AVG DAILY BURN */}
              <div className="flex gap-3 px-6 pt-5 pb-3">
                <div 
                  onClick={() => setShowStockValueModal(true)}
                  className={`flex-1 text-left rounded-2xl px-5 py-4 ${theme.card} cursor-pointer active:scale-[0.98] transition-transform`}
                >
                  <span className="text-[13px] text-[#64748b] block font-medium mb-1">
                    Stock Value
                  </span>
                  <b className="block text-[24px] text-[#0f172a] font-bold tracking-tight">
                    ₦{stockValue.toLocaleString()}
                  </b>
                </div>

                <div 
                  onClick={() => setShowFeedCostModal(true)}
                  className={`flex-1 text-left rounded-2xl px-5 py-4 ${theme.card} cursor-pointer active:scale-[0.98] transition-transform`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[13px] text-[#64748b] font-medium">
                      Avg Daily Burn
                    </span>
                    <span className="text-[11.5px] font-semibold text-rose-600">
                      ↑ 3.2%
                    </span>
                  </div>
                  <b className="block text-[24px] text-[#0f172a] font-bold tracking-tight">
                    ₦{feedCostToday.toLocaleString()}
                  </b>
                </div>
              </div>

              {/* SECTION: RECENT DELIVERIES */}
              <div className="flex items-center justify-between px-6 pt-5 pb-1">
                <h3 className="text-[17px] font-bold text-[#0f172a]">Recent deliveries</h3>
                <button 
                  onClick={() => setShowDeliveriesModal(true)}
                  className="text-[13px] font-semibold text-[#78350f] cursor-pointer active:opacity-70"
                >
                  See all
                </button>
              </div>

              {/* LIST */}
              <div className="divide-y divide-[#f1f5f9] px-6 pb-8">
                
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${badgeAv}`}>
                      19
                    </span>
                    <div>
                      <b className="block text-[15px] font-semibold text-[#0f172a]">Mon, 19 Oct · Toll Mash</b>
                      <span className="text-[12.5px] text-[#64748b]">₦14,500 / bag</span>
                    </div>
                  </div>
                  <b className="text-[15px] font-semibold text-[#0f172a]">120 bags</b>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${badgeAv}`}>
                      15
                    </span>
                    <div>
                      <b className="block text-[15px] font-semibold text-[#0f172a]">Thu, 15 Oct · Toll Mash</b>
                      <span className="text-[12.5px] text-[#64748b]">₦14,500 / bag</span>
                    </div>
                  </div>
                  <b className="text-[15px] font-semibold text-[#0f172a]">100 bags</b>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${badgeAv}`}>
                      12
                    </span>
                    <div>
                      <b className="block text-[15px] font-semibold text-[#0f172a]">Mon, 12 Oct · Toll Mash</b>
                      <span className="text-[12.5px] text-[#64748b]">₦14,500 / bag</span>
                    </div>
                  </div>
                  <b className="text-[15px] font-semibold text-[#0f172a]">120 bags</b>
                </div>

              </div>

            </div>
          )}

          {/* ================= TAB 4: HEALTH (2x2 COLORFUL VITALS GRID + BANNER) ================= */}
          {tab === "health" && (
            <div className="flex flex-col px-6 pt-4 pb-8">
              
              {/* HEADER */}
              <div className="pb-4">
                <div className="text-[13px] text-[#64748b] font-medium">Biological Status</div>
                <h2 className="text-[34px] font-bold tracking-[-1px] text-[#0f172a] mt-1">
                  Flock Vitals
                </h2>
              </div>

              {/* 2x2 VITALS GRID */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* Card 1: Water Intake (Sky Blue) */}
                <div 
                  onClick={() => setShowWaterModal(true)}
                  className="rounded-2xl p-4 bg-[#f8fafc] border border-[#e2e8f0] cursor-pointer active:scale-[0.98] transition-transform flex flex-col justify-between min-h-[138px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                    </span>
                    <span className="text-[11.5px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                      2.0 L/kg
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[13px] text-[#64748b] font-medium block">Water Intake</span>
                    <b className="block text-[26px] text-[#0f172a] font-bold tracking-tight leading-tight mt-0.5">
                      1,570 L
                    </b>
                  </div>
                </div>

                {/* Card 2: Peak Temp (Emerald Green - Normal) */}
                <div 
                  onClick={() => setShowTempModal(true)}
                  className="rounded-2xl p-4 bg-[#f8fafc] border border-[#e2e8f0] cursor-pointer active:scale-[0.98] transition-transform flex flex-col justify-between min-h-[138px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
                      </svg>
                    </span>
                    <span className="text-[11.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Normal
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[13px] text-[#64748b] font-medium block">Peak Temp</span>
                    <b className="block text-[26px] text-[#0f172a] font-bold tracking-tight leading-tight mt-0.5">
                      29°C
                    </b>
                  </div>
                </div>

                {/* Card 3: Shell Cracks (Amber - Watch) */}
                <div 
                  className="rounded-2xl p-4 bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between min-h-[138px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22c4.97 0 9-3.58 9-8 0-5.5-4.5-12-9-12S3 8.5 3 14c0 4.42 4.03 8 9 8Z" />
                        <path d="m13 8-2 4 3 1-2 4" />
                      </svg>
                    </span>
                    <span className="text-[11.5px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      ↑ 4%
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[13px] text-[#64748b] font-medium block">Shell Cracks</span>
                    <b className="block text-[26px] text-[#0f172a] font-bold tracking-tight leading-tight mt-0.5">
                      42 eggs
                    </b>
                  </div>
                </div>

                {/* Card 4: Gut & Droppings (Rose - Alert in Pen 2) */}
                <div 
                  className="rounded-2xl p-4 bg-[#f8fafc] border border-[#e2e8f0] flex flex-col justify-between min-h-[138px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                        <circle cx="20" cy="10" r="2" />
                      </svg>
                    </span>
                    <span className="text-[11.5px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                      Pen 2
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[13px] text-[#64748b] font-medium block">Gut & Droppings</span>
                    <b className="block text-[24px] text-[#0f172a] font-bold tracking-tight leading-tight mt-0.5">
                      Watery
                    </b>
                  </div>
                </div>

              </div>

              {/* SECTION: UPCOMING VACCINATIONS & CARE */}
              <div className="flex items-center justify-between pt-8 pb-2">
                <h3 className="text-[17px] font-bold text-[#0f172a]">Upcoming vaccinations</h3>
                <button 
                  onClick={() => setShowVaccineModal(true)}
                  className="text-[13px] font-semibold text-[#78350f] cursor-pointer active:opacity-70"
                >
                  See all
                </button>
              </div>

              <div className="divide-y divide-[#f1f5f9]">
                <div className="flex items-center justify-between py-3.5">
                  <div>
                    <b className="block text-[15px] font-semibold text-[#0f172a]">Vitalyte · Anti-stress</b>
                    <span className="text-[12.5px] text-[#64748b]">Drinking water · Pen 2</span>
                  </div>
                  <span className="text-[12.5px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    Day 2 of 3
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5">
                  <div>
                    <b className="block text-[15px] font-semibold text-[#0f172a]">Lasota · NDV Booster</b>
                    <span className="text-[12.5px] text-[#64748b]">All pens · Drinking water</span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#0f172a]">
                    In 4 days
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5">
                  <div>
                    <b className="block text-[15px] font-semibold text-[#0f172a]">Toxin Binder · Mycotoxin</b>
                    <span className="text-[12.5px] text-[#64748b]">All pens · Feed mix</span>
                  </div>
                  <span className="text-[13px] font-medium text-[#64748b]">
                    5 Nov
                  </span>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* ================= 3. AUTOBOOK BOTTOM TABS ================= */}
        <nav className="shrink-0 h-[64px] bg-white border-t border-[#f1f5f9] px-4 flex items-center justify-between z-10">
          <button 
            onClick={() => setTab("today")}
            className={`flex flex-col items-center gap-1 flex-1 text-[11px] font-medium transition-colors ${
              tab === "today" ? "text-[#78350f] font-bold" : "text-[#94a3b8]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 2v4" />
              <path d="M16 2v4" />
            </svg>
            <span>Today</span>
          </button>

          <button 
            onClick={() => setTab("pens")}
            className={`flex flex-col items-center gap-1 flex-1 text-[11px] font-medium transition-colors ${
              tab === "pens" ? "text-[#78350f] font-bold" : "text-[#94a3b8]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 7h.01" />
              <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 18" />
              <path d="m20 7 2 .5-2 .5" />
              <path d="M10 18v3" />
              <path d="M14 17.75V21" />
              <path d="M7 18a6 6 0 0 0 3.84-10.61" />
            </svg>
            <span>Pens</span>
          </button>

          <button 
            onClick={() => setTab("store")}
            className={`flex flex-col items-center gap-1 flex-1 text-[11px] font-medium transition-colors ${
              tab === "store" ? "text-[#78350f] font-bold" : "text-[#94a3b8]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span>Store</span>
          </button>

          <button 
            onClick={() => setTab("health")}
            className={`flex flex-col items-center gap-1 flex-1 text-[11px] font-medium transition-colors ${
              tab === "health" ? "text-[#78350f] font-bold" : "text-[#94a3b8]"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span>Health</span>
          </button>
        </nav>

        {/* ================= 4. AUTOBOOK DRAWER (SETTINGS & METADATA) ================= */}
        {drawer && (
          <div 
            className="absolute inset-0 z-50 bg-white flex flex-col justify-between p-6 animate-in fade-in duration-200"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[#78350f] bg-[#f7f1ea] text-[15px]">
                    AL
                  </span>
                  <b className="block text-[18px] text-[#0f172a] font-bold">Adeyemi Layers</b>
                </div>
                <button 
                  onClick={() => setDrawer(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center active:scale-95 transition-transform"
                >
                  ✕
                </button>
              </div>

              {/* Clean Single-Word Menu Items */}
              <div className="py-4 divide-y divide-slate-100">
                <div className="py-4 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <span className="text-[17px] text-[#0f172a] font-semibold">Profile</span>
                </div>

                <div className="py-4 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <span className="text-[17px] text-[#0f172a] font-semibold">Flock</span>
                </div>

                <div className="py-4 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <span className="text-[17px] text-[#0f172a] font-semibold">Staff</span>
                </div>

                <div className="py-4 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <span className="text-[17px] text-[#0f172a] font-semibold">Settings</span>
                </div>
              </div>
            </div>

            <div className="text-[12.5px] text-slate-400 pt-4 border-t border-slate-100">
              Prototype powered by{" "}
              <a 
                href="https://emu.network" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-[#78350f] hover:underline"
              >
                emu.network
              </a>
            </div>
          </div>
        )}

        {/* ================= 5. CRATE COMPARISON SHEET ================= */}
        {showCrateComparison && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setShowCrateComparison(false)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Weekly Comparison</h3>
                  <span className="text-[12px] text-[#64748b]">Same-day lay performance</span>
                </div>
                <button 
                  onClick={() => setShowCrateComparison(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Today (Tue, 20 Oct):</span>
                  <b className="text-[#0f172a]">202 crates</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Last Tuesday (13 Oct):</span>
                  <b className="text-slate-700">207 crates</b>
                </div>
                <div className="flex justify-between pt-1 font-semibold">
                  <span className="text-slate-600">Difference:</span>
                  <span className="text-rose-600 font-bold">-5 crates (↓ 2.4%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. PEN DETAIL DRILLDOWN SHEET ================= */}
        {selectedPen && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setSelectedPen(null)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Pen {selectedPen} Details</h3>
                  <span className="text-[12px] text-[#64748b]">
                    {selectedPen === 1 ? "1,920 birds · 20 cages" : selectedPen === 2 ? "1,450 birds · 15 cages" : "4,020 birds · 42 cages"}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedPen(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3 text-[13.5px]">
                {selectedPen === 2 ? (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Supervisor on duty:</span>
                      <b className="text-[#0f172a]">Musa Ibrahim</b>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Expected feed:</span>
                      <span className="text-slate-700">~6.6 bags (115g/bird)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Actual logged:</span>
                      <b className="text-amber-900 font-bold">8.0 bags (+1.4 extra)</b>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <div>
                        <span className="text-slate-500 block">Dead birds logged:</span>
                        <span className="text-[12px] text-red-600 font-medium">3 birds in Row B · Cage 4</span>
                      </div>
                      <button 
                        onClick={() => setShowPhotoModal(true)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[12px] transition-colors"
                      >
                        View Photo
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Status:</span>
                      <b className="text-emerald-700">Normal (Within standard)</b>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Feed consumed:</span>
                      <b className="text-[#0f172a]">{selectedPen === 1 ? "10 bags (115g/bird)" : "13 bags (112g/bird)"}</b>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Eggs collected:</span>
                      <b className="text-[#0f172a]">{selectedPen === 1 ? "54 crates" : "110 crates"}</b>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Mortality:</span>
                      <b className="text-slate-700">0 birds</b>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. CARCASS PHOTO MODAL ================= */}
        {showPhotoModal && (
          <div 
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-5"
            onClick={() => setShowPhotoModal(false)}
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
                <button onClick={() => setShowPhotoModal(false)} className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center">✕</button>
              </div>

              <div className="py-4 space-y-2">
                <div className="h-36 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-1">
                  <span className="text-[24px]">📸</span>
                  <span className="text-[11px] font-medium text-slate-600">Slit-Keel Timestamped Photo</span>
                  <span className="text-[10px] text-slate-400">08:24 AM · Musa Ibrahim</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Photo verification ensures live healthy hens are not removed under fake mortality claims.
                </p>
              </div>

              <button 
                onClick={() => setShowPhotoModal(false)}
                className="w-full h-10 rounded-xl bg-[#0f172a] text-white font-medium text-[13px]"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ================= 8. EGG VALUE BREAKDOWN SHEET ================= */}
        {showEggValueModal && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setShowEggValueModal(false)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Egg Value Breakdown</h3>
                  <span className="text-[12px] text-[#64748b]">Same-day comparison</span>
                </div>
                <button 
                  onClick={() => setShowEggValueModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Today (202 crates):</span>
                  <b className="text-[#0f172a]">₦1,020,900</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Last Tuesday (207 crates):</span>
                  <b className="text-slate-700">₦1,045,350</b>
                </div>
                <div className="flex justify-between pt-1 font-semibold">
                  <span className="text-slate-600">Difference:</span>
                  <span className="text-rose-600 font-bold">-₦24,450 (↓ 2.3%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 9. FEED COST BREAKDOWN SHEET ================= */}
        {showFeedCostModal && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setShowFeedCostModal(false)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Feed Cost Breakdown</h3>
                  <span className="text-[12px] text-[#64748b]">Same-day comparison</span>
                </div>
                <button 
                  onClick={() => setShowFeedCostModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Today (785 kg / 31.4 bags):</span>
                  <b className="text-[#0f172a]">₦455,300</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Last Tuesday (762 kg / 30.5 bags):</span>
                  <b className="text-slate-700">₦441,960</b>
                </div>
                <div className="flex justify-between pt-1 font-semibold">
                  <span className="text-slate-600">Difference (+23 kg):</span>
                  <span className="text-rose-600 font-bold">+₦13,340 (↑ 3.0%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 10. STOCK VALUATION SHEET ================= */}
        {showStockValueModal && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setShowStockValueModal(false)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Feed Stock Valuation</h3>
                  <span className="text-[12px] text-[#64748b]">Current physical inventory</span>
                </div>
                <button 
                  onClick={() => setShowStockValueModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Physical Count:</span>
                  <b className="text-[#0f172a]">{storeBalance} bags</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Metric Weight:</span>
                  <b className="text-[#0f172a]">2.3 tonnes (2,300 kg)</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Cost per 25kg Bag:</span>
                  <b className="text-[#0f172a]">₦{feedPrice.toLocaleString()}</b>
                </div>
                <div className="flex justify-between pt-1 font-semibold">
                  <span className="text-slate-600">Total Valuation:</span>
                  <b className="text-[#78350f] text-[15px]">₦{stockValue.toLocaleString()}</b>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 11. STILL COOKING SHEET (FOR "SEE ALL") ================= */}
        {(showVaccineModal || showDeliveriesModal) && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => {
              setShowVaccineModal(false);
              setShowDeliveriesModal(false);
            }}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-center shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button 
                  onClick={() => {
                    setShowVaccineModal(false);
                    setShowDeliveriesModal(false);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-6 flex flex-col items-center">
                {/* Fun Animated Cooking Pot & Bouncing Egg SVG */}
                <div className="w-24 h-24 rounded-full bg-[#f7f1ea] flex items-center justify-center mb-4">
                  <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                    {/* Rising Steam Waves */}
                    <path d="M22 18C22 14 25 14 25 10" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
                    <path d="M32 16C32 12 35 12 35 8" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" className="animate-bounce" />
                    <path d="M42 18C42 14 45 14 45 10" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" className="animate-pulse" />
                    
                    {/* Bouncing Egg in the Pot */}
                    <g className="animate-bounce" style={{ animationDuration: "1.4s" }}>
                      <ellipse cx="32" cy="30" rx="9" ry="12" fill="#fef3c7" stroke="#78350f" strokeWidth="2.5" />
                      <circle cx="32" cy="31" r="4" fill="#f59e0b" />
                    </g>

                    {/* Cooking Pot Body */}
                    <path d="M14 34H50V44C50 50.6274 44.6274 56 38 56H26C19.3726 56 14 50.6274 14 44V34Z" fill="#78350f" />
                    <path d="M10 34H54" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
                    {/* Pot Handles */}
                    <path d="M14 38H9C7.89543 38 7 38.8954 7 40C7 41.1046 7.89543 42 9 42H14" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M50 38H55C56.1046 38 57 38.8954 57 40C57 41.1046 56.1046 42 55 42H50" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>

                <h3 className="text-[19px] font-bold text-[#0f172a]">Still cooking...</h3>
                <p className="text-[13.5px] text-[#64748b] mt-1 max-w-[240px]">
                  Full history logs are simmering in the kitchen for the next release.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= 12. WATER INTAKE DRILLDOWN SHEET ================= */}
        {showWaterModal && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setShowWaterModal(false)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Flock Water Intake</h3>
                  <span className="text-[12px] text-[#64748b]">Hydration and appetite monitoring</span>
                </div>
                <button 
                  onClick={() => setShowWaterModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Today's Consumption:</span>
                  <b className="text-[#0f172a]">1,570 Litres</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Yesterday:</span>
                  <b className="text-slate-700">1,540 Litres</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Water-to-Feed Ratio:</span>
                  <b className="text-emerald-700">2.0 L/kg (Normal)</b>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Nipple Lines:</span>
                  <b className="text-emerald-700">All flowing</b>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 13. PEN TEMPERATURE BREAKDOWN SHEET ================= */}
        {showTempModal && (
          <div 
            className="absolute inset-0 z-50 bg-black/30 backdrop-blur-[2px] flex items-end justify-center"
            onClick={() => setShowTempModal(false)}
          >
            <div 
              className="w-full bg-white rounded-t-3xl p-6 text-left shadow-2xl animate-in slide-in-from-bottom-6 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a]">Afternoon Pen Temperatures</h3>
                  <span className="text-[12px] text-[#64748b]">Recorded at 2:00 PM peak</span>
                </div>
                <button 
                  onClick={() => setShowTempModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-[13.5px]">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Pen 1:</span>
                  <b className="text-emerald-700">29°C (Normal)</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Pen 2 (East sun exposure):</span>
                  <b className="text-amber-800 font-bold">31°C (Warm)</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Pen 3:</span>
                  <b className="text-emerald-700">29°C (Normal)</b>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Heat Stress Alert Line:</span>
                  <span className="text-slate-400">32°C</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
