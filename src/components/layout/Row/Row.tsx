import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { useResponsiveContext } from '../../../contexts';
import { ComponentCSSProps, FlexAlign, ResponsiveType } from '../../../types';
import style from './Row.module.scss';

interface RowProps extends ComponentCSSProps {
    children?: ReactNode;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    gap?: ResponsiveType<React.CSSProperties['gap']>;
    relative?: boolean;
}

const Row: React.FC<RowProps> = ({ children, align, verticalAlign, gap, relative = false, className, cssProperties }) => {
    const { parse } = useResponsiveContext();

    const rowClasses = clsx(style.row, className);

    return (
        <div
            className={rowClasses}
            style={{ justifyContent: parse<FlexAlign>(align), alignItems: parse<FlexAlign>(verticalAlign), gap: parse<React.CSSProperties['gap']>(gap), position: relative ? 'relative' : undefined, ...cssProperties }}
        >
            {children}
        </div>
    );
};

export { Row };
