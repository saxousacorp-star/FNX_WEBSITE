"use client";

import { useState } from "react";

import { US_STATES } from "@/lib/us-states-list";

const inputClassName =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#0F172A] shadow-sm outline-none transition placeholder:text-[#94A3B8] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/15";

const labelClassName = "block text-sm font-medium text-[#334155]";

const selectClassName = `${inputClassName} cursor-pointer`;

export function QuoteForm() {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className="mt-2 space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setSending(true);

        const form = e.currentTarget;
        const fd = new FormData(form);

        const payload = {
          FirstName: String(fd.get("firstName") ?? "").trim(),
          LastName: String(fd.get("lastName") ?? "").trim(),
          Email: String(fd.get("email") ?? "").trim(),
          Phone: String(fd.get("phone") ?? "").trim(),
          City: String(fd.get("city") ?? "").trim(),
          State: String(fd.get("state") ?? "").trim(),
          Message: String(fd.get("message") ?? "").trim(),
        };

        try {
          const res = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = (await res.json().catch(() => ({}))) as { error?: string };

          if (!res.ok) {
            setError(
              typeof data.error === "string"
                ? data.error
                : "Something went wrong. Please try again.",
            );
            return;
          }

          form.reset();
          setSuccess(true);
        } catch {
          setError("Network error. Check your connection and try again.");
        } finally {
          setSending(false);
        }
      }}
    >
      {success ? (
        <p className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3 text-sm text-[#065F46]">
          Request received! We will contact you shortly.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]">
          {error}
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
            disabled={sending}
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
            disabled={sending}
            id="lastName"
            name="lastName"
            placeholder="e.g. Rivera"
            required
            type="text"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="phone">
            Phone Number
          </label>
          <input
            autoComplete="tel"
            className={inputClassName}
            disabled={sending}
            id="phone"
            name="phone"
            placeholder="e.g. +1 (555) 000-0000"
            required
            type="tel"
          />
        </div>
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="email">
            Email
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            disabled={sending}
            enterKeyHint="next"
            id="email"
            inputMode="email"
            name="email"
            placeholder="e.g. you@company.com"
            required
            type="email"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="city">
            City
          </label>
          <input
            autoComplete="address-level2"
            className={inputClassName}
            disabled={sending}
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
            disabled={sending}
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
          disabled={sending}
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
          disabled={sending}
          type="submit"
        >
          {sending ? "Sending..." : "Send request"}
        </button>
      </div>
    </form>
  );
}
