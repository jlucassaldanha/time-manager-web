import { WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { IWorkJourneyRuleRepository } from "@/core/domain/interfaces/IWorkJourneyRuleRepository";

export class ApiWorkJourneyRuleRepository implements IWorkJourneyRuleRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async create(rule: WorkJourneyRule): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/workjourneyrule/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule),
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar regras.");
    }
  }

  async update(rule: WorkJourneyRule): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/workjourneyrule/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rule),
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar regras.");
    }
  }
}
