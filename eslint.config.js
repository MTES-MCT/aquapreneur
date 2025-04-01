import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import drizzlePlugin from 'eslint-plugin-drizzle';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    },
    rules: {
      // eslint va également détecter les espaces insécables dans la partie HTML
      // des fichiers .svelte, où ils sont légitimes
      'no-irregular-whitespace': ['off']
    }
  },
  {
    files: ['**/*.ts'],

    rules: {
      // eslint va également détecter les espaces insécables dans la partie HTML
      // des fichiers .svelte, où ils sont légitimes
      'no-irregular-whitespace': ['warn', { skipComments: true, skipTemplates: true }]
    }
  },
  {
    plugins: {
      drizzle: drizzlePlugin
    },
    rules: {
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error'
    }
  }
);
