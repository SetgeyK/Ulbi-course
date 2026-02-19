import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintReactHooks from "eslint-plugin-react-hooks"
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { 
      '@typescript-eslint': tseslint.plugin,
      react: pluginReact,
      'react-hooks': eslintReactHooks,
    },
    settings: {
      react: {
        version: 'detect'
      },
    },
    languageOptions: { 
      globals: globals.browser ,
    },
    rules: {
      ...eslintReactHooks.configs.recommended.rules,
      'react/jsx-indent': [2, 4],
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error'
    },
  },
]);
