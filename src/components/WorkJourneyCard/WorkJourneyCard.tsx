"use client";

import { WorkJourneyResponse, WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import useWorkJourney from "@/hooks/useWorkJourney";
import { Box, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";

interface WorkJourneyCardProps {
  journeys: WorkJourneyRule;
  loading: boolean;
  onUpdateJourneyDay: (day: keyof WorkJourneyRule, value: string) => void;
  onSave: (rule: WorkJourneyRule | null) => void;
}

export default function WorkJourneyCard() {
  const emptyRule: WorkJourneyResponse = {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  };

  const { initialData, isFetching, formState, formAction, isSaving } =
    useWorkJourney(emptyRule);

  if (isFetching) return <CircularProgress />;

  return (
    <Box component="form" action={formAction} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {initialData.id && (
            <input type="hidden" name="id" value={initialData.id} />
          )}

          <TextField
            name="monday"
            label="Segunda"
            type="time"
            size="small"
            defaultValue={initialData.monday || ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            name="tuesday"
            label="Terça"
            type="time"
            size="small"
            defaultValue={initialData.tuesday || ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            name="wednesday"
            label="Quarta"
            type="time"
            size="small"
            defaultValue={initialData.wednesday || ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            name="thursday"
            label="Quinta"
            type="time"
            size="small"
            defaultValue={initialData.thursday || ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            name="friday"
            label="Sexta"
            type="time"
            size="small"
            defaultValue={initialData.friday || ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            name="saturday"
            label="Sábado"
            type="time"
            size="small"
            defaultValue={initialData.saturday || ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            name="sunday"
            label="Domingo"
            type="time"
            size="small"
            defaultValue={initialData.sunday || ""}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
      </Box>
      
      {formState?.error && <Typography color="error" >{formState.error}</Typography>}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" type="submit" loading={isSaving}>
          Salvar alterações
        </Button>
      </Box>
    </Box>
  );
}
