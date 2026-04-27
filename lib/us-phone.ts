const MAX_DIGITS = 11; // país 1 + 10 (NANP EUA)

/**
 * A partir do texto do input, extrai e normaliza só números EUA: sempre começam com 1
 * (9 dígitos após 1 = parte nacional incompleta; 10 = completo).
 */
export function usPhoneInputToDigits(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length === 0) {
    return "";
  }
  if (d[0] !== "1") {
    d = `1${d}`;
  }
  d = d.slice(0, MAX_DIGITS);
  if (!d.startsWith("1")) {
    return "";
  }
  return d;
}

/**
 * Exibição fixa: `+1 (555) 123-4567` para exportacao padronizada.
 */
export function usPhoneDigitsToDisplay(d: string): string {
  if (d.length === 0) {
    return "";
  }
  const r = d.slice(1, 11);
  if (r.length === 0) {
    return "+1";
  }
  if (r.length <= 3) {
    return `+1 (${r}`;
  }
  if (r.length <= 6) {
    return `+1 (${r.slice(0, 3)}) ${r.slice(3)}`;
  }
  return `+1 (${r.slice(0, 3)}) ${r.slice(3, 6)}-${r.slice(6, 10)}`;
}

export function isValidUsPhoneDigits(d: string): boolean {
  return d.length === MAX_DIGITS && d.startsWith("1");
}
