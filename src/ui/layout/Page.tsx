import React, { ReactNode, useEffect } from 'react';
import { ComponentCSSProps } from '../../types';
import { validateElement } from '../../utility';
import style from './Page.module.scss';

interface PageSubheaderProps {
    children: React.ReactNode;
}

const PageSubheader: React.FC<PageSubheaderProps> = ({ children }) => {
    return <div className={style.subheader}>{children}</div>;
};

interface PageProps extends ComponentCSSProps {
    title: string;
    subheader?: React.ReactElement<PageSubheaderProps>;
    children?: ReactNode;
}

const PageRoot: React.FC<PageProps> = ({ title, subheader, children }: PageProps) => {
    validateElement('PageSubheader', subheader);

    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {subheader}
            <main className={style.page}>{children}</main>
        </>
    );
};

export const Page = PageRoot as typeof PageRoot & {
    Subheader: typeof PageSubheader;
};

Page.Subheader = PageSubheader;
