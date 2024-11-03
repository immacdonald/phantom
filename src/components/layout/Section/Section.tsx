import type { CommonComponentProps, VisualContext } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Section.module.scss';

type EdgeShape = 'inset' | 'outset';
interface SectionEdges {
    top?: EdgeShape;
    bottom?: EdgeShape;
}

interface SectionProps extends CommonComponentProps {
    variant?: 'regular' | 'floating' | 'inset';
    context?: VisualContext;
    hasBackground?: boolean;
    backgroundImage?: string;
    parallax?: boolean;
    edges?: SectionEdges;
    children?: ReactNode;
}

const Section: FC<SectionProps> = forwardRef<HTMLDivElement, SectionProps>(
    ({ variant = 'regular', context, hasBackground = false, backgroundImage, parallax, edges, children, className, style, ...props }, ref) => {
        const sectionClass = clsx(
            styles.section,
            {
                [styles.regular]: variant == 'regular' || !variant,
                [styles.floating]: variant == 'floating',
                [styles.inset]: variant == 'inset',
                [styles.background]: hasBackground,
                [styles.image]: !!backgroundImage,
                [styles.parallax]: parallax
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
            <section
                className={sectionClass}
                style={{ '--background-image': backgroundImage ? `url(${backgroundImage})` : undefined, ...style } as CSSProperties}
                {...sectionData}
                ref={ref}
                {...props}
            >
                {innerDiv ? <div>{children}</div> : <>{children}</>}
            </section>
        );
    }
);

export { Section };
