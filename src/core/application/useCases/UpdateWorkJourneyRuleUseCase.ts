import { WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { IWorkJourneyRuleRepository } from "@/core/domain/interfaces/IWorkJourneyRuleRepository";

export class UpdateWorkJourneyRuleUseCase {
  constructor(
    private readonly workJourneyRuleRepository: IWorkJourneyRuleRepository,
  ) {}

  async execute(rule: WorkJourneyRule): Promise<void> {
    return await this.workJourneyRuleRepository.update(rule);
  }
}
