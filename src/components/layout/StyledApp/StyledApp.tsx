import type { ComponentProps, FlexAlign, Theme } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider, StyleConfiguration, StyleContextProvider } from '@contexts';
import style from './StyledApp.module.scss';

interface StyledAppProps extends ComponentProps {
    anchors?: boolean;
    modals?: boolean;
    banners?: boolean;
    initialTheme?: Theme;
    align?: FlexAlign;
    verticalAlign?: FlexAlign;
    minimizeCookies?: boolean;
    configuration?: StyleConfiguration;
    children: ReactNode;
}

const StyledApp: FC<StyledAppProps> = ({
    anchors = true,
    modals = false,
    banners = false,
    initialTheme,
    align,
    verticalAlign,
    minimizeCookies,
    configuration,
    children,
    className,
    cssProperties,
    id
}) => {
    return (
        <StyleContextProvider {...configuration}>
            <ResponsiveContextProvider initialTheme={initialTheme} minimizeCookies={minimizeCookies}>
                <div
                    className={clsx(style.app, className)}
                    style={{
                        alignItems: align,
                        justifyContent: verticalAlign,
                        ...cssProperties
                    }}
                    id={id}
                >
                    {banners && <Banner />}
                    {anchors && <AnchorController />}
                    {modals && <ModalController />}
                    {children}
                </div>
            </ResponsiveContextProvider>
        </StyleContextProvider>
    );
};

export { StyledApp };
