import { PunchDto } from "@/core/domain/entities/Summary";
import { formatDateToTimeString } from "@/utils/formatDateToTimeString";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";

export default function EditPunchCard({
  initialData,
  formAction,
  isPending,
  date
}: {
  initialData?: PunchDto | null;
  formAction: (payload: FormData) => void;
  isPending: boolean
  date: string | null
}) {
	const [type, setType] = useState<string>(initialData?.type || "Entry");

	const handleTypeChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    if (newType !== null) {
      setType(newType);
    }
  };
  return (
    <Box
      component="form"
      action={formAction}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
		{date && <input type="hidden" name="date" value={date} />}
        {initialData?.id && <input type="hidden" name="id" value={initialData.id} />}
        <input type="hidden" name="intent" value="save" />
		<input type="hidden" name="type" value={type} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            name="time"
            label="Hora"
            type="time"
            size="small"
            defaultValue={initialData?.timestamp && formatDateToTimeString(initialData?.timestamp)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <ToggleButtonGroup value={type} onChange={handleTypeChange} exclusive>
            <ToggleButton value="Entry">
              Entrada
            </ToggleButton>
            <ToggleButton value="Exit">
              Saida
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <TextField
          name="note"
          label="Nota"
          multiline
          rows={3}
          defaultValue={initialData?.note || "Sem nota"}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>
      <Button variant="contained" type="submit" loading={isPending}>
        Salvar alterações
      </Button>
    </Box>
  );
}
