import { ComponentProps } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Text.module.scss';

interface TextProps extends ComponentProps {
    children: ReactNode;
    align?: 'center' | 'left' | 'right';
    size?: 'md' | 'lg' | 'xl';
    newline?: boolean;
}

const Text: FC<TextProps> = ({ children, size, align, newline, className, cssProperties, id }) => {
    const textClasses = clsx(
        {
            [style.large]: size == 'lg',
            [style.xl]: size == 'xl',
            [style.newline]: newline
        },
        style.text,
        className
    );

    const properties = { textAlign: align, ...cssProperties } as CSSProperties;

    return (
        <span className={textClasses} style={properties} id={id}>
            {children}
        </span>
    );
};

export { Text };
export type { TextProps };
