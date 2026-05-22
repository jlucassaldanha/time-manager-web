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
import { AllowanceDto } from "@/core/domain/entities/Allowance";

interface DailyAccordionProps {
  day: DailySummaryResponse;
  openPunchModal: (title: string, date: string) => void
  openAllowanceModal: (title: string, date: string, data?: AllowanceDto[]) => void
}

export default function DailyAccordion({ day, openPunchModal, openAllowanceModal }: DailyAccordionProps) {
  const isNegative = day.balanceMinutes < 0

  const havePunches = day.punches.length > 0

  const haveAllowance = day.allowedMinutes > 0

  return (
    <Accordion disableGutters >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", pr: 2 }}>
          <Typography variant="h6" >{formatToBrDateString(day.date)}</Typography>
          <Typography variant="subtitle1" color={isNegative ? "error" : "success"}>{formatMinutesToHoursString(day.balanceMinutes)}</Typography>
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

        {havePunches && <Typography variant="subtitle1" >Registros</Typography>}

        <Grid container spacing={2}>
          {day.punches.map((punch, i) => (
            <Grid key={i} sx={{ display: "flex", gap: 2, mt: 2, mb: 2 }} size={2}>
              <DisplayInfo 
                title={punch.type === "Entry" ? "Entrada" : "Saida"}
                info={formatDateToTimeString(punch.timestamp)}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
          {haveAllowance ? 
            <Button variant="contained" onClick={() => openAllowanceModal("Editar", formatToBrDateString(day.date), day.allowanceDetails)}>Editar abonos</Button> 
            : <Button variant="contained" onClick={() => (openAllowanceModal("Adicionar", formatToBrDateString(day.date)), day.allowanceDetails)}>Adicionar abonos</Button> }
          
          {havePunches ? 
            <Button variant="contained" onClick={() => openPunchModal("Editar", formatToBrDateString(day.date))}>Editar pontos</Button> 
            : <Button variant="contained" onClick={() => (openPunchModal("Adicionar", formatToBrDateString(day.date)))}>Adicionar pontos</Button> }
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
