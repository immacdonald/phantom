const ordinalSuffix = (input: number | string): string => {
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

const formatNumber = (input: number): string => {
    return input.toLocaleString();
};

const decimalPlaces = (value: number, places: number = 2): number => {
    if (value == null) {
        return 0;
    }
    const rounded = +value.toFixed(places);
    return rounded;
};

const formatLargeValue = (value: number): string => {
    // Trillions
    if (value >= 1e12) {
        return (value / 1e12).toFixed(2) + 'T';
    }
    // Billions
    else if (value >= 1e9) {
        return (value / 1e9).toFixed(2) + 'B';
    }
    // Millions
    else if (value >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M';
    }
    // Thousands
    else if (value >= 1e3) {
        return (value / 1e3).toFixed(2) + 'K';
    }
    // Less than 1,000
    else {
        return value.toFixed(2);
    }
};

export { decimalPlaces, formatLargeValue, formatNumber, ordinalSuffix }