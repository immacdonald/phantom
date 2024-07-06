import type { ComponentCSSProps } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Section.module.scss';

interface SectionProps extends ComponentCSSProps {
    variant?: 'floating' | 'inset';
    alt?: boolean;
    highlight?: boolean;
    background?: string;
    transparent?: boolean;
    children?: ReactNode;
}

const Section: FC<SectionProps> = ({ variant, alt = false, highlight = false, background, transparent, children, className, cssProperties }) => {
    const sectionClass = clsx(
        style.section,
        {
            [style.floating]: variant == 'floating',
            [style.inset]: variant == 'inset',
            [style.alt]: alt && !highlight,
            [style.highlight]: highlight,
            [style.parallax]: !!background,
            [style.transparent]: transparent
        },
        className
    );

    const innerDiv = variant == 'floating' || variant == 'inset';

    return (
        <section className={sectionClass} style={{ ...cssProperties, backgroundImage: background ? `url(${background})` : undefined }}>
            {innerDiv ? <div>{children}</div> : <>{children}</>}
        </section>
    );
};

export { Section };
