"use client";

import { useState } from "react";

import { US_STATES } from "@/lib/us-states-list";

const inputClassName =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#0F172A] shadow-sm outline-none transition placeholder:text-[#94A3B8] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/15";

const labelClassName = "block text-sm font-medium text-[#334155]";

const selectClassName = `${inputClassName} cursor-pointer`;

const radioLabelClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] transition has-[:checked]:border-[#0B1F3A] has-[:checked]:ring-2 has-[:checked]:ring-[#0B1F3A]/15";

export function OwnerOperatorForm() {
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
          Thank you. We’ve received your owner-operator details and will follow up
          shortly.
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="ooFirstName">
            First Name
          </label>
          <input
            autoComplete="given-name"
            className={inputClassName}
            id="ooFirstName"
            name="firstName"
            placeholder="e.g. Jordan"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="ooLastName">
            Last Name
          </label>
          <input
            autoComplete="family-name"
            className={inputClassName}
            id="ooLastName"
            name="lastName"
            placeholder="e.g. Rivera"
            required
            type="text"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="companyName">
          Company name
        </label>
        <input
          autoComplete="organization"
          className={inputClassName}
          id="companyName"
          name="companyName"
          placeholder="e.g. your LLC or DBA"
          required
          type="text"
        />
      </div>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="ooPhone">
          Phone number
        </label>
        <input
          autoComplete="tel"
          className={inputClassName}
          id="ooPhone"
          name="phone"
          placeholder="e.g. +1 (555) 000-0000"
          required
          type="tel"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="ooCity">
            City
          </label>
          <input
            autoComplete="address-level2"
            className={inputClassName}
            id="ooCity"
            name="city"
            placeholder="e.g. Charlotte"
            required
            type="text"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="ooState">
            State
          </label>
          <select
            autoComplete="address-level1"
            className={selectClassName}
            id="ooState"
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

      <fieldset className="space-y-3">
        <legend className={labelClassName}>
          Commercial insurance
        </legend>
        <p className="text-sm text-[#64748B]">Do you carry commercial insurance?</p>
        <div className="flex flex-wrap gap-3">
          <label className={radioLabelClass}>
            <input
              className="h-4 w-4 accent-[#0B1F3A] shrink-0"
              name="commercialInsurance"
              required
              type="radio"
              value="yes"
            />
            Yes
          </label>
          <label className={radioLabelClass}>
            <input
              className="h-4 w-4 accent-[#0B1F3A] shrink-0"
              name="commercialInsurance"
              type="radio"
              value="no"
            />
            No
          </label>
        </div>
      </fieldset>

      <div className="space-y-2">
        <label className={labelClassName} htmlFor="ooMessage">
          Message
        </label>
        <textarea
          className={`${inputClassName} min-h-[9rem] resize-y`}
          id="ooMessage"
          name="message"
          placeholder="Equipment, experience, lanes, or questions…"
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
          {submitted ? "Sent" : "Send application"}
        </button>
      </div>
    </form>
  );
}
