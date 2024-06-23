export const capitalizeFirstLetter = (str: string | null): string | null => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : null;
};
