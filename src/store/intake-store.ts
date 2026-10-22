import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IntakeAnswers, IntakeValues } from "@/components/intake/types";

interface IntakeStoreI {
  // The values captured at stage-one submit. Kept here, not just a flag, so an
  // optional stage-two send still has a contact to attach to after a reload.
  submission: IntakeValues | null;
  submittedAt: number | null;
  answersSent: boolean;

  recordSubmission: (values: IntakeValues) => void;
  recordAnswers: () => void;
  hasSubmitted: () => boolean;
  reset: () => void;
}

export const useIntakeStore = create<IntakeStoreI>()(
  persist(
    (set, get) => ({
      submission: null,
      submittedAt: null,
      answersSent: false,

      recordSubmission: (values) =>
        set({ submission: values, submittedAt: Date.now(), answersSent: false }),

      recordAnswers: () => set({ answersSent: true }),

      hasSubmitted: () => get().submittedAt !== null,

      reset: () => set({ submission: null, submittedAt: null, answersSent: false }),
    }),
    {
      name: "layerbook-intake-store",
    },
  ),
);

// Dev helper, mirroring portfolio-demo's resetJobStore.
if (typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).resetIntakeStore = () => {
    window.localStorage.removeItem("layerbook-intake-store");
    window.location.reload();
  };
}
