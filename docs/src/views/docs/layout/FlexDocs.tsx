import type { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const FlexDocs: FC = () => {
    const parsedDocs = getComponentDoc('Flex')!;

    return <ComponentDocs {...parsedDocs} />;
};

export { FlexDocs };
