import type { FC } from 'react';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const SplitDocs: FC = () => {
    const parsedDocs = getComponentDoc('Split')!;

    return <ComponentDocs {...parsedDocs} deprecated />;
};

export { SplitDocs };
