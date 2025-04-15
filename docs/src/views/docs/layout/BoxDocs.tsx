import type { FC } from 'react';
import { Box, tokens, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const BoxDocs: FC = () => {
    const parsedDocs = getComponentDoc('Box')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Box background="content" padding={tokens.space.md}>
                <Typography.Text>A box with a background color.</Typography.Text>
            </Box>
            <Box border block padding={tokens.space.md}>
                <Typography.Text>A full-width box with a border.</Typography.Text>
            </Box>
        </ComponentDocs>
    );
};

export { BoxDocs };
