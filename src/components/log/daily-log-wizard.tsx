"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronDown,
  Search,
  Check,
  X,
  Camera,
  Plus,
  Delete,
  Droplets,
  Activity,
  AlertTriangle,
  Wheat,
  Egg,
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import { theme } from "@/lib/theme";

interface PenInfo {
  id: number;
  name: string;
  flockCount: number;
}

interface CasualtyItem {
  id: string;
  cage: string;
  count: string;
  photos: string[];
}

type DroppingsCondition = "watery" | "bloody" | "greenish";

interface DroppingsItem {
  id: string;
  cage: string;
  conditions: DroppingsCondition[];
  photos: string[];
}

interface TaskLogs {
  feed: { logged: boolean; amount: number; unit: "bags" | "kg" };
  eggs: {
    logged: boolean;
    unit: "crates" | "pcs";
    cratesLg: string;
    cratesMd: string;
    cratesPl: string;
    cratesJb: string;
    crackedUnit: "pcs" | "crates";
    crackedLg: string;
    crackedMd: string;
    crackedPl: string;
    crackedJb: string;
  };
  water: { logged: boolean; litres: number };
  droppings: { logged: boolean; items: DroppingsItem[] };
  mortality: { logged: boolean; items: CasualtyItem[] };
}

const DROPPINGS_CONDITION_META: Record<
  DroppingsCondition,
  { label: string; shortLabel: string; dotClass: string }
> = {
  watery: {
    label: "Watery (Loose / Runny)",
    shortLabel: "Watery",
    dotClass: "bg-amber-500",
  },
  bloody: {
    label: "Bloody (Red / Mucus)",
    shortLabel: "Bloody",
    dotClass: "bg-rose-500",
  },
  greenish: {
    label: "Greenish / White (Chalky)",
    shortLabel: "Greenish / White",
    dotClass: "bg-emerald-600",
  },
};

const PENS: PenInfo[] = [
  { id: 1, name: "Pen 1", flockCount: 1920 },
  { id: 2, name: "Pen 2", flockCount: 1450 },
  { id: 3, name: "Pen 3", flockCount: 4020 },
];

const CAGE_OPTIONS = [
  "Row A · Cage A1",
  "Row A · Cage A2",
  "Row A · Cage A3",
  "Row A · Cage A4",
  "Row B · Cage B1",
  "Row B · Cage B2",
  "Row B · Cage B3",
  "Row B · Cage B4",
  "Row C · Cage C1",
  "Row C · Cage C2",
  "Row C · Cage C3",
  "Row C · Cage C4",
];

