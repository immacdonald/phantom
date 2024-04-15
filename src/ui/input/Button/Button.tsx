import classNames from 'classnames';
import React, { CSSProperties, MouseEvent, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Loading';
import style from './Button.module.scss';

type ButtonProps = {
    label?: string;
    size?: 'regular' | 'small' | 'large';
    full?: boolean;
    visual?: 'ghost' | 'outline' | 'filled';
    mode?: 'error' | 'accent';
    rounded?: boolean;
    Icon?: any;
    color?: boolean;
    smallIcon?: boolean;
    active?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    allowPropagation?: boolean;
    link?: string;
    isLoading?: boolean;
    customStyle?: string;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
    form?: string;
};

const Button: React.FC<ButtonProps> = ({
    label,
    size = 'regular',
    full = false,
    visual = 'ghost',
    mode,
    rounded = false,
    Icon,
    color = false,
    smallIcon = false,
    active = false,
    onClick,
    allowPropagation = false,
    link,
    isLoading = false,
    customStyle,
    disabled = false,
    type = 'button',
    form
}) => {
    const buttonClasses = classNames(style.button, {
        [style.large]: size == 'large',
        [style.small]: size == 'small',
        [style.full]: full,
        [style.ghost]: visual == 'ghost',
        [style.outline]: visual == 'outline',
        [style.filled]: visual == 'filled',
        [style.rounded]: rounded,
        [style.color]: color,
        [style.hasLabel]: !!label,
        //[style.hasIcon]: !!icon,
        [style.smallIcon]: smallIcon,
        [style.loading]: isLoading,
        [style.active]: active,
        [style.disabled]: disabled,
        [customStyle ? customStyle : '']: !!customStyle
    });

    const handleMouseClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            if (!allowPropagation) {
                e.stopPropagation();
            }

            if (onClick != undefined) {
                onClick(e);
            }
        },
        [onClick]
    );

    const visibility = useMemo(() => (isLoading ? ({ visibility: 'hidden' } as CSSProperties) : undefined), [isLoading]);

    const props = { className: buttonClasses, 'data-mode': mode };

    const renderChildren = (
        <>
            {Icon && <Icon />}
            {label && <span style={visibility}>{label}</span>}
            {isLoading && <Loading size={24} thickness={3} color="inherit" secondaryColor="inherit" />}
        </>
    );

    return link ? (
        <Link to={link} {...props}>
            {renderChildren}
        </Link>
    ) : (
        <button type={type} onClick={handleMouseClick} form={form} {...props}>
            {renderChildren}
        </button>
    );
};

export { Button };
