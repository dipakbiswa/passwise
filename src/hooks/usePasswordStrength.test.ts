import { renderHook } from "@testing-library/react";
import { usePasswordStrength } from "./usePasswordStrength";

describe("usePasswordStrength", () => {
  test("should return score 0 for empty password", () => {
    const { result } = renderHook(() => usePasswordStrength({ password: "" }));
    expect(result.current.score).toBe(0);
    expect(result.current.label).toBe("Very Weak");
  });

  test("should return higher score for stronger password", () => {
    const { result } = renderHook(() =>
      usePasswordStrength({ password: "StrongP@ssw0rd!" })
    );
    expect(result.current.score).toBeGreaterThan(0);
  });

  test("should validate against policy", () => {
    const policy = {
      minLength: 8,
      mustContain: {
        lowercase: true,
        uppercase: true,
        number: true,
        symbol: true,
      },
    };

    // Password meets all requirements
    const { result: result1 } = renderHook(() =>
      usePasswordStrength({
        password: "StrongP@ssw0rd!",
        policy,
      })
    );
    expect(result1.current.meetsPolicy).toBe(true);
    expect(result1.current.validations.every((v) => v.valid)).toBe(true);

    // Password fails some requirements
    const { result: result2 } = renderHook(() =>
      usePasswordStrength({
        password: "weak",
        policy,
      })
    );
    expect(result2.current.meetsPolicy).toBe(false);
    expect(result2.current.validations.some((v) => !v.valid)).toBe(true);
  });
});
