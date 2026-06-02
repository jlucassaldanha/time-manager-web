"use client";

import PeriodController from "@/components/PeriodController/PeriodController";
import { Box, Typography, Alert, AlertTitle, Button, CircularProgress } from "@mui/material";
import DailyAccordion from "@/components/DailyAccordion/DailyAccordion";
import PeriodCard from "@/components/PeriodCard/PeriodCard";
import useSummaryRecords from "@/hooks/useSummaryRecords";
import usePunchModal from "@/hooks/usePunchModal";
import useAllowanceModal from "@/hooks/useAllowanceModal";
import AllowanceModal from "@/components/AllowanceModal/AllowanceModal";
import PunchModal from "@/components/PunchModal/PunchModal";
import { AllowanceDto } from "@/core/domain/entities/Allowance";

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
  } = usePunchModal();

  const {
    isOpen,
    selectedDate,
    allowanceData,
    handleOpenForAdd,
    handleOpenForEdit,
    handleClose,
    handleSuccess
  } = useAllowanceModal(handleGetPeriodClick);

  const handleAllowanceModalAdapter = (modalTitle: string, date: string, data?: AllowanceDto) => {
    if (data) {
      handleOpenForEdit(date, data);
    } else {
      handleOpenForAdd(date);
    }
  };

  const isInitialLoad = isLoading && !records;

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
        isPending={isInitialLoad}
      />

      {isInitialLoad ? (
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
                  openAllowanceModal={handleAllowanceModalAdapter}
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
          key={selectedDate || "closed-allowance"}
            date={selectedDate}
            initialData={allowanceData}
            onClose={handleClose}
            onSuccessRefresh={handleGetPeriodClick}
          />
        </Box>
      )}
    </Box>
  );
}
