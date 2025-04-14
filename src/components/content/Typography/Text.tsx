import type { CommonComponentProps } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Typography.module.scss';

interface TextProps extends CommonComponentProps {
    /** Sets the text alignment. */
    align?: 'center' | 'left' | 'right';

    /** Defines the text size variant. */
    size?: 'sm' | 'md' | 'lg' | 'xl';

    /** Applies a softer visual style to the text. */
    soft?: boolean;

    /** The content of the text element. */
    children: ReactNode;
}

/** A flexible text component supporting size, alignment, and optional paragraph rendering. */
const Text = forwardRef<HTMLSpanElement, TextProps>(({ size, align, soft, className, style, children, ...props }, ref) => {
    const textClasses = clsx(
        styles.typography,
        {
            [styles.sm]: size == 'sm',
            [styles.lg]: size == 'lg',
            [styles.xl]: size == 'xl',
            [styles.soft]: soft
        },
        className
    );

    const properties = { textAlign: align, ...style } as CSSProperties;

    return (
        <span className={textClasses} style={properties} ref={ref} {...props}>
            {children}
        </span>
    );
}) as ForwardRefExoticComponent<TextProps & RefAttributes<HTMLSpanElement>>;

export { Text };
export type { TextProps };
