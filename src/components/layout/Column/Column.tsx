import type { CommonComponentProps, FlexAlign, ResponsiveType } from '@types';
import { CSSProperties, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { useResponsiveContext } from '@contexts';
import styles from './Column.module.scss';

interface ColumnProps extends CommonComponentProps {
    children?: ReactNode;
    align?: ResponsiveType<FlexAlign>;
    verticalAlign?: ResponsiveType<FlexAlign>;
    gap?: ResponsiveType<CSSProperties['gap']>;
    relative?: boolean;
}

const Column: FC<ColumnProps> = ({ children, align, verticalAlign, gap, relative = false, className, style }) => {
    const { parse } = useResponsiveContext();

    const columnClasses = clsx(styles.column, className);

    return (
        <div
            className={columnClasses}
            style={{
                alignItems: parse<FlexAlign>(align),
                justifyContent: parse<FlexAlign>(verticalAlign),
                gap: parse<CSSProperties['gap']>(gap),
                position: relative ? 'relative' : undefined,
                ...style
            }}
        >
            {children}
        </div>
    );
};

export { Column };
export type { ColumnProps };
