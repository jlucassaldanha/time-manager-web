"use server";

import { CreateWorkJourneyRuleUseCase } from "@/core/application/useCases/CreateWorkJourneyRuleUseCase";
import { GetWorkJourneyRuleUseCase } from "@/core/application/useCases/GetWorkJourneyRuleUseCase";
import { UpdateWorkJourneyRuleUseCase } from "@/core/application/useCases/UpdateWorkJourneyRuleUseCase";
import { WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { ApiWorkJourneyRuleRepository } from "@/core/infrastructure/ApiWorkJourneyRuleRepository";

export async function GetWorkJourneyRuleAction() {
  const repository = new ApiWorkJourneyRuleRepository();
  const createUseCase = new GetWorkJourneyRuleUseCase(repository);

  try {
    return await createUseCase.execute();
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}

export async function CreateWorkJourneyRuleAction(rules: WorkJourneyRule) {
  const repository = new ApiWorkJourneyRuleRepository();
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
    throw new Error("Erro ao processar o registro.");
  }
}

export async function UpdateWorkJourneyRuleAction(rules: WorkJourneyRule) {
  const repository = new ApiWorkJourneyRuleRepository();
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
    console.error(error);
    throw new Error("Erro ao processar o registro.");
  }
}
