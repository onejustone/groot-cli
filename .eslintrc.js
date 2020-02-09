module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended', // use recommended from @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
    },
    rules: {
        'prettier/prettier': 'error',
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 0,
        'react/prop-types': 0,
        'react/no-find-dom-node': 0,
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 0,
        quotes: ['error', 'single'],
        // 'no-console': 'warn',
        // 'no-debugger': 'error',
        'no-alert': 'error',
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: ['error', 'always'],
        'no-caller': 'error',
        eqeqeq: ['error', 'always'],
        'linebreak-style': ['error', 'unix'],
        'comma-style': ['error', 'last'],
        'no-var': 'error',
        'keyword-spacing': ['error', { before: true }],
        'key-spacing': ['error', { beforeColon: false }],
        'no-useless-constructor': 'error',
        curly: 'error',
        'no-empty-function': 'error',
        'no-extend-native': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-new-wrappers': 'error',
        'no-proto': 'error',
        'no-sequences': 'error',
        'no-useless-return': 'error',
        'no-useless-call': 'error',
        radix: ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'block-spacing': 'error',
        'comma-dangle': ['error', 'never'],
        'computed-property-spacing': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'jsx-quotes': ['error', 'prefer-single'],
        'max-len': ['error', { code: 120, tabWidth: 4 }],
        'no-bitwise': 'error',
        'no-tabs': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: 'directive', next: '*' },
            { blankLine: 'any', prev: 'directive', next: 'directive' }
        ],
        'arrow-parens': ['error', 'always'],
        'arrow-spacing': 'error',
        'brace-style': ['error', '1tbs']
    },
    settings: {
    }
};
