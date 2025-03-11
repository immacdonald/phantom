import type { ComponentDocumentation, PropertyDocumentation } from '@types';
import { FC, Fragment, ReactNode } from 'react';
import { Column, designTokens, Divider, Heading, Row, Section, Typography } from 'phantom-library';
import styles from './Docs.module.scss';

interface ComponentDocsProps extends Omit<ComponentDocumentation, 'examples'> {
    children?: ReactNode;
}

const ComponentDocs: FC<ComponentDocsProps> = ({ name, about, importStatement, properties, children }) => {
    return (
        <>
            <Section>
                <Column gap={designTokens.space.md} align="start">
                    <Heading size="major">{name}</Heading>
                    <Typography.Paragraph>{about}</Typography.Paragraph>
                    <Row align="start" gap={designTokens.space.md}>
                        <pre>
                            <code>{importStatement || `import { ${name}} } from 'phantom-library'`}</code>
                        </pre>
                    </Row>
                </Column>
                <Divider />
                {children && (
                    <>
                        <Heading size="minor">Live Demo</Heading>
                        <Column gap={designTokens.space.md} align="center" className={styles.examples}>
                            {children}
                        </Column>
                    </>
                )}
            </Section>
            <Section>
                <Heading size="minor">{name} Props</Heading>
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
                                    <td>{property.property}</td>
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
