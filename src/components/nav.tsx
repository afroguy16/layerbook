"use client";
// All primary navigation lives here: bottom tabs Home / Bookings / (+) / Jobs.
import type { T } from "@/lib/copy";
import { theme } from "@/lib/theme";
export type Tab = "home" | "jobs" | "bookings";
const I = ({ d }: { d: React.ReactNode }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
const ICON: Record<Tab, React.ReactNode> = {
  home: <I d={<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /></>} />,
  jobs: <I d={<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z" />} />,
  bookings: <I d={<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>} />,
};
export function Nav({ t, tab, go, onPlus }: { t: T; tab: Tab; go: (p: string) => void; onPlus: () => void }) {
  const B = ({ k }: { k: Tab }) => <button onClick={() => go(k === "home" ? "/" : "/" + k)} className={`flex-1 flex flex-col items-center gap-1 h-14 text-[11px] font-medium ${tab === k ? "text-[#2563eb]" : "text-[#94a3b8]"}`}>{ICON[k]}{t(k)}</button>;
  return <div className="shrink-0 h-[72px] bg-white border-t border-[#f1f5f9] flex items-start pt-2">
    <B k="home" /><B k="bookings" />
    <div className="w-[72px] flex justify-center"><button aria-label="+ New job" onClick={onPlus} className={`w-[52px] h-[52px] rounded-full flex items-center justify-center ${theme.fab}`}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></button></div>
    <B k="jobs" />
  </div>;
}
