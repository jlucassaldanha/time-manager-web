import { UpdateAllowanceRequest } from "@/core/domain/entities/Allowance";
import { IAllowanceRepository } from "@/core/domain/interfaces/IAllowanceRepository";

export class UpdateAllowanceUseCase {
  constructor(private readonly allowanceRepository: IAllowanceRepository) {}

  async execute(allowance: UpdateAllowanceRequest): Promise<void> {
	return await this.allowanceRepository.update(allowance);
  }
}
