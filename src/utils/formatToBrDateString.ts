export function formatToBrDateString(date: Date): string {
	const dateString = date.toString()

	const parts = dateString.split('-')

	const year = parts[0]
	const month = parts[1]
	const day = parts[2]

	return `${day}/${month}/${year}`
}