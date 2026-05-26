import { useState } from "react";
import {
  CreateAllowanceAction,
  DeleteAllowanceAction,
  UpdateAllowanceAction,
} from "@/actions/AllowanceActions";
import { AllowanceDto } from "@/core/domain/entities/Allowance";
import { PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { formatToBrDateString } from "@/utils/formatToBrDateString";

export default function useAllowanceModal(records: PeriodSummaryResponse | undefined | null, onSuccessRefresh: () => void) {
  const [allowanceEditingDate, setAllowanceEditingDate] = useState<
    string | null
  >(null);
  const [allowanceTitle, setAllowanceTitle] = useState<string>("");
  /*const [allowanceInitialData, setAllowanceInitialData] = useState<
    AllowanceDto[] | null
  >(initialData);*/

  const handleOpenAllowanceModal = (
    title: string,
    date: string,
    //data?: AllowanceDto[],
  ) => {
    setAllowanceEditingDate(date);
    setAllowanceTitle(title);
    //setAllowanceInitialData(data || null);
  };

  const handleCloseAllowanceModal = () => {
    setAllowanceEditingDate(null);
    //setAllowanceInitialData(null);
  };

  const allowanceInitialData =
      records?.days
        .find((day) => formatToBrDateString(day.date) === allowanceEditingDate)
        ?.allowanceDetails?.map((allowance) => {
          return allowance;
        }) || [];

  const handleSaveAllowance = async (
    idsToDelete: string[],
    date: string,
    allowances: AllowanceDto[],
  ) => {
    const realIds = allowanceInitialData?.map((p) => p.id);

    for (let i = 0; i < allowances.length; i++) {
      const allowance = allowances[i];

      if (realIds?.includes(allowance.id)) {
        await UpdateAllowanceAction(date, allowance, "N/A");
      } else {
        await CreateAllowanceAction(date, allowance);
      }
    }

    for (let i = 0; i < idsToDelete.length; i++) {
      await DeleteAllowanceAction(idsToDelete[i], "N/A");
    }

    onSuccessRefresh();
  };

  const handleDeleteAllowance = async (id: string) => {
    await DeleteAllowanceAction(id, "N/A");
    onSuccessRefresh();
  };

  return {
    allowanceTitle,
    allowanceInitialData,
    allowanceEditingDate,
    handleOpenAllowanceModal,
    handleCloseAllowanceModal,
    handleSaveAllowance,
    handleDeleteAllowance,
  };
}
