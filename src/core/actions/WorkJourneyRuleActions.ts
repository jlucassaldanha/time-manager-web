"use server";

import { CreateWorkJourneyRuleUseCase } from "@/core/application/useCases/CreateWorkJourneyRuleUseCase";
import { UpdateWorkJourneyRuleUseCase } from "@/core/application/useCases/UpdateWorkJourneyRuleUseCase";
import { ApiWorkJourneyRuleRepository } from "@/core/infrastructure/ApiWorkJourneyRuleRepository";

export async function CreateWorkJourneyRuleAction(formData: FormData) {
  const monday = formData.get("monday") as string;
  const tuesday = formData.get("tuesday") as string;
  const wednesday = formData.get("wednesday") as string;
  const thursday = formData.get("thursday") as string;
  const friday = formData.get("friday") as string;
  const saturday = formData.get("saturday") as string;
  const sunday = formData.get("sunday") as string;

  const repository = new ApiWorkJourneyRuleRepository();
  const createUseCase = new CreateWorkJourneyRuleUseCase(repository);

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
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}

export async function UpdateWorkJourneyRuleAction(formData: FormData) {
  const monday = formData.get("monday") as string;
  const tuesday = formData.get("tuesday") as string;
  const wednesday = formData.get("wednesday") as string;
  const thursday = formData.get("thursday") as string;
  const friday = formData.get("friday") as string;
  const saturday = formData.get("saturday") as string;
  const sunday = formData.get("sunday") as string;

  const repository = new ApiWorkJourneyRuleRepository();
  const updateUseCase = new UpdateWorkJourneyRuleUseCase(repository);

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
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}
