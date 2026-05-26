import { DeleteAllowanceRequest } from "@/core/domain/entities/Allowance";
import { IAllowanceRepository } from "@/core/domain/interfaces/IAllowanceRepository";

export class DeleteAllowanceUseCase {
  constructor(private readonly allowanceRepository: IAllowanceRepository) {}

  async execute(allowance: DeleteAllowanceRequest): Promise<void> {
	return await this.allowanceRepository.delete(allowance);
  }
}
