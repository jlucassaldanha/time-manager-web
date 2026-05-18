import { WorkJourneyResponse } from "@/core/domain/entities/WorkJourneyRule";
import { IWorkJourneyRuleRepository } from "@/core/domain/interfaces/IWorkJourneyRuleRepository";

export class GetWorkJourneyRuleUseCase {
  constructor(
	private readonly ruleRepository: IWorkJourneyRuleRepository,
  ) {}

  async execute(): Promise<WorkJourneyResponse> {
	return await this.ruleRepository.get();
  }
}
