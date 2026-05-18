import { GetPeriodSummaryAction } from "@/actions/SummaryActions";
import { PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { useEffect, useState } from "react";

export default function useSummaryRecords() {
  const initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 7);
  const initialStartDateString = initialStartDate.toISOString().split("T")[0];

  const initialEndDateString = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(initialStartDateString);
  const [endDate, setEndDate] = useState<string>(initialEndDateString);
  const [records, setRecords] = useState<PeriodSummaryResponse>();

  useEffect(() => {
    const getRecords = async () => {
      const value = await GetPeriodSummaryAction(startDate, endDate);
      setRecords(value);
    };

    getRecords();
  }, []);

  const handleGetPeriodClick = async () => {
    const value = await GetPeriodSummaryAction(startDate, endDate);
    setRecords(value);
  };

  return {
    records,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleGetPeriodClick,
  };
}
