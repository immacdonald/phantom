import type { ComponentProps, StyleContext } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Section.module.scss';

type EdgeShape = 'inset' | 'outset';
interface SectionEdges {
    top?: EdgeShape;
    bottom?: EdgeShape;
}

interface SectionProps extends ComponentProps {
    variant?: 'regular' | 'floating' | 'inset';
    context?: StyleContext;
    hasBackground?: boolean;
    backgroundImage?: string;
    edges?: SectionEdges;
    children?: ReactNode;
}

const Section: FC<SectionProps> = ({ variant = 'regular', context, hasBackground = false, backgroundImage, edges, children, className, cssProperties, id }) => {
    const sectionClass = clsx(
        style.section,
        {
            [style.regular]: variant == 'regular' || !variant,
            [style.floating]: variant == 'floating',
            [style.inset]: variant == 'inset',
            [style.background]: hasBackground,
            [style.parallax]: !!backgroundImage
        },
        className
    );

    const irregularShape = variant == 'floating' || variant == 'inset';

    const innerDiv = irregularShape;

    if (irregularShape && edges) {
        console.warn('Cannot have an edge shape on an irregular section shape');
    }

    const sectionData = {
        'data-top-shape': edges ? edges.top : undefined,
        'data-bottom-shape': edges ? edges.bottom : undefined,
        'data-context': context
    };

    return (
        <section className={sectionClass} style={{ ...cssProperties, '--background-image': backgroundImage ? `url(${backgroundImage})` : undefined } as CSSProperties} id={id} {...sectionData}>
            {innerDiv ? <div>{children}</div> : <>{children}</>}
        </section>
    );
};

export { Section };
