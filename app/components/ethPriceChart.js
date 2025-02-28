"use client";

import { LineChart } from "@tremor/react";
import { useEthPriceHistory } from "@/app/hooks/useEthPriceHistory"; // Asegúrate de ajustar la ruta
import { CustomTooltip } from "@/lib/utils";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ChartTitle from "@/app/components/ChartTitle";

export default function EthPriceChart() {
    const { priceData, isLoading } = useEthPriceHistory();

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

    const sortedPriceData = [...priceData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const formattedChartData = sortedPriceData.map((entry) => ({
        time: formatTime(entry.date),
        "Ethereum Price": entry.price,
    }));

    return (
        <div className="justify-center items-center mb-4">
            <div className="sm:my-0 md:my-0 w-full h-auto rounded-xl overflow-hidden">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="border-white">
                        <ChartTitle>Ethereum Price (USD)</ChartTitle>
                        <LineChart
                            className="bg-dark-tremor-brand-faint px-2 rounded-b-xl"
                            autoMinValue={true}
                            colors={["emerald"]}
                            data={formattedChartData}
                            index="time"
                            categories={["Ethereum Price"]}
                            yAxisLabel="Price in USD"
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
