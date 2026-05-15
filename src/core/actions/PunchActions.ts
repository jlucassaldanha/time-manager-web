"use server";

import { CreateManualPunchUseCase } from "@/core/application/useCases/CreateManualPunchUseCase";
import { CreateRealtimePunchUseCase } from "@/core/application/useCases/CreateRealtimePunchUseCase";
import { RecordType } from "@/core/domain/entities/TimeRecord";
import { ApiTimeRecordRepository } from "@/core/infrastructure/ApiTimeRecordRepository";

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

export async function CreateManualPunchAction(formData: FormData) {
  const rawDatetime = formData.get("datetime");
  const type = formData.get("type");
  const note = formData.get("note");

  if (!rawDatetime || typeof rawDatetime !== "string") {
    throw new Error("Data e hora são obrigatorias");
  }

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
      type: type as RecordType,
      note:
        typeof note === "string" && note.trim() !== ""
          ? note.trim()
          : undefined,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}

// fazer
export async function UpdatePunchAction(formData: FormData) {}

export async function DeletePunchAction(formData: FormData) {}
