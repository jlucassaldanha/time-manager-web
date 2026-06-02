import {
  PunchDto,
} from "@/core/domain/entities/Summary";
import { useState } from "react";


export default function usePunchModal(
) {
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [selectedPunch, setSelectedPunch] = useState<PunchDto | null>(null);

  const handleOpenPunchModal = (
    date: string,
    punchData: PunchDto | null,
  ) => {
    setEditingDate(date);
    setSelectedPunch(punchData);
  };

  const handleClosePunchModal = () => {
    setEditingDate(null);
  };
  
  return {
    editingDate,
    selectedPunch,
    handleOpenPunchModal,
    handleClosePunchModal,
  };
}
