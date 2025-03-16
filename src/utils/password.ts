import { PasswordOptions, StrengthLevel } from "../types/password";

export class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordError";
  }
}

export const generatePassword = (options: PasswordOptions): string => {
  try {
    const {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    } = options;

    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      throw new PasswordError("Please select at least one character type");
    }

    if (length < 6 || length > 32) {
      throw new PasswordError(
        "Password length must be between 6 and 32 characters"
      );
    }

    // Ensure at least one character from each selected type
    let password = "";
    const charTypes: { [key: string]: string } = {
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    if (includeLowercase)
      password +=
        charTypes.lowercase[
          Math.floor(Math.random() * charTypes.lowercase.length)
        ];
    if (includeUppercase)
      password +=
        charTypes.uppercase[
          Math.floor(Math.random() * charTypes.uppercase.length)
        ];
    if (includeNumbers)
      password +=
        charTypes.numbers[Math.floor(Math.random() * charTypes.numbers.length)];
    if (includeSymbols)
      password +=
        charTypes.symbols[Math.floor(Math.random() * charTypes.symbols.length)];

    // Fill the rest randomly
    while (password.length < length) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    // Shuffle the password
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  } catch (error) {
    if (error instanceof PasswordError) throw error;
    throw new PasswordError("Failed to generate password");
  }
};

export const calculateStrength = (
  password: string,
  options: PasswordOptions
): number => {
  if (!password) return 0;

  let strength = 0;
  const patterns = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    numbers: /[0-9]/,
    symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/,
  };

  // Check for minimum length
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Check for character types
  if (patterns.lowercase.test(password) && options.includeLowercase)
    strength += 1;
  if (patterns.uppercase.test(password) && options.includeUppercase)
    strength += 1;
  if (patterns.numbers.test(password) && options.includeNumbers) strength += 1;
  if (patterns.symbols.test(password) && options.includeSymbols) strength += 1;

  // Check for variety
  const uniqueChars = new Set(password).size;
  if (uniqueChars >= password.length * 0.7) strength += 1;

  return Math.min(strength, 5);
};

export const getStrengthLevel = (strength: number): StrengthLevel => {
  if (strength <= 2) return "weak";
  if (strength <= 3) return "medium";
  return "strong";
};
