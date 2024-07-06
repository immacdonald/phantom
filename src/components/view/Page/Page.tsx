import type { ComponentCSSProps } from '@types';
import { FC, ReactElement, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { validateElement } from '@utility';
import style from './Page.module.scss';

interface PageSubheaderProps {
    children: ReactNode;
}

const PageSubheader: FC<PageSubheaderProps> = ({ children }) => {
    return <div className={style.subheader}>{children}</div>;
};

interface PageProps extends ComponentCSSProps {
    title?: string;
    subheader?: ReactElement<PageSubheaderProps>;
    children?: ReactNode;
}

const PageRoot: FC<PageProps> = ({ title, subheader, children, className, cssProperties }) => {
    validateElement('PageSubheader', subheader);

    useEffect(() => {
        if (title) {
            document.title = title;
        }
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    return (
        <>
            {subheader}
            <main className={clsx(style.page, className)} style={cssProperties}>
                {children}
            </main>
        </>
    );
};

export const Page = PageRoot as typeof PageRoot & {
    Subheader: typeof PageSubheader;
};

Page.Subheader = PageSubheader;
