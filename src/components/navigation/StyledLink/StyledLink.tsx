import { CommonComponentProps } from '@types';
import { FC, forwardRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import clsx from 'clsx';
import { orUndefined } from '@utility';
import styles from './StyledLink.module.scss';

interface StyledLinkProps extends LinkProps, CommonComponentProps<HTMLAnchorElement> {
    /** If true the link inherits surrounding text styles instead of applying default link styles. */
    inherit?: boolean;

    /** For links to be opened in a new tab with appropriate security attributes. */
    external?: boolean;

    /** Disables the link from being clicked. */
    disabled?: boolean;

    /** The content inside the link. */
    children: ReactNode;
}

/** A styled link component with styling inheritance and external link handling. */
const StyledLink: FC<StyledLinkProps> = forwardRef<HTMLAnchorElement, StyledLinkProps>(({ to, inherit, external, className, disabled, children, ...props }, ref) => {
    const linkClasses = clsx(styles.link, { [styles.styled]: !inherit }, className);

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
});

export { StyledLink };
