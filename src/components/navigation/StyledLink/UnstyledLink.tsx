import type { CommonComponentProps } from '@types';
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { LinkProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { orUndefined } from '@utility';
import styles from './StyledLink.module.scss';

interface UnstyledLinkProps extends LinkProps, CommonComponentProps<HTMLAnchorElement> {
    /** Disables the link from being clicked. */
    disabled?: boolean;

    /** For links to be opened in a new tab with appropriate security attributes. */
    external?: boolean;

    /** The content inside the link. */
    children: ReactNode;
}

/** An unstyled link component that inherits its styling and has external link handling. */
const UnstyledLink = forwardRef<HTMLAnchorElement, UnstyledLinkProps>(({ to, disabled, external, className, children, ...props }, ref) => {
    const linkClasses = clsx(styles.unstyled, className);

    const externalProps = orUndefined(external, {
        target: '_blank',
        rel: 'noopener noreferrer',
        role: 'link'
    });

    return (
        <Link to={disabled ? '#' : to} className={linkClasses} ref={ref} {...externalProps} {...props}>
            {children}
        </Link>
    );
}) as ForwardRefExoticComponent<UnstyledLinkProps & RefAttributes<HTMLAnchorElement>>;

export { UnstyledLink };
