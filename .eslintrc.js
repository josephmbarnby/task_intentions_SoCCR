module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  ignorePatterns: [
    '.eslintrc.js',
    'gulpfile.js',
    'webpack.config.js',
    'node_modules/',
    '*.d.ts',
  ],
  extends: [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
