import {
  CreateWorkJourneyRuleAction,
  GetWorkJourneyRuleAction,
  SaveWorkJourneyRuleAction,
  UpdateWorkJourneyRuleAction,
} from "@/actions/WorkJourneyRuleActions";
import {
  WorkJourneyResponse,
  WorkJourneyRule,
} from "@/core/domain/entities/WorkJourneyRule";
import { useActionState, useEffect, useState } from "react";

const initialState = { error: undefined, success: undefined };

export default function useWorkJourney(emptyRule: WorkJourneyResponse) {
  const [initialData, setInitialData] = useState<WorkJourneyResponse>(emptyRule);
  const [isFetching, setIsFetching] = useState<boolean>(true)

  const [formState, formAction, isSaving] = useActionState(SaveWorkJourneyRuleAction, initialState);

  useEffect(() => {
    const fetchRule = async () => {
      try {
        const existingRule = await GetWorkJourneyRuleAction();

        if (existingRule.data) {
          setInitialData(existingRule.data);
        }

      } catch (error) {
        console.error("Erro ao buscar a jornada", error);
      } finally {
        setIsFetching(false)
      }
    };
    
    fetchRule();
  }, []);

  return {
	initialData,
  isFetching,
  formState,
  formAction,
  isSaving
  }
}
