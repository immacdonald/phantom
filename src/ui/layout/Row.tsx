import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { useResponsiveContext } from '../../contexts';
import { ComponentCSSProps, ResponsiveType } from '../../types';
import style from './Row.module.scss';

interface RowProps extends ComponentCSSProps {
    children?: ReactNode;
    align?: ResponsiveType<'center' | 'left' | 'right'>;
    gap?: ResponsiveType<React.CSSProperties['gap']>;
    relative?: boolean;
}

const Row: React.FC<RowProps> = ({ children, align = 'center', gap = '8px', relative = false, className, cssProperties }) => {
    const { parse } = useResponsiveContext();

    const rowClasses = clsx(style.row, className);

    return (
        <div
            className={rowClasses}
            style={{ justifyContent: parse<'center' | 'left' | 'right'>(align), gap: parse<React.CSSProperties['gap']>(gap), position: relative ? 'relative' : undefined, ...cssProperties }}
        >
            {children}
        </div>
    );
};

export { Row };