export function DailyLogWizard() {
  const [selectedPen, setSelectedPen] = useState<PenInfo | null>(null);
  const [currentFlow, setCurrentFlow] = useState<
    "desktop" | "feed" | "eggs" | "water" | "droppings" | "mortality"
  >("desktop");

  // All tasks start clean at 0 / empty
  const [taskData, setTaskData] = useState<TaskLogs>({
    feed: { logged: false, amount: 0, unit: "bags" },
    eggs: {
      logged: false,
      unit: "crates",
      cratesLg: "",
      cratesMd: "",
      cratesPl: "",
      cratesJb: "",
      crackedUnit: "pcs",
      crackedLg: "",
      crackedMd: "",
      crackedPl: "",
      crackedJb: "",
    },
    water: { logged: false, litres: 0 },
    droppings: { logged: false, items: [] },
    mortality: { logged: false, items: [] },
  });

  // Feed State
  const [feedDraft, setFeedDraft] = useState<string>("");
  const [feedUnit, setFeedUnit] = useState<"bags" | "kg">("bags");

  // Water State
  const [waterDraft, setWaterDraft] = useState<string>("");

  // Egg State (Main Harvest + Triggered Cracked Eggs Sub-Screen)
  const [eggScreen, setEggScreen] = useState<"main" | "cracked">("main");
  const [eggUnit, setEggUnit] = useState<"crates" | "pcs">("crates");
  const [eggDraft, setEggDraft] = useState({
    cratesLg: "",
    cratesMd: "",
    cratesPl: "",
    cratesJb: "",
  });
  const [crackedUnit, setCrackedUnit] = useState<"pcs" | "crates">("pcs");
  const [crackedDraft, setCrackedDraft] = useState({
    crackedLg: "",
    crackedMd: "",
    crackedPl: "",
    crackedJb: "",
  });

  // Mortality Progressive Flow State (Add/Edit form vs Summary List)
  const [mortalityMode, setMortalityMode] = useState<"form" | "summary">(
    "form"
  );
  const [casualtiesList, setCasualtiesList] = useState<CasualtyItem[]>([]);
  const [currentCasualtyDraft, setCurrentCasualtyDraft] =
    useState<CasualtyItem>({
      id: "1",
      cage: "",
      count: "",
      photos: [],
    });
  const [editingCasualtyId, setEditingCasualtyId] = useState<string | null>(
    null
  );
  const [cageDropdownOpen, setCageDropdownOpen] = useState<boolean>(false);
  const [cageSearchQuery, setCageSearchQuery] = useState<string>("");

  const filteredCages = CAGE_OPTIONS.filter((c) =>
    c.toLowerCase().includes(cageSearchQuery.toLowerCase())
  );

  // Droppings Progressive Flow State (Add/Edit form vs Summary List)
  const [droppingsMode, setDroppingsMode] = useState<"form" | "summary">(
    "form"
  );
  const [droppingsList, setDroppingsList] = useState<DroppingsItem[]>([]);
  const [currentDroppingsDraft, setCurrentDroppingsDraft] =
    useState<DroppingsItem>({
      id: "1",
      cage: "",
      conditions: [],
      photos: [],
    });
  const [editingDroppingsId, setEditingDroppingsId] = useState<string | null>(
    null
  );
  const [droppingsCageOpen, setDroppingsCageOpen] = useState<boolean>(false);
  const [droppingsCageSearch, setDroppingsCageSearch] = useState<string>("");

  const DROPPINGS_LOCATIONS = [
    "Row A (Entire Row)",
    "Row B (Entire Row)",
    "Row C (Entire Row)",
    ...CAGE_OPTIONS,
  ];
  const filteredDroppingsLocations = DROPPINGS_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(droppingsCageSearch.toLowerCase())
  );

  const activePen = selectedPen || PENS[0];

  // Egg Calculations
  const totalGradedHarvest =
    (parseInt(eggDraft.cratesLg) || 0) +
    (parseInt(eggDraft.cratesMd) || 0) +
    (parseInt(eggDraft.cratesPl) || 0) +
    (parseInt(eggDraft.cratesJb) || 0);

  const totalCrackedEggs =
    (parseInt(crackedDraft.crackedLg) || 0) +
    (parseInt(crackedDraft.crackedMd) || 0) +
    (parseInt(crackedDraft.crackedPl) || 0) +
    (parseInt(crackedDraft.crackedJb) || 0);

  const crackedBreakdownParts = [
    parseInt(crackedDraft.crackedLg) > 0
      ? `${crackedDraft.crackedLg} Large`
      : null,
    parseInt(crackedDraft.crackedMd) > 0
      ? `${crackedDraft.crackedMd} Medium`
      : null,
    parseInt(crackedDraft.crackedPl) > 0
      ? `${crackedDraft.crackedPl} Pullet`
      : null,
    parseInt(crackedDraft.crackedJb) > 0
      ? `${crackedDraft.crackedJb} Jumbo`
      : null,
  ].filter(Boolean);

  const savedEggTotal =
    (parseInt(taskData.eggs.cratesLg) || 0) +
    (parseInt(taskData.eggs.cratesMd) || 0) +
    (parseInt(taskData.eggs.cratesPl) || 0) +
    (parseInt(taskData.eggs.cratesJb) || 0);

  // Mortality Calculations
  const totalDeadCount = casualtiesList.reduce(
    (sum, item) => sum + (parseInt(item.count) || 0),
    0
  );
  const savedDeadCount = taskData.mortality.items.reduce(
    (sum, item) => sum + (parseInt(item.count) || 0),
    0
  );
  const savedDroppingsCount = taskData.droppings.items.length;
  const savedDroppingsSummary = Array.from(
    new Set(
      taskData.droppings.items.flatMap((i) =>
        i.conditions.map((c) => DROPPINGS_CONDITION_META[c].shortLabel)
      )
    )
  ).join(", ");

  // Feed Keypad Handler
  const handleKeypad = (val: string) => {
    setFeedDraft((prev) => {
      let next = prev;
      if (val === "delete") {
        next = prev.length > 0 ? prev.slice(0, -1) : "";
      } else if (val === ".") {
        if (!prev.includes(".")) {
          next = prev === "" ? "0." : prev + ".";
        }
      } else {
        if (prev === "0") {
          next = val;
        } else if (prev.length < 5) {
          next = prev + val;
        }
      }
      return next;
    });
  };

  const handleFeedInputChange = (val: string) => {
    const sanitized = val.replace(/[^0-9.]/g, "");
    const parts = sanitized.split(".");
    const formatted =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : sanitized;
    setFeedDraft(formatted);
  };

  const toggleFeedUnit = () => {
    const newUnit = feedUnit === "bags" ? "kg" : "bags";
    setFeedUnit(newUnit);
    const parsed = parseFloat(feedDraft) || 0;
    if (parsed === 0) {
      setFeedDraft("");
      return;
    }
    if (newUnit === "kg") {
      const inKg = Math.round(parsed * 25 * 10) / 10;
      setFeedDraft(inKg > 0 ? inKg.toString() : "");
    } else {
      const inBags = Math.round((parsed / 25) * 10) / 10;
      setFeedDraft(inBags > 0 ? inBags.toString() : "");
    }
  };

  const toggleEggUnit = () => {
    const newUnit = eggUnit === "crates" ? "pcs" : "crates";
    setEggUnit(newUnit);
    const convertVal = (val: string) => {
      const parsed = parseFloat(val) || 0;
      if (parsed === 0) return "";
      const next =
        newUnit === "pcs" ? Math.round(parsed * 30) : Math.round(parsed / 30);
      return next > 0 ? next.toString() : "";
    };
    setEggDraft((prev) => ({
      ...prev,
      cratesLg: convertVal(prev.cratesLg),
      cratesMd: convertVal(prev.cratesMd),
      cratesPl: convertVal(prev.cratesPl),
      cratesJb: convertVal(prev.cratesJb),
    }));
  };

  const toggleCrackedUnit = () => {
    const newUnit = crackedUnit === "pcs" ? "crates" : "pcs";
    setCrackedUnit(newUnit);
    const convertVal = (val: string) => {
      const parsed = parseFloat(val) || 0;
      if (parsed === 0) return "";
      const next =
        newUnit === "pcs" ? Math.round(parsed * 30) : Math.round(parsed / 30);
      return next > 0 ? next.toString() : "";
    };
    setCrackedDraft((prev) => ({
      ...prev,
      crackedLg: convertVal(prev.crackedLg),
      crackedMd: convertVal(prev.crackedMd),
      crackedPl: convertVal(prev.crackedPl),
      crackedJb: convertVal(prev.crackedJb),
    }));
  };

  const clearCrackedEggs = () => {
    setCrackedDraft({
      crackedLg: "",
      crackedMd: "",
      crackedPl: "",
      crackedJb: "",
    });
  };

  const saveFeed = () => {
    const parsed = parseFloat(feedDraft) || 0;
    setTaskData((prev) => ({
      ...prev,
      feed: { logged: true, amount: parsed, unit: feedUnit },
    }));
    setCurrentFlow("desktop");
  };

  const saveEggs = () => {
    setTaskData((prev) => ({
      ...prev,
      eggs: {
        logged: true,
        unit: eggUnit,
        ...eggDraft,
        crackedUnit,
        ...crackedDraft,
      },
    }));
    setEggScreen("main");
    setCurrentFlow("desktop");
  };

  const saveWater = () => {
    setTaskData((prev) => ({
      ...prev,
      water: { logged: true, litres: parseInt(waterDraft) || 0 },
    }));
    setCurrentFlow("desktop");
  };

  // Droppings Progressive Handlers
  const openDroppingsFlow = () => {
    setDroppingsCageOpen(false);
    setDroppingsCageSearch("");
    if (taskData.droppings.items.length > 0) {
      setDroppingsList(taskData.droppings.items);
      setDroppingsMode("summary");
    } else {
      setDroppingsList([]);
      setEditingDroppingsId(null);
      setCurrentDroppingsDraft({
        id: Date.now().toString(),
        cage: "",
        conditions: [],
        photos: [],
      });
      setDroppingsMode("form");
    }
    setCurrentFlow("droppings");
  };

  const handleStartNewDroppings = () => {
    setEditingDroppingsId(null);
    setDroppingsCageOpen(false);
    setDroppingsCageSearch("");
    setCurrentDroppingsDraft({
      id: Date.now().toString(),
      cage: "",
      conditions: [],
      photos: [],
    });
    setDroppingsMode("form");
  };

  const handleToggleDroppingsCondition = (condKey: DroppingsCondition) => {
    setCurrentDroppingsDraft((prev) => {
      const exists = prev.conditions.includes(condKey);
      return {
        ...prev,
        conditions: exists
          ? prev.conditions.filter((c) => c !== condKey)
          : [...prev.conditions, condKey],
      };
    });
  };

  const handleEditDroppings = (id: string) => {
    const found = droppingsList.find((d) => d.id === id);
    if (found) {
      setEditingDroppingsId(id);
      setDroppingsCageOpen(false);
      setDroppingsCageSearch("");
      setCurrentDroppingsDraft({ ...found });
      setDroppingsMode("form");
    }
  };

  const handleRemoveDroppings = (id: string) => {
    setDroppingsList((prev) => prev.filter((d) => d.id !== id));
  };

  const handleAddDroppingsPhoto = () => {
    setCurrentDroppingsDraft((prev) => ({
      ...prev,
      photos: [...prev.photos, `Photo ${prev.photos.length + 1}`],
    }));
  };

  const handleRemoveDroppingsPhoto = (index: number) => {
    setCurrentDroppingsDraft((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== index),
    }));
  };

  const handleSaveCurrentDroppings = () => {
    if (
      !currentDroppingsDraft.cage ||
      currentDroppingsDraft.conditions.length === 0
    )
      return;
    setDroppingsList((prev) => {
      if (editingDroppingsId) {
        return prev.map((d) =>
          d.id === editingDroppingsId ? currentDroppingsDraft : d
        );
      }
      return [...prev, currentDroppingsDraft];
    });
    setEditingDroppingsId(null);
    setDroppingsMode("summary");
  };

  const handleSaveDroppingsReport = () => {
    setTaskData((prev) => ({
      ...prev,
      droppings: {
        logged: true,
        items: droppingsList,
      },
    }));
    setCurrentFlow("desktop");
  };

  // Mortality Handlers
  const openMortalityFlow = () => {
    setCageDropdownOpen(false);
    setCageSearchQuery("");
    if (taskData.mortality.items.length > 0) {
      setCasualtiesList(taskData.mortality.items);
      setMortalityMode("summary");
    } else {
      setCasualtiesList([]);
      setEditingCasualtyId(null);
      setCurrentCasualtyDraft({
        id: Date.now().toString(),
        cage: "",
        count: "",
        photos: [],
      });
      setMortalityMode("form");
    }
    setCurrentFlow("mortality");
  };

  const handleStartNewCasualty = () => {
    setEditingCasualtyId(null);
    setCageDropdownOpen(false);
    setCageSearchQuery("");
    setCurrentCasualtyDraft({
      id: Date.now().toString(),
      cage: "",
      count: "",
      photos: [],
    });
    setMortalityMode("form");
  };

  const handleEditCasualty = (id: string) => {
    const found = casualtiesList.find((c) => c.id === id);
    if (found) {
      setEditingCasualtyId(id);
      setCageDropdownOpen(false);
      setCageSearchQuery("");
      setCurrentCasualtyDraft({ ...found });
      setMortalityMode("form");
    }
  };

  const handleAddCasualtyPhoto = () => {
    setCurrentCasualtyDraft((prev) => ({
      ...prev,
      photos: [...prev.photos, `Photo ${prev.photos.length + 1}`],
    }));
  };

  const handleRemoveCasualtyPhoto = (index: number) => {
    setCurrentCasualtyDraft((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== index),
    }));
  };

  const handleRemoveCasualty = (id: string) => {
    setCasualtiesList((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaveCurrentCasualty = () => {
    const countVal = parseInt(currentCasualtyDraft.count) || 0;
    if (!currentCasualtyDraft.cage || countVal <= 0) return;

    setCasualtiesList((prev) => {
      if (editingCasualtyId) {
        return prev.map((c) =>
          c.id === editingCasualtyId ? currentCasualtyDraft : c
        );
      }
      return [...prev, currentCasualtyDraft];
    });
    setEditingCasualtyId(null);
    setMortalityMode("summary");
  };

  const handleSaveMortalityReport = () => {
    setTaskData((prev) => ({
      ...prev,
      mortality: {
        logged: true,
        items: casualtiesList,
      },
    }));
    setCurrentFlow("desktop");
  };

  return (
    <div className="min-h-dvh flex justify-center bg-[#e5e7eb] font-sans antialiased text-[#0f172a]">
      <div
        style={{ fontFamily: theme.homeFont }}
        className="relative w-full max-w-[480px] h-dvh bg-white flex flex-col justify-between overflow-hidden select-none shadow-sm"
      >
        {/* ============================================================== */}
        {/* VIEW 0: PEN SELECTION                                          */}
        {/* ============================================================== */}
        {!selectedPen && (
          <div className="flex-1 flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4">
                <span className="text-[13px] text-[#64748b] font-medium">
                  LayerBook
                </span>
                <Link
                  href="/"
                  className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center active:scale-95 transition-transform"
                >
                  <X size={18} strokeWidth={2} />
                </Link>
              </div>

              <h1 className="text-[26px] font-bold text-[#0f172a] tracking-tight mt-1 mb-2">
                Select your pen
              </h1>
              <p className="text-[15px] text-gray-600 mb-6">
                Pick a house to log tasks for today.
              </p>

              <div className="space-y-3">
                {PENS.map((pen) => (
                  <button
                    key={pen.id}
                    onClick={() => {
                      setSelectedPen(pen);
                      setCurrentFlow("desktop");
                    }}
                    className="w-full p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 active:scale-[0.99] transition-all text-left flex items-center justify-between"
                  >
                    <div>
                      <b className="text-[16px] text-gray-900 block font-semibold">
                        {pen.name}
                      </b>
                      <span className="text-[13px] text-gray-500 mt-0.5 block">
                        {pen.flockCount.toLocaleString()} birds
                      </span>
                    </div>
                    <span className="text-[13px] font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                      Select →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 1: PEN DESKTOP                                            */}
        {/* ============================================================== */}
        {selectedPen && currentFlow === "desktop" && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Top Bar */}
              <div className="flex items-center pb-4">
                <button
                  onClick={() => setSelectedPen(null)}
                  className="text-[13.5px] font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 -ml-1 active:scale-95 transition-all"
                >
                  <ChevronLeft size={18} strokeWidth={2.2} />
                  Switch Pen
                </button>
              </div>

              <div className="mb-6">
                <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">
                  {activePen.name}
                </h1>
              </div>

              {/* DAILY ROUTINE */}
              <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                Daily Routine
              </div>

              <div className="grid grid-cols-2 gap-3.5 mb-3.5">
                {/* Feed Given */}
                <div
                  onClick={() => {
                    setFeedDraft(
                      taskData.feed.logged && taskData.feed.amount > 0
                        ? taskData.feed.amount.toString()
                        : ""
                    );
                    setFeedUnit(taskData.feed.unit);
                    setCurrentFlow("feed");
                  }}
                  className="rounded-2xl p-4 bg-[#f8fafc] border border-gray-200/80 cursor-pointer active:scale-[0.98] transition-transform flex flex-col justify-between min-h-[136px] hover:border-gray-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Wheat size={20} strokeWidth={2} />
                    </span>
                    <span
                      className={`text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${
                        taskData.feed.logged
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {taskData.feed.logged ? "Logged ✓" : "Pending"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[13px] text-gray-500 font-medium block">
                      Feed Given
                    </span>
                    <b className="block text-[21px] text-gray-900 font-bold tracking-tight leading-tight mt-0.5">
                      {taskData.feed.logged
                        ? `${taskData.feed.amount} ${taskData.feed.unit}`
                        : "Tap to log"}
                    </b>
                  </div>
                </div>

                {/* Egg Harvest */}
                <div
                  onClick={() => {
                    setEggScreen("main");
                    setCurrentFlow("eggs");
                  }}
                  className="rounded-2xl p-4 bg-[#f8fafc] border border-gray-200/80 cursor-pointer active:scale-[0.98] transition-transform flex flex-col justify-between min-h-[136px] hover:border-gray-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <Egg size={20} strokeWidth={2} />
                    </span>
                    <span
                      className={`text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${
                        taskData.eggs.logged
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {taskData.eggs.logged ? "Logged ✓" : "Pending"}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="text-[13px] text-gray-500 font-medium block">
                      Egg Harvest
                    </span>
                    <b className="block text-[21px] text-gray-900 font-bold tracking-tight leading-tight mt-0.5">
                      {taskData.eggs.logged
                        ? `${savedEggTotal} ${taskData.eggs.unit}`
                        : "Tap to log"}
                    </b>
                  </div>
                </div>
              </div>

              {/* Water Meter */}
              <div
                onClick={() => setCurrentFlow("water")}
                className="rounded-2xl p-3.5 bg-[#f8fafc] border border-gray-200/80 cursor-pointer active:scale-[0.99] transition-transform flex items-center justify-between hover:border-gray-300 mb-6"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                    <Droplets size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <b className="text-[14.5px] text-gray-900 block font-semibold leading-tight">
                      Water Intake
                    </b>
                    <span className="text-[12.5px] text-gray-500">
                      {taskData.water.logged
                        ? `${taskData.water.litres} L recorded`
                        : "Tap to log meter reading"}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${
                    taskData.water.logged
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {taskData.water.logged ? "Logged ✓" : "Optional"}
                </span>
              </div>

              {/* INCIDENTS */}
              <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                Incidents
              </div>

              <div className="space-y-2.5">
                {/* Mortality */}
                <div
                  onClick={openMortalityFlow}
                  className="rounded-2xl p-3.5 bg-[#f8fafc] border border-gray-200/80 cursor-pointer active:scale-[0.99] transition-transform flex items-center justify-between hover:border-gray-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <AlertTriangle size={18} strokeWidth={2} />
                    </span>
                    <div>
                      <b className="text-[14.5px] text-gray-900 block font-semibold leading-tight">
                        Mortality
                      </b>
                      <span className="text-[12.5px] text-gray-500">
                        {savedDeadCount > 0
                          ? `${savedDeadCount} dead across ${taskData.mortality.items.length} ${
                              taskData.mortality.items.length === 1
                                ? "cage"
                                : "cages"
                            }`
                          : "0 dead today"}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${
                      savedDeadCount > 0
                        ? "bg-amber-50 text-amber-800"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {savedDeadCount > 0 ? `${savedDeadCount} logged` : "Normal ✓"}
                  </span>
                </div>

                {/* Droppings */}
                <div
                  onClick={openDroppingsFlow}
                  className="rounded-2xl p-3.5 bg-[#f8fafc] border border-gray-200/80 cursor-pointer active:scale-[0.99] transition-transform flex items-center justify-between hover:border-gray-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                      <Activity size={18} strokeWidth={2} />
                    </span>
                    <div>
                      <b className="text-[14.5px] text-gray-900 block font-semibold leading-tight">
                        Droppings
                      </b>
                      <span className="text-[12.5px] text-gray-500">
                        {savedDroppingsCount > 0
                          ? `${savedDroppingsSummary} across ${savedDroppingsCount} ${
                              savedDroppingsCount === 1 ? "location" : "locations"
                            }`
                          : "Normal (Formed)"}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full ${
                      savedDroppingsCount > 0
                        ? "bg-amber-50 text-amber-800"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {savedDroppingsCount > 0
                      ? `${savedDroppingsCount} logged`
                      : "Normal ✓"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Big Tap Target to Return to Pen Selection */}
            <button
              type="button"
              onClick={() => setSelectedPen(null)}
              className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
            >
              Done with {activePen.name}
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: FEED LOG                                               */}
        {/* ============================================================== */}
        {selectedPen && currentFlow === "feed" && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* LayerBook Top Bar */}
              <div className="flex items-center justify-between pb-4">
                <button
                  type="button"
                  onClick={() => setCurrentFlow("desktop")}
                  className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <ArrowLeft size={20} strokeWidth={2.2} />
                </button>
                <span className="text-[13px] font-semibold text-gray-500">
                  {activePen.name} · Feed Log
                </span>
                <div className="w-9" />
              </div>

              <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">
                Feed given
              </h1>
              <p className="text-[14px] text-gray-500 mb-5">
                Enter the feed dispensed to {activePen.name.toLowerCase()} today.
              </p>

              {/* Normal Input Field + Subtle Unit Switch */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="feed-quantity"
                    className="text-sm font-medium text-gray-900"
                  >
                    Quantity ({feedUnit})
                  </label>
                  <button
                    type="button"
                    onClick={toggleFeedUnit}
                    className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2 font-medium transition-colors"
                  >
                    Switch to {feedUnit === "bags" ? "kg" : "bags"}
                  </button>
                </div>
                <input
                  id="feed-quantity"
                  type="text"
                  inputMode="decimal"
                  value={feedDraft}
                  onChange={(e) => handleFeedInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveFeed();
                    }
                  }}
                  placeholder="0"
                  autoFocus
                  className="w-full px-4 py-3 text-xl font-semibold text-gray-900 border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-colors"
                />
              </div>

              {/* Tactile Keypad */}
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  ".",
                  "0",
                  "delete",
                ].map((k) => {
                  const isDelete = k === "delete";
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => handleKeypad(k)}
                      className={`h-13 rounded-xl flex items-center justify-center font-semibold active:scale-95 transition-all select-none ${
                        isDelete
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-900 text-[22px] border border-gray-200/70"
                      }`}
                    >
                      {isDelete ? <Delete size={20} strokeWidth={2} /> : k}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={saveFeed}
              className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-4 shrink-0"
            >
              Save Feed Log
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: MORTALITY CHECK (PROGRESSIVE ADD MULTIPLE CAGES)       */}
        {/* ============================================================== */}
        {selectedPen && currentFlow === "mortality" && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* LayerBook Top Bar */}
              <div className="flex items-center justify-between pb-4">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      mortalityMode === "form" &&
                      casualtiesList.length > 0
                    ) {
                      setMortalityMode("summary");
                    } else {
                      setCurrentFlow("desktop");
                    }
                  }}
                  className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <ArrowLeft size={20} strokeWidth={2.2} />
                </button>
                <span className="text-[13px] font-semibold text-gray-500">
                  {activePen.name} · Mortality Check
                </span>
                <div className="w-9" />
              </div>

              <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">
                Mortality check
              </h1>
              <p className="text-[14px] text-gray-500 mb-6">
                {mortalityMode === "form"
                  ? "Select the cage and enter the number of dead birds removed."
                  : "Review logged cage casualties or add another cage."}
              </p>

              {/* MODE A: ADD / EDIT CAGE CASUALTY FORM */}
              {mortalityMode === "form" && (
                <div className="space-y-5">
                  {/* Custom Sleek Searchable Autocomplete for Cage Location */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Cage location
                    </label>
                    <button
                      type="button"
                      onClick={() => setCageDropdownOpen((prev) => !prev)}
                      className={`w-full px-4 py-3 text-base text-left bg-white border rounded-lg flex items-center justify-between transition-colors ${
                        cageDropdownOpen
                          ? "border-gray-900 ring-2 ring-gray-100"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={
                          currentCasualtyDraft.cage
                            ? "text-gray-900 font-medium"
                            : "text-gray-400"
                        }
                      >
                        {currentCasualtyDraft.cage || "Select a cage..."}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform ${
                          cageDropdownOpen ? "rotate-180 text-gray-900" : ""
                        }`}
                      />
                    </button>

                    {cageDropdownOpen && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
                        {/* Search Input inside Dropdown */}
                        <div className="p-2.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50/60">
                          <Search size={16} className="text-gray-400 ml-1" />
                          <input
                            type="text"
                            value={cageSearchQuery}
                            onChange={(e) => setCageSearchQuery(e.target.value)}
                            placeholder="Search row or cage (e.g. B4)..."
                            autoFocus
                            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                          />
                          {cageSearchQuery && (
                            <button
                              type="button"
                              onClick={() => setCageSearchQuery("")}
                              className="text-gray-400 hover:text-gray-600 p-0.5"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>

                        {/* Filtered Options List */}
                        <div className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                          {filteredCages.length > 0 ? (
                            filteredCages.map((cageName) => {
                              const isSelected =
                                currentCasualtyDraft.cage === cageName;
                              return (
                                <button
                                  key={cageName}
                                  type="button"
                                  onClick={() => {
                                    setCurrentCasualtyDraft((prev) => ({
                                      ...prev,
                                      cage: cageName,
                                    }));
                                    setCageDropdownOpen(false);
                                    setCageSearchQuery("");
                                  }}
                                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                                    isSelected
                                      ? "bg-gray-50 text-gray-900 font-semibold"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <span>{cageName}</span>
                                  {isSelected && (
                                    <Check
                                      size={16}
                                      className="text-gray-900"
                                      strokeWidth={2.5}
                                    />
                                  )}
                                </button>
                              );
                            })
                          ) : (
                            <div className="px-4 py-4 text-center text-sm text-gray-400">
                              No cages match &ldquo;{cageSearchQuery}&rdquo;
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Normal Input Field for Dead Bird Count */}
                  <div>
                    <label
                      htmlFor="casualty-count"
                      className="block text-sm font-medium text-gray-900 mb-1.5"
                    >
                      Dead bird count
                    </label>
                    <input
                      id="casualty-count"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      value={currentCasualtyDraft.count}
                      onChange={(e) =>
                        setCurrentCasualtyDraft((prev) => ({
                          ...prev,
                          count: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSaveCurrentCasualty();
                        }
                      }}
                      placeholder="0"
                      className="w-full px-4 py-3 text-base text-gray-900 border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Multiple Carcass Photos Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Carcass photos (optional)
                    </label>

                    {currentCasualtyDraft.photos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {currentCasualtyDraft.photos.map((photoLabel, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-medium text-gray-800"
                          >
                            <Camera size={13} className="text-gray-500" />
                            <span>{photoLabel}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveCasualtyPhoto(idx)}
                              className="text-gray-400 hover:text-red-600 ml-0.5"
                              aria-label={`Remove ${photoLabel}`}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddCasualtyPhoto}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Camera size={16} strokeWidth={2} />
                      <span>
                        {currentCasualtyDraft.photos.length === 0
                          ? "Add photos (optional)"
                          : "Add another photo"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* MODE B: PROGRESSIVE SUMMARY OF LOGGED CAGES */}
              {mortalityMode === "summary" && (
                <div className="space-y-4">
                  {/* Add Another Cage Button */}
                  <button
                    type="button"
                    onClick={handleStartNewCasualty}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add another cage</span>
                  </button>

                  {casualtiesList.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <span>Logged Cages ({casualtiesList.length})</span>
                        <span>{totalDeadCount} dead total</span>
                      </div>

                      {casualtiesList.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between gap-3"
                        >
                          <div>
                            <h4 className="text-[15px] font-semibold text-gray-900">
                              {item.cage}
                            </h4>
                            <p className="text-[13px] text-gray-500 mt-0.5">
                              {item.count}{" "}
                              {parseInt(item.count) === 1
                                ? "dead bird"
                                : "dead birds"}
                              {item.photos.length > 0
                                ? ` · ${item.photos.length} ${
                                    item.photos.length === 1
                                      ? "photo"
                                      : "photos"
                                  }`
                                : ""}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditCasualty(item.id)}
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                              aria-label="Edit cage casualty"
                            >
                              <Pencil size={16} strokeWidth={2} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveCasualty(item.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Remove cage casualty"
                            >
                              <Trash2 size={16} strokeWidth={2} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            {mortalityMode === "form" ? (
              <button
                type="button"
                disabled={
                  !currentCasualtyDraft.cage ||
                  (parseInt(currentCasualtyDraft.count) || 0) <= 0
                }
                onClick={handleSaveCurrentCasualty}
                className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
              >
                {editingCasualtyId ? "Update Cage" : "Add Cage Casualty"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveMortalityReport}
                className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
              >
                Save Mortality Log
              </button>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: EGG COLLECTION (MAIN HARVEST + TRIGGERED CRACKED SCREEN) */}
        {/* ============================================================== */}
        {selectedPen && currentFlow === "eggs" && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            {eggScreen === "main" ? (
              <>
                <div>
                  {/* LayerBook Top Bar */}
                  <div className="flex items-center justify-between pb-4">
                    <button
                      type="button"
                      onClick={() => setCurrentFlow("desktop")}
                      className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
                    >
                      <ArrowLeft size={20} strokeWidth={2.2} />
                    </button>
                    <span className="text-[13px] font-semibold text-gray-500">
                      {activePen.name} · Egg Log
                    </span>
                    <div className="w-9" />
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">
                      Egg collection
                    </h1>
                    {/* Subtle central unit toggle (crates vs pcs) */}
                    <button
                      type="button"
                      onClick={toggleEggUnit}
                      className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2 font-medium transition-colors"
                    >
                      Switch to {eggUnit === "crates" ? "pcs" : "crates"}
                    </button>
                  </div>
                  <p className="text-[14px] text-gray-500 mb-6">
                    Enter today&apos;s graded harvest in {eggUnit}.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Large ({eggUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={eggDraft.cratesLg}
                        onChange={(e) =>
                          setEggDraft((p) => ({
                            ...p,
                            cratesLg: e.target.value,
                          }))
                        }
                        placeholder="0"
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Medium ({eggUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={eggDraft.cratesMd}
                        onChange={(e) =>
                          setEggDraft((p) => ({
                            ...p,
                            cratesMd: e.target.value,
                          }))
                        }
                        placeholder="0"
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Pullet ({eggUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={eggDraft.cratesPl}
                        onChange={(e) =>
                          setEggDraft((p) => ({
                            ...p,
                            cratesPl: e.target.value,
                          }))
                        }
                        placeholder="0"
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Jumbo ({eggUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={eggDraft.cratesJb}
                        onChange={(e) =>
                          setEggDraft((p) => ({
                            ...p,
                            cratesJb: e.target.value,
                          }))
                        }
                        placeholder="0"
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Progressive Trigger for Cracked Eggs (Button or Summary Card) */}
                  {totalCrackedEggs === 0 ? (
                    <button
                      type="button"
                      onClick={() => setEggScreen("cracked")}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Log cracked eggs (optional)</span>
                    </button>
                  ) : (
                    <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-[15px] font-semibold text-gray-900">
                          Cracked Eggs ({totalCrackedEggs} {crackedUnit})
                        </h4>
                        <p className="text-[13px] text-gray-500 mt-0.5">
                          {crackedBreakdownParts.join(" · ")}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setEggScreen("cracked")}
                          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Edit cracked eggs"
                        >
                          <Pencil size={16} strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={clearCrackedEggs}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Remove cracked eggs"
                        >
                          <Trash2 size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Unmistakably non-input Total Breakdown Readout */}
                  <div className="pt-5 mt-5 border-t border-gray-100 space-y-1.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-gray-500">
                        Good Harvest
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {totalGradedHarvest} {eggUnit}
                      </span>
                    </div>
                    {totalCrackedEggs > 0 && (
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-gray-500">
                          Cracked Eggs
                        </span>
                        <span className="text-sm font-semibold text-gray-700">
                          {totalCrackedEggs} {crackedUnit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={saveEggs}
                  className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
                >
                  Save Egg Log
                </button>
              </>
            ) : (
              /* TRIGGERED SUB-SCREEN: CRACKED EGGS BY SIZE */
              <>
                <div>
                  {/* LayerBook Top Bar */}
                  <div className="flex items-center justify-between pb-4">
                    <button
                      type="button"
                      onClick={() => setEggScreen("main")}
                      className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
                    >
                      <ArrowLeft size={20} strokeWidth={2.2} />
                    </button>
                    <span className="text-[13px] font-semibold text-gray-500">
                      {activePen.name} · Cracked Eggs
                    </span>
                    <div className="w-9" />
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <h1 className="text-[26px] font-bold text-gray-900 tracking-tight">
                      Cracked eggs
                    </h1>
                    {/* Dedicated unit toggle for Cracked Eggs (defaults to pcs) */}
                    <button
                      type="button"
                      onClick={toggleCrackedUnit}
                      className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2 font-medium transition-colors"
                    >
                      Switch to {crackedUnit === "pcs" ? "crates" : "pcs"}
                    </button>
                  </div>
                  <p className="text-[14px] text-gray-500 mb-6">
                    Enter cracked eggs by size in {crackedUnit}.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Large ({crackedUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={crackedDraft.crackedLg}
                        onChange={(e) =>
                          setCrackedDraft((p) => ({
                            ...p,
                            crackedLg: e.target.value,
                          }))
                        }
                        placeholder="0"
                        autoFocus
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Medium ({crackedUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={crackedDraft.crackedMd}
                        onChange={(e) =>
                          setCrackedDraft((p) => ({
                            ...p,
                            crackedMd: e.target.value,
                          }))
                        }
                        placeholder="0"
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Pullet ({crackedUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={crackedDraft.crackedPl}
                        onChange={(e) =>
                          setCrackedDraft((p) => ({
                            ...p,
                            crackedPl: e.target.value,
                          }))
                        }
                        placeholder="0"
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        Jumbo ({crackedUnit})
                      </label>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={crackedDraft.crackedJb}
                        onChange={(e) =>
                          setCrackedDraft((p) => ({
                            ...p,
                            crackedJb: e.target.value,
                          }))
                        }
                        placeholder="0"
                        className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Total Cracked Line */}
                  <div className="flex items-baseline justify-between pt-5 mt-5 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Total Cracked</span>
                    <span className="text-lg font-bold text-gray-900">
                      {totalCrackedEggs} {crackedUnit}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEggScreen("main")}
                  className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
                >
                  Done
                </button>
              </>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 5: WATER INTAKE                                           */}
        {/* ============================================================== */}
        {selectedPen && currentFlow === "water" && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* LayerBook Top Bar */}
              <div className="flex items-center justify-between pb-4">
                <button
                  type="button"
                  onClick={() => setCurrentFlow("desktop")}
                  className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <ArrowLeft size={20} strokeWidth={2.2} />
                </button>
                <span className="text-[13px] font-semibold text-gray-500">
                  {activePen.name} · Water Intake
                </span>
                <div className="w-9" />
              </div>

              <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">
                Water intake
              </h1>
              <p className="text-[14px] text-gray-500 mb-6">
                Enter the inline water meter reading for{" "}
                {activePen.name.toLowerCase()}.
              </p>

              <div>
                <label
                  htmlFor="water-litres"
                  className="block text-sm font-medium text-gray-900 mb-1.5"
                >
                  Volume (Litres)
                </label>
                <input
                  id="water-litres"
                  type="number"
                  inputMode="numeric"
                  value={waterDraft}
                  onChange={(e) => setWaterDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveWater();
                    }
                  }}
                  placeholder="0"
                  autoFocus
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:border-gray-900 focus:ring-2 focus:ring-gray-100 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={saveWater}
              className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
            >
              Save Water Log
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 6: DROPPINGS CHECK (PROGRESSIVE CAGE/ROW + CONDITION + PHOTOS) */}
        {/* ============================================================== */}
        {selectedPen && currentFlow === "droppings" && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* LayerBook Top Bar */}
              <div className="flex items-center justify-between pb-4">
                <button
                  type="button"
                  onClick={() => {
                    if (
                      droppingsMode === "form" &&
                      droppingsList.length > 0
                    ) {
                      setDroppingsMode("summary");
                    } else {
                      setCurrentFlow("desktop");
                    }
                  }}
                  className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
                >
                  <ArrowLeft size={20} strokeWidth={2.2} />
                </button>
                <span className="text-[13px] font-semibold text-gray-500">
                  {activePen.name} · Droppings Check
                </span>
                <div className="w-9" />
              </div>

              <h1 className="text-[26px] font-bold text-gray-900 tracking-tight mb-1">
                Droppings check
              </h1>
              <p className="text-[14px] text-gray-500 mb-6">
                {droppingsMode === "form"
                  ? "Log abnormal manure spotted under a cage or row."
                  : "Review logged locations or add another."}
              </p>

              {/* MODE A: ADD / EDIT DROPPINGS ISSUE FORM */}
              {droppingsMode === "form" && (
                <div className="space-y-5">
                  {/* Sleek Searchable Combobox for Cage / Row Location */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Cage / Row location
                    </label>
                    <button
                      type="button"
                      onClick={() => setDroppingsCageOpen((prev) => !prev)}
                      className={`w-full px-4 py-3 text-base text-left bg-white border rounded-lg flex items-center justify-between transition-colors ${
                        droppingsCageOpen
                          ? "border-gray-900 ring-2 ring-gray-100"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span
                        className={
                          currentDroppingsDraft.cage
                            ? "text-gray-900 font-medium"
                            : "text-gray-400"
                        }
                      >
                        {currentDroppingsDraft.cage ||
                          "Select cage or row..."}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform ${
                          droppingsCageOpen ? "rotate-180 text-gray-900" : ""
                        }`}
                      />
                    </button>

                    {droppingsCageOpen && (
                      <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
                        <div className="p-2.5 border-b border-gray-100 flex items-center gap-2 bg-gray-50/60">
                          <Search size={16} className="text-gray-400 ml-1" />
                          <input
                            type="text"
                            value={droppingsCageSearch}
                            onChange={(e) =>
                              setDroppingsCageSearch(e.target.value)
                            }
                            placeholder="Search row or cage (e.g. Row B or B4)..."
                            autoFocus
                            className="w-full bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                          />
                          {droppingsCageSearch && (
                            <button
                              type="button"
                              onClick={() => setDroppingsCageSearch("")}
                              className="text-gray-400 hover:text-gray-600 p-0.5"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>

                        <div className="max-h-48 overflow-y-auto divide-y divide-gray-50">
                          {filteredDroppingsLocations.length > 0 ? (
                            filteredDroppingsLocations.map((locName) => {
                              const isSelected =
                                currentDroppingsDraft.cage === locName;
                              return (
                                <button
                                  key={locName}
                                  type="button"
                                  onClick={() => {
                                    setCurrentDroppingsDraft((prev) => ({
                                      ...prev,
                                      cage: locName,
                                    }));
                                    setDroppingsCageOpen(false);
                                    setDroppingsCageSearch("");
                                  }}
                                  className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors ${
                                    isSelected
                                      ? "bg-gray-50 text-gray-900 font-semibold"
                                      : "text-gray-700 hover:bg-gray-50"
                                  }`}
                                >
                                  <span>{locName}</span>
                                  {isSelected && (
                                    <Check
                                      size={16}
                                      className="text-gray-900"
                                      strokeWidth={2.5}
                                    />
                                  )}
                                </button>
                              );
                            })
                          ) : (
                            <div className="px-4 py-4 text-center text-sm text-gray-400">
                              No locations match &ldquo;{droppingsCageSearch}
                              &rdquo;
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Condition Observed Selector (Multi-select, Pure Observation) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Condition observed
                    </label>
                    <div className="space-y-2.5">
                      {(
                        [
                          "watery",
                          "bloody",
                          "greenish",
                        ] as DroppingsCondition[]
                      ).map((condKey) => {
                        const meta = DROPPINGS_CONDITION_META[condKey];
                        const isSelected =
                          currentDroppingsDraft.conditions.includes(condKey);
                        return (
                          <button
                            key={condKey}
                            type="button"
                            onClick={() =>
                              handleToggleDroppingsCondition(condKey)
                            }
                            className={`w-full px-4 py-3.5 rounded-xl bg-white border transition-all text-left flex items-center justify-between ${
                              isSelected
                                ? "border-gray-900 ring-2 ring-gray-100"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-2 h-2 rounded-full ${meta.dotClass}`}
                              />
                              <span className="text-[15px] font-medium text-gray-900">
                                {meta.label}
                              </span>
                            </div>
                            {isSelected && (
                              <Check
                                size={18}
                                className="text-gray-900 shrink-0"
                                strokeWidth={2.5}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Multiple Tray Photos Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Tray photos (optional)
                    </label>

                    {currentDroppingsDraft.photos.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {currentDroppingsDraft.photos.map((photoLabel, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-medium text-gray-800"
                          >
                            <Camera size={13} className="text-gray-500" />
                            <span>{photoLabel}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveDroppingsPhoto(idx)}
                              className="text-gray-400 hover:text-red-600 ml-0.5"
                              aria-label={`Remove ${photoLabel}`}
                            >
                              <X size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleAddDroppingsPhoto}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Camera size={16} strokeWidth={2} />
                      <span>
                        {currentDroppingsDraft.photos.length === 0
                          ? "Add photos (optional)"
                          : "Add another photo"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* MODE B: PROGRESSIVE SUMMARY OF LOGGED DROPPINGS LOCATIONS */}
              {droppingsMode === "summary" && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={handleStartNewDroppings}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add another cage or row</span>
                  </button>

                  {droppingsList.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <span>Logged Locations ({droppingsList.length})</span>
                      </div>

                      {droppingsList.map((item) => {
                        const conditionLabels = item.conditions
                          .map((c) => DROPPINGS_CONDITION_META[c].shortLabel)
                          .join(", ");
                        return (
                          <div
                            key={item.id}
                            className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between gap-3"
                          >
                            <div>
                              <h4 className="text-[15px] font-semibold text-gray-900">
                                {item.cage}
                              </h4>
                              <p className="text-[13px] text-gray-500 mt-0.5">
                                {conditionLabels}
                                {item.photos.length > 0
                                  ? ` · ${item.photos.length} ${
                                      item.photos.length === 1
                                        ? "photo"
                                        : "photos"
                                    }`
                                  : ""}
                              </p>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleEditDroppings(item.id)}
                                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                aria-label="Edit droppings issue"
                              >
                                <Pencil size={16} strokeWidth={2} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveDroppings(item.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label="Remove droppings issue"
                              >
                                <Trash2 size={16} strokeWidth={2} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom CTA */}
            {droppingsMode === "form" ? (
              <button
                type="button"
                disabled={
                  !currentDroppingsDraft.cage ||
                  currentDroppingsDraft.conditions.length === 0
                }
                onClick={handleSaveCurrentDroppings}
                className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
              >
                {editingDroppingsId ? "Update Location" : "Add Droppings Issue"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveDroppingsReport}
                className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
              >
                Save Droppings Log
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
