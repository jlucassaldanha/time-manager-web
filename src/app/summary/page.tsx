"use client";

import PeriodController from "@/components/PeriodController/PeriodController";
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import DailyAccordion from "@/components/DailyAccordion/DailyAccordion";
import PeriodCard from "@/components/PeriodCard/PeriodCard";
import useSummaryRecords from "@/hooks/useSummaryRecords";
import usePunchModal from "@/hooks/usePunchModal";
import useAllowanceModal from "@/hooks/useAllowanceModal";
import AllowanceModal from "@/components/AllowanceModal/AllowanceModal";
import PunchModal from "@/components/PunchModal/PunchModal";
import { useTransition } from "react";
import { DeleteAllowanceAction } from "@/actions/AllowanceActions";

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
    editingDate,
    selectedPunch,
    handleOpenPunchModal,
    handleClosePunchModal,
  } = usePunchModal();

  const {
    selectedDate,
    handleOpenForAdd,
    handleClose,
  } = useAllowanceModal(handleGetPeriodClick);

  const [isDeleting, startTransition] = useTransition();

  const handleDeleteAllowance = (allowanceId: string) => {
    startTransition(async () => {
      const result = await DeleteAllowanceAction(allowanceId, "Deletar"); 
      if (!result?.error) {
        handleGetPeriodClick(); 
      } else {
        alert(result.error);
      }
    });
  };

  const isInitialLoad = isLoading && !records;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 2,
        maxWidth: 400,
        minWidth: 350,
      }}
    >
      <Paper sx={{padding: 4}}>
        <PeriodController
          action={formAction}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          startDateValue={startDate}
          endDateValue={endDate}
          isPending={isInitialLoad}
        />
      </Paper>

      {isInitialLoad ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <PeriodCard period={records} />

          <Box>
            {records?.days.map((day, i) => {
              return (
                <DailyAccordion
                  day={day}
                  key={i}
                  isDeleting={isDeleting}
                  openPunchModal={handleOpenPunchModal}
                  openAllowanceModal={handleOpenForAdd}
                  onDeleteAllowance={handleDeleteAllowance}
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">
                Nenhum registro para esse periodo.
              </Typography>
            </Box>
          )}

          <PunchModal
            key={editingDate || "closed"}
            date={editingDate}
            initialData={selectedPunch}
            onClose={handleClosePunchModal}
            onSuccessRefresh={handleGetPeriodClick}
          />

          <AllowanceModal
            key={selectedDate || "closed-allowance"}
            date={selectedDate}
            onClose={handleClose}
            onSuccessRefresh={handleGetPeriodClick}
          />
        </Box>
      )}
    </Box>
  );
}
