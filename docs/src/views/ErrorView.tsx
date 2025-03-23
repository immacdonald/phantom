import type { FC } from 'react';
import { Heading, Section, Typography } from 'phantom-library';
import { Layout } from '@components/Layout/Layout';

const ErrorView: FC = () => {
    return (
        <Layout>
            <Section>
                <Heading size="major">Page Not Found</Heading>
                <Typography.Paragraph>Documentation for the Phantom Library is currently under construction and this page is not done yet. Please check back soon!</Typography.Paragraph>
            </Section>
        </Layout>
    );
};

export { ErrorView };
