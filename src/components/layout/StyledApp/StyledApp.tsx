import type { ComponentProps, FlexAlign } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider } from '@contexts';
import style from './StyledApp.module.scss';

interface StyledAppProps extends ComponentProps {
    anchors?: boolean;
    modals?: boolean;
    banners?: boolean;
    align?: FlexAlign;
    verticalAlign?: FlexAlign;
    children: ReactNode;
}

const StyledApp: FC<StyledAppProps> = ({ anchors = true, modals = false, banners = false, align, verticalAlign, children, className, cssProperties, id }) => {
    return (
        <ResponsiveContextProvider>
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
    );
};

export { StyledApp };
