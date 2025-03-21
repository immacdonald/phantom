import { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const MultiDropdownDocs: FC = () => {
    const parsedDocs = getComponentDoc('MultiDropdown')!;

    return <ComponentDocs {...parsedDocs} unstable />;
};

export { MultiDropdownDocs };
