import { PropertyDocumentation } from '@types';
import { FC } from 'react';
import { Button, ButtonStyle, capitalizeFirstLetter, designTokens, LinkIcon, Row, VisualContext } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

// Manually created due to react-docgen not parsing the complex ButtonProps correctly
const buttonProperties: PropertyDocumentation[] = [
    {
        property: 'type',
        description: 'Specifies the button type, determining default styles.',
        type: ["'primary'", "'default'", "'text'"],
        default: "'default'"
    },
    {
        property: 'size',
        description: 'Defines the button size.',
        type: ["'regular'", "'small'", "'large'"]
    },
    {
        property: 'full',
        description: 'Expands the button to full width.',
        type: 'boolean'
    },
    {
        property: 'align',
        description: "Sets the button's content alignment.",
        type: 'FlexAlign'
    },
    {
        property: 'variant',
        description: 'Specifies the visual style of the button.',
        type: ["'outline'", "'filled'", "'text'", "'ghost'"]
    },
    {
        property: 'context',
        description: "Determines the button's color scheme based on context.",
        type: 'VisualContext'
    },
    {
        property: 'rounded',
        description: 'Applies rounded styles to the button.',
        type: 'boolean'
    },
    {
        property: 'Icon',
        description: 'An optional icon displayed inside the button.',
        type: 'Icon'
    },
    {
        property: 'iconRight',
        description: 'Positions the icon to the right side of the button content.',
        type: 'boolean'
    },
    {
        property: 'onHover',
        description: 'Handler for hover events.',
        type: 'MouseEventHandler<HTMLElement>'
    },
    {
        property: 'disabled',
        description: 'Disables the button when set to `true`.',
        type: 'boolean'
    },
    {
        property: 'isLoading',
        description: 'Displays a loading spinner inside the button.',
        type: 'boolean'
    },
    {
        property: 'children',
        description: 'The content inside the button.',
        type: 'ReactNode'
    },
    {
        property: 'link',
        description: 'The URL or route the button should navigate to (if applicable).',
        type: 'string'
    },
    {
        property: 'htmlType',
        description: 'Defines the HTML `type` attribute for the button.',
        type: ["'button'", "'reset'", "'submit'"]
    },
    {
        property: 'form',
        description: 'Associates the button with a form by its `id`.',
        type: 'string'
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
                    <Row gap={designTokens.space.md} verticalAlign="center" style={{ backgroundColor: 'var(--color-surface-background)', padding: designTokens.space.sm }} key={context}>
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
