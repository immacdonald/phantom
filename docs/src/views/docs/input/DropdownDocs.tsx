import type { FC } from 'react';
import { Dropdown } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const DropdownDocs: FC = () => {
    const parsedDocs = getComponentDoc('Dropdown')!;

    const options = [
        { label: 'Option 1', value: 1 },
        { label: 'Option 2', value: 2 },
        { label: 'Option 3', value: 3 }
    ];

    return (
        <ComponentDocs {...parsedDocs} unstable>
            <Dropdown options={options} />
        </ComponentDocs>
    );
};

export { DropdownDocs };
