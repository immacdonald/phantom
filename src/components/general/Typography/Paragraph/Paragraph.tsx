import { CommonComponentProps } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Paragraph.module.scss';

interface ParagraphProps extends CommonComponentProps {
    children: ReactNode;
    align?: 'center' | 'left' | 'right';
}

const Paragraph: FC<ParagraphProps> = forwardRef<HTMLParagraphElement, ParagraphProps>(({ children, align, className, style, ...props }, ref) => {
    const paragraphClasses = clsx(styles.paragraph, className);

    const properties = { textAlign: align, ...style } as CSSProperties;

    return (
        <p className={paragraphClasses} style={properties} ref={ref} {...props}>
            {children}
        </p>
    );
});

export { Paragraph };
export type { ParagraphProps };
