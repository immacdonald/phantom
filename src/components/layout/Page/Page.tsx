import type { CommonComponentProps } from '@types';
import { FC, ReactNode, useEffect } from 'react';
import { withCommonProps } from '@components/hoc';
import { useStyleContext } from '../../../contexts/useStyleContext';
import style from './Page.module.scss';
interface PageProps extends CommonComponentProps {
    title?: string;
    header?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
}

const PageComponent: FC<PageProps> = ({ title, header, footer, children, className, ...rest }) => {
    const { config, computeClasses } = useStyleContext();
    const computedTitle = title || config?.page?.defaultTitle;

    useEffect(() => {
        if (computedTitle) {
            document.title = computedTitle;
        }
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    const pageClasses = computeClasses(style.page, 'page', className);

    return (
        <>
            {header || config?.page?.defaultHeader}
            <main className={pageClasses} {...rest}>
                {children}
            </main>
            {footer || config?.page?.defaultFooter}
        </>
    );
};

const Page = withCommonProps(PageComponent);

export { Page };
