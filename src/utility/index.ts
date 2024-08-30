import { ReactElement, isValidElement } from 'react';

const validateElement = (type: string, element?: ReactElement<unknown>, required: boolean = false): void => {
    if (required && !element) {
        console.warn(`Required element ${type} not found`);
    } else if (element && isValidElement(element) && element.type != type) {
        console.warn(`Invalid ${type} of type ${element.type}`);
    }
};

const scrollToId = (id: string, offset: number = 128): void => {
    const element = document.getElementById(id);
    console.log(element?.offsetTop, element?.clientTop);
    window.scrollTo({
        top: element!.offsetTop + offset,
        behavior: 'smooth'
    });
};

export * from './arrays';
export * from './dates';
export * from './fetch';
export * from './numbers';
export * from './parse';
export * from './strings';

export { scrollToId, validateElement };
