module.exports = {
  extends: ["eslint:recommended", "prettier"],
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-unused-vars": "off",
  },
  ignorePatterns: ["node_modules", "dist", ".turbo", ".next"],
};
