import type { FC } from 'react';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const StyledFooterDocs: FC = () => {
    const parsedDocs = getComponentDoc('StyledFooter')!;

    return <ComponentDocs {...parsedDocs} />;
};

export { StyledFooterDocs };
