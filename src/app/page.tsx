"use client";

import { useState, useEffect, useCallback } from "react";
import { FiCopy, FiRefreshCw } from "react-icons/fi";
import { generatePassword, calculateStrength } from "@/utils/password";
import { PasswordOptions } from "@/types/password";
import StrengthIndicator from "@/components/StrengthIndicator";

export default function Home() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePassword = useCallback(() => {
    try {
      setError(null);
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setStrength(calculateStrength(newPassword, options));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate password"
      );
      setPassword("");
      setStrength(0);
    }
  }, [options]);

  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (_) {
        setError("Failed to copy password to clipboard");
      }
    }
  };

  useEffect(() => {
    handleGeneratePassword();
  }, [handleGeneratePassword]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white">
          Password Generator
        </h1>

        <div className="space-y-4 sm:space-y-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="bg-gray-100 dark:bg-gray-700 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg md:text-xl font-mono text-gray-800 dark:text-gray-200 break-all pr-2">
                {password || "Generate a password"}
              </span>
              <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                <button
                  onClick={handleGeneratePassword}
                  className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  aria-label="Generate new password"
                >
                  <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 sm:p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors relative"
                  aria-label="Copy to clipboard"
                  disabled={!password}
                >
                  <FiCopy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex justify-between text-sm sm:text-base text-gray-700 dark:text-gray-300">
                Password Length
                <span>{options.length}</span>
              </label>
              <input
                type="range"
                min="6"
                max="32"
                value={options.length}
                onChange={(e) =>
                  setOptions((prev) => ({
                    ...prev,
                    length: parseInt(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-2"
                aria-label="Password length"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center space-x-3 text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={options.includeUppercase}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeUppercase: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Uppercase Letters
                </span>
              </label>

              <label className="flex items-center space-x-3 text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeLowercase: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Lowercase Letters
                </span>
              </label>

              <label className="flex items-center space-x-3 text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeNumbers: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Numbers
                </span>
              </label>

              <label className="flex items-center space-x-3 text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={options.includeSymbols}
                  onChange={(e) =>
                    setOptions((prev) => ({
                      ...prev,
                      includeSymbols: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Symbols
                </span>
              </label>
            </div>
          </div>

          <StrengthIndicator strength={strength} />
        </div>
        <p className="text-[10px] sm:text-xs text-center text-gray-500 dark:text-gray-400 mt-4 sm:mt-6">
          We do not store any passwords.
        </p>
      </div>
    </div>
  );
}
