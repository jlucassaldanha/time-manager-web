import {
  CreateTimeRecord,
  DeleteTimeRecord,
  UpdateTimeRecord,
} from "@/core/domain/entities/TimeRecord";
import { ITimeRecordRepository } from "@/core/domain/interfaces/ITimeRecordRepository";

export class ApiTimeRecordRepository implements ITimeRecordRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async realtime(): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/timepunch/realtime`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar ponto.");
    }
  }

  async manual(record: CreateTimeRecord): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/timepunch/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar ponto.");
    }
  }

  async update(record: UpdateTimeRecord): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/workjourneyrule/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar ponto.");
    }
  }

  async delete(record: DeleteTimeRecord): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/workjourneyrule/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error("Falha ao registrar ponto.");
    }
  }
}
