// Parsers for serialization
export const parseBool = (input: string | null, defaultValue: boolean = false): boolean => {
    if (input == null) {
        return defaultValue;
    }

    return input === 'true';
};

export const parseNullableString = (input: string | null, allowEmpty = false): string | null => {
    if (input == null || input === 'null' || (!allowEmpty && input == '')) {
        return null;
    }

    return input;
};

export const parseNullableObject = <T>(input: string | null): T | null => {
    if (input == null) {
        return null;
    }

    return JSON.parse(input);
};

const isNumeric = (value: string | null): boolean => {
    return !isNaN(Number(value));
};

export const parsePrimitive = (input: string | null): boolean | number | string | null => {
    if (input == 'true' || input == 'false') {
        return parseBool(input);
    } else if (isNumeric(input)) {
        return Number(input);
    } else {
        return parseNullableString(input);
    }
};
