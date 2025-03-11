import { FC } from 'react';
import { Popover, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const PopoverDocs: FC = () => {
    const parsedDocs = getComponentDoc('Popover')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Popover clickToToggle content="Hi, this is a popover!">
                <Typography.Text>Click for a popover.</Typography.Text>
            </Popover>
            <Popover content="Hi, this is a popover!">
                <Typography.Text>Hover for a popover.</Typography.Text>
            </Popover>
        </ComponentDocs>
    );
};

export { PopoverDocs };
