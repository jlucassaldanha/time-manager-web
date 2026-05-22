import { DailySummaryResponse, PeriodSummaryRequest, PeriodSummaryResponse } from "../domain/entities/Summary";
import { ISummaryRepository } from "../domain/interfaces/ISummaryRepository";

export class ApiSummaryRepository implements ISummaryRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async getDaily(date: Date): Promise<DailySummaryResponse | null> {
    const response = await fetch(`${this.baseUrl}/api/summary/daily?date=${date}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 404) {
      console.log("Nenhum registro encontrado no banco. Retornando estado vazio.");
      return null; 
    }

    if (!response.ok) {
     const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }

    return await response.json()
  }

  async getPeriod(request: PeriodSummaryRequest): Promise<PeriodSummaryResponse | null> {
    const response = await fetch(`${this.baseUrl}/api/summary/period?StartDate=${request.startDate}&EndDate=${request.endDate}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 404) {
      console.log("Nenhum registro encontrado no banco. Retornando estado vazio.");
      return null; 
    }

    if (!response.ok) {
      const errorBody = await response.text(); 
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
    
    return await response.json()
  }
}
