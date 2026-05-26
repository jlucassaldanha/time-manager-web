import { PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { formatMinutesToHoursString } from "@/utils/formatMinutesToHoursString";
import { Card, CardContent, Grid, Typography } from "@mui/material";

interface PeriodCardProps {
  period?: PeriodSummaryResponse | null;
}

export default function PeriodCard({ period }: PeriodCardProps) {
	const isNegative = period?.balanceMinutes || 0 < 0 

	return (
		<Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={4} >
              <Typography variant="subtitle2" gutterBottom >Saldo Total</Typography>
              <Typography variant="h6" color={ isNegative ? "error" : "success" }>{formatMinutesToHoursString(period?.balanceMinutes || 0)}</Typography>
            </Grid>
            <Grid container spacing={1.6}>
              <Grid size={4} >
                <Typography variant="caption" >Registradas</Typography>
                <Typography variant="body1" >{formatMinutesToHoursString(period?.totalWorkedMinutes || 0)}</Typography>
              </Grid>
              <Grid size={4} >
                <Typography variant="caption" >Esperadas</Typography>
                <Typography variant="body1" >{formatMinutesToHoursString(period?.goalMinutes || 0)}</Typography>
              </Grid>
              <Grid size={4} >
                <Typography variant="caption" >Abonadas</Typography>
                <Typography variant="body1" >{formatMinutesToHoursString(period?.totalAllowedMinutes || 0)}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
	)
}