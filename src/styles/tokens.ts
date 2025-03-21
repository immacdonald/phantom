import designTokens from './tokens.module.scss';

const tokens = {
    color: {
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        positive: 'var(--color-positive)',
        critical: 'var(--color-critical)',
        info: 'var(--color-info)',
        warning: 'var(--color-warning)',
        background: {
            page: 'var(--background-page)',
            container: 'var(--background-container)',
            content: 'var(--background-content)',
            overlay: 'var(--background-overlay)'
        }
    },
    text: {
        color: 'var(--color-text)',
        size: {
            xs: 'var(--font-size-xs)',
            sm: 'var(--font-size-sm)',
            md: 'var(--font-size)',
            lg: 'var(--font-size-lg)',
            xl: 'var(--font-size-xl)'
        }
    },
    alpha: {
        light: 'var(--alpha-light)',
        lighter: 'var(--alpha-lighter)',
        lightest: 'var(--alpha-lightest)',
        dark: 'var(--alpha-dark)',
        darker: 'var(--alpha-darker)',
        darkest: 'var(--alpha-darkest)',
        contrast: 'var(--alpha-contrast)'
    },
    space: {
        xxs: 'var(--space-xxs)',
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space)',
        lg: 'var(--space-lg)',
        xl: 'var(--space-xl)',
        layout: {
            xs: 'var(--layout-space-xs)',
            sm: 'var(--layout-space-sm)',
            md: 'var(--layout-space-md)',
            lg: 'var(--layout-space-lg)',
            xl: 'var(--layout-space-xl)',
            xxl: 'var(--layout-space-xxl)'
        }
    },
    borderRadius: 'var(--border-radius)',
    border: {
        width: 'var(--border-width)',
        soft: 'var(--border-soft)',
        hard: 'var(--border-hard)'
    },
    screen: {
        xs: designTokens['screen-xs'],
        sm: designTokens['screen-sm'],
        md: designTokens['screen-md'],
        lg: designTokens['screen-lg'],
        xl: designTokens['screen-xl']
    }
} as const;

type PhantomDesignTokens = typeof tokens;
export type { PhantomDesignTokens };

export { tokens };
