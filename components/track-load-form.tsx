"use client";

import { useState } from "react";

import { US_STATES } from "@/lib/us-states-list";

const inputClassName =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#0F172A] shadow-sm outline-none transition placeholder:text-[#94A3B8] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/15";

const labelClassName = "block text-sm font-medium text-[#334155]";

const selectClassName = `${inputClassName} cursor-pointer`;

const buttonClassName =
  "w-full rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#08162A] sm:w-auto";

export function TrackLoadForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="mt-2 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted ? (
        <p className="rounded-xl border border-[#C7D2FE] bg-[#EEF2FF] px-4 py-3 text-sm text-[#3730A3]">
          We received your load details. Real-time tracking will connect here when your
          TMS is linked.
        </p>
      ) : null}

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="loadId">
          Load ID
        </label>
        <input
          className={inputClassName}
          id="loadId"
          name="loadId"
          placeholder="e.g. FNX-000000"
          required
          type="text"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="puState">
            PU state
          </label>
          <select
            autoComplete="off"
            className={selectClassName}
            id="puState"
            name="puState"
            defaultValue=""
            required
          >
            <option disabled value="">
              Select pickup state
            </option>
            {US_STATES.map(({ abbr, name }) => (
              <option key={`pu-${abbr}`} value={abbr}>
                {name} ({abbr})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="deliveryState">
            Delivery state
          </label>
          <select
            autoComplete="off"
            className={selectClassName}
            id="deliveryState"
            name="deliveryState"
            defaultValue=""
            required
          >
            <option disabled value="">
              Select delivery state
            </option>
            {US_STATES.map(({ abbr, name }) => (
              <option key={`dl-${abbr}`} value={abbr}>
                {name} ({abbr})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <button
          className={buttonClassName}
          disabled={submitted}
          type="submit"
        >
          {submitted ? "Done" : "Here we go"}
        </button>
      </div>
    </form>
  );
}
