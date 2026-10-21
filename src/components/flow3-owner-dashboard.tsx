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

export function Flow3OwnerDashboard({ go }: { go: (p: string) => void }) {
  const [tab, setTab] = useState<"home" | "efficiency" | "flocks" | "audit">("home");
  const [drawer, setDrawer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [activePenAudit, setActivePenAudit] = useState<string | null>(null);

  // Exact ₦14,500 / bag reality (Builder & Toll-Milling baseline)
  // 31 bags @ ₦14,500 = ₦449,500
  // Revenue = 202 crates (82 LG @ ₦5.2k, 65 MD @ ₦5.0k, 35 PL @ ₦4.5k, 20 JB @ ₦5.6k) = ₦1,020,900
  // Net Feed Margin = ₦1,020,900 - ₦449,500 = ₦571,400 (~₦571k)
  // Feed Cost per Crate = ₦449,500 / 202 = ₦2,225
  // Total Egg Mass = (82*1.85) + (65*1.65) + (35*1.35) + (20*2.05) = 151.7 + 107.25 + 47.25 + 41 = 347.2 kg
  // Feed Eaten (kg) = 31 * 25 = 775 kg
  // True FCR = 775 / 347.2 = 2.23 (Healthy commercial range: 2.1 - 2.3)
  // Store inventory: 92 bags remaining (2.9 days runway at 31 bags/day)

  const waText = `*Adeyemi Farms — EOD Performance Slip*
📅 Today, 20 Oct
🥚 *Production:* 202 crates (81.4% HDP)
• Large: 82 crt (+6.2% WoW)
• Medium: 65 crt (-3.8% WoW)
• Pullet: 35 crt (-12.5% WoW)
• Jumbo: 20 crt (+4.1% WoW)
💵 *Egg Revenue:* ₦1,020,900
🌾 *Feed Eaten:* 31 bags (₦449,500 @ ₦14.5k)
✨ *Net Feed Margin:* ₦571,400
🎯 *Feed Cost / Crate:* ₦2,225 (FCR: 2.23)
📦 *Feed Store:* 92 bags left (2.9 days runway)
⚠️ *Alert:* Pen 2 logged +1.4 bags variance (₦20.3k).
_LayerBook Automated Truth Engine_`;

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

      {/* 2. BODY CONTENT (3 LAYERS OF PROGRESSIVE DISCLOSURE) */}
      <div className="flex-1 overflow-y-auto">

        {/* ================= TAB 1: MARGIN & STORE RUNWAY (LAYER 1: 3-SECOND GLANCE) ================= */}
        {tab === "home" && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* The Cash Anchor */}
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Net feed margin today</div>
              <div className="flex items-baseline gap-2 mt-2.5 mb-2">
                <div className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                  ₦571k
                </div>
                <div className="text-[17px] font-semibold text-[#64748b]">
                  / 202 crates sold
                </div>
              </div>
              <div className="text-[15px] text-[#64748b]">Egg sales minus 31 bags feed @ ₦14.5k</div>

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

            {/* Dual Quiet Cards: Unit Economics & Live Store Countdown */}
            <div className="flex gap-3 px-6 pt-6">
              <div 
                onClick={() => setTab("efficiency")}
                className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug cursor-pointer active:scale-[0.99] transition-transform ${theme.card}`}
              >
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">₦2,225</b>
                feed cost per crate · 2.23 FCR
              </div>
              <div 
                onClick={() => setTab("efficiency")}
                className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug cursor-pointer active:scale-[0.99] transition-transform ${theme.card}`}
              >
                <b className="block text-[24px] text-[#b91c1c] font-bold tracking-[-0.5px] mb-0.5">+1.4 bags</b>
                overfed in Pen 2 (₦20.3k leak)
              </div>
            </div>

            {/* Live Feed Store Buffer Strip */}
            <div className="mx-6 mt-3 px-4 py-2.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex items-center justify-between text-[12px]">
              <span className="text-slate-600 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                Feed store: <b>92 bags left</b>
              </span>
              <span className="text-slate-400 font-mono">2.9 days runway</span>
            </div>

            {/* Crates by Grade Breakdown with WoW % pills */}
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

        {/* ================= TAB 2: FEED CONVERSION & THEFT DEFENSE (LAYER 2: 10-SEC FORENSIC AUDIT) ================= */}
        {tab === "efficiency" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">True Feed Conversion (FCR)</div>
              <div className="flex items-baseline gap-2 mt-2 mb-1">
                <div className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                  2.23
                </div>
                <div className="text-[15px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Optimal (2.0–2.3 target)
                </div>
              </div>
              <div className="text-[14px] text-[#64748b]">2.23kg feed consumed to produce 1kg of eggs</div>
            </div>

            <div className="flex gap-3 px-6 pt-6">
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#b91c1c] font-bold tracking-[-0.5px] mb-0.5">₦20,300</b>
                lost in Pen 2 overfeeding today
              </div>
              <div className={`flex-1 text-left rounded-2xl px-4 py-3.5 text-[13px] text-[#64748b] leading-snug ${theme.card}`}>
                <b className="block text-[24px] text-[#1e3a8a] font-bold tracking-[-0.5px] mb-0.5">₦14,500</b>
                your mash cost per bag
              </div>
            </div>

            {/* Forensic Rule 1 Trigger Banner */}
            <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-[13px] leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-800">
                <span>🔴 RULE 1 TRIGGERED: Appetite Ceiling Exceeded</span>
              </div>
              Pen 2 birds logged <b>138g/bird</b> (8 bags for 1,450 hens). A 1.9kg layer hen cannot physically consume 138g in 32°C heat. Extra <b>1.4 bags (₦20,300)</b> was siphoned or spilled.
            </div>

            <div className="px-6 pt-6 pb-4">
              <h3 className="text-[17px] font-bold text-[#0f172a] mb-2">Pen-by-pen intake & theft audit</h3>
              
              <div 
                onClick={() => setActivePenAudit("P1")}
                className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9] cursor-pointer active:bg-slate-50 px-1 -mx-1 rounded-xl"
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P1</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 1 · 20 Cages (1,920 birds)</b>
                  <span className="text-[13px] text-[#64748b]">10 bags · 65 crates (115g/bird · FCR 2.15)</span>
                </div>
                <span className="text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Optimal</span>
              </div>

              <div 
                onClick={() => setActivePenAudit("P2")}
                className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9] cursor-pointer active:bg-slate-50 px-1 -mx-1 rounded-xl"
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P2</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 2 · 15 Cages (1,450 birds)</b>
                  <span className="text-[13px] text-[#b91c1c]">8 bags · 46 crates (138g/bird · +1.4 bags leak)</span>
                </div>
                <span className="text-[13px] font-bold text-[#b91c1c] bg-rose-50 px-2 py-0.5 rounded-md">+1.4 bags</span>
              </div>

              <div 
                onClick={() => setActivePenAudit("P3")}
                className="flex items-center gap-3.5 h-16 cursor-pointer active:bg-slate-50 px-1 -mx-1 rounded-xl"
              >
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P3</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 3 · 42 Cages (4,020 birds)</b>
                  <span className="text-[13px] text-[#64748b]">13 bags · 91 crates (112g/bird · FCR 2.19)</span>
                </div>
                <span className="text-[13px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Optimal</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: FLOCKS, MORNING PICKUP & CAGE HOTSPOTS ================= */}
        {tab === "flocks" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-4">
              <div className="text-[13px] text-[#64748b] font-medium">Farmwide lay rate (HDP)</div>
              <div className="text-[56px] font-bold tracking-[-2px] leading-none mt-2 mb-1 text-[#0f172a]">
                81.4%
              </div>
              <div className="text-[15px] text-[#64748b]">Across 77 cage units (7,390 birds)</div>
            </div>

            {/* Morning vs Afternoon Lay Timing Split (Rule 2 Anti-Egg-Mine Tracker) */}
            <div className="mx-6 mt-5 p-4 rounded-2xl bg-[#f8fafc] border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-slate-700 uppercase tracking-wider">Lay Timing Integrity</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">83% Morning Normal</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[13px] pt-1">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                  <span className="text-slate-500 text-[11px] block">Morning (11 AM Pickup)</span>
                  <b className="text-[18px] text-[#0f172a] font-bold">168 crt</b>
                  <span className="text-[10px] text-emerald-600 block">83.1% of daily total</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                  <span className="text-slate-500 text-[11px] block">Afternoon (4 PM Pickup)</span>
                  <b className="text-[18px] text-[#0f172a] font-bold">34 crt</b>
                  <span className="text-[10px] text-slate-500 block">16.9% of daily total</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                ✓ No morning egg suppression detected. "Egg mine" burial probability: Low.
              </div>
            </div>

            {/* Cage Hotspot Alert Block */}
            <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-[13px] leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                <span>⚠️ CAGE HOTSPOT: Pen 2 · Row B · Cage 4</span>
              </div>
              3 dead birds tagged in <b>Cage 4</b> today. Yesterday logged 2 dead birds in the same cage. Inspect Cage 4 nipple drinker pressure and water flow immediately.
            </div>

            <div className="px-6 pt-6 pb-4">
              <h3 className="text-[17px] font-bold text-[#0f172a] mb-2">Pen flocks & cage capacity</h3>
              
              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P1</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 1 · Bovans (Wk 32)</b>
                  <span className="text-[13px] text-[#64748b]">20 Cages · 1,920 birds · 84.6% HDP</span>
                </div>
                <span className="text-[14px] font-bold text-emerald-600">84.6%</span>
              </div>

              <div className="flex items-center gap-3.5 h-16 border-b border-[#f1f5f9]">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P2</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 2 · Isa Brown (Wk 40)</b>
                  <span className="text-[13px] text-[#64748b]">15 Cages · 1,450 birds · 79.3% HDP</span>
                </div>
                <span className="text-[14px] font-bold text-amber-600">79.3%</span>
              </div>

              <div className="flex items-center gap-3.5 h-16">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 ${theme.homeAv}`}>P3</span>
                <div className="flex-1 min-w-0">
                  <b className="text-[15px] block font-semibold">Pen 3 · Lohmann (Wk 26)</b>
                  <span className="text-[13px] text-[#64748b]">42 Cages · 4,020 birds · 80.8% HDP</span>
                </div>
                <span className="text-[14px] font-bold text-emerald-600">80.8%</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: FLOCK LOG & EVIDENCE (LAYER 3: 30-SEC VISUAL PROOF) ================= */}
        {tab === "audit" && (
          <div className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-5 pb-3">
              <h2 className="text-[20px] font-bold tracking-tight text-[#0f172a]">Flock Log</h2>
              <p className="text-[13px] text-[#64748b] mt-0.5">Physical evidence, carcass audits & clinical checks</p>
            </div>

            {/* 2-Column Biological Audit Grid - Titles Only */}
            <div className="grid grid-cols-2 gap-4 px-6 pb-6">
              {/* Item 1: Post-Mortem Log */}
              <div 
                role="button" 
                tabIndex={0} 
                onClick={() => setSelectedEvidence("post_mortem")}
                className="text-left group cursor-pointer focus:outline-none"
              >
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

              {/* Item 2: Shell & Cracks */}
              <div 
                role="button" 
                tabIndex={0} 
                onClick={() => setSelectedEvidence("shells")}
                className="text-left group cursor-pointer focus:outline-none"
              >
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

              {/* Item 3: Flock Uniformity */}
              <div 
                role="button" 
                tabIndex={0} 
                onClick={() => setSelectedEvidence("uniformity")}
                className="text-left group cursor-pointer focus:outline-none"
              >
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

              {/* Item 4: Water Intake */}
              <div 
                role="button" 
                tabIndex={0} 
                onClick={() => setSelectedEvidence("water")}
                className="text-left group cursor-pointer focus:outline-none"
              >
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

              {/* Item 5: Gut & Droppings */}
              <div 
                role="button" 
                tabIndex={0} 
                onClick={() => setSelectedEvidence("gut")}
                className="text-left group cursor-pointer focus:outline-none"
              >
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

              {/* Item 6: Vaccine Schedule */}
              <div 
                role="button" 
                tabIndex={0} 
                onClick={() => setSelectedEvidence("vaccine")}
                className="text-left group cursor-pointer focus:outline-none"
              >
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
          Feed Audit
        </button>

        <button 
          onClick={() => setTab("flocks")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "flocks" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.flocks}
          HDP & Cages
        </button>

        <button 
          onClick={() => setTab("audit")} 
          className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === "audit" ? "text-[#2563eb]" : "text-[#94a3b8]"}`}
        >
          {TAB_ICONS.audit}
          Flock Log
        </button>
      </div>

      {/* DRILL-DOWN MODAL / BOTTOM SHEET FOR EVIDENCE INSPECTION */}
      {selectedEvidence && (
        <div 
          className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center" 
          onClick={() => setSelectedEvidence(null)}
        >
          <div 
            className="w-full bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <b className="text-[17px] text-[#0f172a]">
                {selectedEvidence === "post_mortem" && "Post-Mortem & Carcass Proof"}
                {selectedEvidence === "shells" && "Shell & Crack Inspection"}
                {selectedEvidence === "uniformity" && "Flock Uniformity (Weigh Sampling)"}
                {selectedEvidence === "water" && "Water Consumption & Tank Check"}
                {selectedEvidence === "gut" && "Gut Health & Excreta Profiling"}
                {selectedEvidence === "vaccine" && "Vaccine & Medication Register"}
              </b>
              <button 
                onClick={() => setSelectedEvidence(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold"
              >
                ✕
              </button>
            </div>

            {selectedEvidence === "post_mortem" && (
              <div className="pt-4 space-y-3.5 text-[14px]">
                <div className="p-3 rounded-2xl bg-slate-100 aspect-video flex flex-col items-center justify-center text-slate-400 font-mono text-[12px] border border-dashed border-slate-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="mt-2">[ Timestamped Carcass Photo Attached ]</span>
                  <span className="text-[10px] text-slate-400">Oct 20, 16:42 · Pen 2 · Row B · Cage 4</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Dead Birds Reported</span>
                  <b className="text-rose-600">3 birds</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Location Tag</span>
                  <b>Row B · Cage 4 (Isa Brown)</b>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Verified by</span>
                  <b>Musa Ibrahim (Attendant)</b>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-600 leading-relaxed">
                  ✓ Photo gate passed: Slit breast carcass verified. Excludes unrecorded live bird removal or roadside sales.
                </div>
              </div>
            )}

            {selectedEvidence === "shells" && (
              <div className="pt-4 space-y-3 text-[14px]">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800">
                    <span className="block text-[11px]">Hard Brown Shells</span>
                    <b className="text-[18px]">98.2%</b>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-800">
                    <span className="block text-[11px]">Cracked / Broken</span>
                    <b className="text-[18px]">28 eggs (1.4%)</b>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 text-[12px] text-slate-600">
                  Cracked egg threshold is currently within safe parameters (&lt;1.5%). No staff breakage scam flagged today.
                </div>
              </div>
            )}

            {selectedEvidence === "gut" && (
              <div className="pt-4 space-y-2.5 text-[14px]">
                <span className="text-slate-500 text-[12px] block">Dropping Triage (Manure Belts / Litter):</span>
                <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between">
                  <span>✓ Well-formed, clumpy, white urate cap</span>
                  <span className="text-[11px] font-bold">NORMAL</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 text-slate-400 text-[13px] flex items-center justify-between">
                  <span>Dark green liquid (Bile / NDV)</span>
                  <span>None</span>
                </div>
                <div className="p-2.5 rounded-xl border border-slate-200 text-slate-400 text-[13px] flex items-center justify-between">
                  <span>Red bloody mucus (Coccidiosis)</span>
                  <span>None</span>
                </div>
              </div>
            )}

            {selectedEvidence !== "post_mortem" && selectedEvidence !== "shells" && selectedEvidence !== "gut" && (
              <div className="pt-4 text-center py-6 text-slate-400 text-[14px]">
                Record verified. Tap through other tabs to inspect historical trend curves.
              </div>
            )}

            <button 
              onClick={() => setSelectedEvidence(null)}
              className="w-full mt-5 h-12 rounded-xl bg-slate-900 text-white font-semibold text-[14px]"
            >
              Close Record
            </button>
          </div>
        </div>
      )}

      {/* PEN DRILL-DOWN AUDIT MODAL */}
      {activePenAudit && (
        <div 
          className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-end justify-center" 
          onClick={() => setActivePenAudit(null)}
        >
          <div 
            className="w-full bg-white rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <b className="text-[17px] text-[#0f172a]">Pen {activePenAudit} Intake & Anomaly Audit</b>
              <button onClick={() => setActivePenAudit(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold">✕</button>
            </div>
            
            <div className="pt-4 space-y-3 text-[14px]">
              {activePenAudit === "P2" ? (
                <>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-[13px]">
                    <b>🔴 Variance Detected:</b> +1.4 bags over biological standard.
                    <p className="mt-1 text-slate-600">Expected: 6.6 bags (115g/bird). Logged: 8.0 bags (138g/bird). Difference: ₦20,300 loss.</p>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Flock Capacity</span>
                    <b>15 Cages (1,450 living birds)</b>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Egg Output</span>
                    <b>46 crates (79.3% HDP)</b>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Morning Pickup</span>
                    <b>38 crates (82.6%)</b>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Mortality Tag</span>
                    <b className="text-rose-600">3 birds in Row B · Cage 4</b>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[13px]">
                    <b>✓ Pen Operating Within Standard Parameters.</b>
                    <p className="mt-1 text-slate-600">Feed intake, morning lay timing, and egg crate ratios are 100% aligned with biological breed curves.</p>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Flock Capacity</span>
                    <b>{activePenAudit === "P1" ? "20 Cages (1,920 birds)" : "42 Cages (4,020 birds)"}</b>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Daily Intake</span>
                    <b>{activePenAudit === "P1" ? "115g/bird · 10 bags" : "112g/bird · 13 bags"}</b>
                  </div>
                </>
              )}
            </div>

            <button 
              onClick={() => setActivePenAudit(null)}
              className="w-full mt-5 h-12 rounded-xl bg-slate-900 text-white font-semibold text-[14px]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 4. SETTINGS DRAWER */}
      {drawer && (
        <div className="absolute inset-0 z-50 flex" onClick={() => setDrawer(false)}>
          <div 
            className="w-[80%] max-w-[320px] bg-white h-full flex flex-col shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className={`${theme.header} px-6 pt-8 pb-4`}>
              <div className="text-[18px] font-bold text-[#0f172a]">Adeyemi Commercial Layers</div>
              <div className="text-[13px] text-[#64748b] mt-0.5">77 Battery Cages · 7,390 Birds</div>
            </div>

            <div className="flex-1 px-4 py-4 space-y-1 text-[15px]">
              <div className="p-3 rounded-xl bg-[#f8fafc] border border-slate-100 mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Feed Price</span>
                <b className="text-[18px] text-[#0f172a]">₦14,500</b>
                <span className="text-[12px] text-slate-500 block">Self / Toll-milled 25kg bag</span>
              </div>

              <button 
                onClick={() => { setDrawer(false); go("/setup"); }}
                className="w-full text-left px-3 py-3 rounded-xl active:bg-slate-50 font-medium text-slate-700 flex items-center justify-between"
              >
                <span>Edit Cages & Feed Price</span>
                <Chev />
              </button>

              <button 
                onClick={() => { setDrawer(false); setTab("audit"); }}
                className="w-full text-left px-3 py-3 rounded-xl active:bg-slate-50 font-medium text-slate-700 flex items-center justify-between"
              >
                <span>Flock Log Proof Records</span>
                <Chev />
              </button>
            </div>

            <div className="p-4 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-mono">LayerBook v4.0 · Truth Engine</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
