import { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const DropdownDocs: FC = () => {
    const parsedDocs = getComponentDoc('Dropdown')!;

    return <ComponentDocs {...parsedDocs} unstable />;
};

export { DropdownDocs };
