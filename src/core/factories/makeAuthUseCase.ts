import { HttpClient } from "@/core/infrastructure/HttpClient";
import { ApiAuthRepository } from "@/core/infrastructure/ApiAuthRepository";
import { LoginUseCase } from "@/core/application/useCases/LoginUseCase";
import { RegisterUseCase } from "@/core/application/useCases/RegisterUseCase";

export function makeLoginUseCase() {
  const httpClient = new HttpClient();
  const authRepo = new ApiAuthRepository(httpClient);
  return new LoginUseCase(authRepo);
}

export function makeRegisterUseCase() {
  const httpClient = new HttpClient();
  const authRepo = new ApiAuthRepository(httpClient);
  return new RegisterUseCase(authRepo);
}