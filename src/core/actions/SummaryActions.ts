"use server";

import { ApiSummaryRepository } from "../infrastructure/ApiSummaryRepository";
import { GetPeriodSummaryUseCase } from "../application/useCases/GetPeriodSummaryUseCase";


export async function GetPeriodSummaryAction(startDateString: string, endDateString: string) {

  const repository = new ApiSummaryRepository();
  const getUseCase = new GetPeriodSummaryUseCase(repository);

  try {
	const response = await getUseCase.execute({
	  startDate: startDateString,
	  endDate: endDateString,
	});

	return response
  } catch (error) {
	console.error(error);
	throw new Error("Erro ao processar o registro.");
  }
}
