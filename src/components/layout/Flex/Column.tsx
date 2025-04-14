import type { FlexProps } from './Flex';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import { Flex } from './Flex';

interface ColumnProps extends Omit<FlexProps, 'flex'> {}

/** A flexbox-based column layout component that stacks children vertically. */
const Column = forwardRef<HTMLDivElement, ColumnProps>(({ children, verticalAlign = 'start', ...props }, ref) => {
    return (
        <Flex flex="column" verticalAlign={verticalAlign} {...props} ref={ref}>
            {children}
        </Flex>
    );
}) as ForwardRefExoticComponent<ColumnProps & RefAttributes<HTMLDivElement>>;

export { Column };
export type { ColumnProps };
