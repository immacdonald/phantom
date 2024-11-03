import { FC } from 'react';
import { Flex, FlexProps } from './Flex';

interface RowProps extends Omit<FlexProps, 'flex'> {}

const Row: FC<RowProps> = ({ children, ...props }) => {
    return (
        <Flex flex="row" {...props}>
            {children}
        </Flex>
    );
};

export { Row };
