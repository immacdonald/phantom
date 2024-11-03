import { FC } from 'react';
import { Flex, FlexProps } from './Flex';

interface ColumnProps extends Omit<FlexProps, 'flex'> {}

const Column: FC<ColumnProps> = ({ children, verticalAlign = 'start', ...props }) => {
    return (
        <Flex flex="column" verticalAlign={verticalAlign} {...props}>
            {children}
        </Flex>
    );
};

export { Column };
export type { ColumnProps };
