import clsx from 'clsx';
import React, { CSSProperties, ReactNode } from 'react';
import { ComponentCSSProps, StyleContext } from '../../types';
import style from './Icon.module.scss';

const sizeMap: Record<string, string> = {
    small: '18px',
    medium: '24px',
    large: '48px',
    full: '100%'
};

interface IconProps extends ComponentCSSProps {
    size?: 'small' | 'medium' | 'large' | 'full';
    context?: StyleContext;
    color?: 'inverse' | 'primary' | 'secondary' | 'positive' | 'critical' | string;
    inline?: boolean;
    tooltip?: string;
}

interface FullIconProps extends IconProps {
    icon: ReactNode;
}

const Icon: React.FC<FullIconProps> = ({ icon, size = 'medium', context, inline = false, tooltip, className, cssProperties }) => {
    const properties = { '--v-icon-size': sizeMap[size] } as CSSProperties;

    const classes = clsx(
        style.icon,
        {
            [style.inline]: inline
        },
        className
    );

    return (
        <span className={classes} style={{ ...properties, ...cssProperties }} data-tooltip={tooltip} data-context={context}>
            {icon}
        </span>
    );
};

export type { IconProps };
export { Icon };
