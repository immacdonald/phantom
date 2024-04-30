import clsx from 'clsx';
import React, { ReactNode } from 'react';
import style from './Section.module.scss';

interface SectionProps {
    variant?: 'floating' | 'inset';
    alt?: boolean;
    highlight?: boolean;
    background?: string;
    className?: string;
    children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ variant, alt = false, highlight = false, background, className, children }) => {
    const sectionClass = clsx(
        style.section,
        {
            [style.floating]: variant == 'floating',
            [style.inset]: variant == 'inset',
            [style.alt]: alt && !highlight,
            [style.highlight]: highlight,
            [style.parallax]: !!background
        },
        className
    );

    const properties = {} as React.CSSProperties;

    const innerDiv = variant == 'floating' || variant == 'inset';

    return (
        <section className={sectionClass} style={{ ...properties, backgroundImage: background ? `url(${background})` : undefined }}>
            {innerDiv ? <div>{children}</div> : <>{children}</>}
        </section>
    );
};

export { Section };
