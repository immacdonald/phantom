import type { IconProps } from '@components';
import type { CommonComponentProps, FlexAlign, VisualContext } from '@types';
import { ComponentPropsWithoutRef, ComponentType, CSSProperties, FC, forwardRef, MouseEvent, MouseEventHandler, ReactNode, Ref, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Loading } from '@components';
import styles from './Button.module.scss';

export type ButtonStyle = 'outline' | 'filled' | 'text' | 'ghost';

interface BaseButtonProps {
    type?: 'primary' | 'default' | 'text';
    size?: 'regular' | 'small' | 'large';
    full?: boolean;
    align?: FlexAlign;
    variant?: ButtonStyle;
    context?: VisualContext;
    rounded?: boolean;
    Icon?: ComponentType<IconProps>;
    iconRight?: boolean;
    onHover?: MouseEventHandler<HTMLElement>;
    disabled?: boolean;
    isLoading?: boolean;
    children?: ReactNode;
}

// Props for link-type button
interface LinkButtonProps extends BaseButtonProps, CommonComponentProps<HTMLAnchorElement> {
    link: string;
    onClick?: never; // No onClick for links to avoid conflict with <Link>
    htmlType?: never;
    form?: never;
}

// Props for regular button
interface RegularButtonProps extends BaseButtonProps, Omit<CommonComponentProps<HTMLButtonElement>, 'type'> {
    link?: never; // Ensure link is not passed when it's a button
    htmlType?: 'button' | 'reset' | 'submit';
    form?: string;
}

// Union type for Button component props
type ButtonProps = LinkButtonProps | RegularButtonProps;

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
        { type = 'default', size = 'regular', full, align, variant, context, rounded, Icon, iconRight, onClick, onHover, link, disabled, isLoading, children, className, style, htmlType, ...props },
        ref
    ) => {
        if (type == 'primary') {
            if (!context) {
                context = 'primary';
            }

            if (!variant) {
                variant = 'filled';
            }
        } else if (type == 'default') {
            if (!variant) {
                variant = 'filled';
            }
        }

        const buttonClasses = clsx(
            styles.button,
            {
                [styles.link]: !!link,
                [styles.large]: size == 'large',
                [styles.small]: size == 'small',
                [styles.full]: full,
                [styles.ghost]: variant == 'ghost',
                [styles.outline]: variant == 'outline',
                [styles.filled]: variant == 'filled',
                [styles.text]: variant == 'text',
                [styles.rounded]: rounded,
                [styles.loading]: isLoading,
                [styles.disabled]: disabled
            },
            className
        );

        const visibility = useMemo(() => (isLoading ? ({ visibility: 'hidden' } as CSSProperties) : {}), [isLoading]);

        const content = (
            <>
                {Icon && !iconRight && <Icon size={size} />}
                {children && <span style={visibility}>{children}</span>}
                {Icon && iconRight && <Icon size={size} />}
                {isLoading && <Loading size={24} thickness={3} color="var(--context-color-text, var(--v-default))" />}
            </>
        );

        const commonProps = {
            className: buttonClasses,
            'data-context': context,
            style: { justifyContent: align, ...style },
            onMouseOver: onHover
        };

        // Render as <a> or <Link> if link is provided
        if (link) {
            const linkProps = {
                ...commonProps,
                ref,
                ...props
            };
            if (link.includes('#')) {
                return (
                    <a href={link} {...(linkProps as ComponentPropsWithoutRef<'a'>)}>
                        {content}
                    </a>
                );
            } else {
                return (
                    <Link to={link} {...(linkProps as Omit<ComponentPropsWithoutRef<typeof Link>, 'to'>)}>
                        {content}
                    </Link>
                );
            }
        }

        const handleMouseClick = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                if (onClick) onClick(e);
            },
            [onClick]
        );

        // Render as <button> if `link` is not provided
        return (
            <button {...commonProps} type={htmlType} ref={ref as Ref<HTMLButtonElement>} onClick={handleMouseClick} disabled={disabled} {...(props as ComponentPropsWithoutRef<'button'>)}>
                {content}
            </button>
        );
    }
);

export { Button };
