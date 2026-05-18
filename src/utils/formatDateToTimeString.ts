export function formatDateToTimeString(dateInput: string | Date): string {
	if (!dateInput) return ""

	const validDate = new Date(dateInput)

	if (isNaN(validDate.getTime())) {
		console.warn("Data inválida para conversão de hora:", dateInput);
		return "";
	}

	return validDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
}