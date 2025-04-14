import type { CommonComponentProps } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Typography.module.scss';

interface ParagraphProps extends CommonComponentProps {
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
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({ size, align, soft, className, style, children, ...props }, ref) => {
    const textClasses = clsx(
        styles.typography,
        styles.paragraph,
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
        <p className={textClasses} style={properties} ref={ref} {...props}>
            {children}
        </p>
    );
}) as ForwardRefExoticComponent<ParagraphProps & RefAttributes<HTMLParagraphElement>>;

export { Paragraph };
export type { ParagraphProps };
