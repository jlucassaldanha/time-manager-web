"use server"

import { LoginUseCase } from "@/core/application/useCases/LoginUseCase";
import { RegisterUseCase } from "@/core/application/useCases/RegisterUseCase";
import { AuthRequest } from "@/core/domain/entities/Auth";
import { ApiAuthRepository } from "@/core/infrastructure/ApiAuthRepository";
import { HttpClient } from "@/core/infrastructure/HttpClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(email: string, password: string) {
	const httpClient = new HttpClient()
	const authRepo = new ApiAuthRepository(httpClient)
	
	const loginUseCase = new LoginUseCase(authRepo)

	try {
		const token = await loginUseCase.execute({ email, password })

		const cookieStore = await cookies();

		cookieStore.set("jwt_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60 * 8,
			path: "/"
		})
	} catch (error) {
		console.log("Login não feito:", error)
		return { error: error instanceof Error ? error.message : "Erro interno no servidor." };
	}

	console.log("Login feito")
	redirect("/summary");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  
  cookieStore.delete("jwt_token");

  redirect("/login");
}


export async function registerAction(request: AuthRequest) {
  const httpClient = new HttpClient();
  
  const authRepo = new ApiAuthRepository(httpClient);
  const useCase = new RegisterUseCase(authRepo);

  try {
    await useCase.execute(request);
    
    return { success: true };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro ao realizar o cadastro.";
    return { success: false, error: message };
  }
}