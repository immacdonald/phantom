import type { FC } from 'react';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const StyledAppDocs: FC = () => {
    const parsedDocs = getComponentDoc('StyledApp')!;

    return <ComponentDocs {...parsedDocs} />;
};

export { StyledAppDocs };
