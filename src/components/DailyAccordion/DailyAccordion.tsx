import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { DisplayInfo } from "../DisplayInfo/DisplayInfo";
import { formatMinutesToHoursString } from "@/utils/formatMinutesToHoursString";
import { DailySummaryResponse } from "@/core/domain/entities/Summary";
import { formatToBrDateString } from "@/utils/formatToBrDateString";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDateToTimeString } from "@/utils/formatDateToTimeString";

interface DailyAccordionProps {
  day: DailySummaryResponse;
}

export default function DailyAccordion({ day }: DailyAccordionProps) {
  return (
    <Accordion disableGutters >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", pr: 2 }}>
          <Typography variant="h6" >{formatToBrDateString(day.date)}</Typography>
          <Typography variant="subtitle1">{formatMinutesToHoursString(day.balanceMinutes)}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <DisplayInfo
            title="Trabalhadas"
            info={formatMinutesToHoursString(day.workedMinutes)}
          />
          <DisplayInfo
            title="Esperadas"
            info={formatMinutesToHoursString(day.dailyGoalMinutes)}
          />
          <DisplayInfo
            title="Abonadas"
            info={formatMinutesToHoursString(day.allowedMinutes)}
          />
        </Box>
        
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" >Registros</Typography>
        <Grid container spacing={2}>
          {day.punches.map((punch, i) => (
            <Grid key={i} sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }} size={2}>
              <DisplayInfo 
                title={formatDateToTimeString(punch.timestamp)}
                info={punch.type}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" >Editar</Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
