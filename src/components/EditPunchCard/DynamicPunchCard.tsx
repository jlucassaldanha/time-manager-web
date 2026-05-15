"use client";

import useDynamicPunches, { PunchEntry } from "@/hooks/useDynamicPunches";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

interface DynamicPunchesCardProps {
  initialData?: PunchEntry[];
  onSave: (data: PunchEntry[]) => void;
}

export default function DynamicPunchCard({
  initialData = [],
  onSave,
}: DynamicPunchesCardProps) {
  const { punches, addPunch, removePunch, updatePunch } =
    useDynamicPunches(initialData);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5">Adicionar</Typography>
            <Typography variant="subtitle1">04/11/2001</Typography>
          </Box>
          <Box>
            <Button onClick={addPunch}>Adicionar batida</Button>
          </Box>
        </Box>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {punches.map((punch) => (
            <Box key={punch.id} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "end", }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removePunch(punch.id)}
                >
                  Excluir
                </Button>
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    label="Hora"
                    type="time"
                    size="small"
                    value={punch.time}
                    onChange={(e) =>
                      updatePunch(punch.id, "time", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                  <ToggleButtonGroup
                    value={punch.type}
                    exclusive
                    onChange={(_, value) =>
                      updatePunch(punch.id, "type", value)
                    }
                  >
                    <ToggleButton value="Entry">Entrada</ToggleButton>
                    <ToggleButton value="Exit">Saida</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <TextField
                  label="Nota"
                  multiline
                  rows={3}
                  value={punch.note}
                  onChange={(e) =>
                    updatePunch(punch.id, "note", e.target.value)
                  }
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
              </Box>
            </Box>
          ))}
          {punches.length <= 0 && (
            <Typography variant="subtitle1">
              Não há pontos registrados.
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Button variant="contained" onClick={() => onSave(punches)}>
            Salvar alterações
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
