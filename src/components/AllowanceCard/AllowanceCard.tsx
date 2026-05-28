"use client";

import { AllowanceDto } from "@/core/domain/entities/Allowance";
import useDynamicAllowances from "@/hooks/useDynamicAllowances";
import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";

interface AllowanceCardProps {
  initialData?: AllowanceDto[] | null;
  onSave: (idsToDelete: string[], data: AllowanceDto[]) => void;
  onDelete?: (id: string) => void;
}

export default function AllowanceCard({
  initialData,
  onSave,
}: AllowanceCardProps) {
  const { allowances, deletedIds, addAllowance, removeAllowance, updateAllowance } =
    useDynamicAllowances(initialData || []);

  return (
    <Box component="form" action={() => onSave(deletedIds, allowances)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: 2 }}>
          {allowances.length === 0 && (
              <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ my: 2 }}>
                Nenhum abono registado para este dia.
              </Typography>
            )}
          {allowances.map((allowance) => (
            <Box key={allowance.id} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="Tempo"
                  type="time"
                  size="small"
                  value={allowance.duration}
                  onChange={(e) => updateAllowance(allowance.id, "duration", e.target.value)}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Box>
              <TextField
                label="Justification"
                multiline
                rows={3}
                value={allowance.justification}
                onChange={(e) => updateAllowance(allowance.id, "justification", e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => removeAllowance(allowance.id)}
                sx={{ alignSelf: "flex-end" }}
              >
            Remover
          </Button>
            </Box>
            
          ))}
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", mt: 3, px: 2, gap: 3 }}
      >
        <Button variant="outlined" onClick={addAllowance}>
          Adicionar Abono
        </Button>
        <Button variant="contained" type="submit">
          Salvar alterações
        </Button>
      </Box>
    </Box>
  );
}
