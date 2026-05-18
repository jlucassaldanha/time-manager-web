"use client";

import PeriodController from "@/components/PeriodController/PeriodController";
import { Box } from "@mui/material";
import DailyAccordion from "@/components/DailyAccordion/DailyAccordion";
import PeriodCard from "@/components/PeriodCard/PeriodCard";
import DynamicPunchModal from "@/components/DynamicPunchModal/DynamicPunchModal";
import useSummaryRecords from "@/hooks/useSummaryRecords";
import useDynamicPunchModal from "@/hooks/useDynamicPunchModal";

export default function Summary() {
  const { records, startDate, endDate, setStartDate, setEndDate, handleGetPeriodClick } =
    useSummaryRecords();

  const {
    title,
    initialData,
    editingDate,
    handleOpenModal,
    handleCloseModal,
    handleSavePunches,
  } = useDynamicPunchModal(records, handleGetPeriodClick);

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
        {records?.days.map((day, i) => (
          <DailyAccordion day={day} key={i} openModal={handleOpenModal} />
        ))}
      </Box>

      <DynamicPunchModal
        key={editingDate || 'closed'}
        title={title}
        date={editingDate}
        initialData={initialData}
        onClose={handleCloseModal}
        onSave={handleSavePunches}
      />
    </Box>
  );
}
