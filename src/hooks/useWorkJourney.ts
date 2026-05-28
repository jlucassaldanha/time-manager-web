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
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRule = async () => {
      try {
        const existingRule = await GetWorkJourneyRuleAction();

        if (existingRule.data) {
          setJourneys(existingRule.data);
          setError(null)
        }

        if (existingRule.error) {
          setError(existingRule.error)
        }
      } catch (error) {
        console.error("Erro ao buscar a jornada", error);
      } finally {
        setLoading(false)
      }
    };
    
    fetchRule();
  }, []);

  const updateJourneyDay = (day: keyof WorkJourneyRule, value: string) => {
    setJourneys((prev) => ({ ...prev, [day]: value }));
  };

  const handleSave = async () => {
    setLoading(true)
    try {
      if (journeys.id) {
        const response = await UpdateWorkJourneyRuleAction(journeys);

        if (response?.error) {
          setError(response.error)
        } else {
          setError(null)
        }
      } else {
        const response = await CreateWorkJourneyRuleAction(journeys);

        if (response?.error) {
          setError(response.error)
        } else {
          setError(null)
        }
      }
      setLoading(false)
    } catch (error) {
      console.error("Erro ao salvar", error);
    }
  };

  return {
	journeys,
  error,
  loading,
	updateJourneyDay,
	handleSave
  }
}
