"use server";

import { CreateAllowanceUseCase } from "@/core/application/useCases/CreateAllowanceUseCase";
import { DeleteAllowanceUseCase } from "@/core/application/useCases/DeleteAllowanceUseCase";
import { UpdateAllowanceUseCase } from "@/core/application/useCases/UpdateAllowanceUseCase";
import { AllowanceDto } from "@/core/domain/entities/Allowance";
import { ApiAllowanceRepository } from "@/core/infrastructure/ApiAllowanceRepository";
import { HttpClient } from "@/core/infrastructure/HttpClient";
import formatBrDateToIsoDateString from "@/utils/formatBrDateToIsoDateString";
import { cookies } from "next/headers";

export type SingleAllowanceState = {
  success?: boolean;
  error?: string;
};

export async function SubmitSingleAllowanceAction(
  prevState: SingleAllowanceState,
  formData: FormData
): Promise<SingleAllowanceState> {
  const intent = formData.get("intent") as string; // 'save' ou 'delete'
  const id = formData.get("id") as string | null;
  const date = formData.get("date") as string;
  const duration = formData.get("duration") as string // Ou 'time', dependendo de como você salva
  const justification = formData.get("justification") as string;

  try {
    if (intent === "delete" && id) {
      
      const res = await DeleteAllowanceAction(id, justification);
      if (res?.error) throw new Error(res.error);
      return { success: true };
    }

    if (!date || !duration || !justification) {
      throw new Error("Minutos e justificativa são obrigatórios.");
    }

    if (id) {
      const res = await UpdateAllowanceAction(date, {
        id,
        duration,
        justification,
        date: new Date(date)
      }, justification);
      if (res?.error) throw new Error(res.error);
    } else {
      const res = await CreateAllowanceAction(date, {
        id: "",
        duration,
        justification,
        date: new Date(date)
      });
      if (res?.error) throw new Error(res.error);
    }

    return { success: true };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erro na operação." };
  }
}

export async function CreateAllowanceAction(
  date: string,
  allowance: AllowanceDto,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiAllowanceRepository(httpClient);
  const createUseCase = new CreateAllowanceUseCase(repository);

  const isoDate = formatBrDateToIsoDateString(date)

  try {
    await createUseCase.execute({
      date: isoDate,
      duration: allowance.duration,
      justification: allowance.justification,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function UpdateAllowanceAction(
  date: string,
  allowance: AllowanceDto,
  auditJustification: string,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiAllowanceRepository(httpClient);
  const updateUseCase = new UpdateAllowanceUseCase(repository);

  if (!allowance.id) {
    throw new Error("Id é necessário.");
  }

  const isoDate = formatBrDateToIsoDateString(date)

  try {
    await updateUseCase.execute({
      id: allowance.id,
      date: isoDate,
      duration: allowance.duration,
      justification: allowance.justification,
      auditJustification: auditJustification,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function DeleteAllowanceAction(
  id: string,
  auditJustification: string,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiAllowanceRepository(httpClient);
  const deleteUseCase = new DeleteAllowanceUseCase(repository);

  try {
    await deleteUseCase.execute({
      id: id,
      auditJustification: auditJustification,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}
