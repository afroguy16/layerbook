"use server";

import type { IntakePayload, SubmitResult } from "@/components/intake/types";
import { BIRD_OPTIONS, RELATIONSHIP_OPTIONS, WHO_OPTIONS } from "@/components/intake/types";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const digits = (v: string) => v.replace(/\D/g, "");

function validate(payload: IntakePayload): string | null {
  const { values } = payload;
  if (values.name.trim().length < 2) return "Enter the name we should use for you.";
  const phone = digits(values.phone);
  if (phone.length < 7 || phone.length > 15) return "That phone number does not look complete.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return "That email address does not look complete.";
  if (values.farm.trim().length < 2) return "Tell us the farm name and where it is.";
  if (!values.birds) return "Pick a bird count.";
  if (!values.who || values.who.length === 0) return "Pick who logs every day.";
  return null;
}

function birdLabel(payload: IntakePayload): string {
  const found = BIRD_OPTIONS.find((o) => o.value === payload.values.birds);
  return found ? found.label : payload.values.birds ?? "not given";
}

function whoLabel(payload: IntakePayload): string {
  const chosen = payload.values.who ?? [];
  if (!chosen.length) return "not given";
  return chosen
    .map((w) => WHO_OPTIONS.find((o) => o.value === w)?.label ?? w)
    .join(", ");
}

function labels<T extends string>(
  chosen: T[] | undefined,
  options: { value: T; label: string }[],
): string {
  const list = chosen ?? [];
  if (!list.length) return "not given";
  return list.map((v) => options.find((o) => o.value === v)?.label ?? v).join(", ");
}

function compose(payload: IntakePayload): { subject: string; text: string } {
  const { values } = payload;
  const head = payload.kind === "intake" ? "New pilot intake" : "Pilot intake: what they want to see";
  const subject = `${head}: ${values.farm.trim()}`;

  const lines = [
    head,
    "",
    `Name: ${values.name.trim()}`,
    `WhatsApp: ${values.phone.trim()}`,
    `Email: ${values.email.trim()}`,
    `Farm: ${values.farm.trim()}`,
    // Optional field. "not given" is a real answer here, not a missing value.
    `Relationship: ${labels(values.relationship ? [values.relationship] : [], RELATIONSHIP_OPTIONS)}`,
    `Birds: ${birdLabel(payload)}`,
    `Logs daily: ${whoLabel(payload)}`,
  ];

  if (payload.kind === "answers") {
    const { answers } = payload;
    lines.push(
      "",
      "What they wish they could see without being there",
      "",
      answers.wish.trim() || "no answer",
    );
  }

  return { subject, text: lines.join("\n") };
}

export async function submitIntake(payload: IntakePayload): Promise<SubmitResult> {
  const problem = validate(payload);
  if (problem) return { ok: false, error: problem };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL || "tega@emu.network";
  const from = process.env.INTAKE_FROM_EMAIL || "LayerBook <contact@emu.network>";
  const { subject, text } = compose(payload);
  const replyTo = payload.values.email.trim();

  if (!apiKey) {
    console.warn("[submitIntake] RESEND_API_KEY is not configured. Payload logged:", payload);
    return { ok: true };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, text, reply_to: [replyTo] }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[submitIntake] Resend rejected the send:", res.status, detail);
      return { ok: false, error: "We could not send that. Try again, or reply on WhatsApp." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[submitIntake] Resend request failed:", err);
    return { ok: false, error: "We could not send that. Try again, or reply on WhatsApp." };
  }
}
