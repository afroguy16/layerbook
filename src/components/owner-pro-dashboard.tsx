"use client";
import React, { useState } from "react";
import { theme } from "@/lib/theme";

const Chev = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const I = ({ d }: { d: React.ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);

const TAB_ICONS = {
  home: <I d={<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /></>} />,
  efficiency: <I d={<><circle cx="12" cy="12" r="10" /><path d="m14 10-4 4" /><path d="m10 10 4 4" /></>} />,
  flocks: <I d={<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>} />,
  audit: <I d={<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />} />
};

export function OwnerProDashboard({ go }: { go: (p: string) => void }) {
  const [tab, setTab] = useState<"home" | "efficiency" | "flocks" | "audit">("home");
  const [drawer, setDrawer] = useState(false);

  return (
    <div style={{ fontFamily: theme.homeFont }} className="flex-1 flex flex-col min-h-0 bg-white select-none">
      
      {/* 1. AUTBOOK CLEAN HEAD: Quiet floating circle, NO borders, NO heavy title */}
      <div className="shrink-0 bg-white h-[60px] flex items-center justify-between px-6 pt-2">
        <button 
          aria-label="Menu" 
          onClick={() => setDrawer(true)} 
          className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold bg-[#eaf0fe] text-[#1e3a8a]"
        >
          AL
        </button>
        <button 
          aria-label="More" 
          onClick={() => setDrawer(true)} 
          className="w-10 h-10 flex items-center justify-center text-[20px] text-[#94a3b8]"
        >
          ⋮
        </button>
      </div>

      {/* 2. BODY CONTENT */}
      <div className="flex-1 overflow-y-auto">

        {/* ================= TAB 1: HOME (FEED CASH MARGIN) ================= */}
        {tab === "home" && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Hero Metric: Identical typography & layout to AutoBook '12' */}
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Net feed margin today</div>
              <div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2.5 mb-2 text-[#0f172a]">
                ₦392k
              </div>
              <div className="text-[15px] text-[#64748b]">Egg sales minus daily feed spend</div>

              {/* The WhatsApp Ledger Share Pill (AutoBook blue button parity) */}
              <button 
                onClick={() => setDrawer(true)}
                className={theme.btn + " mt-5 flex items-center justify-center gap-2"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/>
                </svg>
                Share daily summary on WhatsApp
              </button>
            </div>

            {/* Dual Cards: AutoBook #f4f6fa soft surface cards with zero borders */}
            <div className="flex gap-3 px-6 pt-6">
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">202</b>
                crates produced today
              </div>
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">₦16k</b>
                feed leaked this week
              </div>
            </div>

            {/* Up Next List: AutoBook DueRow parity */}
            <div className="flex justify-between items-baseline px-6 pt-6">
              <h3 className="text-[17px] font-bold text-[#0f172a]">Active pens</h3>
              <button onClick={() => setTab("flocks")} className="text-[13px] text-[#2563eb] font-semibold min-h-[48px]">
                See all
              </button>
            </div>

            <div className="pb-4">
              <div className="flex items-center gap-3.5 mx-6 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>
                  P1
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block text-[15px] font-semibold text-[#0f172a]">Pen 1</b>
                  <span className="block text-[13px] text-[#64748b] truncate mt-0.5">65 crates · 2,440 Bovans Brown</span>
                </span>
                <Chev />
              </div>

              <div className="flex items-center gap-3.5 mx-6 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>
                  P2
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block text-[15px] font-semibold text-[#0f172a]">Pen 2</b>
                  <span className="block text-[13px] text-[#64748b] truncate mt-0.5">46 crates · 1,850 Isa Brown</span>
                </span>
                <Chev />
              </div>

              <div className="flex items-center gap-3.5 mx-6 h-16">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>
                  P3
                </span>
                <span className="min-w-0 flex-1">
                  <b className="block text-[15px] font-semibold text-[#0f172a]">Pen 3</b>
                  <span className="block text-[13px] text-[#64748b] truncate mt-0.5">91 crates · 3,100 Pullets</span>
                </span>
                <Chev />
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: EFFICIENCY (FCR STORY) ================= */}
        {tab === "efficiency" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Farmwide conversion ratio</div>
              <div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2.5 mb-2 text-[#0f172a]">
                3.94
              </div>
              <div className="text-[15px] text-[#64748b]">kg feed per crate of eggs (target 3.80)</div>
            </div>

            <div className="flex gap-3 px-6 pt-6">
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#b91c1c] font-bold tracking-[-0.5px] mb-0.5">₦16,650</b>
                leaked feed cost this week
              </div>
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">Pen 2</b>
                highest conversion lag
              </div>
            </div>

            <div className="px-6 pt-8 pb-4">
              <h3 className="text-[17px] font-bold text-[#0f172a] mb-2">Pen efficiency ranking</h3>
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P3</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 3 (Pullets)</b>
                  <span className="text-[13px] text-[#64748b]">3.74 kg/crate · Optimal efficiency</span>
                </div>
                <span className="text-[14px] font-bold text-emerald-600">✓ 3.74</span>
              </div>
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P1</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 1 (Bovans)</b>
                  <span className="text-[13px] text-[#64748b]">4.00 kg/crate · ₦8.4k weekly leak</span>
                </div>
                <span className="text-[14px] font-bold text-slate-700">4.00</span>
              </div>
              <div className="flex items-center gap-3.5 h-16">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P2</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 2 (Isa Brown)</b>
                  <span className="text-[13px] text-[#64748b]">4.24 kg/crate · ₦12.4k weekly leak</span>
                </div>
                <span className="text-[14px] font-bold text-[#dc2626]">4.24</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FLOCKS (PENS LIST) ================= */}
        {tab === "flocks" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Total active layers</div>
              <div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2.5 mb-2 text-[#0f172a]">
                7,390
              </div>
              <div className="text-[15px] text-[#64748b]">Across 3 production pens</div>
            </div>

            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P1</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 1 · Bovans Brown</b>
                  <span className="text-[13px] text-[#64748b]">2,440 birds · 80.5% lay · 65 crates</span>
                </div>
                <b className="text-[15px] text-emerald-600">+₦24k</b>
              </div>
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P2</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 2 · Isa Brown</b>
                  <span className="text-[13px] text-[#64748b]">1,850 birds · 74.2% lay · 46 crates</span>
                </div>
                <b className="text-[15px] text-emerald-600">+₦16k</b>
              </div>
              <div className="flex items-center gap-3.5 h-16">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P3</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 3 · Lohmann Pullets</b>
                  <span className="text-[13px] text-[#64748b]">3,100 birds · 88.0% lay · 91 crates</span>
                </div>
                <b className="text-[15px] text-emerald-600">+₦42k</b>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: AUDIT (IN-HOUSE LEDGER) ================= */}
        {tab === "audit" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">90-Day flock survival</div>
              <div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2.5 mb-2 text-[#0f172a]">
                99.1%
              </div>
              <div className="text-[15px] text-[#64748b]">Certified by immutable daily logs</div>

              <button 
                onClick={() => setDrawer(true)}
                className={theme.btn + " mt-5 flex items-center justify-center gap-2"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Export internal audit statement (PDF)
              </button>
            </div>

            <div className="flex gap-3 px-6 pt-6">
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">81.4%</b>
                average 90-day lay rate
              </div>
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">₦1.18M</b>
                monthly net feed margin
              </div>
            </div>

            <div className="px-6 pt-8 pb-4">
              <h3 className="text-[17px] font-bold text-[#0f172a] mb-2">Verified quarterly records</h3>
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>Q3</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Q3 Complete Statement</b>
                  <span className="text-[13px] text-[#64748b]">54,200 crates · ₦3.4M net margin</span>
                </div>
                <Chev />
              </div>
              <div className="flex items-center gap-3.5 h-16">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>Q2</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Q2 Complete Statement</b>
                  <span className="text-[13px] text-[#64748b]">51,800 crates · ₦3.1M net margin</span>
                </div>
                <Chev />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. AUTBOOK BOTTOM NAV: Clean, delicate, 72px */}
      <div className="shrink-0 h-[72px] bg-white border-t border-[#f1f5f9] flex items-start pt-2 px-2 z-10">
        <button 
          onClick={() => setTab("home")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "home" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.home}
          Margin
        </button>

        <button 
          onClick={() => setTab("efficiency")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "efficiency" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.efficiency}
          FCR
        </button>

        <button 
          onClick={() => setTab("flocks")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "flocks" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.flocks}
          Pens
        </button>

        <button 
          onClick={() => setTab("audit")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "audit" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.audit}
          Audit
        </button>
      </div>

      {/* 4. AUTBOOK SIDE DRAWER */}
      {drawer && (
        <div className="absolute inset-0 z-50 flex" onClick={() => setDrawer(false)}>
          <div 
            className="w-[80%] max-w-[320px] bg-white h-full flex flex-col shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className={`${theme.header} px-6 pt-8 pb-4`}>
              <div className="text-[18px] font-bold text-[#0f172a]">Adeyemi Commercial Layers</div>
              <div className={`text-[13px] ${theme.headerSub}`}>Segun Adeyemi · Farm Owner</div>
            </div>

            <div className="divide-y divide-[#f1f5f9] text-[15px]">
              <div role="button" onClick={() => { setDrawer(false); setTab("home"); }} className="px-6 py-4 flex items-center gap-3">
                <span>💰</span> <span>Daily Feed Margin</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); setTab("efficiency"); }} className="px-6 py-4 flex items-center gap-3">
                <span>📊</span> <span>Feed Conversion Ratio (FCR)</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); setTab("flocks"); }} className="px-6 py-4 flex items-center gap-3">
                <span>🐓</span> <span>Pens & Flocks</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); setTab("audit"); }} className="px-6 py-4 flex items-center gap-3">
                <span>📄</span> <span>Export Audit Statement (PDF)</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); go("/log/pen"); }} className="px-6 py-4 flex items-center gap-3">
                <span>✍️</span> <span>Log Daily Pen Record</span>
              </div>
            </div>

            <div className="mt-auto p-6 text-[12px] text-[#94a3b8]">
              LayerBook · AutoBook Design Parity
            </div>
          </div>
          <div className="flex-1 bg-black/40" />
        </div>
      )}

    </div>
  );
}
