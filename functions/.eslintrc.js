module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": "off",
    "object-curly-spacing": "off",
    "indent": "off",
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
  },
};