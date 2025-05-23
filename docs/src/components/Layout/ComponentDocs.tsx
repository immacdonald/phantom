import type { ComponentDocumentation, PropertyDocumentation } from '@types';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { Callout, Column, tokens, Divider, Heading, Row, Section, Typography, GitHubIcon, UnstyledLink } from 'phantom-library';
import styles from './Docs.module.scss';

interface ComponentDocsProps extends Omit<ComponentDocumentation, 'examples'> {
    deprecated?: boolean;
    unstable?: boolean;
    children?: ReactNode;
}

const ComponentDocs: FC<ComponentDocsProps> = ({ name, about, importStatement, source, properties, deprecated, unstable, children }) => {
    const formattedSource = source.slice(0, source.lastIndexOf('/')).split('src/')[1];
    const sourceURL = `https://github.com/immacdonald/phantom/tree/main/${source.replace(/^(\.\.\/)+/, '')}`;

    return (
        <>
            <Section>
                {deprecated && (
                    <Callout context="warning">
                        <Typography.Text>This component is deprecated and will be removed in a future version.</Typography.Text>
                    </Callout>
                )}
                {unstable && (
                    <Callout context="info">
                        <Typography.Text>This component is undergoing major revisions and is subject to change.</Typography.Text>
                    </Callout>
                )}
                <Column gap={tokens.space.md} align="start">
                    <Heading size="major">{name}</Heading>
                    <Typography.Paragraph>{about}</Typography.Paragraph>
                    <Row align="start" gap={tokens.space.md}>
                        <Typography.Text soft>Import </Typography.Text>
                        <code>{importStatement || `import { ${name}} } from 'phantom-library'`}</code>
                    </Row>
                    <Row align="start" gap={tokens.space.md}>
                        <Typography.Text soft>Source </Typography.Text>
                        <Typography.Text>
                            <UnstyledLink to={sourceURL} external>
                                <code>{formattedSource}</code> <GitHubIcon />
                            </UnstyledLink>
                        </Typography.Text>
                    </Row>
                </Column>
                <Divider />
                {children && (
                    <>
                        <Heading size="minor">Live Demo</Heading>
                        <Column gap={tokens.space.md} align="center" className={styles.examples}>
                            {children}
                        </Column>
                    </>
                )}
                <Heading size="minor" style={{ marginTop: tokens.space.layout.sm }}>
                    {name} Props
                </Heading>
                <table className={styles.properties}>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Description</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property: PropertyDocumentation) => {
                            return (
                                <tr key={property.property}>
                                    <td>
                                        {property.property}
                                        {property.required && <span style={{ color: tokens.color.critical }}>*</span>}
                                    </td>
                                    <td>{property.description}</td>
                                    <td>
                                        {typeof property.type == 'string' ? (
                                            <code>{property.type}</code>
                                        ) : (
                                            property.type.map((value: string, index: number) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <code>{value}</code>
                                                        {index < property.type.length - 1 ? ' | ' : null}
                                                    </Fragment>
                                                );
                                            })
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Section>
        </>
    );
};

export { ComponentDocs };
