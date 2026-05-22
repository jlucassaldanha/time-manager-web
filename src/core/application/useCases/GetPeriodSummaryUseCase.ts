import { PeriodSummaryRequest, PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { ISummaryRepository } from "@/core/domain/interfaces/ISummaryRepository";

export class GetPeriodSummaryUseCase {
  constructor(
	private readonly summaryRepository: ISummaryRepository,
  ) {}

  async execute(request: PeriodSummaryRequest): Promise<PeriodSummaryResponse | null> {
	return await this.summaryRepository.getPeriod(request);
  }
}
