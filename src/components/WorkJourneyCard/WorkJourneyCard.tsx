"use client";

import { WorkJourneyRule } from "@/core/domain/entities/WorkJourneyRule";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

interface WorkJourneyCardProps {
  journeys: WorkJourneyRule;
  loading: boolean;
  onUpdateJourneyDay: (day: keyof WorkJourneyRule, value: string) => void;
  onSave: (rule: WorkJourneyRule | null) => void;
}

export default function WorkJourneyCard({
  journeys,
  loading,
  onUpdateJourneyDay,
  onSave,
}: WorkJourneyCardProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {loading ? (
        <Typography>Carregando...</Typography>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              label="Segunda"
              type="time"
              size="small"
              value={journeys?.monday}
              onChange={(e) => onUpdateJourneyDay("monday", e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Terça"
              type="time"
              size="small"
              value={journeys?.tuesday}
              onChange={(e) => onUpdateJourneyDay("tuesday", e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Quarta"
              type="time"
              size="small"
              value={journeys?.wednesday}
              onChange={(e) => onUpdateJourneyDay("wednesday", e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Quinta"
              type="time"
              size="small"
              value={journeys?.thursday}
              onChange={(e) => onUpdateJourneyDay("thursday", e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Sexta"
              type="time"
              size="small"
              value={journeys?.friday}
              onChange={(e) => onUpdateJourneyDay("friday", e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Sábado"
              type="time"
              size="small"
              value={journeys?.saturday}
              onChange={(e) => onUpdateJourneyDay("saturday", e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Domingo"
              type="time"
              size="small"
              value={journeys?.sunday}
              onChange={(e) => onUpdateJourneyDay("sunday", e.target.value)}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={() => onSave(journeys)} disabled={loading}>
          Salvar alterações
        </Button>
      </Box>
    </Box>
  );
}
