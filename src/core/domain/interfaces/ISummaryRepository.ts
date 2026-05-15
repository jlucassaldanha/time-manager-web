import { DailySummaryResponse, PeriodSummaryRequest, PeriodSummaryResponse } from "../entities/Summary"

export interface ISummaryRepository {
	getDaily(date: Date): Promise<DailySummaryResponse>
	getPeriod(request: PeriodSummaryRequest): Promise<PeriodSummaryResponse>
}