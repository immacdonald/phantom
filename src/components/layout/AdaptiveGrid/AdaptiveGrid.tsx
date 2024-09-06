import type { ComponentProps } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AdaptiveGridItemSize } from './AdaptiveGridItemSize';
import style from './AdaptiveGrid.module.scss';

interface AdaptiveGridProps extends ComponentProps {
    dense?: boolean;
    children?: ReactNode;
}

const AdaptiveGridRoot: FC<AdaptiveGridProps> = ({ dense = false, children, className, cssProperties, id }) => {
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

interface AdaptiveGridItemProps extends ComponentProps {
    size?: AdaptiveGridItemSize;
    children?: ReactNode;
}

const AdaptiveGridItem: FC<AdaptiveGridItemProps> = ({ size = AdaptiveGridItemSize.Normal, children, className, cssProperties, id }) => {
    return (
        <div className={clsx(style.item, className)} style={cssProperties} data-grid-item={size} id={id}>
            {children}
        </div>
    );
};

export const AdaptiveGrid = AdaptiveGridRoot as typeof AdaptiveGridRoot & {
    Item: typeof AdaptiveGridItem;
};

AdaptiveGrid.Item = AdaptiveGridItem;
