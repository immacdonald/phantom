import { FC } from 'react';
import { Segmented, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const SegmentedDocs: FC = () => {
    const parsedDocs = getComponentDoc('Segmented')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Typography.Text>Default Segmented Control</Typography.Text>
            <Segmented
                options={[
                    { value: 'One', label: 'One' },
                    { value: 'Two', label: 'Two' },
                    { value: 'Three', label: 'Three' }
                ]}
                defaultValue={0}
            />

            <Typography.Text>Full Width Segmented Control</Typography.Text>
            <Segmented
                full
                options={[
                    { value: 'Option A', label: 'Option A' },
                    { value: 'Option B', label: 'Option B' }
                ]}
                defaultValue={0}
            />
        </ComponentDocs>
    );
};

export { SegmentedDocs };
