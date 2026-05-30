"use server"

import { makeLoginUseCase, makeRegisterUseCase } from "@/core/factories/makeAuthUseCase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FormState = {
  success?: boolean
  error?: string; // O "?" torna a string opcional (podendo ser undefined)
};

export async function loginAction(prevState: FormState, formData: FormData): Promise<FormState> {
	const email = formData.get("email") as string
	const password = formData.get("password") as string
	
	const loginUseCase = makeLoginUseCase()

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

	redirect("/summary");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt_token");
  redirect("/login");
}


export async function registerAction(prevState: FormState, formData: FormData): Promise<FormState> {
	const email = formData.get("email") as string
	const password = formData.get("password") as string
	const confirmPassword = formData.get("confirmPassword") as string

	if (password !== confirmPassword) {
		return { success: false, error: "Senhas diferentes" }
	}

	const registerUseCase = makeRegisterUseCase()

  try {
    await registerUseCase.execute({ email, password });
    
    return { success: true };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro ao realizar o cadastro.";
    return { success: false, error: message };
  }
}