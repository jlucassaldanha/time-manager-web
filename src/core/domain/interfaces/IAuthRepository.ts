import { AuthRequest } from "../entities/Auth"

export interface IAuthRepository {
	register(request: AuthRequest): Promise<void>
	login(request: AuthRequest): Promise<string>
}