import { FC } from 'react';
import { Typography, Divider } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const DividerDocs: FC = () => {
    const parsedDocs = getComponentDoc('Divider')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Typography.Text>This is some text above the divider.</Typography.Text>
            <Divider />
            <Typography.Text>And here is another section of text below.</Typography.Text>
        </ComponentDocs>
    );
};

export { DividerDocs };
