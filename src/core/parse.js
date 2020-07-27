export function parse(value = '') {
	if (value.startsWith('=')) {
		['+', '-', '/', '*'].includes(value.slice(-1)) ? value = value.slice(0, -1) : value;
		try {
			return eval(value.slice(1));
		} catch (e) {
			console.warn('Skipping parse error', e.message);
		}
	}
	return value;
}