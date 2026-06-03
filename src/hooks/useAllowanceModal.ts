import { useState } from "react";
//import { AllowanceDto } from "@/core/domain/entities/Allowance";

export default function useSingleAllowanceModal(onSuccessRefresh: () => void) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  //const [allowanceData, setAllowanceData] = useState<AllowanceDto | null>(null);

  const handleOpenForAdd = (date: string) => {
    setSelectedDate(date);
    //setAllowanceData(null); 
  };

  /*const handleOpenForEdit = (date: string, data: AllowanceDto) => {
    setSelectedDate(date);
    setAllowanceData(data); 
  };*/

  const handleClose = () => {
    setSelectedDate(null);
    //setAllowanceData(null);
  };

  const handleSuccess = () => {
    handleClose();
    onSuccessRefresh();
  };

  return {
    selectedDate,
    //allowanceData,
    handleOpenForAdd,
    //handleOpenForEdit,
    handleClose,
    handleSuccess
  };
}