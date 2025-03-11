import phantomConfig from 'phantom-config/eslint';

export default [
    ...phantomConfig.map((config) => ({
        ...config,
        ignores: [...(config.ignores || []), 'docs/**']
    }))
];
