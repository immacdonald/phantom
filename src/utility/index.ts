import React from 'react';

export const validateElement = (type: string, element?: React.ReactElement<unknown>, required: boolean = false): void => {
    if (required && !element) {
        console.warn(`Required element ${type} not found`);
    } else if (element && React.isValidElement(element) && element.type != type) {
        console.warn(`Invalid ${type} of type ${element.type}`);
    }
};

export const getKeyByValue = (object: Record<string, unknown>, value: unknown): string | undefined => {
    return Object.keys(object).find((key) => object[key] === value);
};

export * from './fetch';
export * from './numbers';
export * from './parse';
