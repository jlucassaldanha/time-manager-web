import { Box, TextField, Button } from "@mui/material";

interface PeriodControllerProps {
  action: (payload: FormData) => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  startDateValue: string;
  endDateValue: string;
  isPending: boolean
}

export default function PeriodController({
  action,
  onStartDateChange,
  onEndDateChange,
  startDateValue,
  endDateValue,
  isPending
}: PeriodControllerProps) {
  return (
    <Box
      component="form"
      action={action}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        name="startDate"
        label="Data inicial"
        variant="outlined"
        type="date"
        value={startDateValue}
        onChange={(e) => onStartDateChange(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <TextField
        name="endDate"
        label="Data final"
        variant="outlined"
        type="date"
        value={endDateValue}
        onChange={(e) => onEndDateChange(e.target.value)}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
      />
      <Button variant="contained" type="submit" disabled={isPending}>
        Filtrar
      </Button>
    </Box>
  );
}
