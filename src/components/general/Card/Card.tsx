import type { CommonComponentProps, VisualContext } from '@types';
import { ComponentType, FC, ReactNode } from 'react';
import clsx from 'clsx';
import type { IconProps } from '@components';
import { Column } from '@components';
import { useStyleContext } from '@contexts';
import styles from './Card.module.scss';

interface CardProps extends CommonComponentProps {
    fullHeight?: boolean;
    context?: VisualContext;
    children?: ReactNode;
}
const CardRoot: FC<CardProps> = ({ fullHeight, context, children, className, ...rest }) => {
    const { computeClasses } = useStyleContext();
    const cardClasses = computeClasses(clsx(styles.card, { [styles.fullHeight]: fullHeight }), 'card', className);

    return (
        <div className={cardClasses} data-context={context} {...rest}>
            {children}
        </div>
    );
};

interface CardHeaderProps extends CommonComponentProps {
    title?: string;
    subtitle?: string;
    Icon?: ComponentType<IconProps>;
}
const CardHeader: FC<CardHeaderProps> = ({ title, subtitle, Icon, className, ...rest }) => {
    const { computeClasses } = useStyleContext();

    return (
        <div className={computeClasses(styles.header, 'cardHeader', className)} {...rest}>
            {Icon && <Icon />}
            {title && (
                <Column style={{ alignItems: 'start', gap: '0' }}>
                    <span>{title}</span>
                    {subtitle && <i style={{ fontSize: '0.875rem' }}>{subtitle}</i>}
                </Column>
            )}
        </div>
    );
};

interface CardBodyProps extends CommonComponentProps {
    children?: ReactNode;
    scrollable?: boolean;
}

const CardBody: FC<CardBodyProps> = ({ children, scrollable, className, ...rest }) => {
    const { computeClasses } = useStyleContext();
    const cardBodyClasses = computeClasses(clsx(styles.body, { [styles.scrollable]: scrollable }), 'cardBody', className);

    return (
        <div className={cardBodyClasses} {...rest}>
            {children}
        </div>
    );
};

export const Card = CardRoot as typeof CardRoot & {
    Header: typeof CardHeader;
    Body: typeof CardBody;
};

Card.Header = CardHeader;
Card.Body = CardBody;
