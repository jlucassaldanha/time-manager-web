import { ITimeRecordRepository } from "@/core/domain/interfaces/ITimeRecordRepository";

export class CreateRealtimePunchUseCase {
  constructor(private readonly timeRecordRepository: ITimeRecordRepository) {}

  async execute(): Promise<void> {
    return await this.timeRecordRepository.realtime();
  }
}
