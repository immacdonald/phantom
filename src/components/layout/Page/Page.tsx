import type { ComponentProps } from '@types';
import { FC, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import style from './Page.module.scss';
interface PageProps extends ComponentProps {
    title?: string;
    children?: ReactNode;
}

const Page: FC<PageProps> = ({ title, children, className, cssProperties, id }) => {
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
            <main className={clsx(style.page, className)} style={cssProperties} id={id}>
                {children}
            </main>
        </>
    );
};

export { Page };
