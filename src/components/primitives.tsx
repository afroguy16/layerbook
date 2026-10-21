"use client";
import React, { createContext, useContext, type ReactNode } from "react";
import { ChevronLeft, X } from "lucide-react";
import { theme } from "@/lib/theme";
import type { Urg } from "@/lib/farm-data";

export const ExitCtx = createContext<null | (() => void)>(null);

export const ExitX = () => {
  const f = useContext(ExitCtx);
  return f ? (
    <button aria-label="Close" onClick={f} className="ml-auto w-12 h-12 flex items-center justify-center text-[#0f172a]">
      <X size={24} strokeWidth={2} />
    </button>
  ) : null;
};

export const Page = ({
  n,
  title,
  onBack,
  children
}: {
  n?: string;
  title: string;
  onBack: () => void;
  children: ReactNode;
}) => (
  <div
    className="relative flex-1 min-h-0 bg-white px-[18px] pt-[22px] pb-[100px] overflow-y-auto"
    style={{ fontFamily: theme.listFont }}
  >
    <div className="flex items-center mb-[6px]">
      <button
        aria-label="Back"
        onClick={onBack}
        className="-ml-[14px] -my-[14px] w-12 h-12 text-[18px] text-[#0f172a] flex items-center justify-center"
      >
        <ChevronLeft size={24} strokeWidth={2} />
      </button>
      {n && <span className="text-[13px] text-[#64748b] ml-1">{n}</span>}
      <span className="ml-auto -mr-[14px] -my-[14px]">
        <ExitX />
      </span>
    </div>
    <h2 className="text-[21px] font-bold mt-1 mb-[14px] text-[#0f172a]">{title}</h2>
    {children}
  </div>
);

export const Chip = ({
  on,
  onClick,
  children,
  right
}: {
  on?: boolean;
  onClick: () => void;
  children: ReactNode;
  right?: ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center h-14 px-[18px] border-[1.5px] rounded-full mr-[6px] mb-2 text-[15px] font-medium transition-all active:scale-95 ${
      on ? "bg-[#2563eb] text-white border-[#2563eb] shadow-sm" : "border-[#cbd5e1] text-[#0f172a] bg-white"
    }`}
  >
    <span>{children}</span>
    {right && <span className="ml-2 text-[13px] opacity-75">{right}</span>}
  </button>
);

export const Btn = ({
  onClick,
  children,
  gray,
  bottom = 22,
  disabled
}: {
  onClick: () => void;
  children: ReactNode;
  gray?: boolean;
  bottom?: number;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    style={{ bottom }}
    className={`absolute left-[18px] right-[18px] h-14 rounded-2xl font-bold text-[17px] flex items-center justify-center disabled:opacity-40 active:scale-[0.98] transition-all ${
      gray ? "bg-[#f1f5f9] text-[#0f172a]" : "bg-[#2563eb] text-white shadow-md shadow-blue-500/20"
    }`}
  >
    {children}
  </button>
);

export const K = ({ children }: { children: ReactNode }) => (
  <div className="text-[13px] font-semibold text-[#64748b] mt-[14px] mb-2">{children}</div>
);

export const UrgTag = ({ u }: { u: Urg }) => {
  const styles: Record<Urg, { text: string; cls: string }> = {
    now: { text: "Critical: 72h threat", cls: "bg-[#fee2e2] text-[#b91c1c]" },
    soon: { text: "Watch closely", cls: "bg-[#fef3c7] text-[#92400e]" },
    wait: { text: "Optimal", cls: "bg-[#dcfce7] text-[#166534]" }
  };
  const item = styles[u];
  return (
    <span className={`inline-block whitespace-nowrap text-[12px] font-bold px-[9px] py-1 rounded-[10px] ${item.cls}`}>
      {item.text}
    </span>
  );
};
