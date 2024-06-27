const getKeyByValue = (object: Record<string, unknown>, value: unknown): string | undefined => {
    return Object.keys(object).find((key) => object[key] === value);
};

const sumArray = <T>(array: T[], property?: keyof T, from?: number, to?: number): number => {
    if (array.length === 0) {
        return 0;
    }

    if (!property) {
        return array.slice(from ?? 0, to ?? array.length).reduce((sum: number, item: T) => sum + (item as unknown as number), 0);
    } else {
        return array.slice(from ?? 0, to ?? array.length).reduce((sum: number, item: T) => {
            const value = item[property];
            if (typeof value === 'number') {
                return sum + value;
            } else {
                return sum;
            }
        }, 0);
    }
};

const range = (range: number) => [...Array(range).keys()];

export { getKeyByValue, range, sumArray };
