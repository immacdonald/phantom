import type { ComponentCSSProps } from '@types';
import { FC, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import style from './Page.module.scss';
interface PageProps extends ComponentCSSProps {
    title?: string;
    children?: ReactNode;
}

const Page: FC<PageProps> = ({ title, children, className, cssProperties }) => {
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
            <main className={clsx(style.page, className)} style={cssProperties}>
                {children}
            </main>
        </>
    );
};

export { Page }
