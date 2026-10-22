// Shared palette for the pilot intake surface. A premium near-black carries the
// primary action; neutrals stay the greys the rest of the app already uses.
export const palette = {
  brand: "#1C1917",
  brandPressed: "#0C0A09",
};

export const btn =
  "h-14 w-full rounded-2xl bg-[#1C1917] text-white text-[17px] font-bold shadow-[0_8px_20px_-6px_#1C191740] active:bg-[#0C0A09] disabled:opacity-40 disabled:cursor-not-allowed";

export const chipBase =
  "h-14 rounded-full border-[1.5px] text-[15px] font-medium transition-all active:scale-95 disabled:opacity-50";
export const chipOn = "bg-[#1C1917] text-white border-[#1C1917] shadow-sm";
export const chipOff = "bg-white border-[#cbd5e1] text-[#0f172a]";

export const fieldLabel = "block text-sm font-medium text-gray-900 mb-1.5";
export const groupLabel = "text-sm font-medium text-gray-900 mb-2";
export const groupHint = "ml-1 font-normal text-[#64748b]";

export const inputBase =
  "w-full px-4 py-3 text-base text-gray-900 border rounded-lg focus:outline-none transition-colors";
export const inputOk = "border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-100";
export const inputBad = "border-red-500 bg-red-50/40";

export const errorText = "mt-1.5 text-[13px] font-medium text-red-600";
export const mutedText = "text-[#64748b]";
export const inkText = "text-[#0f172a]";
