import { PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { formatDateToTimeString } from "@/utils/formatDateToTimeString";
import { formatToBrDateString } from "@/utils/formatToBrDateString";
import { PunchEntry } from "./useDynamicPunches";
import { useState } from "react";

export default function useDynamicPunchModal(records: PeriodSummaryResponse | undefined) {
	const [editingDate, setEditingDate] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleOpenModal = (title: string, date: string) => {
    setEditingDate(date);
    setTitle(title);
  };

  const handleCloseModal = () => {
    setEditingDate(null);
  };

  const handleSavePunches = async (date: string, punches: PunchEntry[]) => {
    console.log("Salvando");
  };

  const initialData = records?.days
    .find((day) => formatToBrDateString(day.date) === editingDate)
    ?.punches.map((punch) => {
      return {
        id: punch.id,
        time: formatDateToTimeString(punch.timestamp),
        type: punch.type,
        note: punch.note,
      };
    });
	
	return {
		title,
		initialData,
		editingDate,
		handleOpenModal,
		handleCloseModal,
		handleSavePunches
	}
}