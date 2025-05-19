import { useEffect, useState } from "react";
import { PasswordStrengthResult, UsePasswordStrengthOptions } from "../types";
import { calculatePasswordStrength } from "../utils";

export const usePasswordStrength = ({
  password,
  policy,
}: UsePasswordStrengthOptions): PasswordStrengthResult => {
  const [result, setResult] = useState<PasswordStrengthResult>(
    calculatePasswordStrength("", policy)
  );

  useEffect(() => {
    const strengthResult = calculatePasswordStrength(password, policy);
    setResult(strengthResult);
  }, [password, policy]);

  return result;
};

export default usePasswordStrength;
