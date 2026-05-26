"use client";

import PeriodController from "@/components/PeriodController/PeriodController";
import { Box, Typography, Alert, AlertTitle, Button } from "@mui/material";
import DailyAccordion from "@/components/DailyAccordion/DailyAccordion";
import PeriodCard from "@/components/PeriodCard/PeriodCard";
import DynamicPunchModal from "@/components/DynamicPunchModal/DynamicPunchModal";
import useSummaryRecords from "@/hooks/useSummaryRecords";
import useDynamicPunchModal from "@/hooks/useDynamicPunchModal";
import useAllowanceModal from "@/hooks/useAllowanceModal";
import AllowanceModal from "@/components/AllowanceModal/AllowanceModal";

export default function Summary() {
  const {
    records,
    error,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleGetPeriodClick,
  } = useSummaryRecords();

  const {
    title,
    initialData,
    editingDate,
    handleOpenPunchModal,
    handleClosePunchModal,
    handleSavePunches,
  } = useDynamicPunchModal(records, handleGetPeriodClick);

  const {
    allowanceTitle,
    allowanceEditingDate,
    allowanceInitialData,
    handleOpenAllowanceModal,
    handleCloseAllowanceModal,
    handleSaveAllowance,
    handleDeleteAllowance
  } = useAllowanceModal(records, handleGetPeriodClick)


  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, padding: "5px" }}
    >
      <PeriodController
        onClick={handleGetPeriodClick}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        startDateValue={startDate}
        endDateValue={endDate}
      />

      <PeriodCard period={records} />

      <Box>
        {records?.days.map((day, i) => {
          return ( 
           <DailyAccordion 
              day={day} 
              key={i} 
              openPunchModal={handleOpenPunchModal} 
              openAllowanceModal={(title, date) => 
                handleOpenAllowanceModal(title, date)
              }
            /> 
          )
        })}
      </Box>
      {error === "User need journey rules" && (
        <Alert 
          severity="warning" 
          action={
            <Button color="inherit" size="small" href="/preferences/workjourney">
              CONFIGURAR
            </Button>
          }
        >
          <AlertTitle>Ação Necessária</AlertTitle>
          Você precisa configurar sua jornada de trabalho.
        </Alert>
      )}

      {!records && (
        <Typography variant="h6">Nenhum registro para esse periodo.</Typography>
      )}

      <DynamicPunchModal
        key={editingDate || "closed"}
        title={title}
        date={editingDate}
        initialData={initialData}
        onClose={handleClosePunchModal}
        onSave={handleSavePunches}
      />

      <AllowanceModal
        title={allowanceTitle}
        date={allowanceEditingDate}
        initialData={allowanceInitialData}
        onClose={handleCloseAllowanceModal}
        onSave={handleSaveAllowance}
        onDelete={handleDeleteAllowance}
      />
    </Box>
  );
}
