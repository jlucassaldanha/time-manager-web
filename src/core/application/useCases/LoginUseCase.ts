import { AuthRequest } from "@/core/domain/entities/Auth";
import { IAuthRepository } from "@/core/domain/interfaces/IAuthRepository";

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(request: AuthRequest): Promise<string> {
    if (!request.email || !request.email.includes("@")) {
      throw new Error("Formato de e-mail inválido.");
    }

    if (!request.password || request.password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }

    const token = await this.authRepository.login(request);

    return token;
  }
}