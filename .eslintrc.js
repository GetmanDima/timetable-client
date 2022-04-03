module.exports = {
  env: {
    browser: true,
    es2021: true,
    "react-native/react-native": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native"],
  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    camelcase: [2, {properties: "always"}],
    quotes: [1, "double", {avoidEscape: true}],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 1,
    "react-native/no-color-literals": 1,
    "react-native/no-raw-text": 2,
    "react-native/no-single-element-style-arrays": 1,
  },
};
