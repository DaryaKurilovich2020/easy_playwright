import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["node_modules/", "playwright-report/", "test-results/"] },
  {
    files: ["**/*.ts"],
    languageOptions: { parser: tsParser, sourceType: "module" },
    plugins: { "@typescript-eslint": ts, playwright },
    rules: {
      ...ts.configs.recommended.rules,
      ...playwright.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  prettier,
];
