import { ThemeType } from "../types";

export const getThemeClasses = (theme: ThemeType = "light") => {
  const baseClasses = {
    container: "pw-w-full pw-font-sans",
    strengthBar: {
      outer:
        "pw-w-full pw-h-2 pw-bg-strength-empty pw-rounded-full pw-overflow-hidden pw-my-2",
      inner: "pw-h-full pw-transition-all pw-duration-300 pw-ease-in-out",
    },
    label: "pw-text-sm pw-font-medium pw-mb-1",
    validationItem: "pw-flex pw-items-center pw-gap-2 pw-text-sm pw-mb-1",
    suggestions: "pw-mt-2",
    suggestionItem: "pw-text-sm pw-mb-1",
    warning: "pw-font-medium pw-text-sm pw-mb-2",
  };

  const themeSpecificClasses = {
    light: {
      container: "pw-text-gray-800",
      strengthBar: {
        0: "pw-bg-strength-weak pw-opacity-20",
        1: "pw-bg-strength-weak",
        2: "pw-bg-strength-fair",
        3: "pw-bg-strength-good",
        4: "pw-bg-strength-strong",
      },
      validationItem: {
        valid: "pw-text-strength-good",
        invalid: "pw-text-strength-weak",
      },
      suggestionItem: "pw-text-gray-600",
      warning: "pw-text-strength-weak",
    },
    dark: {
      container: "pw-text-gray-200",
      strengthBar: {
        0: "pw-bg-strength-weak pw-opacity-20",
        1: "pw-bg-strength-weak",
        2: "pw-bg-strength-fair",
        3: "pw-bg-strength-good",
        4: "pw-bg-strength-strong",
      },
      validationItem: {
        valid: "pw-text-strength-good",
        invalid: "pw-text-gray-400",
      },
      suggestionItem: "pw-text-gray-400",
      warning: "pw-text-strength-weak",
    },
  };

  return {
    ...baseClasses,
    ...themeSpecificClasses[theme],
  };
};

export const strengthToPercentage = (strength: number): number => {
  return Math.max(5, ((strength + 1) * 100) / 5);
};
