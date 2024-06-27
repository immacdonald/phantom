import React, { isValidElement } from 'react';

const validateElement = (type: string, element?: React.ReactElement<unknown>, required: boolean = false): void => {
    if (required && !element) {
        console.warn(`Required element ${type} not found`);
    } else if (element && isValidElement(element) && element.type != type) {
        console.warn(`Invalid ${type} of type ${element.type}`);
    }
};

export * from './arrays';
export * from './dates';
export * from './fetch';
export * from './numbers';
export * from './parse';
export * from './strings';

export { validateElement };
