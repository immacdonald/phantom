import type { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const PageDocs: FC = () => {
    const parsedDocs = getComponentDoc('Page')!;

    return <ComponentDocs {...parsedDocs} deprecated />;
};

export { PageDocs };
