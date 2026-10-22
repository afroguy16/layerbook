"use client";

import React from "react";
import { theme } from "@/lib/theme";
import { IntakeFields } from "./intake-fields";
import { IntakeConfirmation } from "./intake-confirmation";
import { btn, errorText, inkText, mutedText } from "./intake-theme";
import { useIntake } from "./use-intake";

export function DesktopIntake() {
  const intake = useIntake();
  const { submitted, alreadySubmitted } = intake;
  const done = submitted !== null || alreadySubmitted;

  return (
    <div
      className="min-h-dvh bg-white px-6 pt-28 pb-32 antialiased"
      style={{ fontFamily: theme.homeFont }}
    >
      <div className="mx-auto w-full max-w-[520px]">
        <h1 className={`${theme.title} ${inkText}`}>Tell us about your farm.</h1>
        <p className={`mt-3 max-w-[420px] text-[16px] leading-7 ${mutedText}`}>
          A few quick questions so we can get you into batch one.
        </p>

        <div className="mt-12">
          {done ? (
            <IntakeConfirmation intake={intake} />
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                intake.submit();
              }}
            >
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={intake.honeypot}
                  onChange={(e) => intake.setHoneypot(e.target.value)}
                />
              </div>

              <IntakeFields intake={intake} />

              <button type="submit" disabled={intake.isSubmitting} className={`${btn} mt-2`}>
                {intake.isSubmitting ? "Sending..." : "Submit"}
              </button>

              {intake.error && (
                <p role="alert" className={errorText}>
                  {intake.error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
