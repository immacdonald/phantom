import type { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const RowDocs: FC = () => {
    const parsedDocs = getComponentDoc('Row')!;

    return <ComponentDocs {...parsedDocs} />;
};

export { RowDocs };
