"use server";

import { CreateManualPunchUseCase } from "@/core/application/useCases/CreateManualPunchUseCase";
import { CreateRealtimePunchUseCase } from "@/core/application/useCases/CreateRealtimePunchUseCase";
import { RecordType } from "@/core/domain/entities/TimeRecord";
import { ApiTimeRecordRepository } from "@/core/infrastructure/ApiTimeRecordRepository";
import { UpdatePunchUseCase } from "../core/application/useCases/UpdatePunchUseCase";
import { DeletePunchUseCase } from "../core/application/useCases/DeletePunchUseCase";
import parseBrDateToIsoWithOffset from "@/utils/parseBrDateToIsoWithOffset";

export async function CreateRealtimePunchAction() {
  const repository = new ApiTimeRecordRepository();
  const createUseCase = new CreateRealtimePunchUseCase(repository);

  try {
    await createUseCase.execute();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
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
    throw new Error("Formato de data e hora inválido.");
  }

  if (type !== "Entry" && type !== "Exit") {
    throw new Error("Tipo errado");
  }

  const repository = new ApiTimeRecordRepository();
  const createUseCase = new CreateManualPunchUseCase(repository);

  try {
    await createUseCase.execute({
      datetime,
      type,
      note,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
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
    throw new Error("Formato de data e hora inválido.");
  }

  if (type !== "Entry" && type !== "Exit") {
    throw new Error("Tipo errado");
  }

  const repository = new ApiTimeRecordRepository();
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
    throw new Error("Erro ao processar o registro.");
  }
}

export async function DeletePunchAction(
  recordId: string,
  justification: string,
) {
  const repository = new ApiTimeRecordRepository();
  const deleteUseCase = new DeletePunchUseCase(repository);

  try {
    await deleteUseCase.execute({
      recordId,
      justification,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}
