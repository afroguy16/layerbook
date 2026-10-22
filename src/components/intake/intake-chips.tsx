"use client";

import React from "react";
import { chipBase, chipOff, chipOn, errorText, groupHint, groupLabel } from "./intake-theme";

interface ChipRowProps<T extends string> {
  label: string;
  hint?: string;
  options: { value: T; label: string }[];
  selected: T[];
  columns: string;
  multiple?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  error?: string;
  onToggle: (value: T) => void;
  onBlur?: () => void;
}

export function ChipRow<T extends string>({
  label,
  hint,
  options,
  selected,
  columns,
  multiple = false,
  clearable = false,
  disabled,
  error,
  onToggle,
  onBlur,
}: ChipRowProps<T>) {
  const id = `chips-${label.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div className="mb-5">
      <div id={`${id}-label`} className={groupLabel}>
        {label}
        {multiple && <span className={groupHint}>(pick all that apply)</span>}
        {!multiple && hint && <span className={groupHint}>{hint}</span>}
      </div>
      <div role="group" aria-labelledby={`${id}-label`} className={`grid gap-2 ${columns}`}>
        {options.map((option) => {
          const on = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              disabled={disabled}
              onClick={() => {
                // Required single-select rows lock once chosen. Optional rows
                // pass the tap through so the parent can clear the answer.
                if (!multiple && on && !clearable) {
                  onBlur?.();
                  return;
                }
                onToggle(option.value);
                onBlur?.();
              }}
              className={`${chipBase} ${on ? chipOn : chipOff}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className={errorText}>
          {error}
        </p>
      )}
    </div>
  );
}
