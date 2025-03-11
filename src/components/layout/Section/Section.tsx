import type { CommonComponentProps, VisualContext } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Section.module.scss';

type EdgeShape = 'inset' | 'outset';

interface SectionEdges {
    /** Defines the shape of the top edge of the section. */
    top?: EdgeShape;

    /** Defines the shape of the bottom edge of the section. */
    bottom?: EdgeShape;
}

interface SectionProps extends CommonComponentProps {
    /** Defines the overall section style variant. */
    variant?: 'regular' | 'floating' | 'inset';

    /** Specifies the visual context (color theme) for the section. */
    context?: VisualContext;

    /** Determines whether the section has a background color or image. */
    hasBackground?: boolean;

    /** A URL for a background image applied to the section. */
    backgroundImage?: string;

    /** Enables a parallax effect for the background image. */
    parallax?: boolean;

    /** Specifies the shape of the top and bottom edges of the section. */
    edges?: SectionEdges;

    /** The content inside the section. */
    children?: ReactNode;
}

/** A flexible section component that supports background images, parallax effects, and various styling options. */
const Section: FC<SectionProps> = forwardRef<HTMLDivElement, SectionProps>(
    ({ variant = 'regular', context, hasBackground = false, backgroundImage, parallax, edges, children, className, style, ...props }, ref) => {
        const sectionClass = clsx(
            styles.section,
            {
                [styles.regular]: variant === 'regular' || !variant,
                [styles.floating]: variant === 'floating',
                [styles.inset]: variant === 'inset',
                [styles.background]: hasBackground,
                [styles.image]: !!backgroundImage,
                [styles.parallax]: parallax
            },
            className
        );

        const irregularShape = variant === 'floating' || variant === 'inset';
        const innerDiv = irregularShape;

        if (irregularShape && edges) {
            console.warn('Cannot have an edge shape on an irregular section shape');
        }

        if (parallax && !backgroundImage) {
            console.warn('Parallax effect enabled but no background image provided.');
        }

        const sectionData = {
            'data-top-shape': edges?.top,
            'data-bottom-shape': edges?.bottom,
            'data-context': context
        };

        return (
            <section
                className={sectionClass}
                style={{ '--background-image': backgroundImage ? `url(${backgroundImage})` : undefined, ...style } as CSSProperties}
                ref={ref}
                {...sectionData}
                {...props}
            >
                {innerDiv ? <div>{children}</div> : <>{children}</>}
            </section>
        );
    }
);

export { Section };
