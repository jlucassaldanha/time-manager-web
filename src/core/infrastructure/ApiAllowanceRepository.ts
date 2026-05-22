import { IAllowanceRepository } from "../domain/interfaces/IAllowanceRepository";
import { AllowanceDto, CreateAllowanceRequest, DeleteAllowanceRequest, UpdateAllowanceRequest } from "../domain/entities/Allowance";

export class ApiAllowanceRepository implements IAllowanceRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async get(date: Date): Promise<AllowanceDto | null> {
      const response = await fetch(`${this.baseUrl}/api/allowance?date=${date}`, {
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

  async create(allowance: CreateAllowanceRequest): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/allowance/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allowance),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }

  async update(allowance: UpdateAllowanceRequest): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/allowance/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allowance),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }

  async delete(allowance: DeleteAllowanceRequest): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/allowance/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(allowance),
    });

    if (!response.ok) {
      const errorBody = await response.text(); 
      
      console.error(`[Erro na API C#] Status: ${response.status} | Detalhes:`, errorBody);
      
      throw new Error(`Recusado pelo servidor (Status ${response.status}).`);
    }
  }
}
