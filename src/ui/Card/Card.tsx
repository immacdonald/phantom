import clsx from 'clsx';
import { ComponentType, FC, ReactNode } from 'react';
import { ComponentCSSProps } from '../../types';
import { IconProps } from '../Icon';
import style from './Card.module.scss';

interface CardProps extends ComponentCSSProps {
    children?: ReactNode;
}
const CardRoot: FC<CardProps> = ({ className, cssProperties, children }: CardProps) => {
    const cardClasses = clsx(style.card, className);

    return (
        <div className={cardClasses} style={cssProperties}>
            {children}
        </div>
    );
};

interface CardHeaderProps {
    title?: string;
    Icon?: ComponentType<IconProps>;
}
const CardHeader: FC<CardHeaderProps> = ({ title, Icon }: CardHeaderProps) => {
    return (
        <div className={style.header}>
            {Icon && <Icon />}
            <span>{title}</span>
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
