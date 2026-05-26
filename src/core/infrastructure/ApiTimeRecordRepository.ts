import {
  CreateTimeRecord,
  DeleteTimeRecord,
  UpdateTimeRecord,
} from "@/core/domain/entities/TimeRecord";
import { ITimeRecordRepository } from "@/core/domain/interfaces/ITimeRecordRepository";
import { HttpClient } from "./HttpClient";

export class ApiTimeRecordRepository implements ITimeRecordRepository {
  constructor(private readonly http: HttpClient) {}

  async realtime(): Promise<void> {
    return await this.http.post(`/api/timepunch/realtime`)
  }

  async manual(record: CreateTimeRecord): Promise<void> {
    return await this.http.post(`/api/timepunch/manual`, record)
  }

  async update(record: UpdateTimeRecord): Promise<void> {
    return await this.http.post(`/api/timepunch/update`, record)
  }

  async delete(record: DeleteTimeRecord): Promise<void> {
    return await this.http.post(`/api/timepunch/delete`, record)
  }
}
