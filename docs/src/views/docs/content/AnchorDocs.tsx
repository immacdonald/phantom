import type { FC } from 'react';
import { Anchor, tokens, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const AnchorDocs: FC = () => {
    const parsedDocs = getComponentDoc('Anchor')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Anchor
                component={
                    <Typography.Text
                        data-context="primary"
                        style={{ color: 'var(--color-text-on-primary)', backgroundColor: 'var(--color-primary)', padding: tokens.space.sm, borderRadius: tokens.borderRadius }}
                    >
                        Test
                    </Typography.Text>
                }
                direction="bottom"
            >
                <Typography.Paragraph>The anchor allows for an element to be positioned as an overlay relative to another element.</Typography.Paragraph>
            </Anchor>
        </ComponentDocs>
    );
};

export { AnchorDocs };
