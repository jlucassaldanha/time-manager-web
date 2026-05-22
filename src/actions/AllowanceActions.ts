"use server";

import { CreateAllowanceUseCase } from "@/core/application/useCases/CreateAllowanceUseCase";
import { DeleteAllowanceUseCase } from "@/core/application/useCases/DeleteAllowanceUseCase";
import { UpdateAllowanceUseCase } from "@/core/application/useCases/UpdateAllowanceUseCase";
import { AllowanceDto } from "@/core/domain/entities/Allowance";
import { ApiAllowanceRepository } from "@/core/infrastructure/ApiAllowanceRepository";
import formatBrDateToIsoDateString from "@/utils/formatBrDateToIsoDateString";

export async function CreateAllowanceAction(
  date: string,
  allowance: AllowanceDto,
) {
  const repository = new ApiAllowanceRepository();
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
    throw new Error("Erro ao processar o registro.");
  }
}

export async function UpdateAllowanceAction(
  date: string,
  allowance: AllowanceDto,
  auditJustification: string,
) {
  const repository = new ApiAllowanceRepository();
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
    throw new Error("Erro ao processar o registro.");
  }
}

export async function DeleteAllowanceAction(
  id: string,
  auditJustification: string,
) {
  const repository = new ApiAllowanceRepository();
  const deleteUseCase = new DeleteAllowanceUseCase(repository);

  try {
    await deleteUseCase.execute({
      id: id,
      auditJustification: auditJustification,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}
