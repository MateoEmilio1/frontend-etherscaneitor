"use client";

import { LineChart } from "@tremor/react";
import { useBlockData } from "@/app/hooks/useBlockData";
import { CustomTooltip } from "@/lib/utils";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ChartTitle from "@/app/components/ChartTitle";
import { BLOCKS_TO_FETCH } from "@/app/constants/blocksToFetchData";

export default function BlockHistoryChart() {
  const { blockData, isLoading } = useBlockData();

  const formatTime = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const sortedBlockData = [...blockData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const formattedChartData = sortedBlockData.map((block) => ({
    time: formatTime(block.date),
    "Block Number": block.block,
  }));

  return (
    <div className="justify-center items-center mb-4">
      <div className="sm:my-0 md:my-0 w-full h-auto rounded-xl overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="border-white ">
            <ChartTitle>Last {BLOCKS_TO_FETCH} block numbers</ChartTitle>
            <LineChart
              className="bg-dark-tremor-brand-faint px-2 rounded-b-xl"
              autoMinValue={true}
              colors={["emerald"]}
              data={formattedChartData}
              index="time"
              categories={["Block Number"]}
              yAxisLabel="Block Number"
              xAxisLabel="Time"
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
    </div>
  );
}
