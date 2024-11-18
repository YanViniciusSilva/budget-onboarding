const prettierConfig = require('./prettier-custom-config.js');

module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  env: {
    es6: true,
    browser: true,
  },
  overrides: [
     {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json', 'e2e/tsconfig.json'],
        ecmaVersion: 2022,
        sourceType: 'module',
        createDefaultProgram: true,
      },
      plugins: [
        '@typescript-eslint',
        '@angular-eslint',
        'unused-imports',
        'prettier',
        'import',
      ],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': ['error', prettierConfig],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        // '@angular-eslint/prefer-standalone-component': 'warn',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'ic',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'ic',
            style: 'kebab-case',
          },
        ],
        curly: ['error', 'all'],
        'sort-imports': [
          'error',
          {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            allowSeparatedGroups: true,
          },
        ],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              ['sibling', 'parent'],
              'index',
              'unknown',
            ],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'no-empty-functions': 'off',
        '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'error',
        'no-var': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-unsafe-return': 'warn',
        '@typescript-eslint/no-unsafe-call': 'warn',
        '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
        '@typescript-eslint/unbound-method': ['warn', { ignoreStatic: true }],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/ban-types': 'off',
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'max-len': [
          'error',
          {
            code: 120,
            tabWidth: 4,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreRegExpLiterals: true,
          },
        ],
        'max-lines-per-function': [
          'error',
          {
            max: 45,
            skipBlankLines: true,
            skipComments: true,
          },
        ],
        'prefer-spread': 'warn',
        'prefer-const': 'error',
        'rest-spread-spacing': ['warn'],
        'max-nested-callbacks': ['error', 4],
        'no-trailing-spaces': [
          'error',
          {
            skipBlankLines: true,
          },
        ],
        'object-shorthand': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        'no-duplicate-imports': ['error', { includeExports: true }],
        'dot-location': ['error', 'property'],
        'object-curly-spacing': ['error', 'always'],
        eqeqeq: ['error', 'always'],
      },
    },
    {
      files: ['**/*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
      ],
      rules: {
        '@angular-eslint/template/prefer-control-flow': 'error',
        '@angular-eslint/template/no-negated-async': 'error',
        '@angular-eslint/template/banana-in-box': 'warn',
        // '@angular-eslint/template/no-call-expression': 'warn',
      },
    },
  ]
}
