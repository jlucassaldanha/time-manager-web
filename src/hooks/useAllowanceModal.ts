import { useState } from "react";
import { AllowanceDto } from "@/core/domain/entities/Allowance";

export default function useSingleAllowanceModal(onSuccessRefresh: () => void) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [allowanceData, setAllowanceData] = useState<AllowanceDto | null>(null);

  const handleOpenForAdd = (date: string) => {
    setSelectedDate(date);
    setAllowanceData(null); // Modo Criação
    setIsOpen(true);
  };

  const handleOpenForEdit = (date: string, data: AllowanceDto) => {
    setSelectedDate(date);
    setAllowanceData(data); // Modo Edição
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedDate(null);
    setAllowanceData(null);
  };

  const handleSuccess = () => {
    handleClose();
    onSuccessRefresh();
  };

  return {
    isOpen,
    selectedDate,
    allowanceData,
    handleOpenForAdd,
    handleOpenForEdit,
    handleClose,
    handleSuccess
  };
}