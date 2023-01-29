import { addMinutes, isAfter, toDate } from 'date-fns';

export function addMinutesToDate() {
	const dateNow = new Date();
	return addMinutes(dateNow, 25);
}

export function isCodeExpired(isDataExpires) {
	try {
		const now = new Date();
		const expires = toDate(isDataExpires);
		console.log(now, ' ', expires);

		console.log(isAfter(now, expires));

		return isAfter(now, expires);
	} catch (e) {
		console.error({ Message: 'Data is expires', Error: e });
		return null;
	}
}
