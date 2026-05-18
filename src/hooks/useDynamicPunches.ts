import { RecordType } from "@/core/domain/entities/TimeRecord";
import { useState } from "react";

export interface PunchEntry {
  id: string;
  time: string;
  type: RecordType;
  note?: string;
}

export default function useDynamicPunches(initialPunches: PunchEntry[] = []) {
  const [punches, setPunches] = useState<PunchEntry[]>(initialPunches);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const addPunch = () => {
    const newPunch: PunchEntry = {
      id: crypto.randomUUID(),
      time: "",
      type: "Entry",
    };

    setPunches((prev) => [...prev, newPunch]);
  };

  const removePunch = (id: string) => {
    const isRealId = initialPunches.some((p) => p.id === id);

    if (isRealId) {
      setDeletedIds((prev) => [...prev, id]);
    }

    setPunches((prev) => prev.filter((punch) => punch.id !== id));
  };

  const updatePunch = (id: string, field: keyof PunchEntry, value: string) => {
    setPunches((prev) =>
      prev.map((punch) =>
        punch.id === id ? { ...punch, [field]: value } : punch,
      ),
    );
  };

  return {
    punches,
    deletedIds,
    addPunch,
    removePunch,
    updatePunch,
  };
}
