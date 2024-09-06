import { ComponentProps, HeadingTag } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Heading.module.scss';

interface HeadingProps extends ComponentProps {
    subtitle?: string | ReactNode;
    align?: 'center' | 'left' | 'right';
    hero?: boolean;
    major?: boolean;
    minor?: boolean;
    noMargin?: boolean;
    children?: ReactNode;
}

type Heading = {
    title: HeadingTag;
    subtitle: HeadingTag;
};

const headingTags: Record<string, Heading> = {
    hero: {
        title: 'h1',
        subtitle: 'h2'
    },
    major: {
        title: 'h2',
        subtitle: 'h3'
    },
    regular: {
        title: 'h3',
        subtitle: 'h4'
    },
    minor: {
        title: 'h4',
        subtitle: 'h5'
    }
};

const Heading: FC<HeadingProps> = ({ subtitle, align, hero, major, minor, noMargin, children, className, cssProperties, id }) => {
    if ((major && minor) || (major && hero) || (minor && hero)) {
        console.warn('Subheading cannot be multiple of major, minor, and hero');
        major = false;
        minor = false;
        hero = false;
    }

    const headerStyle = clsx(
        style.header,
        {
            [style.hero]: hero,
            [style.major]: major,
            [style.minor]: minor,
            [style.noMargin]: noMargin
        },
        className
    );

    const headingType = hero ? 'hero' : major ? 'major' : minor ? 'minor' : 'regular';
    const HeadingAs = headingTags[headingType].title;
    const SubheadingAs = headingTags[headingType].subtitle;

    const properties = { textAlign: align, ...cssProperties } as CSSProperties;

    return (
        <header className={headerStyle} style={properties} id={id}>
            {children && <HeadingAs className={style.title}>{children}</HeadingAs>}
            {subtitle && <SubheadingAs className={style.subtitle}>{subtitle}</SubheadingAs>}
        </header>
    );
};

export { Heading };
