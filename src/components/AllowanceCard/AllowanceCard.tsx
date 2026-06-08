"use client";

import { Box, Button, TextField } from "@mui/material";

interface AllowanceCardProps {
  date: string | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
}

export default function AllowanceCard({
  date,
  formAction,
  isPending,
}: AllowanceCardProps) {
  return (
    <Box component="form" action={formAction}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {date && <input type="hidden" name="date" value={date} />}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 2,
            }}
          >
            <TextField
              name="duration"
              label="Tempo"
              type="time"
              size="small"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
          <TextField
            name="justification"
            label="Justificativa"
            multiline
            rows={3}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 3 }}>
        <Button
          variant="contained"
          type="submit"
          name="intent"
          value="save"
          loading={isPending}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
