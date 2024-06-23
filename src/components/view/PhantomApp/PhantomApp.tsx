import type { ComponentCSSProps } from '@types';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { AnchorController, Banner, ModalController } from '@components';
import { ResponsiveContextProvider } from '@contexts';
import style from './PhantomApp.module.scss';

interface PhantomAppProps extends ComponentCSSProps {
    anchors?: boolean;
    modals?: boolean;
    banners?: boolean;
    children: ReactNode;
}

const PhantomApp: React.FC<PhantomAppProps> = ({ anchors = true, modals = false, banners = false, children, className, cssProperties }) => {
    return (
        <ResponsiveContextProvider>
            <div className={clsx(style.app, className)} style={cssProperties}>
                {banners && <Banner />}
                {anchors && <AnchorController />}
                {modals && <ModalController />}
                {children}
            </div>
        </ResponsiveContextProvider>
    );
};

export { PhantomApp };
