"use client";

import { LineChart } from "@tremor/react";
import { useState } from "react";
import { CustomTooltip } from "@/lib/utils";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import BlockDataFetcher from "@/app/components/BlockDataFetcher";
import ChartTitle from "@/app/components/ChartTitle";
import { BLOCKS_TO_FETCH } from "@/app/constants/config";

export default function BlockHistoryChart() {
  const [blockData, setBlockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDataFetched = (data) => {
    setBlockData(data);
    setIsLoading(false);
  };

  const formatTime = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
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
    <div className="justify-center items-center">
      <div className="sm:my-0 md:my-0 w-[620px] h-[400px] rounded-xl overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="border-white rounded-xl">
            <ChartTitle>Last {BLOCKS_TO_FETCH} block numbers</ChartTitle>
            <LineChart
              className="bg-dark-tremor-brand-faint pl-1"
              autoMinValue={true}
              colors={["emerald"]}
              data={formattedChartData}
              index="time"            // Se utiliza "time" como índice
              categories={["Block Number"]}
              yAxisLabel="Block Number"
              xAxisLabel="Time"         // Etiqueta del eje X
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
      <BlockDataFetcher
        onDataFetched={handleDataFetched}
      />
    </div>
  );
}
