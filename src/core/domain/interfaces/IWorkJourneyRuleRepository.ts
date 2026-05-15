import { WorkJourneyRule } from "../entities/WorkJourneyRule"


export interface IWorkJourneyRuleRepository {
	create(rule: WorkJourneyRule): Promise<void>
	update(rule: WorkJourneyRule): Promise<void>
}