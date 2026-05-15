import { UpdateTimeRecord } from "@/core/domain/entities/TimeRecord";
import { ITimeRecordRepository } from "@/core/domain/interfaces/ITimeRecordRepository";

export class UpdatePunchUseCase {
  constructor(private readonly timeRecordRepository: ITimeRecordRepository) {}

  async execute(record: UpdateTimeRecord): Promise<void> {
    return await this.timeRecordRepository.update(record);
  }
}
