import { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const DynamicHeaderDocs: FC = () => {
    const parsedDocs = getComponentDoc('DynamicHeader')!;

    return <ComponentDocs {...parsedDocs} />;
};

export { DynamicHeaderDocs };
