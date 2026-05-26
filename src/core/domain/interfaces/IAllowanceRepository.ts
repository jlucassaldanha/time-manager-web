import { AllowanceDto, CreateAllowanceRequest, DeleteAllowanceRequest, UpdateAllowanceRequest } from "../entities/Allowance"

export interface IAllowanceRepository {
	get(date: Date): Promise<AllowanceDto | null>
	create(allowance: CreateAllowanceRequest): Promise<void>
	update(allowance: UpdateAllowanceRequest): Promise<void>
	delete(allowance: DeleteAllowanceRequest): Promise<void>
}