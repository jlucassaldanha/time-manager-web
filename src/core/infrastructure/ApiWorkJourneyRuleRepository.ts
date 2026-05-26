import { WorkJourneyResponse, WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { IWorkJourneyRuleRepository } from "@/core/domain/interfaces/IWorkJourneyRuleRepository";
import { HttpClient } from "./HttpClient";

export class ApiWorkJourneyRuleRepository implements IWorkJourneyRuleRepository {
  constructor(private readonly http: HttpClient) {}

  async get(): Promise<WorkJourneyResponse> {
    return await this.http.get<WorkJourneyResponse>(`/api/workjourneyrule`)
  }

  async create(rule: WorkJourneyRule): Promise<void> {
    await this.http.post("/api/workjourneyrule/create", rule);
  }

  async update(rule: WorkJourneyRule): Promise<void> {
    await this.http.post("/api/workjourneyrule/update", rule);
  }
}
