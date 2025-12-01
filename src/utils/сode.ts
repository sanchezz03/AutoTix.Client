export const CODE_LENGTH = 4;

export function isValidCode(code: string[]): boolean {
  if (code.length !== CODE_LENGTH) return false;
  return code.every((c) => /^\d$/.test(c));
}

export function normalizeCodeInput(input: string): string {
  const lastDigit = input.replace(/\D/g, "").slice(-1);
  return lastDigit;
}

export function validateCode(code: string[]): string | null {
  if (!code.some((c) => c !== "")) return "Code is required";
  if (code.filter((c) => c !== "").length < CODE_LENGTH)
    return "Code must be 4 digits";
  if (!isValidCode(code)) return "Code must contain only digits";
  return null;
}
