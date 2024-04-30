import clsx from 'clsx';
import React, { CSSProperties, ReactNode } from 'react';
import style from './Icon.module.scss';

const sizeMap: Record<string, string> = {
    small: '18px',
    medium: '24px',
    large: '48px',
    full: '100%'
};

const colorMap: Record<string, string> = {
    inverse: 'var(--color-text-inverse)',
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    positive: 'var(--color-positive)',
    critical: 'var(--color-critical)'
};

interface IconProps {
    size?: 'small' | 'medium' | 'large' | 'full';
    color?: 'inverse' | 'primary' | 'secondary' | 'positive' | 'critical' | string;
    inline?: boolean;
    tooltip?: string;
}

interface FullIconProps extends IconProps {
    icon: ReactNode;
}

const Icon: React.FC<FullIconProps> = ({ icon, size = 'medium', color, inline = false, tooltip }) => {
    const colorProperty = color && (colorMap[color] ?? color);
    const properties = { '--v-icon-size': sizeMap[size], '--v-icon-color': colorProperty } as CSSProperties;

    const classes = clsx(style.icon, {
        [style.inline]: inline
    });

    return (
        <span className={classes} style={properties} data-tooltip={tooltip}>
            {icon}
        </span>
    );
};

export type { IconProps };
export { Icon };
