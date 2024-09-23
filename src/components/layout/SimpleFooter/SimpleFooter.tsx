import { CommonComponentProps, Theme, VisualContext } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './SimpleFooter.module.scss';

interface SimpleFooterProps extends CommonComponentProps {
    height?: string;
    topBorder?: boolean;
    context?: VisualContext;
    children: ReactNode;
    theme?: Theme;
}

const SimpleFooter: FC<SimpleFooterProps> = ({ theme, height, topBorder = false, context, children, className, id, style }) => {
    const styleProps: CSSProperties = height ? ({ '--footer-height': height } as CSSProperties) : {};

    const footerStyle = clsx(
        styles.footer,
        {
            [styles.topBorder]: topBorder
        },
        className
    );

    return (
        <footer className={footerStyle} style={{ ...styleProps, ...style }} data-context={context} data-theme={theme} id={id}>
            <div className={styles.content}>{children}</div>
        </footer>
    );
};

export { SimpleFooter };
