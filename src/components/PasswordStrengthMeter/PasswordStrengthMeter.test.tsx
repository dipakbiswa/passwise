import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";

describe("PasswordStrengthMeter", () => {
  test("renders with empty password", () => {
    render(<PasswordStrengthMeter password="" />);
    expect(screen.getByText("Password strength:")).toBeInTheDocument();
    expect(screen.getByText("Very Weak")).toBeInTheDocument();
  });

  test("renders with barOnly prop", () => {
    render(<PasswordStrengthMeter password="test" barOnly />);
    expect(screen.queryByText("Requirements:")).not.toBeInTheDocument();
    expect(screen.queryByText("Suggestions:")).not.toBeInTheDocument();
  });

  test("renders with policy", () => {
    const policy = {
      minLength: 8,
      mustContain: {
        uppercase: true,
        number: true,
      },
    };

    render(<PasswordStrengthMeter password="test" policy={policy} />);

    expect(screen.getByText("Requirements:")).toBeInTheDocument();
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument();
    expect(
      screen.getByText("At least one uppercase letter")
    ).toBeInTheDocument();
    expect(screen.getByText("At least one number")).toBeInTheDocument();
  });

  test("hides components based on props", () => {
    render(
      <PasswordStrengthMeter
        password="test"
        showBar={false}
        showSuggestions={false}
      />
    );

    expect(screen.queryByText("Password strength:")).not.toBeInTheDocument();
    expect(screen.queryByText("Requirements:")).not.toBeInTheDocument();
    expect(screen.queryByText("Suggestions:")).not.toBeInTheDocument();
  });
});
