export type PasswordStrength = 0 | 1 | 2 | 3 | 4;

export type PasswordStrengthLabel =
  | "Very Weak"
  | "Weak"
  | "Fair"
  | "Good"
  | "Strong";

export type ThemeType = "light" | "dark";

export interface PasswordPolicy {
  minLength?: number;
  mustContain?: {
    lowercase?: boolean;
    uppercase?: boolean;
    number?: boolean;
    symbol?: boolean;
  };
  maxLength?: number;
}

export interface PasswordValidationResult {
  valid: boolean;
  message?: string;
}

export interface PasswordStrengthResult {
  score: PasswordStrength;
  label: PasswordStrengthLabel;
  feedback: {
    suggestions: string[];
    warning: string | null;
  };
  passwordLength: number;
  validations: PasswordValidationResult[];
  meetsPolicy: boolean;
}

export interface StrengthBarProps {
  strength: PasswordStrength;
  theme?: ThemeType;
  className?: string;
  showLabels?: boolean;
  barOnly?: boolean;
}

export interface ValidationSuggestionsProps {
  validations: PasswordValidationResult[];
  suggestions: string[];
  warning: string | null;
  className?: string;
  theme?: ThemeType;
}

export interface PasswordStrengthMeterProps {
  password: string;
  theme?: ThemeType;
  className?: string;
  showLabels?: boolean;
  showBar?: boolean;
  showSuggestions?: boolean;
  scoreWords?: [string, string, string, string, string];
  policy?: PasswordPolicy;
  barOnly?: boolean;
  onChange?: (result: PasswordStrengthResult) => void;
}

export interface UsePasswordStrengthOptions {
  password: string;
  policy?: PasswordPolicy;
}
