import { WorkJourneyResponse, WorkJourneyRule } from "../entities/WorkJourneyRule"


export interface IWorkJourneyRuleRepository {
	get(): Promise<WorkJourneyResponse>
	create(rule: WorkJourneyRule): Promise<void>
	update(rule: WorkJourneyRule): Promise<void>
}