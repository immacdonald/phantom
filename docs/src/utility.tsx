import type { ComponentDocumentation, PropertyDocumentation } from '@types';
import { docs } from './data';

const getComponentDoc = (component: string): ComponentDocumentation | null => {
    const componentData = Object.values(docs).find((doc) => doc[0].displayName == component);
    return parseComponentDocs(componentData);
};

const parseComponentDocs = (componentData: any): ComponentDocumentation | null => {
    if (!componentData || componentData.length === 0) return null;

    const component = componentData[0]; // Assuming each file contains only one component
    const { displayName, description, source, props } = component;

    const formatType = (tsType: any): string => {
        if (!tsType) return 'unknown';

        // If it's a union type
        if (tsType.elements && tsType.elements.length > 1) {
            return tsType.elements.map(formatType).join(' | ');
        }

        // If raw type is available, prefer that
        if (tsType.raw) {
            let propType: string = tsType.raw;
            // Special cases for complex components and types
            propType = propType.replace('ComponentType<IconProps>', 'Icon');

            return propType;
        }

        if (tsType.name == 'literal') {
            return tsType.value;
        }

        return tsType.name;
    };

    const properties: PropertyDocumentation[] = Object.entries(props || {}).map(([propName, propDetails]: any) => {
        return {
            property: propName,
            description: propDetails.description,
            type: formatType(propDetails.tsType),
            required: propDetails.required,
            default: propDetails.defaultValue ? propDetails.defaultValue.value : undefined
        };
    });

    return {
        name: displayName,
        about: description,
        importStatement: `import { ${displayName} } from 'phantom-library'`,
        source: source,
        examples: null,
        properties
    };
};

export { getComponentDoc, parseComponentDocs };
