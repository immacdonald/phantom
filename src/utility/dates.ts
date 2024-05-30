// Formats a date as Month DD, YYYY with optional HH:MM:SS AM/PM
export const formatReadableDate = (input: Date | string | number, time: boolean = false): string => {
	const date = new Date(input);

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date input');
	}

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...(time && { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
	});
};

// Formats a date as YYYY-MM-DD
export const formatNumericDate = (input: Date | string | number): string => {
	const date = new Date(input);

	return date.toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
}
