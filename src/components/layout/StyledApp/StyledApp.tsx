import type { CommonComponentProps, Theme } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider } from '@contexts';
import styles from './StyledApp.module.scss';

interface StyledAppProps extends CommonComponentProps {
    /** The initial theme of the application (light or dark). */
    initialTheme?: Theme;

    /** Enables or disables the anchor controller for tooltips/popovers. */
    anchors?: boolean;

    /** Enables or disables the modal controller for handling modals. */
    modals?: boolean;

    /** Enables or disables the banner system for global notifications. */
    banners?: boolean;

    /** Minimizes cookie tracking and storage, useful for privacy-conscious applications. */
    minimizeCookies?: boolean;

    /** The main content of the application. */
    children: ReactNode;
}

/** The root component for a styled application using Phantom, providing theme, global controllers, and contextual support. */
const StyledApp: FC<StyledAppProps> = ({ initialTheme, anchors = true, modals = true, banners = false, minimizeCookies, children, className, ...props }) => {
    return (
        <ResponsiveContextProvider initialTheme={initialTheme ?? 'light'} minimizeCookies={minimizeCookies}>
            <div className={clsx(styles.app, className)} role="application" {...props}>
                {banners && <Banner />}
                {anchors && <AnchorController />}
                {modals && <ModalController />}
                {children}
            </div>
        </ResponsiveContextProvider>
    );
};

export { StyledApp };
