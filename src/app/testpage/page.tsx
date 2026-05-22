"use client";

import { RecordType } from "@/core/domain/entities/TimeRecord";
import WorkJourneyCard from "@/components/WorkJourneyCard/WorkJourneyCard";
import {
  CreateWorkJourneyRuleAction,
  GetWorkJourneyRuleAction,
  UpdateWorkJourneyRuleAction,
} from "@/actions/WorkJourneyRuleActions";
import {
  WorkJourneyResponse,
  WorkJourneyRule,
} from "@/core/domain/entities/WorkJourneyRule";
import { useEffect, useState } from "react";
import AllowanceCard from "@/components/AllowanceCard/AllowanceCard";
import AllowanceModal from "@/components/AllowanceModal/AllowanceModal";

export interface PunchEntry {
  id: string;
  time: string;
  type: RecordType;
  note?: string;
}

const emptyRule: WorkJourneyResponse = {
  monday: "",
  tuesday: "",
  wednesday: "",
  thursday: "",
  friday: "",
  saturday: "",
  sunday: "",
};

export default function TestPage() {

  return (

    <AllowanceModal date={"a"} />
  );
}
