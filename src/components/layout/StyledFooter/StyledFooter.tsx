import { CommonComponentProps, ResponsiveType, Theme } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import styles from './StyledFooter.module.scss';

interface StyledFooterProps extends CommonComponentProps {
    /** Defines the height of the footer. */
    height?: ResponsiveType<string>;

    /** Sets the theme for the footer. */
    theme?: Theme;

    /** The content inside the footer. */
    children: ReactNode;
}

/** A styled footer component that supports custom height, theme, and optional top border. */
const StyledFooter: FC<StyledFooterProps> = ({ theme, height, children, className, style, ...props }) => {
    const { parse } = useResponsiveContext();

    const styleProps: CSSProperties = height ? ({ '--footer-height': parse<CSSProperties['height']>(height) } as CSSProperties) : {};

    return (
        <footer className={clsx(styles.footer, className)} style={{ ...styleProps, ...style }} data-theme={theme} role="contentinfo" {...props}>
            {children}
        </footer>
    );
};

export { StyledFooter };
