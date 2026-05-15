import { RecordType } from "./TimeRecord";

export type PeriodSummaryRequest = {
	startDate: string;
	endDate: string;
}

export type PunchDto = {
	id: string;
	timestamp: Date;
	type: RecordType;
}

export type DailySummaryResponse = {
	date: Date;
	workedMinutes: number;
	allowedMinutes: number;
	totalMinutes: number;
	dailyGoalMinutes: number;
	balanceMinutes: number;
	punches: PunchDto[]
}

export type PeriodSummaryResponse = {
	startDate: Date;
	endDate: Date;
	totalAllowedMinutes: number;
	totalWorkedMinutes: number;
	totalMinutes: number;
	goalMinutes: number;
	balanceMinutes: number;
	days: DailySummaryResponse[]
}