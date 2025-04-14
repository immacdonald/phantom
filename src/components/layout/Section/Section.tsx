import type { BackgroundDepth, CommonComponentProps } from '@types';
import type { CSSProperties, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { tokens } from '@styles/tokens';
import styles from './Section.module.scss';

type EdgeShape = 'inset' | 'outset';

interface SectionEdges {
    /** Defines the shape of the top edge of the section. */
    top?: EdgeShape;

    /** Defines the shape of the bottom edge of the section. */
    bottom?: EdgeShape;
}

interface SectionProps extends CommonComponentProps<HTMLDivElement> {
    /** Determines the background color of the section. */
    background?: BackgroundDepth;

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
const Section = forwardRef<HTMLDivElement, SectionProps>(({ background, backgroundImage, parallax, edges, children, className, style, ...props }, ref) => {
    const sectionClass = clsx(
        styles.section,
        {
            [styles.image]: !!backgroundImage,
            [styles.parallax]: parallax
        },
        className
    );

    if (background && backgroundImage) {
        console.warn('Section cannot have a background color and background image.');
    }

    if (parallax && !backgroundImage) {
        console.warn('Parallax effect enabled but no background image provided.');
    }

    const sectionData = {
        'data-top-shape': edges?.top,
        'data-bottom-shape': edges?.bottom
    };

    const sectionStyle: CSSProperties = {
        ...(background && { '--background-color': tokens.color.background[background] }),
        ...(backgroundImage && { '--background-image': `url(${backgroundImage})` }),
        ...style
    };

    return (
        <section className={sectionClass} style={sectionStyle} {...sectionData} ref={ref} {...props}>
            {children}
        </section>
    );
}) as ForwardRefExoticComponent<SectionProps & RefAttributes<HTMLDivElement>>;

export { Section };
