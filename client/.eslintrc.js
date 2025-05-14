module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  extends: ["react-app", "react-app/jest"],
  rules: {
    // Loosen any overly strict rules
    "no-unused-vars": "warn",
    // Add more rule configurations as needed
  },
};
