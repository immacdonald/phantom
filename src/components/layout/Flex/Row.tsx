import type { FlexProps } from './Flex';
import type { FC } from 'react';
import { Flex } from './Flex';

interface RowProps extends Omit<FlexProps, 'flex'> {}

/** A flexbox-based row layout component that arranges children horizontally. */
const Row: FC<RowProps> = ({ children, ...props }) => {
    return (
        <Flex flex="row" {...props}>
            {children}
        </Flex>
    );
};

export { Row };
export type { RowProps };
