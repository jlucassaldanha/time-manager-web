import { GetPeriodSummaryAction, SearchSummaryAction, SummaryState } from "@/actions/SummaryActions";
import { startTransition, useActionState, useEffect, useState } from "react";

const initialState: SummaryState = { success: false, data: undefined, error: undefined };

export default function useSummaryRecords() {
  const initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 7);
  const initialStartDateString = initialStartDate.toISOString().split("T")[0];

  const initialEndDateString = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(initialStartDateString);
  const [endDate, setEndDate] = useState<string>(initialEndDateString);

  const [initialStateData, setInitialStateData] = useState<SummaryState>(initialState)
  const [isFetchingInitial, setIsFetchingInitial] = useState(true)

  const [formState, formAction, isPending] = useActionState(SearchSummaryAction, initialState)

  useEffect(() => {
    const fetchInitialRecords = async () => {
      setIsFetchingInitial(true)
      const result = await GetPeriodSummaryAction(initialStartDateString, initialEndDateString);
      setInitialStateData(result)
      setIsFetchingInitial(false)
    };

    fetchInitialRecords();
  }, []);

  const activeState = formState?.data || formState?.error ? formState : initialStateData
  const isLoading = isFetchingInitial || isPending

  const handleGetPeriodClick = async () => {
    const formData = new FormData()
    formData.append("startDate", startDate)
    formData.append("endDate", endDate)
    startTransition(() => {
      formAction(formData); 
    });
  };

  return {
    records: activeState.data,
    error: activeState.error,
    isLoading: isLoading,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    formAction,
    handleGetPeriodClick,
  };
}