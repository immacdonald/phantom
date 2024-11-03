import tokens from './tokens.module.scss';

interface PhantomDesignTokens {
    screen: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    space: {
        sm: string;
        md: string;
        lg: string;
    };
    borderRadius: string;
    border: {
        light: string;
        dark: string;
    };
}

const designTokens: PhantomDesignTokens = {
    screen: {
        xs: tokens['screen-xs'],
        sm: tokens['screen-sm'],
        md: tokens['screen-md'],
        lg: tokens['screen-lg'],
        xl: tokens['screen-xl']
    },
    space: {
        sm: 'var(--space-sm)',
        md: 'var(--space)',
        lg: 'var(--space-lg)'
    },
    borderRadius: 'var(--border-radius)',
    border: {
        light: 'var(--border-light)',
        dark: 'var(--border-dark)'
    }
};

export type { PhantomDesignTokens };
export { designTokens };
