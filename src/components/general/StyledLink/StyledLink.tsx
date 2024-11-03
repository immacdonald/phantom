import { CommonComponentProps } from '@types';
import { FC, forwardRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import clsx from 'clsx';
import { orUndefined } from '@utility';
import styles from './StyledLink.module.scss';

interface StyledLinkProps extends LinkProps, CommonComponentProps<HTMLAnchorElement> {
    inherit?: boolean;
    external?: boolean;
    children: ReactNode;
}

const StyledLink: FC<StyledLinkProps> = forwardRef<HTMLAnchorElement, StyledLinkProps>(({ to, inherit, external, className, children, ...props }, ref) => {
    const linkClasses = clsx(styles.link, { [styles.styled]: !inherit }, className);

    const externalProps = orUndefined(external, { target: '_blank', rel: 'noopener noreferrer' });

    return (
        <Link to={to} className={linkClasses} ref={ref} {...externalProps} {...props}>
            {children}
        </Link>
    );
});

export { StyledLink };
