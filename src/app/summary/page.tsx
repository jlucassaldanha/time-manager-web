"use client";

import PeriodController from "@/components/PeriodController/PeriodController";
import { Box, Typography, Alert, AlertTitle, Button, CircularProgress } from "@mui/material";
import DailyAccordion from "@/components/DailyAccordion/DailyAccordion";
import PeriodCard from "@/components/PeriodCard/PeriodCard";
import useSummaryRecords from "@/hooks/useSummaryRecords";
import useDynamicPunchModal from "@/hooks/useDynamicPunchModal";
import useAllowanceModal from "@/hooks/useAllowanceModal";
import AllowanceModal from "@/components/AllowanceModal/AllowanceModal";
import PunchModal from "@/components/PunchModal/PunchModal";

export default function Summary() {
  const {
    records,
    error,
    isLoading,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    formAction,
    handleGetPeriodClick,
  } = useSummaryRecords();

  const {
    title,
    editingDate,
    selectedPunch,
    handleOpenPunchModal,
    handleClosePunchModal,
  } = useDynamicPunchModal();

  const {
    allowanceTitle,
    allowanceEditingDate,
    allowanceInitialData,
    handleOpenAllowanceModal,
    handleCloseAllowanceModal,
    handleSaveAllowance,
    handleDeleteAllowance,
  } = useAllowanceModal(records, handleGetPeriodClick);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 2, maxWidth: 400, minWidth: 350 }}
    >
      <PeriodController
        action={formAction}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        startDateValue={startDate}
        endDateValue={endDate}
        isPending={isLoading}
      />

      {isLoading ? (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <CircularProgress />
        </Box>
        
      ) : (
        <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>
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
              );
            })}
          </Box>
          {error === "User need journey rules" && (
            <Alert
              severity="warning"
              action={
                <Button
                  color="inherit"
                  size="small"
                  href="/preferences/workjourney"
                >
                  CONFIGURAR
                </Button>
              }
            >
              <AlertTitle>Ação Necessária</AlertTitle>
              Você precisa configurar sua jornada de trabalho.
            </Alert>
          )}

          {!records && !isLoading && (
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <Typography variant="h6">
                Nenhum registro para esse periodo.
              </Typography>
            </Box>
          )}

          

          <PunchModal
            key={editingDate || "closed"}
            title={title}
            date={editingDate}
            initialData={selectedPunch}
            onClose={handleClosePunchModal}
            onSuccessRefresh={handleGetPeriodClick}
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
      )}
    </Box>
  );
}
