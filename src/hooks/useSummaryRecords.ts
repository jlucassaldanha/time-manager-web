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
  const [records, setRecords] = useState<PeriodSummaryResponse | null>();

  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async (start: string, end: string) => {
    const result = await GetPeriodSummaryAction(start, end);
    
    if (!result.success) {
      setError(result.error || "Erro desconhecido");
      setRecords(undefined); 
      return;
    }

    setError(null);
    setRecords(result.data);
    
  };

  useEffect(() => {
    const getRecords = async () => {
      await fetchRecords(startDate, endDate);
    };

    getRecords();
  }, []);

  const handleGetPeriodClick = async () => {
    await fetchRecords(startDate, endDate);
  };

  return {
    records,
    error,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleGetPeriodClick,
  };
}
