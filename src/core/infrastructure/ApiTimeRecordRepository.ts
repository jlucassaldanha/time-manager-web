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
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }

  async manual(record: CreateTimeRecord): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/timepunch/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }

  async update(record: UpdateTimeRecord): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/timepunch/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }

  async delete(record: DeleteTimeRecord): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/timepunch/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }
}
