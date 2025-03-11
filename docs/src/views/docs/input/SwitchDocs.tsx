import { FC } from 'react';
import { Switch } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const SwitchDocs: FC = () => {
    const parsedDocs = getComponentDoc('Switch')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Switch defaultChecked={true} />
        </ComponentDocs>
    );
};

export { SwitchDocs };
