"use client";

import React from "react";
import { chipBase, chipOff, chipOn, errorText, groupHint, groupLabel } from "./intake-theme";

interface ChipRowProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  selected: T[];
  columns: string;
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  onToggle: (value: T) => void;
  onBlur?: () => void;
}

export function ChipRow<T extends string>({
  label,
  options,
  selected,
  columns,
  multiple = false,
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
                if (!multiple && on) {
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
