import { StrengthLevel } from "../types/password";

interface StrengthIndicatorProps {
  strength: number;
  className?: string;
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({
  strength,
  className = "",
}) => {
  const getStrengthColor = (index: number): string => {
    if (index >= strength) return "bg-gray-200 dark:bg-gray-700";

    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (): { text: string; color: string } => {
    if (strength <= 2) return { text: "Weak", color: "text-red-500" };
    if (strength <= 3) return { text: "Medium", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const { text, color } = getStrengthText();

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Password Strength
        </p>
        <span className={`text-xs font-medium ${color}`}>{text}</span>
      </div>
      <div
        className="flex gap-1"
        role="progressbar"
        aria-valuenow={strength}
        aria-valuemin={0}
        aria-valuemax={5}
        aria-label="Password strength"
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 sm:h-2 flex-1 rounded-full transition-colors ${getStrengthColor(
              i
            )}`}
          />
        ))}
      </div>
    </div>
  );
};

export default StrengthIndicator;
