import clsx from 'clsx';
import React, { ComponentType, CSSProperties, MouseEvent, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ComponentCSSProps, StyleContext } from '../../../types';
import { IconProps } from '../../Icon';
import style from './Button.module.scss';
import { Loading } from '../../Loading';

interface ButtonProps extends ComponentCSSProps {
    label?: string;
    size?: 'regular' | 'small' | 'large';
    full?: boolean;
    visual?: 'ghost' | 'outline' | 'filled' | 'clear';
    context?: StyleContext;
    rounded?: boolean;
    Icon?: ComponentType<IconProps>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    link?: string;
    isLoading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
    form?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    size = 'regular',
    full = false,
    visual = 'ghost',
    context,
    rounded = false,
    Icon,
    onClick,
    link,
    isLoading = false,
    disabled = false,
    type = 'button',
    form,
    className,
    cssProperties
}) => {
    const buttonClasses = clsx(
        style.button,
        {
            [style.link]: !!link,
            [style.large]: size == 'large',
            [style.small]: size == 'small',
            [style.full]: full,
            [style.ghost]: visual == 'ghost',
            [style.outline]: visual == 'outline',
            [style.filled]: visual == 'filled',
            [style.rounded]: rounded,
            [style.loading]: isLoading,
            [style.disabled]: disabled
        },
        className
    );

    const handleMouseClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            //e.stopPropagation();

            if (onClick != undefined) {
                onClick(e);
            }
        },
        [onClick]
    );

    const visibility = useMemo(() => (isLoading ? ({ visibility: 'hidden' } as CSSProperties) : undefined), [isLoading]);

    const props = { className: buttonClasses, 'data-context': context, style: cssProperties };

    const content = (
        <>
            {Icon && <Icon />}
            {label && <span style={visibility}>{label}</span>}
            {isLoading && <Loading size={24} thickness={3} color="inherit" secondaryColor="inherit" />}
        </>
    );

    return link ? (
        <Link to={link} {...props}>
            {content}
        </Link>
    ) : (
        <button type={type} onClick={handleMouseClick} form={form} disabled={disabled} {...props}>
            {content}
        </button>
    );
};

export { Button };
