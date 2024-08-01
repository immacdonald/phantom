import type { ComponentProps, StyleContext } from '@types';
import { ComponentType, FC, forwardRef, LegacyRef, ReactNode } from 'react';
import clsx from 'clsx';
import type { IconProps } from '@components';
import { Column } from '@components';
import style from './Card.module.scss';

interface CardProps extends ComponentProps {
    fullHeight?: boolean;
    children?: ReactNode;
    context?: StyleContext;
    ref?: LegacyRef<HTMLDivElement>;
}
const CardRoot: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(({ fullHeight = false, className, cssProperties, context, children, id }, ref) => {
    const cardClasses = clsx(
        style.card,
        {
            [style.fullHeight]: fullHeight
        },
        className
    );

    return (
        <div className={cardClasses} style={cssProperties} data-context={context} id={id} ref={ref}>
            {children}
        </div>
    );
});

interface CardHeaderProps {
    title?: string;
    subtitle?: string;
    Icon?: ComponentType<IconProps>;
}
const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, Icon }) => {
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
const CardBody: FC<CardBodyProps> = ({ children, scrollable = false }) => {
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
