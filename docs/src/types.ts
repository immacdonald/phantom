import type { ReactNode } from 'react';

type PropertyDocumentation = {
    property: string;
    description: string;
    type: string | string[];
    required: boolean;
    default?: string;
};

interface ComponentDocumentation {
    name: string;
    about: ReactNode;
    importStatement?: string;
    source: string;
    examples: ReactNode;
    properties: PropertyDocumentation[];
}

export type { PropertyDocumentation, ComponentDocumentation };
