import { CommonComponentProps } from '@types';
import { Link, LinkProps } from 'react-router-dom';
import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { withCommonProps } from '@components/hoc';
import { useStyleContext } from '@contexts';
import { orUndefined } from '@utility';
import styles from './StyledLink.module.scss';

interface StyledLinkProps extends LinkProps, CommonComponentProps<HTMLAnchorElement> {
    inherit?: boolean;
    external?: boolean;
    children: ReactNode;
}

const StyledLinkComponent: FC<StyledLinkProps> = ({ to, inherit, external, className, children, ...rest }) => {
    const { computeClasses } = useStyleContext();

    const linkClasses = computeClasses(
        clsx(styles.link, {
            [styles.styled]: !inherit
        }),
        'styledLink',
        className
    );

    const externalProps = orUndefined(external, { target: '_blank', rel: 'noopener noreferrer' });

    return (
        <Link to={to} className={linkClasses} {...externalProps} {...rest}>
            {children}
        </Link>
    );
};

const StyledLink = withCommonProps(StyledLinkComponent);

export { StyledLink };
