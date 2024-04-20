import React from 'react';

export const validateElement = (type: string, element?: React.ReactElement<unknown>, required: boolean = false): void => {
    if (required && !element) {
        console.warn(`Required element ${type} not found`);
    } else if (element && React.isValidElement(element) && element.type != type) {
        console.warn(`Invalid ${type} of type ${element.type}`);
    }
};

export const ordinalSuffix = (input: number | string): string => {
    input = input.toString();
    if (input.endsWith('11') || input.endsWith('12') || input.endsWith('13')) {
        return 'th';
    } else if (input.endsWith('1')) {
        return 'st';
    } else if (input.endsWith('2')) {
        return 'nd';
    } else if (input.endsWith('3')) {
        return 'rd';
    } else {
        return 'th';
    }
};

export * from './fetch';
export * from './parse';
