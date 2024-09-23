import type { CommonComponentProps } from '@types';
import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { AdaptiveGridItemSize } from './AdaptiveGridItemSize';
import styles from './AdaptiveGrid.module.scss';

interface AdaptiveGridProps extends CommonComponentProps {
    dense?: boolean;
    children?: ReactNode;
}

const AdaptiveGridRoot: FC<AdaptiveGridProps> = ({ dense = false, children, className, style, id }) => {
    const gridClasses = clsx(
        styles.grid,
        {
            [styles.dense]: dense
        },
        className
    );

    return (
        <div className={gridClasses} style={style} id={id}>
            {children}
        </div>
    );
};

interface AdaptiveGridItemProps extends CommonComponentProps {
    size?: AdaptiveGridItemSize;
    children?: ReactNode;
}

const AdaptiveGridItem: FC<AdaptiveGridItemProps> = ({ size = AdaptiveGridItemSize.Normal, children, className, style, id }) => {
    return (
        <div className={clsx(styles.item, className)} style={style} data-grid-item={size} id={id}>
            {children}
        </div>
    );
};

export const AdaptiveGrid = AdaptiveGridRoot as typeof AdaptiveGridRoot & {
    Item: typeof AdaptiveGridItem;
};

AdaptiveGrid.Item = AdaptiveGridItem;
