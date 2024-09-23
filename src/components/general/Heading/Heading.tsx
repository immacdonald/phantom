import { CommonComponentProps, FlexAlignSimple, HeadingTag } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { withCommonProps } from '@components/hoc';
import { useStyleContext } from '@contexts';
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

const HeadingComponent: FC<HeadingProps> = ({ subheading, align, hero, major, minor, noMargin, children, className, style, ...rest }) => {
    if ((major && minor) || (major && hero) || (minor && hero)) {
        console.warn('Subheading cannot be multiple of major, minor, and hero');
        major = false;
        minor = false;
        hero = false;
    }

    const { computeClasses } = useStyleContext();

    const headerStyle = computeClasses(
        clsx(styles.header, {
            [styles.hero]: hero,
            [styles.major]: major,
            [styles.minor]: minor,
            [styles.noMargin]: noMargin
        }),
        'heading',
        className
    );

    const headingType = hero ? 'hero' : major ? 'major' : minor ? 'minor' : 'regular';
    const HeadingAs = headingTags[headingType].heading;
    const SubheadingAs = headingTags[headingType].subheading;

    const properties = { textAlign: align, ...style } as CSSProperties;

    return (
        <header className={headerStyle} style={properties} {...rest}>
            {children && <HeadingAs className={styles.title}>{children}</HeadingAs>}
            {subheading && <SubheadingAs className={styles.subheading}>{subheading}</SubheadingAs>}
        </header>
    );
};

const Heading = withCommonProps(HeadingComponent);

export { Heading };
