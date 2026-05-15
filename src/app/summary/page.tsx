"use client";

import PeriodController from "@/components/PeriodController/PeriodController";
import { GetPeriodSummaryAction } from "@/core/actions/SummaryActions";
import { PeriodSummaryResponse } from "@/core/domain/entities/Summary";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import DailyAccordion from "@/components/DailyAccordion/DailyAccordion";
import PeriodCard from "@/components/PeriodCard/PeriodCard";

export default function Summary() {
  const initialStartDate = new Date();
  initialStartDate.setDate(initialStartDate.getDate() - 7);
  const initialStartDateString = initialStartDate.toISOString().split("T")[0];

  const initialEndDateString = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState<string>(initialStartDateString);
  const [endDate, setEndDate] = useState<string>(initialEndDateString);
  const [data, setData] = useState<PeriodSummaryResponse>();

  useEffect(() => {
    const getData = async () => {
      const value = await GetPeriodSummaryAction(startDate, endDate);
      setData(value);
    };

    getData();
  }, []);

  const handleClick = async () => {
    const value = await GetPeriodSummaryAction(startDate, endDate);
    setData(value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: "5px" }}>
      <PeriodController
        onClick={handleClick}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        startDateValue={startDate}
        endDateValue={endDate}
      />

      <PeriodCard period={data}/>

      <Box>
        {data?.days.map((day, i) => (
          <DailyAccordion day={day} key={i} />
        ))}
      </Box>
      
    </Box>
  );
}
