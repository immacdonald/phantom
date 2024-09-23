import type { CommonComponentProps } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider, StyleConfiguration, StyleContextProvider } from '@contexts';
import styles from './StyledApp.module.scss';

interface StyledAppProps extends CommonComponentProps {
    configuration?: StyleConfiguration;
    anchors?: boolean;
    minimizeCookies?: boolean;
    children: ReactNode;
}

const StyledApp: FC<StyledAppProps> = ({ configuration, anchors = true, minimizeCookies, children, className, ...rest }) => {
    return (
        <StyleContextProvider {...configuration}>
            <ResponsiveContextProvider initialTheme={configuration?.config?.initialTheme} minimizeCookies={minimizeCookies}>
                <div className={clsx(styles.app, className)} {...rest}>
                    {configuration?.config?.banner?.enabled && <Banner />}
                    {anchors && <AnchorController />}
                    {configuration?.config?.modal?.enabled && <ModalController />}
                    {children}
                </div>
            </ResponsiveContextProvider>
        </StyleContextProvider>
    );
};

export { StyledApp };
