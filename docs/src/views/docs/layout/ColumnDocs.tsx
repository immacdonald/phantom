import type { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const ColumnDocs: FC = () => {
    const parsedDocs = getComponentDoc('Column')!;

    return <ComponentDocs {...parsedDocs} />;
};

export { ColumnDocs };
