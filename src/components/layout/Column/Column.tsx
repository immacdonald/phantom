import type { ComponentCSSProps, FlexAlign, ResponsiveType } from '@types';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import style from './Column.module.scss';

interface ColumnProps extends ComponentCSSProps {
    children?: ReactNode;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    gap?: ResponsiveType<React.CSSProperties['gap']>;
    relative?: boolean;
}

const Column: React.FC<ColumnProps> = ({ children, align, verticalAlign, gap, relative = false, className, cssProperties }) => {
    const { parse } = useResponsiveContext();

    const columnClasses = clsx(style.column, className);

    return (
        <div
            className={columnClasses}
            style={{
                alignItems: parse<FlexAlign>(align),
                justifyContent: parse<FlexAlign>(verticalAlign),
                gap: parse<React.CSSProperties['gap']>(gap),
                position: relative ? 'relative' : undefined,
                ...cssProperties
            }}
        >
            {children}
        </div>
    );
};

export { Column };
