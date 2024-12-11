"use client";

import { LineChart } from "@tremor/react";
import { useState, useEffect } from "react";
import BlockData from "@/app/components/blockData";
import { FaSpinner, FaRegCopy } from "react-icons/fa";

export default function BlockHistoryChart() {
  const [value, setValue] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [blockData, setBlockData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tenDaysAgo = new Date(today);
    tenDaysAgo.setDate(today.getDate() - 6);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());

    setStartDate(tenDaysAgo);
    setEndDate(yesterday);
  }, []);

  const handleDataFetch = (data) => {
    setBlockData(data);
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };


  const copyBlockNumberToClipboard = (blockNumber) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(blockNumber)
        .then(() => {
          console.log("Block number copied to clipboard:", blockNumber);
          // Puedes agregar aquí un mensaje de éxito o realizar otras acciones necesarias
        })
        .catch((error) => {
          console.error("Error copying block number to clipboard:", error);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        });
    } else {
      console.error("Clipboard API not supported in this browser.");
      // Manejar el caso en que la API del portapapeles no esté disponible
    }
  };

  const CustomTooltip = (props) => {
    const { payload, active } = props;

    if (!active || !payload) return null;

    const seenValues = new Set();
    const uniquePayload = payload.filter((category) => {
      if (seenValues.has(category.value)) {
        return false;
      } else {
        seenValues.add(category.value);
        return true;
      }
    });

    return (
      <div className="w-56 mt-14 rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {uniquePayload.map((category) => (
          <div key={category.value} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value}{" "}
                {/* <button onClick={copyBlockNumberToClipboard(category.value)}>
                  {" "}
                </button> */}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

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
