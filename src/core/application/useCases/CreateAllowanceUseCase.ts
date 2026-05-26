import { CreateAllowanceRequest } from "@/core/domain/entities/Allowance";
import { IAllowanceRepository } from "@/core/domain/interfaces/IAllowanceRepository";

export class CreateAllowanceUseCase {
  constructor(private readonly allowanceRepository: IAllowanceRepository) {}

  async execute(allowance: CreateAllowanceRequest): Promise<void> {
	return await this.allowanceRepository.create(allowance);
  }
}
