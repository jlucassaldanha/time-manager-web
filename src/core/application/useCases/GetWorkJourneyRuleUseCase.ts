import { WorkJourneyResponse } from "@/core/domain/entities/WorkJourneyRule";
import { IWorkJourneyRuleRepository } from "@/core/domain/interfaces/IWorkJourneyRuleRepository";

export class GetWorkJourneyRuleUseCase {
  constructor(
	private readonly ruleRepository: IWorkJourneyRuleRepository,
  ) {}

  async execute(): Promise<WorkJourneyResponse | null> {
	return await this.ruleRepository.get();
  }
}
