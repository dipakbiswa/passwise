import React from "react";
import { StrengthBarProps } from "../../types";
import { getThemeClasses, strengthToPercentage } from "../../theme";
import { scoreToLabel } from "../../utils";

export const StrengthBar: React.FC<StrengthBarProps> = ({
  strength,
  theme = "light",
  className = "",
  showLabels = true,
  barOnly = false,
}) => {
  const themeClasses = getThemeClasses(theme);
  const percentage = strengthToPercentage(strength);
  const label = scoreToLabel(strength);

  return (
    <div className={`${themeClasses.container} ${className}`}>
      {showLabels && !barOnly && (
        <div className={themeClasses.label}>
          <span>Password strength: </span>
          <span>{label}</span>
        </div>
      )}
      <div className={themeClasses.strengthBar[strength]}>
        <div
          className=""
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Password strength: ${label}`}
        />
      </div>
      {showLabels && barOnly && (
        <div className={`${themeClasses.label} pw-text-right pw-text-xs`}>
          {label}
        </div>
      )}
    </div>
  );
};

export default StrengthBar;
