import { CommonComponentProps } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Paragraph.module.scss';

interface ParagraphProps extends CommonComponentProps {
    children: ReactNode;
    styleLinks?: boolean;
    align?: 'center' | 'left' | 'right';
}

const Paragraph: FC<ParagraphProps> = ({ children, align, styleLinks = true, className, style, id }) => {
    const paragraphClasses = clsx(
        styles.paragraph,
        {
            [styles.links]: styleLinks
        },
        className
    );

    const properties = { textAlign: align, ...style } as CSSProperties;

    return (
        <p className={paragraphClasses} style={properties} id={id}>
            {children}
        </p>
    );
};

export { Paragraph };
export type { ParagraphProps };
