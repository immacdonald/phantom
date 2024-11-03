import { CommonComponentProps } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Text.module.scss';

interface TextProps extends CommonComponentProps {
    children: ReactNode;
    align?: 'center' | 'left' | 'right';
    size?: 'md' | 'lg' | 'xl';
    soft?: boolean;
    newline?: boolean;
}

const Text: FC<TextProps> = forwardRef<HTMLSpanElement, TextProps>(({ children, size, align, soft, newline, className, style, ...props }, ref) => {
    const textClasses = clsx(
        styles.text,
        {
            [styles.large]: size == 'lg',
            [styles.xl]: size == 'xl',
            [styles.soft]: soft,
            [styles.newline]: newline
        },
        className
    );

    const properties = { textAlign: align, ...style } as CSSProperties;

    return (
        <span className={textClasses} style={properties} ref={ref} {...props}>
            {children}
        </span>
    );
});

export { Text };
export type { TextProps };
