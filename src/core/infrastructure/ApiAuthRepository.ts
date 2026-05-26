import { AuthRequest } from "../domain/entities/Auth";
import { IAuthRepository } from "../domain/interfaces/IAuthRepository";
import { HttpClient } from "./HttpClient";

export class ApiAuthRepository implements IAuthRepository {
  constructor(private readonly http: HttpClient) {}

  async register(request: AuthRequest): Promise<void> {
    await this.http.post("/api/auth/register", request);
  }

  async login(request: AuthRequest): Promise<string> {
    const response = await this.http.post<{ token: string }>(
      "/api/auth/login",
      request,
    );

    return response.token;
  }
}
