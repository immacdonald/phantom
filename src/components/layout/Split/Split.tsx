import { Breakpoints } from '@types';
import { FC, ReactNode } from 'react';
import { useResponsiveContext } from '@contexts';
import { Column, ColumnProps } from '../Column';
import style from './Split.module.scss';

interface SplitColumnProps extends ColumnProps {
    breakpoint: Breakpoints;
}

interface SplitProps {
    mainSide: 'left' | 'right';
    asColumn: SplitColumnProps;
    children: ReactNode[];
}

const Split: FC<SplitProps> = ({ mainSide, asColumn, children }) => {
    const { atBreakpoint } = useResponsiveContext();

    if (children.length != 2) {
        console.warn('Cannot render Split component with more or less than 2 children');
        return false;
    }

    if (asColumn && atBreakpoint(asColumn.breakpoint)) {
        return <Column {...asColumn}>{children}</Column>;
    }

    return (
        <div className={style.split} data-split-side={mainSide}>
            {children}
        </div>
    );
};

export { Split };
