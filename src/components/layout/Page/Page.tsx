import type { ComponentProps } from '@types';
import { FC, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import style from './Page.module.scss';
interface PageProps extends ComponentProps {
    title?: string;
    header?: ReactNode;
    headerSpace?: 'pad' | 'overlap';
    footer?: ReactNode;
    children?: ReactNode;
}

const Page: FC<PageProps> = ({ title, header, headerSpace, footer, children, className, cssProperties, id }) => {
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

    const pageClasses = clsx(
        style.page,
        {
            [style.padHeader]: headerSpace == 'pad',
            [style.overlapHeader]: headerSpace == 'overlap'
        },
        className
    );

    return (
        <>
            {header}
            <main className={pageClasses} style={cssProperties} id={id}>
                {children}
            </main>
            {footer}
        </>
    );
};

export { Page };
