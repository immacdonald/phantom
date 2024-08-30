import type { ButtonStyle, ComponentProps, FlexAlign, VisualContext } from '@types';
import { ComponentType, CSSProperties, FC, MouseEvent, MouseEventHandler, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { IconProps } from '@components';
import { Loading } from '@components';
import style from './Button.module.scss';

interface ButtonProps extends ComponentProps {
    label?: string;
    size?: 'regular' | 'small' | 'large';
    full?: boolean;
    align?: FlexAlign;
    visual?: ButtonStyle;
    context?: VisualContext;
    rounded?: boolean;
    Icon?: ComponentType<IconProps>;
    iconRight?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onHover?: MouseEventHandler<HTMLElement>;
    link?: string;
    isLoading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
    form?: string;
}

const Button: FC<ButtonProps> = ({
    label,
    size = 'regular',
    full = false,
    align,
    visual = 'ghost',
    context,
    rounded = false,
    Icon,
    iconRight,
    onClick,
    onHover,
    link,
    isLoading = false,
    disabled = false,
    type = 'button',
    form,
    className,
    cssProperties,
    id
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
            [style.text]: visual == 'text',
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

    const props = {
        className: buttonClasses,
        'data-context': context,
        style: { ...cssProperties, justifyContent: align },
        id
    };

    const content = (
        <>
            {Icon && !iconRight && <Icon size={size} />}
            {label && <span style={visibility}>{label}</span>}
            {Icon && iconRight && <Icon size={size} />}
            {isLoading && <Loading size={24} thickness={3} color="inherit" />}
        </>
    );

    if (link) {
        if (link.includes('#')) {
            /* eslint-disable jsx-a11y/mouse-events-have-key-events */
            return (
                <a href={link} onMouseOver={onHover} {...props}>
                    {content}
                </a>
            );
            /* eslint-enable jsx-a11y/mouse-events-have-key-events */
        } else {
            return (
                <Link to={link} onMouseOver={onHover} {...props}>
                    {content}
                </Link>
            );
        }
    }

    return (
        <button type={type} onClick={handleMouseClick} onMouseOver={onHover} onFocus={() => {}} form={form} disabled={disabled} {...props}>
            {content}
        </button>
    );
};

export { Button };
