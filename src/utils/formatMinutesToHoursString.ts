export function formatMinutesToHoursString(totalMinutes: number): string {
	if (isNaN(totalMinutes)) return "00:00"

	const isNegative = totalMinutes < 0
	const absMinutes = Math.abs(totalMinutes)

	const hours = Math.floor(absMinutes / 60)
	const minutes = absMinutes % 60

	const sign = isNegative ? "-" : ""

	const paddedHours = hours.toString().padStart(2, '0')
	const paddedMinutes = minutes.toString().padStart(2, '0')

	return `${sign}${paddedHours}:${paddedMinutes}`
}