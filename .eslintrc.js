module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
  },
};
