import { ComponentProps, Theme, VisualContext } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './SimpleFooter.module.scss';

interface SimpleFooterProps extends ComponentProps {
    height?: string;
    topBorder?: boolean;
    context?: VisualContext;
    children: ReactNode;
    theme?: Theme;
}



const SimpleFooter: FC<SimpleFooterProps> = ({ theme, height, topBorder = false, context, children, className, id, cssProperties }) => {
    const styleProps: CSSProperties = height ? ({ '--footer-height': height } as CSSProperties) : {};

    const footerStyle = clsx(
        style.footer,
        {
            [style.topBorder]: topBorder
        },
        className
    );

    return (
        <footer className={footerStyle} style={{ ...styleProps, ...cssProperties }} data-context={context} data-theme={theme} id={id}>
            <div className={style.content}>{children}</div>
        </footer>
    );
};

export { SimpleFooter };
