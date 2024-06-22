import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { ResponsiveContextProvider } from '../../../contexts';
import { ComponentCSSProps } from '../../../types';
import { AnchorController } from '../../Anchor';
import { Banner } from '../../Banner';
import { ModalController } from '../../Modal';
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