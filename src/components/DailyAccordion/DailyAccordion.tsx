import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { DisplayInfo } from "../DisplayInfo/DisplayInfo";
import { formatMinutesToHoursString } from "@/utils/formatMinutesToHoursString";
import { DailySummaryResponse, PunchDto } from "@/core/domain/entities/Summary";
import { formatToBrDateString } from "@/utils/formatToBrDateString";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatDateToTimeString } from "@/utils/formatDateToTimeString";
import { AllowanceDto } from "@/core/domain/entities/Allowance";
import ActionCard from "../ActionCard/ActionCard";
import AddIcon from "@mui/icons-material/Add";

interface DailyAccordionProps {
  day: DailySummaryResponse;
  isDeleting: boolean
  openPunchModal: (date: string, punchData: PunchDto | null) => void;
  openAllowanceModal: (date: string, data?: AllowanceDto) => void;
  onDeleteAllowance: (allowanceId: string) => void;
}

export default function DailyAccordion({
  day,
  isDeleting,
  openPunchModal,
  openAllowanceModal,
  onDeleteAllowance,
}: DailyAccordionProps) {
  const isNegative = day.balanceMinutes < 0;

  const havePunches = day.punches.length > 0;

  const haveAllowance = day.allowedMinutes > 0;

  const currentAllowance = Array.isArray(day.allowanceDetails)
    ? day.allowanceDetails[0]
    : day.allowanceDetails;

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            pr: 2,
          }}
        >
          <Typography variant="h6">{formatToBrDateString(day.date)}</Typography>
          <Typography
            variant="subtitle1"
            color={isNegative ? "error" : "success"}
          >
            {formatMinutesToHoursString(day.balanceMinutes)}
          </Typography>
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

        {havePunches && <Typography variant="subtitle1">Registros</Typography>}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "star",
            pt: 2,
          }}
        >
          {day.punches.map((punch, i) => (
            <Box key={i} sx={{ display: "flex", gap: 2 }}>
              <ActionCard
                onClick={() =>
                  openPunchModal(formatToBrDateString(day.date), punch)
                }
              >
                <DisplayInfo
                  title={punch.type === "Entry" ? "Entrada" : "Saida"}
                  info={formatDateToTimeString(punch.timestamp)}
                />
              </ActionCard>
            </Box>
          ))}
          <ActionCard
            onClick={() => openPunchModal(formatToBrDateString(day.date), null)}
          >
            <AddIcon color="primary" />
          </ActionCard>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
          {haveAllowance && currentAllowance ? (
            <Button
              color="error"
              onClick={() => onDeleteAllowance(currentAllowance.id)}
              loading={isDeleting}
            >
              Excluir abono registrado
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => openAllowanceModal(formatToBrDateString(day.date))}
            >
              Adicionar abono
            </Button>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
