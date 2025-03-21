import { FC } from 'react';
import { Heading, Section, StyledImage, StyledLink, Typography } from 'phantom-library';
import { Layout } from '@components/Layout/Layout';
import { PhantomBanner } from '@assets';

const Home: FC = () => {
    return (
        <Layout>
            <Section>
                <Heading size="major" subheadingSize="regular" subheading="Documentation & Examples">
                    Phantom
                </Heading>
                <StyledImage image={PhantomBanner} alt='Phantom Library banner.' />
                <Typography.Paragraph>
                    Phantom is a modern, flexible, and accessible component library designed to streamline UI development for scalable applications. Built with consistency, responsiveness, and
                    customization in mind, this library provides a robust set of components that help developers create intuitive and visually appealing interfaces with ease.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    The library includes a diverse collection of UI elements, from essential building blocks like <StyledLink to="/components/typography">typography</StyledLink> and{' '}
                    <StyledLink to="/components/button">buttons</StyledLink>, to more advanced components like <StyledLink to="/components/modal">modals</StyledLink> and{' '}
                    <StyledLink to="/components/segmented">segmented controls</StyledLink>. Flex-based layout elements allow for precise control over page structure, while structural components like{' '}
                    <StyledLink to="/components/section">sections</StyledLink> provide a foundation for consistent application design. Every component supports custom themes, ARIA best practices, and
                    responsive behaviors to ensure seamless integration into any modern project.
                </Typography.Paragraph>
                <Typography.Paragraph>
                    Explore the documentation to find detailed component guides, interactive examples, and best practices for implementing our library effectively. Each page includes code snippets,
                    prop references, and accessibility considerations to help you build UI components that are both user-friendly and developer-friendly. Get started today and experience the power of
                    a scalable, thoughtfully designed component system.
                </Typography.Paragraph>
            </Section>
        </Layout>
    );
};

export { Home };
