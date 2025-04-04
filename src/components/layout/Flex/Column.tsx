import type { FlexProps } from './Flex';
import type { FC } from 'react';
import { Flex } from './Flex';

interface ColumnProps extends Omit<FlexProps, 'flex'> {}

/** A flexbox-based column layout component that stacks children vertically. */
const Column: FC<ColumnProps> = ({ children, verticalAlign = 'start', ...props }) => {
    return (
        <Flex flex="column" verticalAlign={verticalAlign} {...props}>
            {children}
        </Flex>
    );
};

export { Column };
export type { ColumnProps };
