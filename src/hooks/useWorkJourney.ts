import {
  CreateWorkJourneyRuleAction,
  GetWorkJourneyRuleAction,
  UpdateWorkJourneyRuleAction,
} from "@/actions/WorkJourneyRuleActions";
import {
  WorkJourneyResponse,
  WorkJourneyRule,
} from "@/core/domain/entities/WorkJourneyRule";
import { useEffect, useState } from "react";

export default function useWorkJourney(emptyRule: WorkJourneyResponse) {
  const [journeys, setJourneys] = useState<WorkJourneyResponse>(emptyRule);

  useEffect(() => {
    const fetchRule = async () => {
      try {
        const existingRule = await GetWorkJourneyRuleAction();

        if (existingRule.data) {
          setJourneys(existingRule.data);
        }
      } catch (error) {
        console.error("Erro ao buscar a jornada", error);
      }
    };

    fetchRule();
  }, []);

  const updateJourneyDay = (day: keyof WorkJourneyRule, value: string) => {
    setJourneys((prev) => ({ ...prev, [day]: value }));
  };

  const handleSave = async () => {
    try {
      if (journeys.id) {
        await UpdateWorkJourneyRuleAction(journeys);
      } else {
        await CreateWorkJourneyRuleAction(journeys);
      }
    } catch (error) {
      console.error("Erro ao salvar", error);
    }
  };

  return {
	journeys,
	updateJourneyDay,
	handleSave
  }
}
