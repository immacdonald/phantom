import { FC } from 'react';
import { Accordion, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const AccordionDocs: FC = () => {
    const parsedDocs = getComponentDoc('Accordion')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Accordion label="Example Accordion">
                <Typography.Paragraph>An accordion can contain any text or other elements inside of it.</Typography.Paragraph>
            </Accordion>
            <Accordion label="Borderless Accordion" defaultState={true} borderless>
                <Typography.Paragraph>An accordion with a default open state and no border.</Typography.Paragraph>
            </Accordion>
        </ComponentDocs>
    );
};

export { AccordionDocs };
