export function formatDateToTimeString(date: Date): string {
	const dateString = date.toString()

	const timePart = dateString.split('T')[1]

	return timePart.slice(0, 5)
}