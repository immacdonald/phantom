import type { FlexProps } from './Flex';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import { Flex } from './Flex';

interface RowProps extends Omit<FlexProps, 'flex'> {}

/** A flexbox-based row layout component that arranges children horizontally. */
const Row = forwardRef<HTMLDivElement, RowProps>(({ children, block = true, ...props }, ref) => {
    return (
        <Flex flex="row" block={block} {...props} ref={ref}>
            {children}
        </Flex>
    );
}) as ForwardRefExoticComponent<RowProps & RefAttributes<HTMLDivElement>>;

export { Row };
export type { RowProps };
