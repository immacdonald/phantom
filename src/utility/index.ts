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

export const capitalizeFirstLetter = (str: string | null): string | null => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : null;
};

// Creates a file object from the public/static folder
export const getStaticFile = async (file: string, folder: string = '/static') => {
	const response = await fetch(`${folder}/${file}`);
	const data = await response.blob();
	// Convert Blob to File object
	const fileObj = new File([data], file, { type: 'application/json' });
	return fileObj;
};

export * from './fetch';
export * from './numbers';
export * from './parse';
export * from './dates';