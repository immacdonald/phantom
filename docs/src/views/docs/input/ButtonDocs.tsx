import type { ButtonStyle, VisualContext } from 'phantom-library';
import type { PropertyDocumentation } from '@types';
import type { FC } from 'react';
import { Button, capitalizeFirstLetter, tokens, LinkIcon, Row } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

// Manually created due to react-docgen not parsing the complex ButtonProps correctly
const buttonProperties: PropertyDocumentation[] = [
    {
        property: 'type',
        description: 'Specifies the button type, determining default styles.',
        type: ["'primary'", "'default'", "'text'"],
        default: "'default'",
        required: false
    },
    {
        property: 'size',
        description: 'Defines the button size.',
        type: ["'regular'", "'small'", "'large'"],
        required: false
    },
    {
        property: 'full',
        description: 'Expands the button to full width.',
        type: 'boolean',
        required: false
    },
    {
        property: 'align',
        description: "Sets the button's content alignment.",
        type: 'FlexAlign',
        required: false
    },
    {
        property: 'variant',
        description: 'Specifies the visual style of the button.',
        type: ["'outline'", "'filled'", "'text'", "'ghost'"],
        required: false
    },
    {
        property: 'context',
        description: "Determines the button's color scheme based on context.",
        type: 'VisualContext',
        required: false
    },
    {
        property: 'rounded',
        description: 'Applies rounded styles to the button.',
        type: 'boolean',
        required: false
    },
    {
        property: 'Icon',
        description: 'An optional icon displayed inside the button.',
        type: 'Icon',
        required: false
    },
    {
        property: 'iconRight',
        description: 'Positions the icon to the right side of the button content.',
        type: 'boolean',
        required: false
    },
    {
        property: 'onHover',
        description: 'Handler for hover events.',
        type: 'MouseEventHandler<HTMLElement>',
        required: false
    },
    {
        property: 'disabled',
        description: 'Disables the button when set to `true`.',
        type: 'boolean',
        required: false
    },
    {
        property: 'isLoading',
        description: 'Displays a loading spinner inside the button.',
        type: 'boolean',
        required: false
    },
    {
        property: 'children',
        description: 'The content inside the button.',
        type: 'ReactNode',
        required: false
    },
    {
        property: 'link',
        description: 'The URL or route the button should navigate to (if applicable).',
        type: 'string',
        required: false
    },
    {
        property: 'htmlType',
        description: 'Defines the HTML `type` attribute for the button.',
        type: ["'button'", "'reset'", "'submit'"],
        required: false
    },
    {
        property: 'form',
        description: 'Associates the button with a form by its `id`.',
        type: 'string',
        required: false
    }
];

const ButtonDocs: FC = () => {
    const buttonStyles: ButtonStyle[] = ['filled', 'outline', 'text', 'ghost'];
    const contexts: (VisualContext | undefined)[] = [undefined, 'primary', 'positive', 'critical', 'info', 'warning'];

    const parsedDocs = { ...getComponentDoc('Button')!, properties: buttonProperties };

    return (
        <ComponentDocs {...parsedDocs}>
            {contexts.map((context) => {
                return (
                    <Row gap={tokens.space.md} verticalAlign="center" style={{ backgroundColor: 'var(--color-surface-background)', padding: tokens.space.sm }} key={context}>
                        {buttonStyles.map((buttonStyle) => (
                            <Button variant={buttonStyle} context={context} key={buttonStyle}>
                                {capitalizeFirstLetter(buttonStyle)} Button
                            </Button>
                        ))}
                        <Button context={context} Icon={LinkIcon}>
                            Icon Button
                        </Button>
                        <Button context={context} isLoading>
                            Loading Button
                        </Button>
                    </Row>
                );
            })}
        </ComponentDocs>
    );
};

export { ButtonDocs };
