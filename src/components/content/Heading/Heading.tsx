import { CommonComponentProps, FlexAlignSimple, HeadingTag } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Heading.module.scss';

type HeadingLevels = 'hero' | 'major' | 'regular' | 'minor';

const headingTags: Record<HeadingLevels, { heading: HeadingTag; subheading: HeadingTag }> = {
    hero: { heading: 'h1', subheading: 'h2' },
    major: { heading: 'h2', subheading: 'h3' },
    regular: { heading: 'h3', subheading: 'h4' },
    minor: { heading: 'h4', subheading: 'h5' }
};

interface HeadingProps extends CommonComponentProps {
    /** An optional subheading displayed below the main heading. */
    subheading?: ReactNode;

    /** The text alignment of the heading. */
    align?: FlexAlignSimple;

    /** The size of the heading, determining its semantic tag. */
    size?: HeadingLevels;

    /** The size of the subheading if it should differ from the heading scale. */
    subheadingSize?: HeadingLevels;

    /** The main heading content. */
    children?: ReactNode;
}

/** A flexible heading component with optional subheading and size variations. */
const Heading: FC<HeadingProps> = forwardRef<HTMLElement | HTMLHeadingElement, HeadingProps>(({ subheading, align, size = 'regular', subheadingSize, children, className, style, ...props }, ref) => {
    const HeadingAs = headingTags[size].heading;
    const SubheadingAs = headingTags[subheadingSize || size].subheading;

    // Computes the inline styles for text alignment.
    const computedStyle: CSSProperties = { textAlign: align, ...style };
    const titleClass = clsx(styles.title, className);
    const subheadingClass = styles.subheading;

    // If both a heading and subheading exist, wrap them in a `<header>` tag.
    if (children && subheading) {
        return (
            <header className={clsx(styles.header, styles[size])} style={computedStyle} {...props} ref={ref}>
                <HeadingAs className={titleClass}>{children}</HeadingAs>
                <SubheadingAs className={subheadingClass}>{subheading}</SubheadingAs>
            </header>
        );
    }

    // If only a heading exists, return it without a `<header>` wrapper.
    if (children) {
        return (
            <HeadingAs className={titleClass} style={computedStyle} {...props} ref={ref as React.RefObject<HTMLHeadingElement>}>
                {children}
            </HeadingAs>
        );
    }

    // If only a subheading exists, return it instead of the main heading.
    return (
        <SubheadingAs className={subheadingClass} style={computedStyle} {...props} ref={ref as React.RefObject<HTMLHeadingElement>}>
            {subheading}
        </SubheadingAs>
    );
});

export { Heading };
