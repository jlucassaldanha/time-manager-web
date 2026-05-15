import { CreateTimeRecord } from "@/core/domain/entities/TimeRecord";
import { ITimeRecordRepository } from "@/core/domain/interfaces/ITimeRecordRepository";

export class CreateManualPunchUseCase {
  constructor(private readonly timeRecordRepository: ITimeRecordRepository) {}

  async execute(record: CreateTimeRecord): Promise<void> {
    return await this.timeRecordRepository.manual(record);
  }
}
