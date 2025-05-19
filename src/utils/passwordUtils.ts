import zxcvbn from "zxcvbn";
import {
  PasswordPolicy,
  PasswordStrength,
  PasswordStrengthLabel,
  PasswordStrengthResult,
  PasswordValidationResult,
} from "../types";

const STRENGTH_LABELS: PasswordStrengthLabel[] = [
  "Very Weak",
  "Weak",
  "Fair",
  "Good",
  "Strong",
];

export const scoreToLabel = (
  score: PasswordStrength
): PasswordStrengthLabel => {
  return STRENGTH_LABELS[score];
};

export const validatePasswordPolicy = (
  password: string,
  policy?: PasswordPolicy
): PasswordValidationResult[] => {
  if (!policy) return [];

  const validations: PasswordValidationResult[] = [];

  // Min length validation
  if (policy.minLength !== undefined) {
    validations.push({
      valid: password.length >= policy.minLength,
      message: `At least ${policy.minLength} characters`,
    });
  }

  // Max length validation
  if (policy.maxLength !== undefined) {
    validations.push({
      valid: password.length <= policy.maxLength,
      message: `No more than ${policy.maxLength} characters`,
    });
  }

  // Character type validations
  if (policy.mustContain) {
    if (policy.mustContain.lowercase) {
      validations.push({
        valid: /[a-z]/.test(password),
        message: "At least one lowercase letter",
      });
    }

    if (policy.mustContain.uppercase) {
      validations.push({
        valid: /[A-Z]/.test(password),
        message: "At least one uppercase letter",
      });
    }

    if (policy.mustContain.number) {
      validations.push({
        valid: /[0-9]/.test(password),
        message: "At least one number",
      });
    }

    if (policy.mustContain.symbol) {
      validations.push({
        valid: /[^A-Za-z0-9]/.test(password),
        message: "At least one special character",
      });
    }
  }

  return validations;
};

export const allValidationsPass = (
  validations: PasswordValidationResult[]
): boolean => {
  return validations.length === 0 || validations.every((v) => v.valid);
};

export const calculatePasswordStrength = (
  password: string,
  policy?: PasswordPolicy
): PasswordStrengthResult => {
  // Return minimal result for empty passwords
  if (!password) {
    return {
      score: 0,
      label: "Very Weak",
      feedback: {
        suggestions: ["Enter a password"],
        warning: null,
      },
      passwordLength: 0,
      validations: validatePasswordPolicy("", policy),
      meetsPolicy: false,
    };
  }

  // Using zxcvbn for strength calculation
  const result = zxcvbn(password);
  const validations = validatePasswordPolicy(password, policy);
  const meetsPolicy = allValidationsPass(validations);

  return {
    score: result.score as PasswordStrength,
    label: scoreToLabel(result.score as PasswordStrength),
    feedback: {
      suggestions: result.feedback.suggestions,
      warning: result.feedback.warning,
    },
    passwordLength: password.length,
    validations,
    meetsPolicy,
  };
};
