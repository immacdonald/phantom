// Parsers for serialization
export const parseBool = (input: string | null, defaultValue: boolean = false): boolean => {
    if (input == null) {
        return defaultValue;
    }

    return input === 'true';
};

export const parseNullableString = (input: string | null): string | null => {
    if (input == null || input === 'null' || input == '') {
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
