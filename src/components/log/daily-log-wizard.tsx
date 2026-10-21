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
  ClipboardEdit,
  CheckSquare,
  Inbox,
} from "lucide-react";
import { theme } from "@/lib/theme";

interface PenInfo {
  id: number;
  name: string;
  flockCount: number;
}

type ShiftPeriod = "Morning" | "Afternoon" | "Evening" | "Night";

type DesktopModule = "feed" | "eggs" | "water" | "mortality" | "droppings";

interface RoutineTaskDef {
  id: string;
  shift: ShiftPeriod;
  code: string;
  title: string;
  subtitle: string;
  modules: DesktopModule[];
}

const ROUTINE_TASKS: RoutineTaskDef[] = [
  {
    id: "morning",
    shift: "Morning",
    code: "MR",
    title: "Morning Routine",
    subtitle: "Feed · Eggs · Water",
    modules: ["feed", "eggs", "water"],
  },
  {
    id: "afternoon",
    shift: "Afternoon",
    code: "AF",
    title: "Afternoon Routine",
    subtitle: "Feed · Eggs",
    modules: ["feed", "eggs"],
  },
  {
    id: "evening",
    shift: "Evening",
    code: "EV",
    title: "Evening Routine",
    subtitle: "Feed · Eggs · Water",
    modules: ["feed", "eggs", "water"],
  },
  {
    id: "night",
    shift: "Night",
    code: "NT",
    title: "Night Check",
    subtitle: "Water · Mortality · Droppings",
    modules: ["water", "mortality", "droppings"],
  },
];

