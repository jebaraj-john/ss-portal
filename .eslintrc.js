module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react-native/all", "prettier"],
    plugins: ["react", "react-native"],
    ignorePatterns: ["node_modules/*", "ios/*", "android/*"],
    parser: "@babel/eslint-parser", // Use Babel parser for modern syntax
    parserOptions: {
        sourceType: "module", // Specify source type as module
        ecmaVersion: 2021, // Use the desired ECMAScript version
    },
    rules: {
        indent: ["error", 4],
        "react/prop-types": "off",
        "react-native/no-inline-styles": "off",
    },
    // parserOptions: {
    //     sourceType: "module",
    // },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        browser: true,
        es6: true,
        "react-native/react-native": true,
    },
};
