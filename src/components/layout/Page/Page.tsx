import type { ComponentProps } from '@types';
import { FC, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { useStyleContext } from '../../../contexts/useStyleContext';
import style from './Page.module.scss';
interface PageProps extends ComponentProps {
    title?: string;
    header?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
}

const Page: FC<PageProps> = ({ title, header, footer, children, className, cssProperties, id }) => {
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

    const { page } = useStyleContext();

    const pageClasses = clsx(style.page, className);

    return (
        <>
            {header || page?.defaultHeader}
            <main className={pageClasses} style={cssProperties} id={id}>
                {children}
            </main>
            {footer || page?.defaultFooter}
        </>
    );
};

export { Page };
