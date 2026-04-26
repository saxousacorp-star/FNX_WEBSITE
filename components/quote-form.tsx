"use client";

import { useState } from "react";

import { US_STATES } from "@/lib/us-states-list";

const inputClassName =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#0F172A] shadow-sm outline-none transition placeholder:text-[#94A3B8] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/15";

const labelClassName = "block text-sm font-medium text-[#334155]";

const selectClassName = `${inputClassName} cursor-pointer`;

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="mt-2 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted ? (
        <p className="rounded-xl border border-[#C7D2FE] bg-[#EEF2FF] px-4 py-3 text-sm text-[#3730A3]">
          Thank you. We’ve received your details and will follow up with your quote
          shortly.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="firstName">
            First Name
          </label>
          <input
            autoComplete="given-name"
            className={inputClassName}
            id="firstName"
            name="firstName"
            placeholder="e.g. Jordan"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="lastName">
            Last Name
          </label>
          <input
            autoComplete="family-name"
            className={inputClassName}
            id="lastName"
            name="lastName"
            placeholder="e.g. Rivera"
            required
            type="text"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="phone">
          Phone Number
        </label>
        <input
          autoComplete="tel"
          className={inputClassName}
          id="phone"
          name="phone"
          placeholder="e.g. +1 (555) 000-0000"
          required
          type="tel"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="city">
            City
          </label>
          <input
            autoComplete="address-level2"
            className={inputClassName}
            id="city"
            name="city"
            placeholder="e.g. Charlotte"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="state">
            State
          </label>
          <select
            autoComplete="address-level1"
            className={selectClassName}
            id="state"
            name="state"
            defaultValue=""
            required
          >
            <option disabled value="">
              Select a state
            </option>
            {US_STATES.map(({ abbr, name }) => (
              <option key={abbr} value={abbr}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="message">
          Message
        </label>
        <textarea
          className={`${inputClassName} min-h-[9rem] resize-y`}
          id="message"
          name="message"
          placeholder="Route, freight details, window, or questions…"
          required
          rows={5}
        />
      </div>

      <div>
        <button
          className="rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#08162A] disabled:opacity-50"
          disabled={submitted}
          type="submit"
        >
          {submitted ? "Sent" : "Send request"}
        </button>
      </div>
    </form>
  );
}
