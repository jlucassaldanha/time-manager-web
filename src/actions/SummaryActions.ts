"use server";

import { ApiSummaryRepository } from "../core/infrastructure/ApiSummaryRepository";
import { GetPeriodSummaryUseCase } from "../core/application/useCases/GetPeriodSummaryUseCase";

export async function GetPeriodSummaryAction(
  startDateString: string,
  endDateString: string,
) {
  const repository = new ApiSummaryRepository();
  const getUseCase = new GetPeriodSummaryUseCase(repository);

  try {
    const response = await getUseCase.execute({
      startDate: startDateString,
      endDate: `${endDateString.split('T')[0]}T23:59:59`,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}
