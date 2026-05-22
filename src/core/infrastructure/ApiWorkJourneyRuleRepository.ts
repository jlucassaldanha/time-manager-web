import { WorkJourneyResponse, WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { IWorkJourneyRuleRepository } from "@/core/domain/interfaces/IWorkJourneyRuleRepository";

export class ApiWorkJourneyRuleRepository implements IWorkJourneyRuleRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async get(): Promise<WorkJourneyResponse> {
    const response = await fetch(`${this.baseUrl}/api/workjourneyrule`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }

    return response.json()
  }

  async create(rule: WorkJourneyRule): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/workjourneyrule/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }

  async update(rule: WorkJourneyRule): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/workjourneyrule/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }
}
