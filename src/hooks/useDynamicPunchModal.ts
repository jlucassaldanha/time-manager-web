import { PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { formatDateToTimeString } from "@/utils/formatDateToTimeString";
import { formatToBrDateString } from "@/utils/formatToBrDateString";
import { PunchEntry } from "./useDynamicPunches";
import { useState } from "react";
import { CreateManualPunchAction, DeletePunchAction, UpdatePunchAction } from "@/core/actions/PunchActions";

export default function useDynamicPunchModal(
  records: PeriodSummaryResponse | undefined,
  onSuccessRefresh: () => void
) {

	const [editingDate, setEditingDate] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleOpenModal = (title: string, date: string) => {
    setEditingDate(date);
    setTitle(title);
  };

  const handleCloseModal = () => {
    setEditingDate(null);
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
    }) || [];

  const handleSavePunches = async (idsToDelete: string[], date: string, punches: PunchEntry[]) => {
    const realIds = initialData.map((p) => p.id)

    for (let i = 0; i < punches.length; i++) {
      const punch = punches[i]

      if (realIds.includes(punch.id)) {
        await UpdatePunchAction(punch.id, date, punch.time, punch.type, punch.note || "N/A")
      } else {
        await CreateManualPunchAction(date, punch.time, punch.type, punch.note || "N/A")
      }
    }

    for (let i = 0; i < idsToDelete.length; i++) {
      await DeletePunchAction(idsToDelete[i], "N/A")
    }

    onSuccessRefresh()
  };

	return {
		title,
		initialData,
		editingDate,
		handleOpenModal,
		handleCloseModal,
		handleSavePunches
	}
}