import { CreateWorkJourneyRuleUseCase } from "../application/useCases/CreateWorkJourneyRuleUseCase";
import { GetWorkJourneyRuleUseCase } from "../application/useCases/GetWorkJourneyRuleUseCase";
import { UpdateWorkJourneyRuleUseCase } from "../application/useCases/UpdateWorkJourneyRuleUseCase";
import { ApiWorkJourneyRuleRepository } from "../infrastructure/ApiWorkJourneyRuleRepository";
import { HttpClient } from "../infrastructure/HttpClient";

export function makeGetJourneyUseCase(token: string) {
    const httpClient = new HttpClient(token)
  const repository = new ApiWorkJourneyRuleRepository(httpClient);
  return new GetWorkJourneyRuleUseCase(repository);
}

export function makeCreateJourneyUseCase(token: string) {
    const httpClient = new HttpClient(token)
  const repository = new ApiWorkJourneyRuleRepository(httpClient);
  return new CreateWorkJourneyRuleUseCase(repository);
}

export function makeUpdateJourneyUseCase(token: string) {
    const httpClient = new HttpClient(token)
  const repository = new ApiWorkJourneyRuleRepository(httpClient);
  return new UpdateWorkJourneyRuleUseCase(repository);
}