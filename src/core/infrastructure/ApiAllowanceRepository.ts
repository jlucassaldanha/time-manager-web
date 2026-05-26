import { IAllowanceRepository } from "../domain/interfaces/IAllowanceRepository";
import { AllowanceDto, CreateAllowanceRequest, DeleteAllowanceRequest, UpdateAllowanceRequest } from "../domain/entities/Allowance";
import { HttpClient } from "./HttpClient";

export class ApiAllowanceRepository implements IAllowanceRepository {
  constructor(private readonly http: HttpClient) {}

  async get(date: Date): Promise<AllowanceDto | null> {
    try {
      return await this.http.get<AllowanceDto>(`/api/allowance?date=${date}`)
    } catch (_) {
      return null
    }
  }

  async create(allowance: CreateAllowanceRequest): Promise<void> {
    await this.http.post("/api/allowance/create", allowance);
  }

  async update(allowance: UpdateAllowanceRequest): Promise<void> {
    await this.http.post("/api/allowance/update", allowance);
  }

  async delete(allowance: DeleteAllowanceRequest): Promise<void> {
    await this.http.post("/api/allowance/delete", allowance);
  }
}
