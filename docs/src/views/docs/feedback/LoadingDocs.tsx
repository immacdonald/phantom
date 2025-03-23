import type { FC } from 'react';
import { getComponentDoc } from '@utility';
import { ComponentDocs } from '../../../components/Layout/ComponentDocs';

const LoadingDocs: FC = () => {
    const parsedDocs = getComponentDoc('Loading')!;

    return <ComponentDocs {...parsedDocs} unstable />;
};

export { LoadingDocs };
