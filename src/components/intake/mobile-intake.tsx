"use client";

import React from "react";
import { theme } from "@/lib/theme";
import { IntakeFields } from "./intake-fields";
import { IntakeConfirmation } from "./intake-confirmation";
import { btn, errorText, inkText, mutedText } from "./intake-theme";
import { useIntake } from "./use-intake";

export function MobileIntake() {
  const intake = useIntake();
  const { submitted, alreadySubmitted } = intake;
  const done = submitted !== null || alreadySubmitted;

  return (
    <div
      className="min-h-dvh bg-white px-[18px] pt-10 pb-16 antialiased"
      style={{ fontFamily: theme.listFont }}
    >
      <div className="mx-auto w-full max-w-[480px]">
        <h1 className={`${theme.title} ${inkText}`}>Tell us about your farm.</h1>
        <p className={`mt-2 text-[15px] leading-6 ${mutedText}`}>
          A few quick questions so we can get you into batch one.
        </p>

        <div className="mt-7">
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

              <button
                type="submit"
                disabled={intake.isSubmitting}
                className={`${btn} mt-2`}
              >
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
