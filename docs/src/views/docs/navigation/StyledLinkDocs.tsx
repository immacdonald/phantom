import type { FC } from 'react';
import { StyledLink, Typography } from 'phantom-library';
import { ComponentDocs } from '@components/Layout/ComponentDocs';
import { getComponentDoc } from '@utility';

const StyledLinkDocs: FC = () => {
    const parsedDocs = getComponentDoc('StyledLink')!;

    return (
        <ComponentDocs {...parsedDocs}>
            <Typography.Paragraph>
                This is a <StyledLink to="/">styled link</StyledLink> with some text.
            </Typography.Paragraph>
            <Typography.Paragraph>
                While this is a{' '}
                <StyledLink to="https://www.example.com" external visual={null} hover="color">
                    {' '}
                    link to an external site{' '}
                </StyledLink>{' '}
                with just a hover effect.
            </Typography.Paragraph>
        </ComponentDocs>
    );
};

export { StyledLinkDocs };
