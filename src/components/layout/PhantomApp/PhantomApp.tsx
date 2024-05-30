import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { ResponsiveContextProvider } from '../../../contexts';
import { ComponentCSSProps } from '../../../types';
import { AnchorController } from '../../Anchor';
import style from './PhantomApp.module.scss';

interface PhantomAppProps extends ComponentCSSProps {
    anchors?: boolean;
    children: ReactNode;
}

const PhantomApp: React.FC<PhantomAppProps> = ({ anchors = false, children, className, cssProperties }) => {
    return (
        <ResponsiveContextProvider>
            <div className={clsx(style.app, className)} style={cssProperties}>
                {anchors && <AnchorController />}
                {children}
            </div>
        </ResponsiveContextProvider>
    );
};

export { PhantomApp };
