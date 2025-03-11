import { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const SectionDocs: FC = () => {
    const parsedDocs = getComponentDoc('Section')!;

    return <ComponentDocs {...parsedDocs} />;
};

export { SectionDocs };
