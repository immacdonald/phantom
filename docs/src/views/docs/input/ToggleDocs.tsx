import { FC } from 'react';
import { Toggle, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const ToggleDocs: FC = () => {
    const parsedDocs = getComponentDoc('Toggle')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Typography.Text>Default Toggle</Typography.Text>
            <Toggle />
            <Typography.Text>Toggle with Custom Labels</Typography.Text>
            <Toggle checked="Active" notChecked="Inactive" defaultState={true} />
            <Typography.Text>Disabled Toggle</Typography.Text>
            <Toggle defaultState={false} disabled />
        </ComponentDocs>
    );
};

export { ToggleDocs };
