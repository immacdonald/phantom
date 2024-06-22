import clsx from 'clsx';
import { CSSProperties, FC, ReactNode } from 'react';
import style from './Text.module.scss';

interface TextProps {
    children: ReactNode;
    align?: 'center' | 'left' | 'right';
    size?: 'md' | 'lg' | 'xl';
    as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    padded?: boolean;
}

const Text: FC<TextProps> = ({ children, align = 'left', size = 'md', as = 'p', padded = false }) => {
    const As = as;

    const classnames = clsx({
        [style.medium]: size == 'md',
        [style.large]: size == 'lg',
        [style.xl]: size == 'xl',
        [style.padded]: padded
    });

    const properties = { textAlign: align } as CSSProperties;

    return (
        <As className={as == 'p' ? classnames : undefined} style={properties}>
            {children}
        </As>
    );
};

export { Text };
