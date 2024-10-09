import type { CommonComponentProps, VisualContext } from '@types';
import { cloneElement, CSSProperties, FC, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Icon.module.scss';

const sizeMap: Record<string, string> = {
    small: '18px',
    regular: '24px',
    large: '48px',
    full: '100%'
};

interface IconProps extends CommonComponentProps {
    size?: 'small' | 'regular' | 'large' | 'full';
    context?: VisualContext;
    inline?: boolean;
    tooltip?: string;
}

interface FullIconProps extends IconProps {
    icon: ReactElement;
}

const Icon: FC<FullIconProps> = ({ icon, size = 'regular', context, inline = false, tooltip, className, style }) => {
    const properties = { '--v-icon-size': sizeMap[size] } as CSSProperties;

    const classes = clsx(
        styles.icon,
        {
            [styles.inline]: inline
        },
        className
    );

    return (
        cloneElement(icon, {className: classes, style: { ...properties, ...style }, "data-tooltip": tooltip, "data-context": context})
    );
};

export { Icon };
export type { IconProps };
