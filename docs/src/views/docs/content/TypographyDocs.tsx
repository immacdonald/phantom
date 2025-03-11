import { FC } from 'react';
import { Typography } from 'phantom-library';
import { MultiComponentDocs } from '@components/Layout';
import { getComponentDoc } from '@utility';

const TypographyDocs: FC = () => {
    const textDocs = getComponentDoc('Text')!;
    const paragraphDocs = getComponentDoc('Paragraph')!;

    return (
        <MultiComponentDocs name="Typography" about="Typography component collection designed for consistent text rendering across the application." components={[textDocs, paragraphDocs]}>
            <Typography.Text size="md">This is medium text aligned to the left.</Typography.Text>
            <Typography.Text size="lg" soft>
                This is large text with soft styling.
            </Typography.Text>
            <Typography.Text size="xl">This is extra-large text.</Typography.Text>
            <Typography.Paragraph>This is a paragraph, which has more space between each line to make longer bodies of text easier and more comfortable to read..</Typography.Paragraph>
        </MultiComponentDocs>
    );
};

export { TypographyDocs };
