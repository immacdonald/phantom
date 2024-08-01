import type { ComponentProps } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { GridItemSize } from './GridItemSize';
import style from './Grid.module.scss';

interface GridProps extends ComponentProps {
    dense?: boolean;
    children?: ReactNode;
}

const GridRoot: FC<GridProps> = ({ dense = false, children, className, cssProperties, id }) => {
    const gridClasses = clsx(
        style.grid,
        {
            [style.dense]: dense
        },
        className
    );

    return (
        <div className={gridClasses} style={cssProperties} id={id}>
            {children}
        </div>
    );
};

interface GridItemProps extends ComponentProps {
    size?: GridItemSize;
    children?: ReactNode;
}

const GridItem: FC<GridItemProps> = ({ size = GridItemSize.Normal, children, className, cssProperties, id }) => {
    return (
        <div className={clsx(style.item, className)} style={cssProperties} data-grid-item={size} id={id}>
            {children}
        </div>
    );
};

export const Grid = GridRoot as typeof GridRoot & {
    Item: typeof GridItem;
};

Grid.Item = GridItem;
