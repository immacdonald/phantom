import type { CommonComponentProps } from '@types';
import { FC, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import style from './Page.module.scss';

interface PageProps extends CommonComponentProps {
    /** The title of the page, which updates the document title. */
    title?: string;

    /** The header section of the page. */
    header?: ReactNode;

    /** The footer section of the page. */
    footer?: ReactNode;

    /** The main content of the page. */
    children?: ReactNode;
}

/** A structured layout component that manages headers, footers, and content organization. */
const Page: FC<PageProps> = ({ title, header, footer, children, className, ...props }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [title]);

    const pageClasses = clsx(style.page, className);

    return (
        <>
            {header}
            <main className={pageClasses} role="main" {...props}>
                <article>{children}</article>
                {footer}
            </main>
        </>
    );
};

export { Page };
