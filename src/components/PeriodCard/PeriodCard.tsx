import { PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { formatMinutesToHoursString } from "@/utils/formatMinutesToHoursString";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";

interface PeriodCardProps {
  period?: PeriodSummaryResponse | null;
}

export default function PeriodCard({ period }: PeriodCardProps) {
  const balance = period?.balanceMinutes || 0
  const isNegative = balance < 0;

  return (
    <Card>
      <CardContent sx={{ display: "flex", justifyContent: "center", padding: 2}}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: 4 } }}>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Saldo Total
            </Typography>
            <Typography variant="h6" color={isNegative ? "error" : "success"}>
              {formatMinutesToHoursString(balance)}
            </Typography>
          </Box>
            
            <Grid container spacing={3}>
              <Grid size="auto">
                <Typography variant="subtitle2">Registradas</Typography>
                <Typography variant="body1">
                  {formatMinutesToHoursString(period?.totalWorkedMinutes || 0)}
                </Typography>
              </Grid>
              <Grid size="auto">
                <Typography variant="subtitle2">Esperadas</Typography>
                <Typography variant="body1">
                  {formatMinutesToHoursString(period?.goalMinutes || 0)}
                </Typography>
              </Grid>
              <Grid size="auto">
                <Typography variant="subtitle2">Abonadas</Typography>
                <Typography variant="body1">
                  {formatMinutesToHoursString(period?.totalAllowedMinutes || 0)}
                </Typography>
              </Grid>
            </Grid>
          
        </Box>
      </CardContent>
    </Card>
  );
}
