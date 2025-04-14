import type { FC } from 'react';
import { Box, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const BoxDocs: FC = () => {
    const parsedDocs = getComponentDoc('Box')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Box background="content">
                <Typography.Text>A box with a background color.</Typography.Text>
            </Box>
            <Box border block>
                <Typography.Text>A full-width box with a border.</Typography.Text>
            </Box>
        </ComponentDocs>
    );
};

export { BoxDocs };
