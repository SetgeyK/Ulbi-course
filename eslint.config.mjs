import js from "@eslint/js";
import sjPlugin from "@sj_lk/eslint-plugin-sj-plugin";
import { defineConfig } from "eslint/config";
import cypressPlugin from "eslint-plugin-cypress";
import importPlugin from 'eslint-plugin-import';
import pluginReact from "eslint-plugin-react";
import eslintReactHooks from "eslint-plugin-react-hooks"
import unusedImport from 'eslint-plugin-unused-imports';
import globals from "globals";
import tseslint from "typescript-eslint";

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
      '@sj_lk/sj-plugin': sjPlugin.default || sjPlugin,
      'unused-imports': unusedImport,
      'import': importPlugin,
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
      'react-hooks/exhaustive-deps': 'error',
      '@sj_lk/sj-plugin/path-checker': ['error', { alias: '@' }],
      '@sj_lk/sj-plugin/public-api-imports': [
        'error',
        {
          alias: '@',
          testFilesPatterns: ['**/*.test.*']
        }],
      '@sj_lk/sj-plugin/layer-imports': [
        'error',
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider', '**/testing']
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type'
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    },
  },
  {
    files: ['scripts/**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: [
      "cypress/**/*.{js,ts,jsx,tsx}",
      "cypress/**/*.cy.{js,ts,jsx,tsx}",
      "**/*.d.ts"
    ],
    plugins: {
      cypress: cypressPlugin,
    },
    languageOptions: {
      globals: {
        cy: true,
        cypress: true,
        describe: true,
        it: true,
        before: true,
        beforeEach: true,
        after: true,
        afterEach: true,
        context: true,
        expect: true,
        assert: true
      },
    },
    rules: {
      "@typescript-eslint/no-namespace": "off", 
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "warn",
    },
  },
]);
