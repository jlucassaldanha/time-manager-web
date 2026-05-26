"use client";

import WorkJourneyCard from "@/components/WorkJourneyCard/WorkJourneyCard";
import { WorkJourneyResponse } from "@/core/domain/entities/WorkJourneyRule";
import useWorkJourney from "@/hooks/useWorkJourney";

export default function WorkJourney() {
  const emptyRule: WorkJourneyResponse = {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  };

  const { journeys, updateJourneyDay, handleSave } = useWorkJourney(emptyRule);

  return (
    <WorkJourneyCard
      journeys={journeys}
      onUpdateJourneyDay={updateJourneyDay}
      onSave={handleSave}
    />
  );
}
