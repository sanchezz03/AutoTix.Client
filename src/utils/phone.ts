export function normalizeInput(value: string): string {
  let v = value.trim();
  v = v.replace(/[^\d+]/g, "");
  if (!v.startsWith("+")) v = "+" + v.replace(/^\+/, "");
  return v;
}

export const E164_REGEX = /^\+[1-9]\d{1,14}$/;

export function isValidE164(value: string): boolean {
  return E164_REGEX.test(value);
}

export const UA_REGEX = /^\+380\d{9}$/;
export function isValidUA(value: string): boolean {
  return UA_REGEX.test(value);
}

export function formatDisplay(value: string, country: string = "UA"): string {
  if (!value) return "";

  if (country === "UA") {
    if (value.startsWith("+380")) {
      const digits = value.replace(/\D/g, "").substring(3);
      return `+380 ${digits.substring(0, 2)} ${digits.substring(
        2,
        5
      )}-${digits.substring(5, 7)}-${digits.substring(7, 9)}`.trim();
    }
  }

  return value;
}
