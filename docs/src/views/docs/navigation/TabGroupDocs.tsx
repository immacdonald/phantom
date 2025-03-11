import { FC } from 'react';
import { TabGroup, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const TabGroupDocs: FC = () => {
    const parsedDocs = getComponentDoc('TabGroup')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <TabGroup
                tabs={[
                    {
                        label: 'Tab 1',
                        tab: <Typography.Paragraph>This is some text content contained in the first tab.</Typography.Paragraph>
                    },
                    {
                        label: 'Tab 2',
                        tab: <Typography.Paragraph>And this is more text content contained in the second tab.</Typography.Paragraph>
                    },
                    {
                        label: 'Tab 3',
                        tab: <Typography.Paragraph>The third tab also has more text content.</Typography.Paragraph>
                    }
                ]}
                variant="segmented"
            />
        </ComponentDocs>
    );
};

export { TabGroupDocs };
