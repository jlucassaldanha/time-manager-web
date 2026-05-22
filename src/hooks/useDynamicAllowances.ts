import { AllowanceDto } from "@/core/domain/entities/Allowance";
import { useState } from "react";

export default function useDynamicAllowances(initialDto: AllowanceDto[] = []) {
  const [allowances, setAllowances] = useState<AllowanceDto[]>(initialDto);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const addAllowance = () => {
    const newAllowance: AllowanceDto = {
      id: `new-${crypto.randomUUID()}`,
      duration: "",
      justification: "",
    };
    setAllowances((prev) => [...prev, newAllowance]);
  };

  const removeAllowance = (id: string) => {
    if (!id.startsWith("new-")) {
      setDeletedIds((prev) => [...prev, id]);
    }
    setAllowances((prev) => prev.filter((item) => item.id !== id));
  };

  const updateAllowance = (id: string, field: keyof AllowanceDto, value: string) => {
    setAllowances((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return {
    allowances,
    deletedIds,
    addAllowance,
    removeAllowance,
    updateAllowance,
  };
}