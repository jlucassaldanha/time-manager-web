"use client";

import { RecordType } from "@/core/domain/entities/TimeRecord";
import WorkJourneyCard from "@/components/WorkJourneyCard/WorkJourneyCard";
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

export interface PunchEntry {
  id: string;
  time: string;
  type: RecordType;
  note?: string;
}

const emptyRule: WorkJourneyResponse = {
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: "",
  saturday: "",
  sunday: "",
};

export default function TestPage() {
  const [journeys, setJourneys] = useState<WorkJourneyResponse>(emptyRule);
  useEffect(() => {
    const fetchRule = async () => {
      try {
        const existingRule = await GetWorkJourneyRuleAction();

        if (existingRule) {
          setJourneys(existingRule);
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

  return (
    <WorkJourneyCard
      journeys={journeys}
      onUpdateJourneyDay={updateJourneyDay}
      onSave={handleSave}
    />
  );
}
