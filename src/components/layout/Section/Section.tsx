import type { ComponentProps, StyleContext } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Section.module.scss';

interface SectionProps extends ComponentProps {
    variant?: 'floating' | 'inset';
    context?: StyleContext;
    hasBackground?: boolean;
    backgroundImage?: string;
    children?: ReactNode;
}

const Section: FC<SectionProps> = ({ variant, context, hasBackground = false, backgroundImage, children, className, cssProperties, id }) => {
    const sectionClass = clsx(
        style.section,
        {
            [style.floating]: variant == 'floating',
            [style.inset]: variant == 'inset',
            [style.background]: hasBackground,
            [style.parallax]: !!backgroundImage
        },
        className
    );

    const innerDiv = variant == 'floating' || variant == 'inset';

    return (
        <section className={sectionClass} style={{ ...cssProperties, backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }} data-context={context} id={id}>
            {innerDiv ? <div>{children}</div> : <>{children}</>}
        </section>
    );
};

export { Section };
