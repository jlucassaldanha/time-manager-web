export type AllowanceDto = {
	id: string
	date?: Date
	duration: string
	justification: string
}

export type CreateAllowanceRequest = {
	date: string
	duration: string
	justification: string
}

export type UpdateAllowanceRequest = {
	id: string
	date: string
	duration: string
	justification: string
	auditJustification: string
}

export type DeleteAllowanceRequest = {
	id: string
	auditJustification: string
}

export type GetAllowanceRequest = {
	date: string
}