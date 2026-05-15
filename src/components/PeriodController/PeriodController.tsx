import { Box, TextField, Button } from "@mui/material";

interface PeriodControllerProps {
  onClick: () => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  startDateValue: string;
  endDateValue: string;
}

export default function PeriodController({
  onClick,
  onStartDateChange,
  onEndDateChange,
  startDateValue,
  endDateValue,
}: PeriodControllerProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        id="startDate"
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
        id="endDate"
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
      <Button variant="contained" onClick={onClick}>
        Filtrar
      </Button>
    </Box>
  );
}
