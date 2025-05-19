import React, { useEffect } from "react";
import { PasswordStrengthMeterProps } from "../../types";
import { usePasswordStrength } from "../../hooks";
import StrengthBar from "../StrengthBar";
import ValidationSuggestions from "../ValidationSuggestions";

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
  theme = "light",
  className = "",
  showLabels = true,
  showBar = true,
  showSuggestions = true,
  //   scoreWords,
  policy,
  barOnly = false,
  onChange,
}) => {
  const result = usePasswordStrength({ password, policy });

  // Callback when strength result changes
  useEffect(() => {
    if (onChange) {
      onChange(result);
    }
  }, [result, onChange]);

  return (
    <div className={`pw-w-full ${className}`}>
      {showBar && (
        <StrengthBar
          strength={result.score}
          theme={theme}
          showLabels={showLabels}
          barOnly={barOnly}
        />
      )}

      {showSuggestions && !barOnly && (
        <ValidationSuggestions
          validations={result.validations}
          suggestions={result.feedback.suggestions}
          warning={result.feedback.warning}
          theme={theme}
        />
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
