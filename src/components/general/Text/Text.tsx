import { ComponentProps } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Text.module.scss';

interface TextProps extends ComponentProps {
    children: ReactNode;
    align?: 'center' | 'left' | 'right';
    size?: 'md' | 'lg' | 'xl';
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    marginBottom?: boolean;
    newline?: boolean;
}

const Text: FC<TextProps> = ({ children, as = 'p', size = 'md', marginBottom = false, newline = false, align, className, cssProperties, id }) => {
    const As = as;

    const textClasses = clsx(
        {
            [style.large]: size == 'lg',
            [style.xl]: size == 'xl',
            [style.marginBottom]: marginBottom,
            [style.newline]: newline
        },
        style.text,
        className
    );

    const properties = { textAlign: align, ...cssProperties } as CSSProperties;

    return (
        <As className={textClasses} style={properties} id={id}>
            {children}
        </As>
    );
};

export { Text };
