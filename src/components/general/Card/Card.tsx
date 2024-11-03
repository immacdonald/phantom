import type { IconProps } from '@components';
import type { CommonComponentProps, VisualContext } from '@types';
import { ComponentType, FC, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import { Column } from '@components';
import styles from './Card.module.scss';

interface CardProps extends CommonComponentProps {
    fullHeight?: boolean;
    context?: VisualContext;
    children?: ReactNode;
}

const CardRoot: FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(({ fullHeight, context, children, className, ...props }, ref) => {
    const cardClasses = clsx(styles.card, { [styles.fullHeight]: fullHeight }, className);

    return (
        <div className={cardClasses} data-context={context} ref={ref} {...props}>
            {children}
        </div>
    );
});

interface CardHeaderProps extends CommonComponentProps {
    title?: string;
    subtitle?: string;
    Icon?: ComponentType<IconProps>;
}
const CardHeader: FC<CardHeaderProps> = forwardRef<HTMLDivElement, CardHeaderProps>(({ title, subtitle, Icon, className, ...props }, ref) => {
    return (
        <div className={clsx(styles.header, className)} ref={ref} {...props}>
            {Icon && <Icon />}
            {title && (
                <Column align="start">
                    <span>{title}</span>
                    {subtitle && <i style={{ fontSize: '0.875rem' }}>{subtitle}</i>}
                </Column>
            )}
        </div>
    );
});

interface CardBodyProps extends CommonComponentProps {
    children?: ReactNode;
    scrollable?: boolean;
}

const CardBody: FC<CardBodyProps> = forwardRef<HTMLDivElement, CardBodyProps>(({ children, scrollable, className, ...props }, ref) => {
    const cardBodyClasses = clsx(styles.body, { [styles.scrollable]: scrollable }, className);

    return (
        <div className={cardBodyClasses} ref={ref} {...props}>
            {children}
        </div>
    );
});

export const Card = CardRoot as typeof CardRoot & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
};

Card.Header = CardHeader;
Card.Body = CardBody;
