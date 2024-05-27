import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { ComponentCSSProps } from '../../../types';
import style from './Column.module.scss';

interface ColumnProps extends ComponentCSSProps {
    children?: ReactNode;
}

const Column: React.FC<ColumnProps> = ({ children, className, cssProperties }) => {
    return (
        <div className={clsx(style.column, className)} style={cssProperties}>
            {children}
        </div>
    );
};

export { Column };
