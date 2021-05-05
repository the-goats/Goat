module.exports = {
    "extends": ['airbnb-typescript/base', "plugin:jest/recommended"],
    "plugins": ["jest"],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'max-len': 'off',
        'global-require': 'off',
        "import/no-extraneous-dependencies": ["error", {"peerDependencies": false}]
    },
    parserOptions: {
        project: './tsconfig.json',
    }
};
