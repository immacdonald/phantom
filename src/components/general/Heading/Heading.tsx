import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Heading.module.scss';

interface HeadingProps {
    title?: string | ReactNode;
    subtitle?: string | ReactNode;
    align?: 'center' | 'left' | 'right';
    major?: boolean;
    minor?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, align, major = false, minor = false }) => {
    if (major && minor) {
        console.warn('Subheading cannot be major and minor');
        major = false;
    }

    const headerStyle = clsx(style.header, {
        [style.major]: major,
        [style.minor]: minor
    });

    const titleStyle = style.title;
    const subtitleStyle = style.subtitle;

    const HeadingAs = major ? 'h1' : minor ? 'h3' : 'h2';
    const SubheadingAs = major ? 'h3' : minor ? 'h5' : 'h4';

    const properties = { textAlign: align } as CSSProperties;

    return (
        <header className={headerStyle} style={properties}>
            {title && <HeadingAs className={titleStyle}>{title}</HeadingAs>}
            {subtitle && <SubheadingAs className={subtitleStyle}>{subtitle}</SubheadingAs>}
        </header>
    );
};

export { Heading };
