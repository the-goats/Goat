module.exports = {
    "extends": ['airbnb-typescript/base', "plugin:jest/recommended"],
    "plugins": ["jest"],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'max-len': 'off',
        'global-require': 'off',
    },
    parserOptions: {
        project: './tsconfig.json',
    }
};
