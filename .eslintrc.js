module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'import'],
  parserOptions: {
    ecmaVersion: 2020
  },
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'vue/require-component-is': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  }
};
