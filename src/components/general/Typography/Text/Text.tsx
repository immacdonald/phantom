import { CommonComponentProps } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Text.module.scss';

interface TextProps extends CommonComponentProps {
    children: ReactNode;
    align?: 'center' | 'left' | 'right';
    size?: 'md' | 'lg' | 'xl';
    styleLinks?: boolean;
    soft?: boolean;
    newline?: boolean;
}

const Text: FC<TextProps> = ({ children, size, styleLinks = true, align, soft, newline, className, style, id }) => {
    const textClasses = clsx(
        styles.text,
        {
            [styles.large]: size == 'lg',
            [styles.xl]: size == 'xl',
            [styles.soft]: soft,
            [styles.newline]: newline,
            [styles.links]: styleLinks
        },
        className
    );

    const properties = { textAlign: align, ...style } as CSSProperties;

    return (
        <span className={textClasses} style={properties} id={id}>
            {children}
        </span>
    );
};

export { Text };
export type { TextProps };
