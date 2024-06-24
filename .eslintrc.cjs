module.exports = {
    extends: ['./node_modules/@imacdonald/phantom-config/.eslintrc.cjs'],
    plugins: ['sort-exports'],
    rules: {
        'sort-exports/sort-exports': ['error', { sortDir: 'asc' }]
    }
};
