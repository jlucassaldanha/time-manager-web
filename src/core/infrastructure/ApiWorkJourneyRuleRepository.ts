import { WorkJourneyResponse, WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { IWorkJourneyRuleRepository } from "@/core/domain/interfaces/IWorkJourneyRuleRepository";
import { HttpClient } from "./HttpClient";

export class ApiWorkJourneyRuleRepository implements IWorkJourneyRuleRepository {
  constructor(private readonly http: HttpClient) {}

  async get(): Promise<WorkJourneyResponse | null> {
    try {
      return await this.http.get<WorkJourneyResponse>(`/api/workjourneyrule`)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("Regra não encontrada") || errorMessage.includes("404")) {
        console.log("INFO: Regra não encontrada no banco. Convertendo para null.");
        return null; 
      }
      
      throw error;
    }
  }

  async create(rule: WorkJourneyRule): Promise<void> {
    await this.http.post("/api/workjourneyrule/create", rule);
  }

  async update(rule: WorkJourneyRule): Promise<void> {
    await this.http.post("/api/workjourneyrule/update", rule);
  }
}
