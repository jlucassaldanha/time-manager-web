"use server";

import { CreateWorkJourneyRuleUseCase } from "@/core/application/useCases/CreateWorkJourneyRuleUseCase";
import { GetWorkJourneyRuleUseCase } from "@/core/application/useCases/GetWorkJourneyRuleUseCase";
import { UpdateWorkJourneyRuleUseCase } from "@/core/application/useCases/UpdateWorkJourneyRuleUseCase";
import { WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { ApiWorkJourneyRuleRepository } from "@/core/infrastructure/ApiWorkJourneyRuleRepository";
import { HttpClient } from "@/core/infrastructure/HttpClient";
import { cookies } from "next/headers";

export async function GetWorkJourneyRuleAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)

  const repository = new ApiWorkJourneyRuleRepository(httpClient);
  const createUseCase = new GetWorkJourneyRuleUseCase(repository);

  try {
    const rule = await createUseCase.execute();
    return { success: true, data: rule };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function CreateWorkJourneyRuleAction(rules: WorkJourneyRule) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiWorkJourneyRuleRepository(httpClient);
  const createUseCase = new CreateWorkJourneyRuleUseCase(repository);

  try {
    await createUseCase.execute({
      monday: rules.monday,
      tuesday: rules.tuesday,
      wednesday: rules.wednesday,
      thursday: rules.thursday,
      friday: rules.friday,
      saturday: rules.saturday,
      sunday: rules.sunday,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function UpdateWorkJourneyRuleAction(rules: WorkJourneyRule) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiWorkJourneyRuleRepository(httpClient);
  const updateUseCase = new UpdateWorkJourneyRuleUseCase(repository);

  try {
    await updateUseCase.execute({
      monday: rules.monday,
      tuesday: rules.tuesday,
      wednesday: rules.wednesday,
      thursday: rules.thursday,
      friday: rules.friday,
      saturday: rules.saturday,
      sunday: rules.sunday,
    });
  } catch (error) {
    console.error("WorkJourneyRule:", error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}
