"use server";

import { makeCreateJourneyUseCase, makeGetJourneyUseCase, makeUpdateJourneyUseCase } from "@/core/factories/makeWorkJourneyUseCase";
import { cookies } from "next/headers";

type FormState = {
  success?: boolean
  error?: string;
};

export async function GetWorkJourneyRuleAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const getUseCase = makeGetJourneyUseCase(token)

  try {
    const rule = await getUseCase.execute();
    return { success: true, data: rule };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function CreateWorkJourneyRuleAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const monday = formData.get("monday") as string
  const tuesday = formData.get("tuesday") as string
  const wednesday = formData.get("wednesday") as string
  const thursday = formData.get("thursday") as string
  const friday = formData.get("friday") as string
  const saturday = formData.get("saturday") as string
  const sunday = formData.get("sunday") as string

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

 const createUseCase = makeCreateJourneyUseCase(token)

  try {
    await createUseCase.execute({
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });

    return { success: true }
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function UpdateWorkJourneyRuleAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const monday = formData.get("monday") as string
  const tuesday = formData.get("tuesday") as string
  const wednesday = formData.get("wednesday") as string
  const thursday = formData.get("thursday") as string
  const friday = formData.get("friday") as string
  const saturday = formData.get("saturday") as string
  const sunday = formData.get("sunday") as string

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const updateUseCase = makeUpdateJourneyUseCase(token)

  try {
    await updateUseCase.execute({
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });

    return { success: true }
  } catch (error) {
    console.error("WorkJourneyRule:", error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}
