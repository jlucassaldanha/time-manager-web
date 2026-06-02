"use client";

import WorkJourneyCard from "@/components/WorkJourneyCard/WorkJourneyCard";
import { Box, Paper, Typography } from "@mui/material";

export default function WorkJourney() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      <Paper sx={{padding: 4, maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Box sx={{display: "flex", justifyContent: "center", mb: 5}}>
          <Typography variant="h6">
            Preferencia de jornada de trabalho
          </Typography>
        </Box>
        <WorkJourneyCard />
      </Paper>
    </Box>
  );
}
