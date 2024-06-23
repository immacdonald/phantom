import type { ComponentCSSProps } from '@types';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { GridItemSize } from './GridItemSize';
import style from './Grid.module.scss';

interface GridProps extends ComponentCSSProps {
    dense?: boolean;
    children?: ReactNode;
}

const GridRoot: React.FC<GridProps> = ({ dense = false, children, className, cssProperties }) => {
    const gridClasses = clsx(
        style.grid,
        {
            [style.dense]: dense
        },
        className
    );

    return (
        <div className={gridClasses} style={cssProperties}>
            {children}
        </div>
    );
};

interface GridItemProps extends ComponentCSSProps {
    size?: GridItemSize;
    children?: ReactNode;
}

const GridItem: React.FC<GridItemProps> = ({ size = GridItemSize.Normal, children, className, cssProperties }) => {
    return (
        <div className={clsx(style.item, className)} style={cssProperties} data-grid-item={size}>
            {children}
        </div>
    );
};

export const Grid = GridRoot as typeof GridRoot & {
    Item: typeof GridItem;
};

Grid.Item = GridItem;
