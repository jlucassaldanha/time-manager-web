import { DailySummaryResponse, PeriodSummaryRequest, PeriodSummaryResponse } from "../domain/entities/Summary";
import { ISummaryRepository } from "../domain/interfaces/ISummaryRepository";

export class ApiSummaryRepository implements ISummaryRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async getDaily(date: Date): Promise<DailySummaryResponse> {
    const response = await fetch(`${this.baseUrl}/api/summary/daily?date=${date}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar regras.");
    }

    return await response.json()
  }

  async getPeriod(request: PeriodSummaryRequest): Promise<PeriodSummaryResponse> {
    const response = await fetch(`${this.baseUrl}/api/summary/period?StartDate=${request.startDate}&EndDate=${request.endDate}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar regras.");
    }
    
    return await response.json()
  }
}
