/**
 * Phone helpers for KGZ (+996) numbers.
 *
 * The UI everywhere should:
 *  - keep the +996 prefix locked at the start;
 *  - allow only 9 digits after it (operator code + subscriber number);
 *  - validate before submit via isValidPhone().
 */

export const PHONE_COUNTRY_CODE = "+996";

/**
 * Force any user-typed string into a normalized +996XXXXXXXXX form.
 * - strips non-digit characters;
 * - if the user happens to have typed "996" at the start (e.g. "+996…"),
 *   that "996" is treated as the country code and removed;
 * - caps the subscriber tail at 9 digits;
 * - always prepends +996.
 */
export const normalizePhone = (raw: string): string => {
  let digits = (raw ?? "").replace(/\D/g, "");

  if (digits.startsWith("996")) {
    digits = digits.slice(3);
  }
  digits = digits.slice(0, 9);

  return PHONE_COUNTRY_CODE + digits;
};

/** True only when the value is a full KGZ phone: +996 + exactly 9 digits. */
export const isValidPhone = (value: string): boolean =>
  /^\+996\d{9}$/.test(value);

/** Cosmetic formatter: "+996 700 123 456". */
export const formatPhonePretty = (value: string): string => {
  const normalized = normalizePhone(value);
  const tail = normalized.slice(4);
  const parts = [tail.slice(0, 3), tail.slice(3, 6), tail.slice(6, 9)].filter(
    Boolean,
  );

  return parts.length ? `${PHONE_COUNTRY_CODE} ${parts.join(" ")}` : PHONE_COUNTRY_CODE;
};
