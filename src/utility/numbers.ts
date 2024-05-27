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

export const formatNumber = (input: number): string => {
    return input.toLocaleString();
};
