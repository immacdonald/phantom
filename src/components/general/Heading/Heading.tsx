import { ComponentProps } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import style from './Heading.module.scss';

interface HeadingProps extends ComponentProps {
    title?: string | ReactNode;
    subtitle?: string | ReactNode;
    align?: 'center' | 'left' | 'right';
    major?: boolean;
    minor?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, align, major = false, minor = false, className, cssProperties, id }) => {
    if (major && minor) {
        console.warn('Subheading cannot be major and minor');
        major = false;
    }

    const headerStyle = clsx(
        style.header,
        {
            [style.major]: major,
            [style.minor]: minor
        },
        className
    );

    const titleStyle = style.title;
    const subtitleStyle = style.subtitle;

    const HeadingAs = major ? 'h2' : minor ? 'h4' : 'h3';
    const SubheadingAs = major ? 'h3' : minor ? 'h5' : 'h4';

    const properties = { textAlign: align, ...cssProperties } as CSSProperties;

    return (
        <header className={headerStyle} style={properties} id={id}>
            {title && <HeadingAs className={titleStyle}>{title}</HeadingAs>}
            {subtitle && <SubheadingAs className={subtitleStyle}>{subtitle}</SubheadingAs>}
        </header>
    );
};

export { Heading };
