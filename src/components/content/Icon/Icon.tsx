import type { CommonComponentProps, VisualContext } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactElement, RefAttributes } from 'react';
import { cloneElement, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Icon.module.scss';

const iconSizes = {
    small: '18px',
    regular: '24px',
    large: '48px',
    full: '100%'
};

interface IconProps extends CommonComponentProps {
    /** Defines the size of the icon. */
    size?: 'small' | 'regular' | 'large' | 'full' | CSSProperties['width'];

    /** Specifies the visual context (color theme) for the icon. */
    context?: VisualContext;

    /** Makes the icon align inline with surrounding text. */
    inline?: boolean;

    /** Tooltip text displayed on hover. */
    tooltip?: string;
}

interface FullIconProps extends IconProps {
    /** The icon element to be rendered. */
    icon: ReactElement;
}

/** A flexible icon component that supports sizing, context-based theming, and tooltips. */
const Icon = forwardRef<HTMLElement, FullIconProps>(({ icon, size, context, inline = false, tooltip, className, style, ...props }, ref) => {
    const properties: CSSProperties = size
        ? ({
              '--icon-size': size in iconSizes ? iconSizes[size as keyof typeof iconSizes] : size
          } as CSSProperties)
        : {};

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
        role: 'img',
        'aria-hidden': tooltip ? undefined : true,
        'aria-label': tooltip || undefined,
        ref,
        ...props
    });
}) as ForwardRefExoticComponent<FullIconProps & RefAttributes<HTMLElement>>;

export { Icon };
export type { IconProps };
