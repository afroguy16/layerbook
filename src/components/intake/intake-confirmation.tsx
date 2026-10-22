"use client";

import React from "react";
import { btn, errorText, fieldLabel, inkText, mutedText } from "./intake-theme";
import { answersCount, type Intake } from "./use-intake";

const answerInput =
  "w-full px-4 py-3 text-base text-gray-900 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-100 transition-colors resize-y";

export function IntakeConfirmation({ intake }: { intake: Intake }) {
  const {
    submitted,
    answers,
    setAnswer,
    sendAnswers,
    skipAnswers,
    answersSent,
    skipped,
    isSubmitting,
    error,
  } = intake;

  const given = answersCount(answers);

  return (
    <div>
      <div className="rounded-2xl bg-[#f4f6fa] p-6">
        <div className="flex items-center gap-2 text-[#1C1917]">
          <span aria-hidden="true" className="text-[15px] font-bold">
            ✓
          </span>
          <span className="text-[13px] font-bold uppercase tracking-wide">Received.</span>
        </div>
        <p className={`mt-3 text-[15px] leading-6 ${inkText}`}>
          We will set up your pens and your attendants before we start, then message you on WhatsApp
          when it is ready.
        </p>
        {submitted && (
          <p className={`mt-2 text-[13px] leading-5 ${mutedText}`}>
            {submitted.farm.trim()}. Reply on WhatsApp to change anything.
          </p>
        )}
      </div>

      {answersSent ? (
        <p className="mt-7 text-[15px] leading-6 font-medium text-[#1C1917]">
          Sent. Thank you. We will use this when we set your farm up.
        </p>
      ) : skipped ? (
        <p className={`mt-7 text-[15px] leading-6 ${mutedText}`}>
          No problem. We will message you on WhatsApp.
        </p>
      ) : (
        <div className="mt-8">
          <h2 className={`text-[17px] font-semibold ${inkText}`}>One last thing. It is optional.</h2>
          <p className={`mt-1 text-[14px] leading-5 ${mutedText}`}>
            Tell us this and we could prioritize building it.
          </p>

          <div className="mt-5">
            <label htmlFor="intake-wish" className={fieldLabel}>
              What is the one thing about your farm that you wish you could see without being there?
            </label>
            <textarea
              id="intake-wish"
              rows={3}
              value={answers.wish}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="One line is fine."
              className={answerInput}
            />

            <button
              type="button"
              onClick={sendAnswers}
              disabled={isSubmitting || given === 0}
              className={`${btn} mt-5`}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>

            <button
              type="button"
              onClick={skipAnswers}
              disabled={isSubmitting}
              className={`mt-3 h-11 w-full text-[14px] font-medium ${mutedText}`}
            >
              Not now
            </button>

            {error && (
              <p role="alert" className={`mt-3 ${errorText}`}>
                {error}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
