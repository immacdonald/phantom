import { FC } from 'react';
import { HoverMark } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const HoverMarkDocs: FC = () => {
    const parsedDocs = getComponentDoc('HoverMark')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <HoverMark>Hover over me to highlight this text!</HoverMark>
        </ComponentDocs>
    );
};

export { HoverMarkDocs };
