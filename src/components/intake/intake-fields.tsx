"use client";

import React from "react";
import { ChipRow } from "./intake-chips";
import { errorText, fieldLabel, inputBad, inputBase, inputOk } from "./intake-theme";
import type { Intake } from "./use-intake";
import { BIRD_OPTIONS, WHO_OPTIONS, type BirdBucket, type WhoLogs } from "./types";

function errorClass(error?: string) {
  return error ? inputBad : inputOk;
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p role="alert" className={errorText}>
      {error}
    </p>
  );
}

export function IntakeFields({ intake }: { intake: Intake }) {
  const { values, errors, setField, blur, toggleWho, isSubmitting } = intake;

  return (
    <>
      <div className="mb-5">
        <label htmlFor="intake-name" className={fieldLabel}>
          Your name
        </label>
        <input
          id="intake-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setField("name", e.target.value)}
          onBlur={() => blur("name")}
          placeholder="Chidi Okafor"
          className={`${inputBase} ${errorClass(errors.name)}`}
        />
        <FieldError error={errors.name} />
      </div>

      <div className="mb-5">
        <label htmlFor="intake-phone" className={fieldLabel}>
          WhatsApp number
        </label>
        <input
          id="intake-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => setField("phone", e.target.value)}
          onBlur={() => blur("phone")}
          placeholder="0803 456 7890"
          className={`${inputBase} ${errorClass(errors.phone)}`}
        />
        <FieldError error={errors.phone} />
      </div>

      <div className="mb-5">
        <label htmlFor="intake-email" className={fieldLabel}>
          Email address
        </label>
        <input
          id="intake-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setField("email", e.target.value)}
          onBlur={() => blur("email")}
          placeholder="chidi@example.com"
          className={`${inputBase} ${errorClass(errors.email)}`}
        />
        <FieldError error={errors.email} />
      </div>

      <div className="mb-5">
        <label htmlFor="intake-farm" className={fieldLabel}>
          Farm name and where it is
        </label>
        <input
          id="intake-farm"
          type="text"
          value={values.farm}
          onChange={(e) => setField("farm", e.target.value)}
          onBlur={() => blur("farm")}
          placeholder="Adeyemi Layers, Ibadan"
          className={`${inputBase} ${errorClass(errors.farm)}`}
        />
        <FieldError error={errors.farm} />
      </div>

      <ChipRow<BirdBucket>
        label="How many birds"
        options={BIRD_OPTIONS}
        selected={values.birds ? [values.birds] : []}
        columns="grid-cols-2"
        disabled={isSubmitting}
        error={errors.birds}
        onToggle={(v) => setField("birds", v)}
        onBlur={() => blur("birds")}
      />

      <ChipRow<WhoLogs>
        label="Who logs every day"
        options={WHO_OPTIONS}
        selected={values.who}
        columns="grid-cols-3"
        multiple
        disabled={isSubmitting}
        error={errors.who}
        onToggle={toggleWho}
        onBlur={() => blur("who")}
      />
    </>
  );
}
