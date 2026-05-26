import {
  DailySummaryResponse,
  PeriodSummaryRequest,
  PeriodSummaryResponse,
} from "../domain/entities/Summary";
import { ISummaryRepository } from "../domain/interfaces/ISummaryRepository";
import { HttpClient } from "./HttpClient";

export class ApiSummaryRepository implements ISummaryRepository {
  constructor(private readonly http: HttpClient) {}

  async getDaily(date: Date): Promise<DailySummaryResponse | null> {
    try {
      return await this.http.get<DailySummaryResponse>(
        `/api/summary/daily?date=${date}`,
      );
    } catch (_) {
      return null;
    }
  }

  async getPeriod(
    request: PeriodSummaryRequest,
  ): Promise<PeriodSummaryResponse | null> {
    try {
      return await this.http.get<PeriodSummaryResponse>(
        `/api/summary/period?StartDate=${request.startDate}&EndDate=${request.endDate}`,
      );
    } catch (_) {
      return null;
    }
  }
}
