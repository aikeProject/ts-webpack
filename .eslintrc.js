module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "eslint-config-alloy/typescript",
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "indent": [
            "error",
            4
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-param-reassign": "off",
        "no-unused-vars": "off",
        "no-implicit-coercion": "off",
        "quotes": "off",
        "eqeqeq": "off",
        "eqeq": "off",
        "no-undef": "off",
        // "no-global-assign": ["error", { "exceptions": ["G", "wx"] }]
        // "no-console": "off"

    },
    "globals": {
        "$": true,
        "jQuery": true,
        "G": false,
        "wx": true
    },
};