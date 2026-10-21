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
  audit: <I d={<><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></>} />
};

export function NigerianOwnerDashboard({ go }: { go: (p: string) => void }) {
  const [tab, setTab] = useState<"home" | "efficiency" | "flocks" | "audit">("home");
  const [drawer, setDrawer] = useState(false);
  const [copied, setCopied] = useState(false);

  // Exact Nigerian egg price matrix
  // Pullet: ₦4,500 | Medium: ₦5,000 | Large: ₦5,200 | Jumbo: ₦5,600
  // Feed: ₦19,530 per 25kg bag (Afrimash/Market baseline)
  // Today's total: 202 crates
  // 35 Pullet crates @ 4,500 = ₦157,500
  // 65 Medium crates @ 5,000 = ₦325,000
  // 82 Large crates @ 5,200 = ₦426,400
  // 20 Jumbo crates @ 5,600 = ₦112,000
  // Total Egg Revenue = ₦1,020,900
  // Feed Eaten = 31 bags @ ₦19,530 = ₦605,430
  // Net Daily Cash over Feed = ₦415,470 (~₦415k)
  // Average Feed Cost per Crate = ₦605,430 / 202 = ₦2,997 / crate
  // Overfed 1.4 bags in Pen 2 = 1.4 * ₦19,530 = ₦27,342

  const waText = `*Adeyemi Farms — EOD Performance Slip*
📅 Today, 19 Oct
🥚 *Production:* 202 crates (81.4% HDP)
• Large: 82 crt (@ ₦5.2k)
• Medium: 65 crt (@ ₦5.0k)
• Pullet: 35 crt (@ ₦4.5k)
• Jumbo: 20 crt (@ ₦5.6k)
💵 *Egg Revenue:* ₦1,020,900
🌾 *Feed Eaten:* 31 bags (₦605,430 @ ₦19.5k)
✨ *Net Feed Margin:* ₦415,470
🎯 *Feed Cost / Crate:* ₦2,997 (Target: ₦2,800)
⚠️ *Alert:* Pen 2 took +1.4 bags variance vs standard (₦27.3k lost).
_Recorded via LayerBook_`;

  const copyWhatsApp = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(waText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div style={{ fontFamily: theme.homeFont }} className="flex-1 flex flex-col min-h-0 bg-white select-none">
      
      {/* 1. QUIET HEADER: AutoBook clean avatar + menu */}
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

        {/* ================= TAB 1: MARGIN (NET CASH OVER FEED) ================= */}
        {tab === "home" && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* The Cash Anchor */}
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Net feed margin today</div>
              <div className="flex items-baseline gap-2 mt-2.5 mb-2">
                <div className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                  ₦415k
                </div>
                <div className="text-[17px] font-semibold text-[#64748b]">
                  / 202 crates sold
                </div>
              </div>
              <div className="text-[15px] text-[#64748b]">Egg sales minus 31 bags feed eaten</div>

              {/* Action: Copy / Send WhatsApp Slip */}
              <button 
                onClick={copyWhatsApp}
                className={theme.btn + " mt-5 flex items-center justify-center gap-2"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9z"/>
                </svg>
                {copied ? "Copied EOD slip to clipboard! ✓" : "Send WhatsApp EOD slip"}
              </button>
            </div>

            {/* Dual Quiet Cards: Real Nigerian Unit Economics */}
            <div className="flex gap-3 px-6 pt-6">
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">₦2,997</b>
                feed cost per crate
              </div>
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#b91c1c] font-bold tracking-[-0.5px] mb-0.5">+1.4 bags</b>
                overfed in Pen 2 (₦27.3k)
              </div>
            </div>

            {/* Up Next: Today's Egg Grades Breakdown */}
            <div className="px-6 pt-6">
              <h3 className="text-[17px] font-bold text-[#0f172a]">Crates by grade</h3>
            </div>

            <div className="pb-4">
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
        )}

        {/* ================= TAB 2: FEED CONVERSION & THEFT DEFENSE ================= */}
        {tab === "efficiency" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Bags-to-crates conversion</div>
              <div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2.5 mb-2 text-[#0f172a]">
                6.51
              </div>
              <div className="text-[15px] text-[#64748b]">Crates produced per 25kg bag of feed</div>
            </div>

            <div className="flex gap-3 px-6 pt-6">
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#b91c1c] font-bold tracking-[-0.5px] mb-0.5">₦27,300</b>
                lost in feed variance this week
              </div>
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">₦19,530</b>
                layer mash bag cost
              </div>
            </div>

            <div className="px-6 pt-8 pb-4">
              <h3 className="text-[17px] font-bold text-[#0f172a] mb-2">Feed variance & overfeeding check</h3>
              
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P1</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 1 · Bovans Brown</b>
                  <span className="text-[13px] text-[#64748b]">10 bags eaten · 65 crates (6.5 crt/bag)</span>
                </div>
                <span className="text-[14px] font-bold text-emerald-600">Optimal</span>
              </div>

              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P2</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 2 · Isa Brown</b>
                  <span className="text-[13px] text-[#b91c1c]">8 bags eaten · 46 crates (+1.4 bags leak)</span>
                </div>
                <span className="text-[14px] font-bold text-[#b91c1c]">+1.4 bags</span>
              </div>

              <div className="flex items-center gap-3.5 h-16">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P3</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 3 · Lohmann Pullets</b>
                  <span className="text-[13px] text-[#64748b]">13 bags eaten · 91 crates (7.0 crt/bag)</span>
                </div>
                <span className="text-[14px] font-bold text-emerald-600">Optimal</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FLOCKS (HEN-DAY PRODUCTION %) ================= */}
        {tab === "flocks" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Farmwide lay rate (HDP)</div>
              <div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2.5 mb-2 text-[#0f172a]">
                81.4%
              </div>
              <div className="text-[15px] text-[#64748b]">Across 7,390 birds in 3 pens</div>
            </div>

            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P1</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 1 · Bovans Brown (Wk 32)</b>
                  <span className="text-[13px] text-[#64748b]">2,440 birds · 65 crates · 1 mort</span>
                </div>
                <b className="text-[15px] text-[#0f172a]">80.5% HDP</b>
              </div>

              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P2</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 2 · Isa Brown (Wk 24)</b>
                  <span className="text-[13px] text-[#64748b]">1,850 birds · 46 crates · 2 mort</span>
                </div>
                <b className="text-[15px] text-[#b91c1c]">74.2% HDP</b>
              </div>

              <div className="flex items-center gap-3.5 h-16">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P3</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 3 · Lohmann Pullets (Wk 18)</b>
                  <span className="text-[13px] text-[#64748b]">3,100 birds · 91 crates · 0 mort</span>
                </div>
                <b className="text-[15px] text-emerald-600">88.0% HDP</b>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: FLOCK LOG (BIOLOGICAL VITALS & FIELD INSPECTION) ================= */}
        {tab === "audit" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-5 pb-3">
              <h2 className="text-[20px] font-bold tracking-tight text-[#0f172a]">Flock Log</h2>
            </div>

            {/* 2-Column Biological Audit Grid - Titles Only */}
            <div className="grid grid-cols-2 gap-4 px-6 pb-6">
              {/* Item 1: Post-Mortem Log (Autopsy & Mortality Cause) */}
              <div role="button" tabIndex={0} className="text-left group cursor-pointer focus:outline-none">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col items-center justify-center shadow-xs transition-all active:scale-[0.98] group-hover:border-slate-300">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0-14 0h14zM12 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
                      <path d="M19 13v6M22 16h-6"/>
                    </svg>
                  </div>
                </div>
                <div className="mt-2.5 px-0.5">
                  <b className="block text-[14px] font-semibold text-[#0f172a] leading-snug">Post-Mortem Log</b>
                </div>
              </div>

              {/* Item 2: Shell & Cracks (Egg Quality / Calcium Audit) */}
              <div role="button" tabIndex={0} className="text-left group cursor-pointer focus:outline-none">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col items-center justify-center shadow-xs transition-all active:scale-[0.98] group-hover:border-slate-300">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12z"/>
                      <path d="M12 9l-2 3 4 2-3 4"/>
                    </svg>
                  </div>
                </div>
                <div className="mt-2.5 px-0.5">
                  <b className="block text-[14px] font-semibold text-[#0f172a] leading-snug">Shell & Cracks</b>
                </div>
              </div>

              {/* Item 3: Flock Uniformity (Body Weight Sampling) */}
              <div role="button" tabIndex={0} className="text-left group cursor-pointer focus:outline-none">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col items-center justify-center shadow-xs transition-all active:scale-[0.98] group-hover:border-slate-300">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                      <path d="M7 21h10"/>
                      <path d="M12 3v18"/>
                      <path d="M3 7h18"/>
                    </svg>
                  </div>
                </div>
                <div className="mt-2.5 px-0.5">
                  <b className="block text-[14px] font-semibold text-[#0f172a] leading-snug">Flock Uniformity</b>
                </div>
              </div>

              {/* Item 4: Water Intake (Early Disease Warning) */}
              <div role="button" tabIndex={0} className="text-left group cursor-pointer focus:outline-none">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col items-center justify-center shadow-xs transition-all active:scale-[0.98] group-hover:border-slate-300">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                    </svg>
                  </div>
                </div>
                <div className="mt-2.5 px-0.5">
                  <b className="block text-[14px] font-semibold text-[#0f172a] leading-snug">Water Intake</b>
                </div>
              </div>

              {/* Item 5: Gut & Droppings (Coccidiosis / Enteritis Check) */}
              <div role="button" tabIndex={0} className="text-left group cursor-pointer focus:outline-none">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col items-center justify-center shadow-xs transition-all active:scale-[0.98] group-hover:border-slate-300">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                      <circle cx="20" cy="10" r="2"/>
                    </svg>
                  </div>
                </div>
                <div className="mt-2.5 px-0.5">
                  <b className="block text-[14px] font-semibold text-[#0f172a] leading-snug">Gut & Droppings</b>
                </div>
              </div>

              {/* Item 6: Vaccine & Bio-Defense */}
              <div role="button" tabIndex={0} className="text-left group cursor-pointer focus:outline-none">
                <div className="w-full aspect-[4/3] rounded-2xl bg-[#f8fafc] border border-slate-200/90 flex flex-col items-center justify-center shadow-xs transition-all active:scale-[0.98] group-hover:border-slate-300">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </div>
                </div>
                <div className="mt-2.5 px-0.5">
                  <b className="block text-[14px] font-semibold text-[#0f172a] leading-snug">Vaccine Schedule</b>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. BOTTOM TAB BAR */}
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
          Feed Check
        </button>

        <button 
          onClick={() => setTab("flocks")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "flocks" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.flocks}
          HDP %
        </button>

        <button 
          onClick={() => setTab("audit")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "audit" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.audit}
          Flock Log
        </button>
      </div>

      {/* 4. SETTINGS DRAWER */}
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
              <div role="button" onClick={() => { setDrawer(false); copyWhatsApp(); }} className="px-6 py-4 flex items-center gap-3">
                <span>📱</span> <span>Copy WhatsApp Daily Slip</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); setTab("efficiency"); }} className="px-6 py-4 flex items-center gap-3">
                <span>🌾</span> <span>Feed Bag Variance & Theft Check</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); setTab("flocks"); }} className="px-6 py-4 flex items-center gap-3">
                <span>🥚</span> <span>Egg Grades & Pricing (Pullet / Med / Lg)</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); setTab("audit"); }} className="px-6 py-4 flex items-center gap-3">
                <span>📄</span> <span>Export Bank-Ready PDF Ledger</span>
              </div>
              <div role="button" onClick={() => { setDrawer(false); go("/log/pen"); }} className="px-6 py-4 flex items-center gap-3">
                <span>✍️</span> <span>Attendant Daily Pen Entry</span>
              </div>
            </div>

            <div className="mt-auto p-6 text-[12px] text-[#94a3b8]">
              LayerBook · Nigeria Commercial Layer Edition
            </div>
          </div>
          <div className="flex-1 bg-black/40" />
        </div>
      )}

    </div>
  );
}
