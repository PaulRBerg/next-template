/**
 * We only use ESLint for two things Biome can't do:
 * 1. Tailwind CSS v4 class validation (unknown classes, conflicts, deprecated, shorthands)
 * 2. React hooks exhaustive-deps
 *
 * @see https://github.com/schoero/eslint-plugin-better-tailwindcss/tree/v4
 * @see https://github.com/biomejs/biome/issues/6502
 */

import tsParser from "@typescript-eslint/parser";
import type { ESLint, Linter } from "eslint";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import { getDefaultAttributes } from "eslint-plugin-better-tailwindcss/api/defaults";
import reactHooks from "eslint-plugin-react-hooks";

const baseLanguageOptions: Linter.LanguageOptions = {
  ecmaVersion: "latest",
  parser: tsParser,
  parserOptions: {
    ecmaFeatures: { jsx: true },
  },
  sourceType: "module",
};

const tailwindAttributes = [...getDefaultAttributes(), ".*Cn$"];

/**
 * Make sure that these rules do not conflict with Biome's class sorting rules.
 * @see {@link file://./biome.jsonc}
 * @see https://biomejs.dev/linter/rules/use-sorted-classes/
 */
const tailwindRules: Linter.RulesRecord = {
  // Stylistic
  "better-tailwindcss/enforce-canonical-classes": "error",
  "better-tailwindcss/enforce-consistent-class-order": "off", // handled by Biome
  "better-tailwindcss/enforce-shorthand-classes": "error",
  // Correctness
  "better-tailwindcss/no-conflicting-classes": "error",
  "better-tailwindcss/no-deprecated-classes": "error",
  "better-tailwindcss/no-duplicate-classes": "error",
  "better-tailwindcss/no-unknown-classes": ["error", { detectComponentClasses: true }],
  "better-tailwindcss/no-unnecessary-whitespace": "error",
};

const config: Linter.Config[] = [
  {
    ignores: [".next/", ".vercel/", "node_modules/", "*.d.ts"],
  },
  // Tailwind CSS validation
  {
    files: ["**/*.tsx", "**/*.styles.ts"],
    languageOptions: baseLanguageOptions,
    name: "tailwind",
    plugins: {
      "better-tailwindcss": betterTailwindcss,
    },
    rules: tailwindRules,
    settings: {
      "better-tailwindcss": {
        attributes: tailwindAttributes,
        entryPoint: "app/globals.css",
      },
    },
  },
  // React hooks
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: baseLanguageOptions,
    name: "react-hooks",
    plugins: {
      "react-hooks": reactHooks as unknown as ESLint.Plugin,
    },
    rules: {
      "react-hooks/exhaustive-deps": "error",
    },
  },
];

export default config;
