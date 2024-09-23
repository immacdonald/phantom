import type { ButtonStyle, CommonComponentProps, FlexAlign, VisualContext } from '@types';
import { ComponentType, CSSProperties, FC, MouseEvent, MouseEventHandler, ReactNode, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { IconProps } from '@components';
import { Loading } from '@components';
import { orUndefined } from '@utility';
import styles from './Button.module.scss';

interface ButtonProps extends CommonComponentProps<HTMLButtonElement> {
    size?: 'regular' | 'small' | 'large';
    full?: boolean;
    align?: FlexAlign;
    visual?: ButtonStyle;
    context?: VisualContext;
    rounded?: boolean;
    Icon?: ComponentType<IconProps>;
    iconRight?: boolean;
    onHover?: MouseEventHandler<HTMLElement>;
    link?: string;
    isLoading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'reset' | 'submit';
    form?: string;
    children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
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
    children,
    className,
    style,
    id
}) => {
    const buttonClasses = clsx(
        styles.button,
        {
            [styles.link]: !!link,
            [styles.large]: size == 'large',
            [styles.small]: size == 'small',
            [styles.full]: full,
            [styles.ghost]: visual == 'ghost',
            [styles.outline]: visual == 'outline',
            [styles.filled]: visual == 'filled',
            [styles.text]: visual == 'text',
            [styles.rounded]: rounded,
            [styles.loading]: isLoading,
            [styles.disabled]: disabled
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

    const visibility = useMemo(() => orUndefined(isLoading, { visibility: 'hidden' } as CSSProperties), [isLoading]);

    const props = {
        className: buttonClasses,
        'data-context': context,
        style: { justifyContent: align, ...style },
        id
    };

    const content = (
        <>
            {Icon && !iconRight && <Icon size={size} />}
            {children && <span style={visibility}>{children}</span>}
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
