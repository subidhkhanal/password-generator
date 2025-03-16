export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface PasswordState extends PasswordOptions {
  password: string;
  strength: number;
}

export type StrengthLevel = "weak" | "medium" | "strong";

export interface PasswordUtils {
  generatePassword: (options: PasswordOptions) => string;
  calculateStrength: (password: string, options: PasswordOptions) => number;
  getStrengthLevel: (strength: number) => StrengthLevel;
}
