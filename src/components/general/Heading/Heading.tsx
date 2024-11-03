import { CommonComponentProps, FlexAlignSimple, HeadingTag } from '@types';
import { CSSProperties, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Heading.module.scss';

type Heading = { heading: HeadingTag; subheading: HeadingTag };

const headingTags: Record<string, Heading> = {
    hero: {
        heading: 'h1',
        subheading: 'h2'
    },
    major: {
        heading: 'h2',
        subheading: 'h3'
    },
    regular: {
        heading: 'h3',
        subheading: 'h4'
    },
    minor: {
        heading: 'h4',
        subheading: 'h5'
    }
};

interface HeadingProps extends CommonComponentProps {
    subheading?: string | ReactNode;
    align?: FlexAlignSimple;
    hero?: boolean;
    major?: boolean;
    minor?: boolean;
    noMargin?: boolean;
    children?: ReactNode;
}

const Heading: FC<HeadingProps> = forwardRef<HTMLElement, HeadingProps>(({ subheading, align, hero, major, minor, noMargin, children, className, style, ...props }, ref) => {
    if ((major && minor) || (major && hero) || (minor && hero)) {
        console.warn('Subheading cannot be multiple of major, minor, and hero');
        major = false;
        minor = false;
        hero = false;
    }

    const headerStyle = clsx(
        styles.header,
        {
            [styles.hero]: hero,
            [styles.major]: major,
            [styles.minor]: minor,
            [styles.noMargin]: noMargin
        },
        className
    );

    const headingType = hero ? 'hero' : major ? 'major' : minor ? 'minor' : 'regular';
    const HeadingAs = headingTags[headingType].heading;
    const SubheadingAs = headingTags[headingType].subheading;

    const properties = { textAlign: align, ...style } as CSSProperties;

    // To-Do: Fix ref on heading and restructure heading component
    return subheading ? (
        <header className={headerStyle} style={properties} ref={ref} {...props}>
            {children && <HeadingAs className={styles.title}>{children}</HeadingAs>}
            {subheading && <SubheadingAs className={styles.subheading}>{subheading}</SubheadingAs>}
        </header>
    ) : (
        <HeadingAs className={clsx(headerStyle, styles.title)}>{children}</HeadingAs>
    );
});

export { Heading };
