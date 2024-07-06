import type { ComponentCSSProps, FlexAlign, ResponsiveType } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider, useResponsiveContext } from '@contexts';
import style from './StyledApp.module.scss';

interface StyledAppProps extends ComponentCSSProps {
    anchors?: boolean;
    modals?: boolean;
    banners?: boolean;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    children: ReactNode;
}

const StyledApp: FC<StyledAppProps> = ({ anchors = true, modals = false, banners = false, align, verticalAlign, children, className, cssProperties }) => {
    const { parse } = useResponsiveContext();

    return (
        <ResponsiveContextProvider>
            <div
                className={clsx(style.app, className)}
                style={{
                    alignItems: parse<FlexAlign>(align),
                    justifyContent: parse<FlexAlign>(verticalAlign),
                    ...cssProperties
                }}
            >
                {banners && <Banner />}
                {anchors && <AnchorController />}
                {modals && <ModalController />}
                {children}
            </div>
        </ResponsiveContextProvider>
    );
};

export { StyledApp };
