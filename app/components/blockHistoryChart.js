"use client";

import { LineChart } from "@tremor/react";
import { useState } from "react";
import { CustomTooltip } from "@/lib/utils";
import LoadingSpinner from "@/app/components/LoadingSpinner"
import BlockDataFetcher from "@/app/components/BlockDataFetcher";
import ChartTitle from "@/app/components/ChartTitle";
import { DAYS_TO_FETCH } from "@/app/constants/config";

export default function BlockHistoryChart() {
  const [blockData, setBlockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDataFetched = (data) => {
    setBlockData(data);
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div className="justify-center items-center">
      <div className="sm:my-0 md:my-0 w-[620px] h-[400px] rounded-xl overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="border-white rounded-xl">
            <ChartTitle>Block numbers of last {DAYS_TO_FETCH} days</ChartTitle>
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
      <BlockDataFetcher
        daysToFetch={DAYS_TO_FETCH}
        onDataFetched={handleDataFetched}
      />
    </div>
  );
}