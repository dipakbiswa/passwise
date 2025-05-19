import React from "react";
import { ValidationSuggestionsProps } from "../../types";
import { getThemeClasses } from "../../theme";

export const ValidationSuggestions: React.FC<ValidationSuggestionsProps> = ({
  validations,
  suggestions,
  warning,
  className = "",
  theme = "light",
}) => {
  const themeClasses = getThemeClasses(theme);

  return (
    <div className={`${themeClasses.container} ${className}`}>
      {/* Validations */}
      {validations.length > 0 && (
        <div className="pw-mb-3">
          <div className={`${themeClasses.label} pw-mb-2`}>Requirements:</div>
          <ul className="pw-list-none pw-p-0 pw-m-0">
            {validations.map((validation, index) => (
              <li
                key={index}
                className={`${themeClasses.validationItem} ${
                  validation.valid
                    ? themeClasses.validationItem.valid
                    : themeClasses.validationItem.invalid
                }`}
              >
                <span>{validation.valid ? "✓" : "○"}</span>
                <span>{validation.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warning */}
      {warning && (
        <div className={themeClasses.warning}>
          <strong>Warning:</strong> {warning}
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className={themeClasses.suggestions}>
          {suggestions.length > 0 && (
            <div className={themeClasses.label}>Suggestions:</div>
          )}
          <ul className="pw-list-none pw-p-0 pw-m-0">
            {suggestions.map((suggestion, index) => (
              <li key={index} className={themeClasses.suggestionItem}>
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ValidationSuggestions;
