import type { ComponentCSSProps } from '@types';
import type { IconProps } from '../Icon';
import { ComponentType, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Column } from '@components';
import style from './Card.module.scss';

interface CardProps extends ComponentCSSProps {
    fullHeight?: boolean;
    children?: ReactNode;
}
const CardRoot: FC<CardProps> = ({ fullHeight = false, className, cssProperties, children }: CardProps) => {
    const cardClasses = clsx(
        style.card,
        {
            [style.fullHeight]: fullHeight
        },
        className
    );

    return (
        <div className={cardClasses} style={cssProperties}>
            {children}
        </div>
    );
};

interface CardHeaderProps {
    title?: string;
    subtitle?: string;
    Icon?: ComponentType<IconProps>;
}
const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, Icon }: CardHeaderProps) => {
    return (
        <div className={style.header}>
            {Icon && <Icon />}
            {title && (
                <Column cssProperties={{ alignItems: 'start', gap: '0' }}>
                    <span>{title}</span>
                    {subtitle && <i style={{ fontSize: '0.875rem' }}>{subtitle}</i>}
                </Column>
            )}
        </div>
    );
};
interface CardBodyProps {
    children?: ReactNode;
    scrollable?: boolean;
}
const CardBody: FC<CardBodyProps> = ({ children, scrollable = false }: CardBodyProps) => {
    const cardBodyClasses = clsx(style.body, {
        [style.scrollable]: scrollable
    });
    return <div className={cardBodyClasses}>{children}</div>;
};

export const Card = CardRoot as typeof CardRoot & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
};

Card.Header = CardHeader;
Card.Body = CardBody;
