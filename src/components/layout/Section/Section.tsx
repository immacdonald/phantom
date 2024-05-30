import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { ComponentCSSProps } from '../../../types';
import style from './Section.module.scss';

interface SectionProps extends ComponentCSSProps {
    variant?: 'floating' | 'inset';
    alt?: boolean;
    highlight?: boolean;
    background?: string;
    children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ variant, alt = false, highlight = false, background, children, className, cssProperties }) => {
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

    const innerDiv = variant == 'floating' || variant == 'inset';

    return (
        <section className={sectionClass} style={{ ...cssProperties, backgroundImage: background ? `url(${background})` : undefined }}>
            {innerDiv ? <div>{children}</div> : <>{children}</>}
        </section>
    );
};

export { Section };
