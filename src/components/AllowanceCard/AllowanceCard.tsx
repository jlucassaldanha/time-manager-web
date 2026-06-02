"use client";

import { AllowanceDto } from "@/core/domain/entities/Allowance";
import useDynamicAllowances from "@/hooks/useDynamicAllowances";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";

interface AllowanceCardProps {
  initialData?: AllowanceDto | null;
  date: string | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
}

export default function AllowanceCard({
  initialData,
  date,
  formAction,
  isPending
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
        {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
        
          
          
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
                  defaultValue={initialData?.duration}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Box>
              <TextField
              name="justification"
                label="Justification"
                multiline
                rows={3}
                value={initialData?.justification}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {initialData ? (
          <Button color="error" type="submit" name="intent" value="delete" loading={isPending}>
            Excluir
          </Button>
        ) : <Box />}
        
        <Button variant="contained" type="submit" name="intent" value="save" loading={isPending}>
          Salvar Abono
        </Button>
      </Box>
    </Box>
  );
}
