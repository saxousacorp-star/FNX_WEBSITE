"use client";

import { useEffect, useRef, useState } from "react";

import {
  isValidUsPhoneDigits,
  usPhoneDigitsToDisplay,
  usPhoneInputToDigits,
} from "@/lib/us-phone";
import { US_STATES } from "@/lib/us-states-list";

const inputClassName =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-base text-[#0F172A] shadow-sm outline-none transition placeholder:text-[#94A3B8] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/15";

const labelClassName = "block text-sm font-medium text-[#334155]";

const selectClassName = `${inputClassName} cursor-pointer`;

const radioLabelClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] transition has-[:checked]:border-[#0B1F3A] has-[:checked]:ring-2 has-[:checked]:ring-[#0B1F3A]/15";

function toYesNo(raw: string): "Yes" | "No" {
  return raw.trim().toLowerCase() === "yes" ? "Yes" : "No";
}

const SUCCESS_RELOAD_MS = 3500;

export function OwnerOperatorForm() {
  const [submitted, setSubmitted] = useState(false);
  const reloadTimerRef = useRef<number | null>(null);
  const [sending, setSending] = useState(false);
  const [phoneDigits, setPhoneDigits] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const phoneDisplay = usPhoneDigitsToDisplay(phoneDigits);

  useEffect(() => {
    return () => {
      if (reloadTimerRef.current != null) {
        clearTimeout(reloadTimerRef.current);
      }
    };
  }, []);

  return (
    <form
      className="mt-2 space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setPhoneError(null);
        if (!isValidUsPhoneDigits(phoneDigits)) {
          setPhoneError(
            "US numbers only. Enter a full number: +1, area code, and 7 digits (e.g. +1 (555) 123-4567).",
          );
          return;
        }

        const form = e.currentTarget;

        const fd = new FormData(form);

        /** Mesmo contrato que `/api/owner-operator` envia ao Make (só texto, 11 campos). */
        const formData = {
          firstName: String(fd.get("firstName") ?? "").trim(),
          lastName: String(fd.get("lastName") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          phone: phoneDisplay.trim(),
          companyName: String(fd.get("companyName") ?? "").trim(),
          city: String(fd.get("city") ?? "").trim(),
          state: String(fd.get("state") ?? "").trim(),
          message: String(fd.get("message") ?? "").trim(),
          commercialInsurance: toYesNo(
            String(fd.get("commercialInsurance") ?? ""),
          ),
          dotNumber: toYesNo(String(fd.get("dotNumber") ?? "")),
        };

        setSending(true);
        try {
          const response = await fetch("/api/owner-operator", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          const data = (await response.json().catch(() => ({}))) as {
            error?: string;
            makeStatus?: number;
          };

          if (!response.ok) {
            const msg =
              typeof data.error === "string"
                ? data.error
                : `HTTP ${response.status} ${response.statusText}`;
            const stamp =
              typeof data.makeStatus === "number"
                ? ` — Make devolveu HTTP ${data.makeStatus}`
                : "";
            alert(`O servidor ou o webhook rejeitou o pedido.${stamp}\n\n${msg}`);
            return;
          }

          form.reset();
          setPhoneDigits("");
          setSubmitted(true);
          reloadTimerRef.current = window.setTimeout(() => {
            window.location.reload();
          }, SUCCESS_RELOAD_MS);
        } catch (err) {
          alert(
            `Não foi possível enviar: ${err instanceof Error ? err.message : String(err)}`,
          );
        } finally {
          setSending(false);
        }
      }}
    >
      {submitted ? (
        <p className="rounded-xl border border-[#C7D2FE] bg-[#EEF2FF] px-4 py-3 text-sm text-[#3730A3]">
          Thank you! We will contact you shortly via email and SMS.
          <span className="mt-1 block text-[#64748B]">
            This page will refresh shortly so you can submit again.
          </span>
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
            disabled={submitted || sending}
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
            disabled={submitted || sending}
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
          disabled={submitted || sending}
          id="companyName"
          name="companyName"
          placeholder="e.g. your LLC or DBA"
          required
          type="text"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="ooPhone">
            Phone number <span className="text-[#64748B]">(US only, starts with +1)</span>
          </label>
          <input
            autoComplete="tel"
            className={inputClassName}
            disabled={submitted || sending}
            enterKeyHint="next"
            id="ooPhone"
            inputMode="numeric"
            name="phone"
            onChange={(e) => {
              setPhoneError(null);
              setPhoneDigits(usPhoneInputToDigits(e.target.value));
            }}
            placeholder="+1 (555) 000-0000"
            type="tel"
            value={phoneDisplay}
            aria-describedby={
              phoneError != null
                ? "ooPhone-err ooPhone-hint"
                : "ooPhone-hint"
            }
            aria-invalid={phoneError != null}
          />
          {phoneError ? (
            <p className="text-sm text-[#B91C1C]" id="ooPhone-err" role="alert">
              {phoneError}
            </p>
          ) : null}
          <p className="text-sm text-[#64748B]" id="ooPhone-hint">
            Only United States numbers. Digits are formatted as +1 (XXX) XXX-XXXX for export.
          </p>
        </div>
        <div className="space-y-2">
          <label className={labelClassName} htmlFor="ooEmail">
            Email
          </label>
          <input
            autoComplete="email"
            className={inputClassName}
            disabled={submitted || sending}
            enterKeyHint="next"
            id="ooEmail"
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
          <label className={labelClassName} htmlFor="ooCity">
            City
          </label>
          <input
            autoComplete="address-level2"
            className={inputClassName}
            disabled={submitted || sending}
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
            disabled={submitted || sending}
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
              disabled={submitted || sending}
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
              disabled={submitted || sending}
              name="commercialInsurance"
              type="radio"
              value="no"
            />
            No
          </label>
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className={labelClassName}>
          DOT number
        </legend>
        <p className="text-sm text-[#64748B]">Do you have a DOT number?</p>
        <div className="flex flex-wrap gap-3">
          <label className={radioLabelClass}>
            <input
              className="h-4 w-4 accent-[#0B1F3A] shrink-0"
              disabled={submitted || sending}
              name="dotNumber"
              required
              type="radio"
              value="yes"
            />
            Yes
          </label>
          <label className={radioLabelClass}>
            <input
              className="h-4 w-4 accent-[#0B1F3A] shrink-0"
              disabled={submitted || sending}
              name="dotNumber"
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
          disabled={submitted || sending}
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
          disabled={submitted || sending}
          type="submit"
        >
          {submitted ? "Sent" : sending ? "Sending…" : "Send application"}
        </button>
      </div>
    </form>
  );
}
