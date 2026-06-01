import {
  PunchDto,
} from "@/core/domain/entities/Summary";
import { useState } from "react";


export default function usePunchModal(
) {
  const [editingDate, setEditingDate] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedPunch, setSelectedPunch] = useState<PunchDto | null>(null);

  const handleOpenPunchModal = (
    title: string,
    date: string,
    punchData: PunchDto | null,
  ) => {
    setEditingDate(date);
    setTitle(title);
    setSelectedPunch(punchData);
  };

  const handleClosePunchModal = () => {
    setEditingDate(null);
  };
  
  return {
    title,
    editingDate,
    selectedPunch,
    handleOpenPunchModal,
    handleClosePunchModal,
  };
}
