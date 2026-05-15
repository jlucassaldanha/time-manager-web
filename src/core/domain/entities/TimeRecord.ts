export type RecordType = "Entry" | "Exit"

export type CreateTimeRecord = {
	datetime: Date
	type: RecordType
	note?: string
}

export type UpdateTimeRecord = {
	recordId: string
	dateTime: Date
	type: RecordType
	note?: string
}

export type DeleteTimeRecord = {
	recordId: string
	justification: string
}