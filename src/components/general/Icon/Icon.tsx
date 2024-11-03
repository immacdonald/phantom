import type { CommonComponentProps, VisualContext } from '@types';
import { cloneElement, CSSProperties, FC, forwardRef, ReactElement } from 'react';
import clsx from 'clsx';
import styles from './Icon.module.scss';

const iconSizes = {
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

const Icon: FC<FullIconProps> = forwardRef<HTMLElement, FullIconProps>(({ icon, size = 'regular', context, inline = false, tooltip, className, style, ...props }, ref) => {
    const properties = { '--icon-size': iconSizes[size] } as CSSProperties;

    const classes = clsx(
        styles.icon,
        {
            [styles.inline]: inline
        },
        className
    );

    return cloneElement(icon, {
        className: classes,
        style: { ...properties, ...style },
        'data-tooltip': tooltip,
        'data-context': context,
        ref,
        ...props
    });
});

export { Icon };
export type { IconProps };
