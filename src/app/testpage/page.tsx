"use client";

import DynamicPunchCard from "@/components/DynamicPunchCard/DynamicPunchCard";
import { RecordType } from "@/core/domain/entities/TimeRecord";

export interface PunchEntry {
  id: string;
  time: string;
  type: RecordType;
  note?: string;
}

export default function TestPage() {

  return (
    <DynamicPunchCard 
		onSave={(data: PunchEntry[]) => (console.log(data))}
	/>
  );
}
