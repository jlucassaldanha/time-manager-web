export default function parseBrDateToIsoWithOffset(dateBr: string, time: string): string {
	if (!dateBr || !time) {
		throw new Error("Data e hora são obrigatorios")
	}

	const parts = dateBr.split("/")

	if (parts.length !== 3) {
		throw new Error("Formato de data invalido")
	}

	const day = parts[0]
	const month = parts[1]
	const year = parts[2]

	return `${year}-${month}-${day}T${time}:00-03:00`
}