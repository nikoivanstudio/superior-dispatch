import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const sourceFiles = ['**/*.{js,jsx,ts,tsx}'];
const fsdFiles = ['src/**/*.{js,jsx,ts,tsx}'];
const layers = ['views', 'widgets', 'features', 'entities', 'shared'];

const relativeLayerPatterns = layers.flatMap((layer) => [
  `../${layer}/**`,
  `../../${layer}/**`,
  `../../../${layer}/**`,
  `../../../../${layer}/**`,
  `../../../../../${layer}/**`
]);

const createFsdLayerRules = (layer, lowerLayers) => ({
  files: [`src/${layer}/**/*.{js,jsx,ts,tsx}`],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [`@/${layer}/*`, `@/${layer}/*/**`],
            message:
              'Inside one slice use only relative imports. Do not import the current layer via @ alias.'
          },
          ...lowerLayers.map((lowerLayer) => ({
            group: relativeLayerPatterns.filter((pattern) => pattern.includes(`/${lowerLayer}/`)),
            message: `Imports from ${lowerLayer} must go through the public API via @/${lowerLayer}/...`
          }))
        ]
      }
    ]
  }
});

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: sourceFiles,
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    plugins: {
      import: importPlugin
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[source.value=/\\.(js|jsx|ts|tsx)$/]',
          message: 'Use extensionless import paths for js/ts/jsx/tsx files.'
        },
        {
          selector: 'ExportNamedDeclaration[source.value=/\\.(js|jsx|ts|tsx)$/]',
          message: 'Use extensionless export paths for js/ts/jsx/tsx files.'
        },
        {
          selector: 'ExportAllDeclaration[source.value=/\\.(js|jsx|ts|tsx)$/]',
          message: 'Use extensionless export paths for js/ts/jsx/tsx files.'
        }
      ]
    }
  },
  {
    files: ['app/routes/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off'
    }
  },
  {
    files: fsdFiles,
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/views/*/**', '@/widgets/*/**', '@/features/*/**', '@/entities/*/**'],
              allowTypeImports: true,
              message: 'Import other slices only through their public API.'
            }
          ]
        }
      ],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'type'], 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@/views/**',
              group: 'internal',
              position: 'before'
            },
            {
              pattern: '@/widgets/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@/entities/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '@/shared/**',
              group: 'internal',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          distinctGroup: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          'newlines-between': 'always'
        }
      ]
    }
  },
  createFsdLayerRules('views', ['widgets', 'features', 'entities', 'shared']),
  createFsdLayerRules('widgets', ['features', 'entities', 'shared']),
  createFsdLayerRules('features', ['entities', 'shared']),
  createFsdLayerRules('entities', ['shared'])
]);
