import { ReactNode } from 'react';

type PropertyDocumentation = {
    property: string;
    description: string;
    type: string | string[];
    default?: string;
};

interface ComponentDocumentation {
    name: string;
    about: ReactNode;
    importStatement?: string;
    examples: ReactNode;
    properties: PropertyDocumentation[];
}

export type { PropertyDocumentation, ComponentDocumentation };
