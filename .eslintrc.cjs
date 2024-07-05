module.exports = {
    extends: ['./node_modules/phantom-config/.eslintrc.cjs'],
    plugins: ['sort-exports'],
    rules: {
        'sort-exports/sort-exports': ['error', { sortDir: 'asc' }]
    }
};
