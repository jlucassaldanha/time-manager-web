"use client"
import { CreateWorkJourneyRuleAction, GetWorkJourneyRuleAction, UpdateWorkJourneyRuleAction } from "@/actions/WorkJourneyRuleActions";
import WorkJourneyCard from "@/components/WorkJourneyCard/WorkJourneyCard";
import { WorkJourneyResponse, WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { useEffect, useState } from "react";

const emptyRule: WorkJourneyResponse = {
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: "",
  saturday: "",
  sunday: "",
};

export default function WorkJourney() {
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
  
    return (
      <WorkJourneyCard
        journeys={journeys}
        onUpdateJourneyDay={updateJourneyDay}
        onSave={handleSave}
      />
    );
}
