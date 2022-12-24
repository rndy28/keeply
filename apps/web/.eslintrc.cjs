module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    cy: "readonly",
  },
  plugins: ["react"],
  extends: ["../../.eslintrc.js", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["*.config.ts"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
  },
};
