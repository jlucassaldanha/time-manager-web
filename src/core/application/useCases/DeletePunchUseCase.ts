import { DeleteTimeRecord } from "@/core/domain/entities/TimeRecord";
import { ITimeRecordRepository } from "@/core/domain/interfaces/ITimeRecordRepository";

export class DeletePunchUseCase {
  constructor(private readonly timeRecordRepository: ITimeRecordRepository) {}

  async execute(record: DeleteTimeRecord): Promise<void> {
	return await this.timeRecordRepository.delete(record);
  }
}
