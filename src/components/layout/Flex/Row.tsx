import { FC } from 'react';
import { Flex, FlexProps } from './Flex';

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
