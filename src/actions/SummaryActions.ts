"use server";

import { ApiSummaryRepository } from "../core/infrastructure/ApiSummaryRepository";
import { GetPeriodSummaryUseCase } from "../core/application/useCases/GetPeriodSummaryUseCase";
import { HttpClient } from "@/core/infrastructure/HttpClient";
import { cookies } from "next/headers";

export async function GetPeriodSummaryAction(
  startDateString: string,
  endDateString: string,
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) {
    return { success: false, error: "Usuário não autenticado."}
  }

  const httpClient = new HttpClient(token)
  const repository = new ApiSummaryRepository(httpClient);
  const getUseCase = new GetPeriodSummaryUseCase(repository);

  try {
    const response = await getUseCase.execute({
      startDate: startDateString,
      endDate: `${endDateString.split('T')[0]}T23:59:59`,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Erro desconhecido";

    return { success: false, error: message };
  }
}
