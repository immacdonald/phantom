import type { FC } from 'react';
import { Callout } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const CalloutDocs: FC = () => {
    const parsedDocs = getComponentDoc('Callout')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Callout context="positive">Positive callout.</Callout>
            <Callout context="info">Info callout.</Callout>
            <Callout context="critical">Critical callout.</Callout>
            <Callout context="warning">Warning callout.</Callout>
        </ComponentDocs>
    );
};

export { CalloutDocs };
