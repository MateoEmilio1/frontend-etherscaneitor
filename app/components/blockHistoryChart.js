"use client";

import { LineChart } from "@tremor/react";
import { useState, useEffect } from "react";
import BlockData from "@/app/components/blockData";
import { FaSpinner, FaRegCopy } from "react-icons/fa";
import { CustomTooltip } from "@/lib/customToolTip";
import { formatDate } from "@/lib/formatDate";

export default function BlockHistoryChart() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [blockData, setBlockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 6);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());

    setStartDate(tenDaysAgo);
    setEndDate(yesterday);
  }, []);


  return (
    <div className="justify-center items-center">
      <div className="sm:my-0 md:my-0 w-[620px] h-[400px] rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-full bg-gradient-to-r from-blue-900 to-purple-900">
            <FaSpinner className="animate-spin text-4xl text-white" />
          </div>
        ) : (
          <div className="border-white rounded-xl">
            <h2 className="font-medium  text-tremor-metric bg-dark-tremor-brand-faint text-white">
              Block numbers of last 5 days
            </h2>
            <LineChart
              className="bg-dark-tremor-brand-faint pl-1"
              autoMinValue={true}
              colors={["emerald"]}
              data={blockData.map((block) => ({
                date: formatDate(block.date),
                "Block Number": block.block,
              }))}
              index="date"
              categories={["Block Number"]}
              onValueChange={(v) => setValue(v)}
              yAxisLabel="Block Number"
              xAxisLabel="Date"
              showGridLines={false}
              curveType="step"
              showAnimation={true}
              animationDuration={2000}
              yAxisWidth={80}
              tickGap={30}
              customTooltip={CustomTooltip}
            />
          </div>
        )}
      </div>
      <div className="mt-12 text-white">
        {startDate && endDate && (
          <BlockData
            startDate={startDate}
            endDate={endDate}
            onDataFetch={handleDataFetch}
          />
        )}
      </div>
    </div>
  );
}
