import type { ComponentDocumentation, PropertyDocumentation } from '@types';
import { FC, Fragment, ReactNode } from 'react';
import { Column, tokens, Divider, Heading, Row, Section, Typography, StyledLink, GitHubIcon } from 'phantom-library';
import styles from './Docs.module.scss';

interface MultiComponentDocsProps {
    name: string;
    about: string;
    importStatement?: string;
    source: string;
    components: Omit<ComponentDocumentation, 'examples'>[];
    children?: ReactNode;
}

const MultiComponentDocs: FC<MultiComponentDocsProps> = ({ name, about, importStatement, source, components, children }) => {
    const formattedSource = source.split('src/')[1];
    const sourceURL = `https://github.com/immacdonald/phantom/tree/main/${source}`;

    return (
        <>
            <Section>
                <Column gap={tokens.space.md} align="start">
                    <Heading size="major">{name}</Heading>
                    <Typography.Paragraph>{about}</Typography.Paragraph>
                    <Row align="start" gap={tokens.space.md}>
                        <Typography.Text soft>Import </Typography.Text>
                        <pre>
                            <code>{importStatement || `import { ${name}} } from 'phantom-library'`}</code>
                        </pre>
                    </Row>
                    <Row align="start" gap={tokens.space.md}>
                        <Typography.Text soft>Source </Typography.Text>
                        <Typography.Text>
                            <StyledLink to={sourceURL} inherit external>
                                {formattedSource} <GitHubIcon />
                            </StyledLink>
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
            </Section>
            {components.map((component, index) => (
                <Section>
                    <Column gap={tokens.space.md} align="start">
                        <Heading subheading={`${name}.${component.name}`}>{component.name}</Heading>
                        <Typography.Paragraph>{component.about}</Typography.Paragraph>
                    </Column>
                    <Divider />
                    <Heading size="minor">
                        {name}.{component.name} Props
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
                            {component.properties.map((property: PropertyDocumentation) => {
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
                    {index < components.length - 1 && <Divider />}
                </Section>
            ))}
        </>
    );
};

export { MultiComponentDocs };
