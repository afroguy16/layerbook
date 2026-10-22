"use client";

import { useCallback, useEffect, useState } from "react";
import { submitIntake } from "@/app/actions/submit-intake";
import {
  emptyAnswers,
  emptyValues,
  type IntakeAnswers,
  type IntakeField,
  type IntakeValues,
  type Touched,
  type WhoLogs,
} from "./types";

const STORAGE_KEY = "layerbook_intake_submitted";
const HONEYPOT_DELAY_MS = 2500;

// Client-only. Kept out of types.ts because the server action imports that module.
export function answersCount(answers: IntakeAnswers): number {
  return answers.wish.trim().length > 0 ? 1 : 0;
}

export function validateName(v: string): boolean {
  return v.trim().length >= 2;
}

export function validatePhone(v: string): boolean {
  const d = v.replace(/\D/g, "");
  return d.length >= 7 && d.length <= 15;
}

export function validateFarm(v: string): boolean {
  return v.trim().length >= 2;
}

export function validateEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export type Intake = ReturnType<typeof useIntake>;

export function useIntake() {
  const [values, setValues] = useState<IntakeValues>(emptyValues);
  const [answers, setAnswers] = useState<IntakeAnswers>(emptyAnswers);
  const [touched, setTouched] = useState<Touched>({});
  const [honeypot, setHoneypot] = useState("");
  const [openedAt] = useState(() => Date.now());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<IntakeValues | null>(null);
  const [answersSent, setAnswersSent] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY)) setAlreadySubmitted(true);
    } catch {
      // storage unavailable, treat as first visit
    }
  }, []);

  const setField = useCallback(<F extends IntakeField>(field: F, value: IntakeValues[F]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const toggleWho = useCallback((value: WhoLogs) => {
    setValues((prev) => ({
      ...prev,
      who: prev.who.includes(value)
        ? prev.who.filter((w) => w !== value)
        : [...prev.who, value],
    }));
    setError(null);
  }, []);

  const blur = useCallback((field: IntakeField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const errors: Partial<Record<IntakeField, string>> = {};
  if (touched.name && !validateName(values.name)) errors.name = "Enter your name.";
  if (touched.phone && !validatePhone(values.phone)) errors.phone = "Enter a number we can reach you on.";
  if (touched.email && !validateEmail(values.email)) errors.email = "Enter an email address we can write to.";
  if (touched.farm && !validateFarm(values.farm)) errors.farm = "Tell us the farm name and where it is.";
  if (touched.birds && !values.birds) errors.birds = "Pick how many birds.";
  if (touched.who && values.who.length === 0) errors.who = "Pick who logs.";

  const isFormValid =
    validateName(values.name) &&
    validatePhone(values.phone) &&
    validateEmail(values.email) &&
    validateFarm(values.farm) &&
    values.birds !== null &&
    values.who.length > 0;

  const looksLikeBot = honeypot.trim().length > 0 || Date.now() - openedAt < HONEYPOT_DELAY_MS;

  const submit = useCallback(async () => {
    setTouched({ name: true, phone: true, email: true, farm: true, birds: true, who: true });
    if (!isFormValid || isSubmitting) return;

    if (looksLikeBot) {
      setSubmitted(values);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const result = await submitIntake({ kind: "intake", values });
    setIsSubmitting(false);

    if (result.ok) {
      setSubmitted(values);
      try {
        window.localStorage.setItem(STORAGE_KEY, new Date().toISOString());
      } catch {
        // non fatal
      }
    } else {
      setError(result.error);
    }
  }, [isFormValid, isSubmitting, looksLikeBot, values]);

  const sendAnswers = useCallback(async () => {
    if (!submitted || answersSent || isSubmitting) return;
    if (answersCount(answers) === 0) return;

    setIsSubmitting(true);
    setError(null);
    const result = await submitIntake({ kind: "answers", values: submitted, answers });
    setIsSubmitting(false);

    if (result.ok) setAnswersSent(true);
    else setError(result.error);
  }, [answers, answersSent, isSubmitting, submitted]);

  const skipAnswers = useCallback(() => {
    setError(null);
    setSkipped(true);
  }, []);

  return {
    values,
    answers,
    touched,
    errors,
    isFormValid,
    isSubmitting,
    submitted,
    answersSent,
    skipped,
    alreadySubmitted,
    error,
    honeypot,
    setHoneypot,
    setField,
    toggleWho,
    blur,
    setAnswer: (value: string) => setAnswers((prev) => ({ ...prev, wish: value })),    submit,
    sendAnswers,
    skipAnswers,
  };
}
