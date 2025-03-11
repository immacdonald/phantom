import { Breakpoints } from '@types';
import { FC, ReactNode } from 'react';
import { useResponsiveContext } from '@contexts';
import { FlexProps, Column } from '../Flex';
import style from './Split.module.scss';

interface SplitColumnProps extends Omit<FlexProps, 'flex'> {
    /** The breakpoint at which the layout switches to a column-based structure. */
    breakpoint: Breakpoints;
}

interface SplitProps {
    /** Determines whether the left or right side is the main content area. */
    mainSide: 'left' | 'right';

    /** Defines responsive behavior for switching to a column layout. */
    asColumn: SplitColumnProps;

    /** The two child elements to be placed in the split layout. */
    children: ReactNode[];
}

/** A layout component that splits content into two sections and adapts responsively based on breakpoints. */
const Split: FC<SplitProps> = ({ mainSide, asColumn, children }) => {
    const { atBreakpoint } = useResponsiveContext();

    if (children.length !== 2) {
        console.warn('Cannot render Split component with more or less than 2 children');
        return null;
    }

    if (asColumn && atBreakpoint(asColumn.breakpoint)) {
        return <Column {...asColumn}>{children}</Column>;
    }

    return (
        <div className={style.split} data-split-side={mainSide} role="region">
            {children}
        </div>
    );
};

export { Split };
