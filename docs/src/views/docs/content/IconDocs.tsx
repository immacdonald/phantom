import { FC } from 'react';
import { tokens, GitHubIcon, Heading, Row, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const IconDocs: FC = () => {
    const parsedDocs = getComponentDoc('Icon')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Typography.Text>
                Icons can be placed inline with text <GitHubIcon inline />
            </Typography.Text>
            <Typography.Text size="xl">
                They dynamically resize to match the font size <GitHubIcon inline />
            </Typography.Text>
            <Heading>
                Headings can also have icons <GitHubIcon inline />
            </Heading>
            <Row gap={tokens.space.lg}>
                <GitHubIcon size="small" />
                <GitHubIcon size="regular" />
                <GitHubIcon size="large" />
            </Row>
        </ComponentDocs>
    );
};

export { IconDocs };
