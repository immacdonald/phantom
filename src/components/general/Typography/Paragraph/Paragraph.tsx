import { ComponentProps } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Paragraph.module.scss';

interface ParagraphProps extends ComponentProps {
    children: ReactNode;
    styleLinks?: boolean;
    align?: 'center' | 'left' | 'right';
}

const Paragraph: FC<ParagraphProps> = ({ children, align, styleLinks = true, className, cssProperties, id }) => {
    const paragraphClasses = clsx(style.paragraph, {
        [style.links]: styleLinks
    }, className);

    const properties = { textAlign: align, ...cssProperties } as CSSProperties;

    return (
        <p className={paragraphClasses} style={properties} id={id}>
            {children}
        </p>
    );
};

export { Paragraph };
export type { ParagraphProps };
