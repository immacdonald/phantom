import type { CommonComponentProps } from '@types';
import { FC, ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import { Row } from '../Flex';
import style from './Page.module.scss';
interface PageProps extends CommonComponentProps {
    title?: string;
    header?: ReactNode;
    footer?: ReactNode;
    aside?: ReactNode;
    children?: ReactNode;
}

const Page: FC<PageProps> = ({ title, header, footer, aside, children, className, ...rest }) => {
    const computedTitle = title;

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

    const pageClasses = clsx(style.page, className);

    /*useEffect(() => {
        Children.toArray(children).forEach((child, index: number) => {
            if (isValidElement(child) && child.type === Section) {
                console.log(`Child ${index} is a section`);
            }
        });
    });*/

    return (
        <>
            {header}
            <Row>
                {aside}
                <main className={pageClasses} {...rest}>
                    <article>{children}</article>
                    {footer}
                </main>
            </Row>
        </>
    );
};

export { Page };
