import type { CommonComponentProps, Theme } from '@types';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider } from '@contexts';
import { ScrollToAnchor } from './ScrollToAnchor';
import styles from './StyledApp.module.scss';

interface StyledAppProps extends CommonComponentProps {
    /** The initial theme of the application (light or dark). */
    theme?: Theme;

    /** Enables or disables the anchor controller for tooltips/popovers. */
    anchors?: boolean;

    /** Enables or disables the modal controller for handling modals. */
    modals?: boolean;

    /** Enables or disables the banner system for global notifications. */
    banners?: boolean;

    /** Minimizes cookie tracking and storage for privacy-conscious applications. */
    minimizeCookies?: boolean;

    /** Set the minimum height to always fill the viewport. */
    fillViewport?: boolean;

    /** The id of an existing root DOM element to be used as the StyledApp root. */
    rootId?: string;

    /** The main content of the application. */
    children: ReactNode;
}

/** The root component for a styled application using Phantom, providing theme, global controllers, and contextual support. */
const StyledApp: FC<StyledAppProps> = ({ theme, anchors = true, modals = true, banners, minimizeCookies, fillViewport = true, rootId, children, className, ...props }) => {
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    const rootClasses = useMemo(() => clsx(styles.app, { [styles.viewport]: fillViewport }, className), [className, fillViewport]);

    useEffect(() => {
        if (rootId) {
            const existingRoot = document.getElementById(rootId);
            if (existingRoot) {
                // Apply styles and attributes to the existing div
                Object.assign(existingRoot, { ...props, role: 'application' });
                existingRoot.className = rootClasses;
                setRootElement(existingRoot);
            } else {
                console.error(`StyledApp: No element found with id "${rootId}".`);
            }
        }
    }, [rootId, rootClasses]);

    const internalNodes: ReactNode = (
        <>
            <ScrollToAnchor />
            {banners && <Banner />}
            {anchors && <AnchorController />}
            {modals && <ModalController />}
            {children}
        </>
    );

    return (
        <ResponsiveContextProvider theme={theme ?? 'light'} minimizeCookies={minimizeCookies}>
            {rootId && rootElement ? (
                ReactDOM.createPortal(internalNodes, rootElement)
            ) : (
                <div className={rootClasses} role="application" {...props}>
                    {internalNodes}
                </div>
            )}
        </ResponsiveContextProvider>
    );
};

export { StyledApp };
