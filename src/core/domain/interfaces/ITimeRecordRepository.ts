import { CreateTimeRecord, DeleteTimeRecord, UpdateTimeRecord } from "../entities/TimeRecord"

export interface ITimeRecordRepository {
	realtime(): Promise<void>
	manual(record: CreateTimeRecord): Promise<void>
	update(record: UpdateTimeRecord): Promise<void>
	delete(record: DeleteTimeRecord): Promise<void>
}