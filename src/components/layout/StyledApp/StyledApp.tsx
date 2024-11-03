import type { CommonComponentProps, Theme } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider } from '@contexts';
import styles from './StyledApp.module.scss';

interface StyledAppProps extends CommonComponentProps {
    initialTheme?: Theme;
    anchors?: boolean;
    modals?: boolean;
    banners?: boolean;
    minimizeCookies?: boolean;
    children: ReactNode;
}

const StyledApp: FC<StyledAppProps> = ({ initialTheme, anchors = true, modals = true, banners = false, minimizeCookies, children, className, ...props }) => {
    return (
        <ResponsiveContextProvider initialTheme={initialTheme ?? 'light'} minimizeCookies={minimizeCookies}>
            <div className={clsx(styles.app, className)} {...props}>
                {banners && <Banner />}
                {anchors && <AnchorController />}
                {modals && <ModalController />}
                {children}
            </div>
        </ResponsiveContextProvider>
    );
};

export { StyledApp };
