# Passwise

A highly customizable React component library for password strength checking and validation.

[![npm version](https://img.shields.io/npm/v/passwise.svg)](https://www.npmjs.com/package/passwise)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue)](https://www.typescriptlang.org/)

## Features

- 🔒 **Robust Security Analysis**: Uses the battle-tested [zxcvbn](https://github.com/dropbox/zxcvbn) library originally created by Dropbox for password strength estimation
- 🎨 **Fully Customizable UI**: Light and dark theme support with further customization options
- 🧩 **Headless Option**: Use the `usePasswordStrength` hook for complete UI control
- 📏 **Custom Password Policies**: Define your own password requirements
- 🔄 **Real-time Feedback**: Strength meter, validation state, and improvement suggestions
- 📦 **Modern Bundle**: Tree-shakable ESM and CommonJS builds
- 📝 **Type-safe**: Written in TypeScript with comprehensive type definitions
- 🎯 **Optional TailwindCSS**: Styling with Tailwind, but also works without it

## Installation

```bash
# npm
npm install passwise

# yarn
yarn add passwise

# pnpm
pnpm add passwise
```

## Usage

### Basic Example

```tsx
import React, { useState } from "react";
import { PasswordStrengthMeter } from "passwise";

function PasswordForm() {
  const [password, setPassword] = useState("");

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <PasswordStrengthMeter
        password={password}
        theme="dark"
        policy={{
          minLength: 8,
          mustContain: {
            lowercase: true,
            uppercase: true,
            number: true,
            symbol: true,
          },
        }}
      />
    </div>
  );
}
```

### With Custom Password Policy

```tsx
import React, { useState } from 'react';
import { PasswordStrengthMeter } from 'passwise';

function PasswordFormWithPolicy() {
  const [password, setPassword] = useState('');

  // Define a custom password policy
  const passwordPolicy = {
    minLength: 8,
    mustContain: {
      lowercase: true,
      uppercase: true,
      number: true,
      symbol: true
    }
  };

  return (

      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

    <PasswordStrengthMeter
        password={password}
        theme="dark"
        policy={passwordPolicy}
      />


  );
}
```

### Using the Hook (Headless)

```tsx
import React, { useState } from 'react';
import { usePasswordStrength } from 'passwise';

function CustomPasswordUI() {
  const [password, setPassword] = useState('');

  // Use the headless hook
  const strengthResult = usePasswordStrength({
    password,
    policy: {
      minLength: 10
    }
  });

  // Create your own UI based on the strength result
  return (

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


        Strength score: {strengthResult.score}/4
        Rating: {strengthResult.label}

        {strengthResult.feedback.warning && (
          Warning: {strengthResult.feedback.warning}
        )}

        {strengthResult.feedback.suggestions.length > 0 && (

            {strengthResult.feedback.suggestions.map((suggestion, i) => (
              {suggestion}
            ))}

        )}


  );
}
```

## API Reference

### PasswordStrengthMeter Props

| Prop              | Type                                     | Default                                         | Description                           |
| ----------------- | ---------------------------------------- | ----------------------------------------------- | ------------------------------------- |
| `password`        | string                                   | _required_                                      | The password to evaluate              |
| `theme`           | 'light' \| 'dark'                        | 'light'                                         | UI theme                              |
| `className`       | string                                   | ''                                              | Additional CSS classes                |
| `showLabels`      | boolean                                  | true                                            | Show strength labels                  |
| `showBar`         | boolean                                  | true                                            | Show strength bar                     |
| `showSuggestions` | boolean                                  | true                                            | Show validation and suggestions       |
| `scoreWords`      | [string, string, string, string, string] | ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'] | Custom labels for each strength level |
| `policy`          | PasswordPolicy                           | undefined                                       | Custom password requirements          |
| `barOnly`         | boolean                                  | false                                           | Show only the strength bar            |
| `onChange`        | (result: PasswordStrengthResult) => void | undefined                                       | Callback when strength changes        |

### PasswordPolicy Object

```typescript
interface PasswordPolicy {
  minLength?: number;
  maxLength?: number;
  mustContain?: {
    lowercase?: boolean;
    uppercase?: boolean;
    number?: boolean;
    symbol?: boolean;
  };
}
```

### PasswordStrengthResult Object

```typescript
interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4; // 0 = weakest, 4 = strongest
  label: "Very Weak" | "Weak" | "Fair" | "Good" | "Strong";
  feedback: {
    suggestions: string[];
    warning: string | null;
  };
  passwordLength: number;
  validations: PasswordValidationResult[];
  meetsPolicy: boolean;
}
```

## Styling and Customization

### Using TailwindCSS

This library provides default styling using TailwindCSS. The classes are prefixed with `pw-` to avoid conflicts with your application's own Tailwind classes.

### Without TailwindCSS

If you're not using TailwindCSS, the components will still work, but you might want to provide your own styling via the `className` prop and CSS.

## License

MIT
