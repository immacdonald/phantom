import type { CommonComponentProps, FlexAlign, VisualContext } from '@types';
import type { IconProps } from '@components';
import type { ComponentPropsWithoutRef, ComponentType, CSSProperties, FC, MouseEvent, MouseEventHandler, ReactNode, Ref } from 'react';
import { forwardRef, useCallback, useMemo } from 'react';
import type { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Loading, StyledLink } from '@components';
import styles from './Button.module.scss';

export type ButtonStyle = 'outline' | 'filled' | 'text' | 'ghost';

interface BaseButtonProps {
    /** Specifies the button type, determining default styles. */
    type?: 'primary' | 'default' | 'text';

    /** Defines the button size. */
    size?: 'regular' | 'small' | 'large';

    /** Expands the button to full width. */
    full?: boolean;

    /** Sets the button's content alignment. */
    align?: FlexAlign;

    /** Specifies the visual style of the button. */
    variant?: ButtonStyle;

    /** Determines the button's color scheme based on context. */
    context?: VisualContext;

    /** Applies rounded styles to the button. */
    rounded?: boolean;

    /** An optional icon displayed inside the button. */
    Icon?: ComponentType<IconProps>;

    /** Positions the icon to the right side of the button content. */
    iconRight?: boolean;

    /** Handler for hover events. */
    onHover?: MouseEventHandler<HTMLElement>;

    /** Disables the button when set to `true`. */
    disabled?: boolean;

    /** Displays a loading spinner inside the button. */
    isLoading?: boolean;

    /** The content inside the button. */
    children?: ReactNode;
}

/** Props for a link-style button using an `<a>` or `<Link>`. */
interface LinkButtonProps extends BaseButtonProps, CommonComponentProps<HTMLAnchorElement> {
    /** The URL or route the button should navigate to. */
    link: string;

    /** For links to be opened in a new tab with appropriate security attributes. */
    external?: boolean;

    /** Prevents `onClick` from being used in link buttons to avoid conflicts. */
    onClick?: never;

    /** Not applicable to links; included in regular buttons only. */
    htmlType?: never;

    /** Not applicable to links; used for buttons in forms. */
    form?: never;
}

/** Props for a regular `<button>` element. */
interface RegularButtonProps extends BaseButtonProps, Omit<CommonComponentProps<HTMLButtonElement>, 'type'> {
    /** Ensures `link` is not passed when using a regular button. */
    link?: never;

    /** Ensures the link-related external attribute is not passed. */
    external?: never;

    /** Defines the HTML `type` attribute for the button. */
    htmlType?: 'button' | 'reset' | 'submit';

    /** Associates the button with a form by its `id`. */
    form?: string;
}

/** Type definition for the Button component, supporting both links and regular buttons. */
type ButtonProps = LinkButtonProps | RegularButtonProps;

/** A versatile button component that supports links, different styles, icons, and loading states. */
const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
        {
            type = 'default',
            size = 'regular',
            full,
            align,
            variant,
            context,
            rounded,
            Icon,
            iconRight,
            onClick,
            onHover,
            link,
            external,
            disabled,
            isLoading,
            children,
            className,
            style,
            htmlType,
            ...props
        },
        ref
    ) => {
        // Adjusts default variant and context based on the `type` prop.
        if (type == 'primary') {
            if (!context) context = 'primary';
            if (!variant) variant = 'filled';
        } else if (type == 'default') {
            if (!variant) variant = 'filled';
        }

        // Computes class names based on button properties.
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

        // Ensures button content remains hidden while loading.
        const visibility = useMemo(() => (isLoading ? ({ visibility: 'hidden' } as CSSProperties) : {}), [isLoading]);

        // Constructs the button's inner content, including icons and loading indicators.
        const content = (
            <>
                {Icon && !iconRight && <Icon size={size} />}
                {children && <span style={visibility}>{children}</span>}
                {Icon && iconRight && <Icon size={size} />}
                {isLoading && <Loading size={24} thickness={3} color="var(--context-color-text, var(--button-default))" />}
            </>
        );

        // Common props shared between buttons and links.
        const commonProps = {
            className: buttonClasses,
            'data-context': context,
            style: { justifyContent: align, ...style },
            onMouseOver: onHover
        };

        // Render as a link if provided
        if (link) {
            const linkProps = {
                ...commonProps,
                ref,
                ...props
            };

            return (
                <StyledLink to={link} external={external} disabled={disabled} {...(linkProps as Omit<ComponentPropsWithoutRef<typeof Link>, 'to'>)}>
                    {content}
                </StyledLink>
            );
        }

        // Handles button click events.
        const handleMouseClick = useCallback(
            (e: MouseEvent<HTMLButtonElement>) => {
                if (onClick) onClick(e);
            },
            [onClick]
        );

        // Render as `<button>` if `link` is not provided.
        return (
            <button {...commonProps} type={htmlType} ref={ref as Ref<HTMLButtonElement>} onClick={handleMouseClick} disabled={disabled} {...(props as ComponentPropsWithoutRef<'button'>)}>
                {content}
            </button>
        );
    }
);

export { Button };
