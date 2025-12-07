import type { PrivilegeHint } from "./privilegeHint";

export interface Privilege {
  id: number;
  name: string;
  description: string;
  inputType: number;
  active: boolean;
  companionId?: number;
  rules: string;
  hint: PrivilegeHint;
}
