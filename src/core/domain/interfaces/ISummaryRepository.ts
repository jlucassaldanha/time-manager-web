import { DailySummaryResponse, PeriodSummaryRequest, PeriodSummaryResponse } from "../entities/Summary"

export interface ISummaryRepository {
	getDaily(date: Date): Promise<DailySummaryResponse | null>
	getPeriod(request: PeriodSummaryRequest): Promise<PeriodSummaryResponse | null>
}