interface PenStoryEntry {
  id: string;
  penId: number;
  penName: string;
  dayLabel: string;
  shift: ShiftPeriod;
  storyKind: "task" | "generic";
  taskTitle?: string;
  timeLabel: string;
  feedBags: number;
  eggCrates: number;
  crackedPcs: number;
  waterLitres: number;
  deadCount: number;
  deadSummary?: string;
  droppingsSummary: string;
  hasIncident: boolean;
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

const INITIAL_STORIES: PenStoryEntry[] = [
  {
    id: "story-1",
    penId: 1,
    penName: "Pen 1",
    dayLabel: "Today · Wed, 21 Oct",
    shift: "Afternoon",
    storyKind: "task",
    taskTitle: "Afternoon routine",
    timeLabel: "2:15 PM",
    feedBags: 5,
    eggCrates: 0,
    crackedPcs: 0,
    waterLitres: 0,
    deadCount: 0,
    droppingsSummary: "Normal",
    hasIncident: false,
  },
  {
    id: "story-2",
    penId: 2,
    penName: "Pen 2",
    dayLabel: "Today · Wed, 21 Oct",
    shift: "Morning",
    storyKind: "task",
    taskTitle: "Morning routine",
    timeLabel: "9:40 AM",
    feedBags: 4,
    eggCrates: 26,
    crackedPcs: 2,
    waterLitres: 180,
    deadCount: 0,
    droppingsSummary: "Normal",
    hasIncident: false,
  },
  {
    id: "story-3",
    penId: 1,
    penName: "Pen 1",
    dayLabel: "Today · Wed, 21 Oct",
    shift: "Morning",
    storyKind: "task",
    taskTitle: "Morning routine",
    timeLabel: "8:30 AM",
    feedBags: 5,
    eggCrates: 34,
    crackedPcs: 3,
    waterLitres: 210,
    deadCount: 1,
    deadSummary: "1 dead (Row B · Cage B4)",
    droppingsSummary: "Normal",
    hasIncident: true,
  },
  {
    id: "story-4",
    penId: 3,
    penName: "Pen 3",
    dayLabel: "Yesterday · Tue, 20 Oct",
    shift: "Evening",
    storyKind: "task",
    taskTitle: "Evening routine",
    timeLabel: "4:50 PM",
    feedBags: 6,
    eggCrates: 48,
    crackedPcs: 1,
    waterLitres: 310,
    deadCount: 0,
    droppingsSummary: "Normal",
    hasIncident: false,
  },
  {
    id: "story-5",
    penId: 1,
    penName: "Pen 1",
    dayLabel: "Yesterday · Tue, 20 Oct",
    shift: "Afternoon",
    storyKind: "generic",
    timeLabel: "2:10 PM",
    feedBags: 5,
    eggCrates: 28,
    crackedPcs: 0,
    waterLitres: 190,
    deadCount: 0,
    droppingsSummary: "Watery (Row A)",
    hasIncident: true,
  },
];

export function DailyLogWizard() {
  const [activeTab, setActiveTab] = useState<"log" | "tasks" | "activity">(
    "log"
  );
  const [selectedPen, setSelectedPen] = useState<PenInfo | null>(null);
  const [activeRoutineTask, setActiveRoutineTask] =
    useState<RoutineTaskDef | null>(null);
  const [logPenFilter, setLogPenFilter] = useState<"all" | number>("all");
  const [taskPenFilter, setTaskPenFilter] = useState<number>(1);
  const [activityFilter, setActivityFilter] = useState<"all" | "incidents">(
    "all"
  );
  const [stories, setStories] = useState<PenStoryEntry[]>(INITIAL_STORIES);
  const [drawer, setDrawer] = useState<boolean>(false);
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

  // Reset current pen draft when selecting a pen or finishing a pass
  const resetCurrentPenDraft = () => {
    setTaskData({
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
    setFeedDraft("");
    setWaterDraft("");
    setEggDraft({ cratesLg: "", cratesMd: "", cratesPl: "", cratesJb: "" });
    setCrackedDraft({
      crackedLg: "",
      crackedMd: "",
      crackedPl: "",
      crackedJb: "",
    });
    setCasualtiesList([]);
    setDroppingsList([]);
  };

  // Complete Pen Story Submission when tapping "Done with Pen X" or "Complete Routine"
  const handleCompletePenPass = () => {
    if (!selectedPen) return;
    const hasAnyData =
      taskData.feed.logged ||
      taskData.eggs.logged ||
      taskData.water.logged ||
      savedDeadCount > 0 ||
      savedDroppingsCount > 0 ||
      Boolean(activeRoutineTask);

    if (hasAnyData) {
      const feedInBags =
        taskData.feed.unit === "kg"
          ? Math.round((taskData.feed.amount / 25) * 10) / 10
          : taskData.feed.amount;
      const eggsInCrates =
        taskData.eggs.unit === "pcs"
          ? Math.round(savedEggTotal / 30)
          : savedEggTotal;
      const crackedCount =
        (parseInt(taskData.eggs.crackedLg) || 0) +
        (parseInt(taskData.eggs.crackedMd) || 0) +
        (parseInt(taskData.eggs.crackedPl) || 0) +
        (parseInt(taskData.eggs.crackedJb) || 0);

      const newStory: PenStoryEntry = {
        id: `story-${Date.now()}`,
        penId: selectedPen.id,
        penName: selectedPen.name,
        dayLabel: "Today · Wed, 21 Oct",
        shift: activeRoutineTask ? activeRoutineTask.shift : "Afternoon",
        storyKind: activeRoutineTask ? "task" : "generic",
        taskTitle: activeRoutineTask
          ? activeRoutineTask.title.toLowerCase()
          : undefined,
        timeLabel: "Just now",
        feedBags: feedInBags,
        eggCrates: eggsInCrates,
        crackedPcs: crackedCount,
        waterLitres: taskData.water.litres,
        deadCount: savedDeadCount,
        deadSummary:
          savedDeadCount > 0
            ? `${savedDeadCount} dead (${taskData.mortality.items
                .map((i) => i.cage)
                .join(", ")})`
            : undefined,
        droppingsSummary:
          savedDroppingsCount > 0 ? savedDroppingsSummary : "Normal",
        hasIncident: savedDeadCount > 0 || savedDroppingsCount > 0,
      };
      setStories((prev) => [newStory, ...prev]);
    }

    resetCurrentPenDraft();
    setActiveRoutineTask(null);
    setSelectedPen(null);
  };

  // Today's Accumulated Totals (filtered by selected pill on Log tab)
  const todayStoriesForLogFilter = stories.filter(
    (s) =>
      s.dayLabel.startsWith("Today") &&
      (logPenFilter === "all" || s.penId === logPenFilter)
  );
  const todayTotalCrates = todayStoriesForLogFilter.reduce(
    (sum, s) => sum + s.eggCrates,
    0
  );
  const todayTotalCracked = todayStoriesForLogFilter.reduce(
    (sum, s) => sum + s.crackedPcs,
    0
  );
  const todayTotalFeed = todayStoriesForLogFilter.reduce(
    (sum, s) => sum + s.feedBags,
    0
  );
  const todayTotalWater = todayStoriesForLogFilter.reduce(
    (sum, s) => sum + s.waterLitres,
    0
  );
  const todayTotalDead = todayStoriesForLogFilter.reduce(
    (sum, s) => sum + s.deadCount,
    0
  );
  const todayAbnormalDroppings = todayStoriesForLogFilter.filter(
    (s) => s.droppingsSummary !== "Normal"
  ).length;

  // Per-pen today summary helper for Pen cards on Log tab
  const getPenTodayTotals = (penId: number) => {
    const penToday = stories.filter(
      (s) => s.dayLabel.startsWith("Today") && s.penId === penId
    );
    const crates = penToday.reduce((sum, s) => sum + s.eggCrates, 0);
    const bags = penToday.reduce((sum, s) => sum + s.feedBags, 0);
    return { crates, bags };
  };

  // Visibility helper for Pen Desktop modules (Unfiltered on Generic Log vs Pre-filtered on Task)
  const isModuleVisible = (mod: DesktopModule): boolean => {
    if (!activeRoutineTask) return true;
    return activeRoutineTask.modules.includes(mod);
  };

  const getShiftStatus = (
    penId: number,
    taskDef: RoutineTaskDef
  ): { status: "Done ✓" | "Partial" | "Open"; badgeClass: string } => {
    const shiftStories = stories.filter(
      (s) =>
        s.dayLabel.startsWith("Today") &&
        s.penId === penId &&
        s.shift === taskDef.shift
    );
    if (shiftStories.length === 0) {
      return {
        status: "Open",
        badgeClass: "bg-slate-100 text-[#64748b]",
      };
    }
    const hasFeed = shiftStories.some((s) => s.feedBags > 0);
    const hasEggs = shiftStories.some((s) => s.eggCrates > 0);
    const hasWater = shiftStories.some((s) => s.waterLitres > 0);

    const requiresFeed = taskDef.modules.includes("feed");
    const requiresEggs = taskDef.modules.includes("eggs");
    const requiresWater = taskDef.modules.includes("water");

    if (taskDef.shift === "Night") {
      return {
        status: "Done ✓",
        badgeClass: "bg-emerald-50 text-emerald-700",
      };
    }

    const feedOk = !requiresFeed || hasFeed;
    const eggsOk = !requiresEggs || hasEggs;
    const waterOk = !requiresWater || hasWater || (hasFeed && hasEggs);

    if (feedOk && eggsOk && waterOk) {
      return {
        status: "Done ✓",
        badgeClass: "bg-emerald-50 text-emerald-700",
      };
    }
    return {
      status: "Partial",
      badgeClass: "bg-amber-50 text-amber-800",
    };
  };

  // Format a PenStoryEntry into a crisp Linear-style notification summary line
  const formatStoryPreview = (story: PenStoryEntry): string => {
    const parts: string[] = [];
    if (story.eggCrates > 0) {
      parts.push(
        story.crackedPcs > 0
          ? `${story.eggCrates} crates (${story.crackedPcs} cracked)`
          : `${story.eggCrates} crates`
      );
    }
    if (story.feedBags > 0) {
      parts.push(`${story.feedBags} bags feed`);
    }
    if (story.waterLitres > 0) {
      parts.push(`${story.waterLitres} L water`);
    }
    if (story.deadCount > 0) {
      parts.push(story.deadSummary || `${story.deadCount} dead`);
    }
    if (story.droppingsSummary !== "Normal") {
      parts.push(`${story.droppingsSummary} droppings`);
    }
    return parts.length > 0 ? parts.join(" · ") : "Routine check completed";
  };

  const filteredActivityStories =
    activityFilter === "incidents"
      ? stories.filter((s) => s.hasIncident)
      : stories;

  const groupedActivityDays = Array.from(
    new Set(filteredActivityStories.map((s) => s.dayLabel))
  );

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
        {/* TAB 1: LOG (TODAY'S ACCUMULATION HERO + GENERIC PEN SELECTION) */}
        {/* ============================================================== */}
        {activeTab === "log" && !selectedPen && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Avatar Menu Trigger */}
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <button
                aria-label="Menu"
                onClick={() => setDrawer(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold bg-[#f7f1ea] text-[#78350f] active:scale-95 transition-transform"
              >
                AL
              </button>
            </div>

            {/* Pen Switcher Pills for Today's Summary */}
            <div className="px-6 pt-3 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setLogPenFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors shrink-0 ${
                  logPenFilter === "all"
                    ? "bg-[#0f172a] text-white"
                    : "bg-[#f4f6fa] text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                All Pens
              </button>
              {PENS.map((pen) => {
                const isSelected = logPenFilter === pen.id;
                return (
                  <button
                    key={pen.id}
                    type="button"
                    onClick={() => setLogPenFilter(pen.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors shrink-0 ${
                      isSelected
                        ? "bg-[#0f172a] text-white"
                        : "bg-[#f4f6fa] text-[#64748b] hover:text-[#0f172a]"
                    }`}
                  >
                    {pen.name}
                  </button>
                );
              })}
            </div>

            {/* PRIMARY HERO: TODAY'S COLLECTION (PURE AUTOBOOK) */}
            <div className="px-6 pt-4 pb-2">
              <div className="text-[13px] text-[#64748b] font-medium">
                Today&apos;s Collection
              </div>
              <div className="mt-2 mb-1">
                <span className="text-[56px] font-bold tracking-[-2px] leading-none text-[#0f172a]">
                  {todayTotalCrates} crates
                </span>
              </div>
              <div className="text-[14.5px] text-[#64748b]">
                {todayTotalCracked > 0
                  ? `${todayTotalCracked} pcs cracked today`
                  : "0 cracked today"}
              </div>
            </div>

            {/* DUAL BORDERLESS CARDS: FEED GIVEN & INCIDENTS */}
            <div className="flex gap-3 px-6 pt-4 pb-2">
              <div
                className={`flex-1 text-left rounded-2xl px-5 py-4 ${theme.card}`}
              >
                <span className="text-[13px] text-[#64748b] block font-medium mb-1">
                  Feed Given
                </span>
                <b className="block text-[24px] text-[#0f172a] font-bold tracking-tight">
                  {todayTotalFeed} bags
                </b>
                <span className="text-[12px] text-[#64748b] mt-0.5 block">
                  {todayTotalWater > 0
                    ? `${todayTotalWater} L water`
                    : "0 L water"}
                </span>
              </div>

              <div
                className={`flex-1 text-left rounded-2xl px-5 py-4 ${theme.card}`}
              >
                <span className="text-[13px] text-[#64748b] block font-medium mb-1">
                  Incidents
                </span>
                <b className="block text-[24px] text-[#0f172a] font-bold tracking-tight">
                  {todayTotalDead} dead
                </b>
                <span className="text-[12px] text-[#64748b] mt-0.5 block">
                  {todayAbnormalDroppings > 0
                    ? `${todayAbnormalDroppings} droppings issue`
                    : "Normal droppings"}
                </span>
              </div>
            </div>

            {/* SECTION: SELECT A PEN TO LOG (GENERIC / UNFILTERED ACTIVITY) */}
            <div className="px-6 pt-5 pb-1">
              <h3 className="text-[17px] font-bold text-[#0f172a]">
                Select a pen to log
              </h3>
            </div>

            <div className="divide-y divide-[#f1f5f9] px-6 pb-8">
              {PENS.filter(
                (pen) => logPenFilter === "all" || pen.id === logPenFilter
              ).map((pen) => {
                const totals = getPenTodayTotals(pen.id);
                const penCode = `P${pen.id}`;
                return (
                  <button
                    key={pen.id}
                    type="button"
                    onClick={() => {
                      resetCurrentPenDraft();
                      setActiveRoutineTask(null);
                      setSelectedPen(pen);
                      setCurrentFlow("desktop");
                    }}
                    className="w-full py-4 flex items-center justify-between text-left active:opacity-75 transition-opacity"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-10 h-10 rounded-full flex items-center justify-center text-[12.5px] font-semibold shrink-0 bg-[#f7f1ea] text-[#78350f]">
                        {penCode}
                      </span>
                      <div>
                        <b className="text-[15px] text-[#0f172a] block font-semibold">
                          {pen.name} · {pen.flockCount.toLocaleString()} birds
                        </b>
                        <span className="text-[12.5px] text-[#64748b] mt-0.5 block">
                          {totals.crates} crates · {totals.bags} bags today
                        </span>
                      </div>
                    </div>
                    <span className="text-[12px] font-semibold text-[#78350f] bg-[#f7f1ea] px-3 py-1 rounded-full shrink-0">
                      Log →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: TASKS (ACTIONABLE MANAGER ROUTINES -> PRE-FILTERED)     */}
        {/* ============================================================== */}
        {activeTab === "tasks" && !selectedPen && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Avatar Menu Trigger */}
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <button
                aria-label="Menu"
                onClick={() => setDrawer(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold bg-[#f7f1ea] text-[#78350f] active:scale-95 transition-transform"
              >
                AL
              </button>
            </div>

            <div className="px-6 pt-2 pb-3">
              <h1 className="text-[26px] font-bold text-[#0f172a] tracking-tight">
                Tasks
              </h1>
              <p className="text-[14px] text-[#64748b] mt-0.5">
                Tap a routine to log its required checks.
              </p>
            </div>

            {/* Pen Switcher Pills */}
            <div className="px-6 pb-3 flex items-center gap-2">
              {PENS.map((pen) => {
                const isSelected = taskPenFilter === pen.id;
                return (
                  <button
                    key={pen.id}
                    type="button"
                    onClick={() => setTaskPenFilter(pen.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
                      isSelected
                        ? "bg-[#0f172a] text-white"
                        : "bg-[#f4f6fa] text-[#64748b] hover:text-[#0f172a]"
                    }`}
                  >
                    {pen.name}
                  </button>
                );
              })}
            </div>

            {/* ACTIONABLE ROUTINE LIST (PURE AUTOBOOK LIST) */}
            <div className="divide-y divide-[#f1f5f9] px-6 pb-8">
              {ROUTINE_TASKS.map((taskDef) => {
                const st = getShiftStatus(taskPenFilter, taskDef);
                const targetPen =
                  PENS.find((p) => p.id === taskPenFilter) || PENS[0];

                return (
                  <button
                    key={taskDef.id}
                    type="button"
                    onClick={() => {
                      resetCurrentPenDraft();
                      setActiveRoutineTask(taskDef);
                      setSelectedPen(targetPen);
                      setCurrentFlow("desktop");
                    }}
                    className="w-full flex items-center justify-between py-4 text-left active:opacity-75 transition-opacity"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-10 h-10 rounded-full flex items-center justify-center text-[12.5px] font-semibold shrink-0 bg-[#f7f1ea] text-[#78350f]">
                        {taskDef.code}
                      </span>
                      <div>
                        <b className="text-[15px] font-semibold text-[#0f172a] block">
                          {taskDef.title}
                        </b>
                        <span className="text-[12.5px] text-[#64748b]">
                          {taskDef.subtitle}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${st.badgeClass}`}
                    >
                      {st.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: ACTIVITY (SENIOR LINEAR DESIGNER NOTIFICATION STREAM)   */}
        {/* ============================================================== */}
        {activeTab === "activity" && !selectedPen && (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Top Bar: Avatar + Whisper Filter Pills */}
            <div className="px-6 pt-6 pb-3 flex items-center justify-between">
              <button
                aria-label="Menu"
                onClick={() => setDrawer(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold bg-[#f7f1ea] text-[#78350f] active:scale-95 transition-transform"
              >
                AL
              </button>

              <div className="flex items-center gap-1 bg-[#f4f6fa] p-1 rounded-full">
                <button
                  type="button"
                  onClick={() => setActivityFilter("all")}
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all ${
                    activityFilter === "all"
                      ? "bg-white text-[#0f172a] shadow-2xs"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setActivityFilter("incidents")}
                  className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-all flex items-center gap-1.5 ${
                    activityFilter === "incidents"
                      ? "bg-white text-[#0f172a] shadow-2xs"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Incidents
                </button>
              </div>
            </div>

            <div className="px-6 pt-2 pb-3">
              <h1 className="text-[26px] font-bold text-[#0f172a] tracking-tight">
                Activity
              </h1>
            </div>

            {/* Linear-Style Notification Stream */}
            <div className="pb-8">
              {groupedActivityDays.map((dayLabel) => {
                const dayStories = filteredActivityStories.filter(
                  (s) => s.dayLabel === dayLabel
                );
                const shortDayTitle = dayLabel.startsWith("Today")
                  ? "Today"
                  : dayLabel.startsWith("Yesterday")
                  ? "Yesterday"
                  : dayLabel;

                return (
                  <div key={dayLabel} className="mb-3">
                    {/* Quiet Linear Group Header */}
                    <div className="px-6 py-2 text-[12px] font-semibold text-[#64748b]">
                      {shortDayTitle}
                    </div>

                    {/* Edge-to-Edge Notification Rows */}
                    <div className="divide-y divide-[#f1f5f9]">
                      {dayStories.map((story) => {
                        const penCode = `P${story.penId}`;
                        const activityLabel =
                          story.storyKind === "task" && story.taskTitle
                            ? story.taskTitle
                            : "General log";
                        return (
                          <div
                            key={story.id}
                            className="px-6 py-3.5 flex items-start gap-3.5 hover:bg-[#f8fafc] transition-colors"
                          >
                            {/* Left: Warm Circular Avatar with micro-status dot */}
                            <div className="relative shrink-0 mt-0.5">
                              <span className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold bg-[#f7f1ea] text-[#78350f]">
                                {penCode}
                              </span>
                              {story.hasIncident && (
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-amber-500 ring-2 ring-white" />
                              )}
                            </div>

                            {/* Center: 2-Line Scannable Pen Story */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <div className="truncate text-[14px]">
                                  <span className="font-semibold text-[#0f172a]">
                                    {story.penName}
                                  </span>
                                  <span className="text-[#94a3b8] mx-1.5">
                                    ·
                                  </span>
                                  <span className="text-[#475569] font-medium">
                                    {activityLabel}
                                  </span>
                                </div>
                                <span className="text-[12px] text-[#94a3b8] tabular-nums shrink-0">
                                  {story.timeLabel}
                                </span>
                              </div>

                              <p className="text-[13px] text-[#64748b] mt-0.5 leading-snug truncate">
                                {formatStoryPreview(story)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {groupedActivityDays.length === 0 && (
                <div className="px-6 py-12 text-center text-[13.5px] text-[#94a3b8]">
                  No activity matching this filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 1: PEN DESKTOP (UNFILTERED GENERIC OR PRE-FILTERED TASK)  */}
        {/* ============================================================== */}
        {selectedPen && currentFlow === "desktop" && (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              {/* Top Bar */}
              <div className="flex items-center pb-4">
                <button
                  onClick={() => {
                    setActiveRoutineTask(null);
                    setSelectedPen(null);
                  }}
                  className="text-[13.5px] font-semibold text-[#64748b] hover:text-[#0f172a] flex items-center gap-1 -ml-1 active:scale-95 transition-all"
                >
                  <ChevronLeft size={18} strokeWidth={2.2} />
                  {activeRoutineTask ? "Back to Tasks" : "Back"}
                </button>
              </div>

              <div className="mb-5">
                <h1 className="text-[28px] font-bold text-[#0f172a] tracking-tight">
                  {activeRoutineTask
                    ? `${activePen.name} · ${activeRoutineTask.title}`
                    : activePen.name}
                </h1>
              </div>

              {/* DUAL BORDERLESS CARDS: FEED GIVEN & EGG HARVEST */}
              {(isModuleVisible("feed") || isModuleVisible("eggs")) && (
                <div
                  className={`grid ${
                    isModuleVisible("feed") && isModuleVisible("eggs")
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  } gap-3 mb-6`}
                >
                  {/* Feed Given */}
                  {isModuleVisible("feed") && (
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
                      className={`rounded-2xl p-4 ${theme.card} cursor-pointer active:scale-[0.98] transition-transform flex flex-col justify-between min-h-[132px]`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-10 h-10 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center">
                          <Wheat size={19} strokeWidth={2} />
                        </span>
                        <span
                          className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${
                            taskData.feed.logged
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-[#f7f1ea] text-[#78350f]"
                          }`}
                        >
                          {taskData.feed.logged ? "Logged ✓" : "+ Log"}
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className="text-[13px] text-[#64748b] font-medium block">
                          Feed Given
                        </span>
                        <b className="block text-[22px] text-[#0f172a] font-bold tracking-tight leading-tight mt-0.5">
                          {taskData.feed.logged
                            ? `${taskData.feed.amount} ${taskData.feed.unit}`
                            : `0 ${taskData.feed.unit}`}
                        </b>
                      </div>
                    </div>
                  )}

                  {/* Egg Harvest */}
                  {isModuleVisible("eggs") && (
                    <div
                      onClick={() => {
                        setEggScreen("main");
                        setCurrentFlow("eggs");
                      }}
                      className={`rounded-2xl p-4 ${theme.card} cursor-pointer active:scale-[0.98] transition-transform flex flex-col justify-between min-h-[132px]`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-600 flex items-center justify-center">
                          <Egg size={19} strokeWidth={2} />
                        </span>
                        <span
                          className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${
                            taskData.eggs.logged
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-[#f7f1ea] text-[#78350f]"
                          }`}
                        >
                          {taskData.eggs.logged ? "Logged ✓" : "+ Log"}
                        </span>
                      </div>
                      <div className="mt-3">
                        <span className="text-[13px] text-[#64748b] font-medium block">
                          Egg Harvest
                        </span>
                        <b className="block text-[22px] text-[#0f172a] font-bold tracking-tight leading-tight mt-0.5">
                          {taskData.eggs.logged
                            ? `${savedEggTotal} ${taskData.eggs.unit}`
                            : `0 ${taskData.eggs.unit}`}
                        </b>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CHECKS & INCIDENTS (PURE AUTOBOOK DIVIDE-Y LIST) */}
              {(isModuleVisible("water") ||
                isModuleVisible("mortality") ||
                isModuleVisible("droppings")) && (
                <>
                  <div className="pb-1">
                    <h3 className="text-[17px] font-bold text-[#0f172a]">
                      Checks &amp; incidents
                    </h3>
                  </div>

                  <div className="divide-y divide-[#f1f5f9]">
                    {/* Water Intake */}
                    {isModuleVisible("water") && (
                      <div
                        onClick={() => setCurrentFlow("water")}
                        className="py-4 flex items-center justify-between cursor-pointer active:opacity-75 transition-opacity"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                            <Droplets size={18} strokeWidth={2} />
                          </span>
                          <div>
                            <b className="text-[15px] text-[#0f172a] block font-semibold">
                              Water Intake
                            </b>
                            <span className="text-[12.5px] text-[#64748b]">
                              {taskData.water.logged
                                ? `${taskData.water.litres} L recorded`
                                : "0 L recorded"}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${
                            taskData.water.logged
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-[#f7f1ea] text-[#78350f]"
                          }`}
                        >
                          {taskData.water.logged ? "Logged ✓" : "+ Log"}
                        </span>
                      </div>
                    )}

                    {/* Mortality */}
                    {isModuleVisible("mortality") && (
                      <div
                        onClick={openMortalityFlow}
                        className="py-4 flex items-center justify-between cursor-pointer active:opacity-75 transition-opacity"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                            <AlertTriangle size={18} strokeWidth={2} />
                          </span>
                          <div>
                            <b className="text-[15px] text-[#0f172a] block font-semibold">
                              Mortality
                            </b>
                            <span className="text-[12.5px] text-[#64748b]">
                              {savedDeadCount > 0
                                ? `${savedDeadCount} dead across ${
                                    taskData.mortality.items.length
                                  } ${
                                    taskData.mortality.items.length === 1
                                      ? "cage"
                                      : "cages"
                                  }`
                                : "0 dead today"}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
                            savedDeadCount > 0
                              ? "bg-amber-50 text-amber-800"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {savedDeadCount > 0
                            ? `${savedDeadCount} logged`
                            : "Normal ✓"}
                        </span>
                      </div>
                    )}

                    {/* Droppings */}
                    {isModuleVisible("droppings") && (
                      <div
                        onClick={openDroppingsFlow}
                        className="py-4 flex items-center justify-between cursor-pointer active:opacity-75 transition-opacity"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                            <Activity size={18} strokeWidth={2} />
                          </span>
                          <div>
                            <b className="text-[15px] text-[#0f172a] block font-semibold">
                              Droppings
                            </b>
                            <span className="text-[12.5px] text-[#64748b]">
                              {savedDroppingsCount > 0
                                ? `${savedDroppingsSummary} across ${savedDroppingsCount} ${
                                    savedDroppingsCount === 1
                                      ? "location"
                                      : "locations"
                                  }`
                                : "Normal (Formed)"}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${
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
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Big Tap Target to Submit Pen Pass & Return */}
            <button
              type="button"
              onClick={handleCompletePenPass}
              className="w-full h-[52px] rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-[15px] active:scale-[0.99] transition-all mt-6 shrink-0"
            >
              {activeRoutineTask
                ? `Complete ${activeRoutineTask.title}`
                : `Done with ${activePen.name}`}
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
                      className={`h-13 rounded-2xl flex items-center justify-center font-semibold active:scale-95 transition-all select-none ${
                        isDelete
                          ? "bg-[#f4f6fa] text-[#64748b] hover:bg-slate-200/70"
                          : "bg-[#f4f6fa] hover:bg-slate-200/70 text-[#0f172a] text-[22px]"
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
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f4f6fa] text-xs font-medium text-[#0f172a]"
                          >
                            <Camera size={13} className="text-[#64748b]" />
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
                      className="w-full px-4 py-3.5 rounded-xl bg-[#f4f6fa] hover:bg-slate-200/70 text-[#0f172a] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
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
                    className="w-full bg-[#f4f6fa] hover:bg-slate-200/70 text-[#0f172a] font-medium text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
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
                          className={`rounded-2xl p-4 ${theme.card} flex items-center justify-between gap-3`}
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
                      className="w-full bg-[#f4f6fa] hover:bg-slate-200/70 text-[#0f172a] font-medium text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Log cracked eggs (optional)</span>
                    </button>
                  ) : (
                    <div
                      className={`rounded-2xl p-4 ${theme.card} flex items-center justify-between gap-3`}
                    >
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
                            className={`w-full px-4 py-3.5 rounded-xl transition-all text-left flex items-center justify-between ${
                              isSelected
                                ? "bg-[#0f172a] text-white"
                                : "bg-[#f4f6fa] text-[#0f172a] hover:bg-slate-200/70"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-2 h-2 rounded-full ${meta.dotClass}`}
                              />
                              <span
                                className={`text-[15px] font-medium ${
                                  isSelected ? "text-white" : "text-[#0f172a]"
                                }`}
                              >
                                {meta.label}
                              </span>
                            </div>
                            {isSelected && (
                              <Check
                                size={18}
                                className="text-white shrink-0"
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
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f4f6fa] text-xs font-medium text-[#0f172a]"
                          >
                            <Camera size={13} className="text-[#64748b]" />
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
                      className="w-full px-4 py-3.5 rounded-xl bg-[#f4f6fa] hover:bg-slate-200/70 text-[#0f172a] text-sm font-medium flex items-center justify-center gap-2 transition-colors"
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
                    className="w-full bg-[#f4f6fa] hover:bg-slate-200/70 text-[#0f172a] font-medium text-sm rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 transition-colors"
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
                            className={`rounded-2xl p-4 ${theme.card} flex items-center justify-between gap-3`}
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

        {/* ============================================================== */}
        {/* BOTTOM NAVIGATION BAR (SHOWN ON TOP-LEVEL VIEWS)               */}
        {/* ============================================================== */}
        {!selectedPen && (
          <nav className="shrink-0 h-[64px] bg-white border-t border-[#f1f5f9] px-4 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={() => setActiveTab("log")}
              className={`flex flex-col items-center gap-1 flex-1 text-[11px] font-medium transition-colors ${
                activeTab === "log"
                  ? "text-[#78350f] font-bold"
                  : "text-[#94a3b8]"
              }`}
            >
              <ClipboardEdit size={20} strokeWidth={1.9} />
              <span>Log</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tasks")}
              className={`flex flex-col items-center gap-1 flex-1 text-[11px] font-medium transition-colors ${
                activeTab === "tasks"
                  ? "text-[#78350f] font-bold"
                  : "text-[#94a3b8]"
              }`}
            >
              <CheckSquare size={20} strokeWidth={1.9} />
              <span>Tasks</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("activity")}
              className={`flex flex-col items-center gap-1 flex-1 text-[11px] font-medium transition-colors ${
                activeTab === "activity"
                  ? "text-[#78350f] font-bold"
                  : "text-[#94a3b8]"
              }`}
            >
              <Inbox size={20} strokeWidth={1.9} />
              <span>Activity</span>
            </button>
          </nav>
        )}

        {/* ============================================================== */}
        {/* AUTOBOOK DRAWER (WITH LOG <-> CONSOLE SWITCH IN FOOTER)        */}
        {/* ============================================================== */}
        {drawer && (
          <div className="absolute inset-0 z-50 bg-white flex flex-col justify-between p-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[#78350f] bg-[#f7f1ea] text-[15px]">
                    AL
                  </span>
                  <b className="block text-[18px] text-[#0f172a] font-bold">
                    Adeyemi Layers
                  </b>
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
                  <span className="text-[17px] text-[#0f172a] font-semibold">
                    Profile
                  </span>
                </div>

                <div className="py-4 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <span className="text-[17px] text-[#0f172a] font-semibold">
                    Flock
                  </span>
                </div>

                <div className="py-4 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <span className="text-[17px] text-[#0f172a] font-semibold">
                    Staff
                  </span>
                </div>

                <div className="py-4 cursor-pointer hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <span className="text-[17px] text-[#0f172a] font-semibold">
                    Settings
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[12.5px] text-slate-400 pt-4 border-t border-slate-100">
              <span>
                Prototype powered by{" "}
                <a
                  href="https://emu.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#78350f] hover:underline"
                >
                  emu.network
                </a>
              </span>

              {/* Small Toggle Menu: Log <-> Console (Owner) */}
              <div className="inline-flex items-center rounded-lg bg-slate-100 p-0.5 text-[11.5px] font-semibold">
                <span className="px-2.5 py-1 rounded-md bg-white text-[#0f172a] shadow-2xs">
                  Log
                </span>
                <Link
                  href="/"
                  className="px-2.5 py-1 rounded-md text-slate-500 hover:text-[#0f172a] transition-colors"
                >
                  Console
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
