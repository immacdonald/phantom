import React, { ReactNode, useEffect } from 'react';
import style from './Page.module.scss';
import { ComponentCSSProps } from '../../types';

interface PageProps extends ComponentCSSProps {
    title?: string;
    subheader?: React.ReactNode;
    children?: ReactNode;
}

const Page: React.FC<PageProps> = ({ title = 'AnalystKit', subheader, children }: PageProps) => {
    useEffect(() => {
        document.title = title;
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {subheader && <div className={style.header}>{subheader}</div>}
            <main className={style.page}>{children}</main>
        </>
    );
};

export { Page };
