"use client";

import WorkJourneyCard from "@/components/WorkJourneyCard/WorkJourneyCard";
import { WorkJourneyResponse } from "@/core/domain/entities/WorkJourneyRule";
import useWorkJourney from "@/hooks/useWorkJourney";
import { Box, Typography } from "@mui/material";

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

  const { journeys, error, loading, updateJourneyDay, handleSave } =
    useWorkJourney(emptyRule);

  return (
    <Box>
      {error && <Typography color="error">{error}</Typography>}
      
      <WorkJourneyCard
        journeys={journeys}
        onUpdateJourneyDay={updateJourneyDay}
        onSave={handleSave}
        loading={loading}
      />
      
    </Box>
  );
}
