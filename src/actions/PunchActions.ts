"use server";

import { CreateManualPunchUseCase } from "@/core/application/useCases/CreateManualPunchUseCase";
import { CreateRealtimePunchUseCase } from "@/core/application/useCases/CreateRealtimePunchUseCase";
import { RecordType } from "@/core/domain/entities/TimeRecord";
import { ApiTimeRecordRepository } from "@/core/infrastructure/ApiTimeRecordRepository";
import { UpdatePunchUseCase } from "../core/application/useCases/UpdatePunchUseCase";
import { DeletePunchUseCase } from "../core/application/useCases/DeletePunchUseCase";
import parseBrDateToIsoWithOffset from "@/utils/parseBrDateToIsoWithOffset";
import { HttpClient } from "@/core/infrastructure/HttpClient";
import { cookies } from "next/headers";

export async function CreateRealtimePunchAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    throw new Error("Sessão expirada. Faça login novamente.");
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiTimeRecordRepository(httpClient);
  const createUseCase = new CreateRealtimePunchUseCase(repository);

  try {
    await createUseCase.execute();
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function CreateManualPunchAction(
  date: string,
  time: string,
  type: RecordType,
  note: string,
) {
  const rawDatetime = parseBrDateToIsoWithOffset(date, time);

  const datetime = new Date(rawDatetime);

  if (isNaN(datetime.getTime())) {
    return { success: false, error: "Formato de data e hora inválido." };
  }

  if (type !== "Entry" && type !== "Exit") {
    return { success: false, error: "Tipo errado" };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiTimeRecordRepository(httpClient);
  const createUseCase = new CreateManualPunchUseCase(repository);

  try {
    await createUseCase.execute({
      datetime,
      type,
      note,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function UpdatePunchAction(
  recordId: string,
  date: string,
  time: string,
  type: RecordType,
  note: string,
) {
  const rawDatetime = parseBrDateToIsoWithOffset(date, time);

  const datetime = new Date(rawDatetime);

  if (isNaN(datetime.getTime())) {
    return { success: false, error: "Formato de data e hora inválido." };
  }

  if (type !== "Entry" && type !== "Exit") {
    return { success: false, error: "Tipo errado" };
  }
  
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiTimeRecordRepository(httpClient);
  const updateUseCase = new UpdatePunchUseCase(repository);

  try {
    await updateUseCase.execute({
      recordId,
      dateTime: datetime,
      type,
      note,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}

export async function DeletePunchAction(
  recordId: string,
  justification: string,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiTimeRecordRepository(httpClient);
  const deleteUseCase = new DeletePunchUseCase(repository);

  try {
    await deleteUseCase.execute({
      recordId,
      justification,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro interno no servidor.";
    return { success: false, error: message };
  }
}
