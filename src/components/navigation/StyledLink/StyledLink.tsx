import type { CommonComponentProps } from '@types';
import type { LinkDecoration } from './LinkDecoration';
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { orUndefined } from '@utility';
import styles from './StyledLink.module.scss';

interface StyledLinkProps extends LinkProps, CommonComponentProps<HTMLAnchorElement> {
    /** Disables the link from being clicked. */
    disabled?: boolean;

    /** The base visual style for link. */
    visual?: LinkDecoration | null;

    /** The style for link on hover. */
    hover?: LinkDecoration | null;

    /** For links to be opened in a new tab with appropriate security attributes. */
    external?: boolean;

    /** The content inside the link. */
    children: ReactNode;
}

/** A styled link component with styling inheritance and external link handling. */
const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(({ to, visual = 'color', hover = 'underline', disabled, external, className, children, ...props }, ref) => {
    const linkClasses = clsx(
        styles.link,
        {
            [styles.color]: visual == 'color',
            [styles.bold]: visual == 'bold',
            [styles.underline]: visual == 'underline',
            [styles.subtle]: visual == 'subtle',
            [styles.activeColor]: hover == 'color',
            [styles.activeBold]: hover == 'bold',
            [styles.activeUnderline]: hover == 'underline',
            [styles.activeSubtle]: hover == 'subtle'
        },
        className
    );

    const externalProps = orUndefined(external, {
        target: '_blank',
        rel: 'noopener noreferrer',
        role: 'link'
    });

    return (
        <Link to={disabled ? '#' : to} className={linkClasses} ref={ref} {...props} {...externalProps}>
            {children}
        </Link>
    );
}) as ForwardRefExoticComponent<StyledLinkProps & RefAttributes<HTMLAnchorElement>>;

export { StyledLink };
