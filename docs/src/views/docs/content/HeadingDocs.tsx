import type { FC } from 'react';
import { Heading, TabGroup } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const HeadingDocs: FC = () => {
    const parsedDocs = getComponentDoc('Heading')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <TabGroup
                tabs={[
                    {
                        label: 'Hero',
                        tab: (
                            <Heading size="hero" subheading="Subheading" align="center">
                                Hero Heading
                            </Heading>
                        )
                    },
                    {
                        label: 'Major',
                        tab: (
                            <Heading size="major" subheading="Subheading" align="center">
                                Major Heading
                            </Heading>
                        )
                    },
                    {
                        label: 'Regular',
                        tab: (
                            <Heading subheading="Subheading" align="center">
                                Regular Heading
                            </Heading>
                        )
                    },
                    {
                        label: 'Minor',
                        tab: (
                            <Heading size="minor" subheading="Subheading" align="center">
                                Minor Heading
                            </Heading>
                        )
                    }
                ]}
                variant="segmented"
            />
        </ComponentDocs>
    );
};

export { HeadingDocs };
