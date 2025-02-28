"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useBaseFee from "../hooks/useBaseFee";
import {
  PRIORITY_FEE_OPTIONS,
  GAS_UNITS_OPTIONS,
  INFO_CARDS,
} from "../constants/gasSimulatorData";
import { useEthPriceContext } from "@/app/store/useEthPriceContext";

export default function GasSimulator() {
  const baseFee = useBaseFee();
  const [priorityFee, setPriorityFee] = useState(2);
  const [priorityFeeOption, setPriorityFeeOption] = useState("medium");
  const [gasUnits, setGasUnits] = useState(21000);
  const [gasUnitsOption, setGasUnitsOption] = useState("transfer");
  const [maxFee, setMaxFee] = useState(null);
  const ethPrice = useEthPriceContext((state) => state.ethPrice);
  const isLoading = useEthPriceContext((state) => state.isLoading);
  const fetchEthPrice = useEthPriceContext((state) => state.fetchEthPrice);

  useEffect(() => {
    fetchEthPrice();
  }, [fetchEthPrice]);

  useEffect(() => {
    if (baseFee === null || isNaN(baseFee)) {
      console.error("Base Fee not available.");
      return;
    }
    const maxFeeGwei = (baseFee + priorityFee) * gasUnits;
    const maxFeeEth = maxFeeGwei / 1e9;
    setMaxFee(maxFeeEth);
  }, [baseFee, priorityFee, gasUnits]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-4 space-y-4">
      <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md shadow-lg">
        Current Base Fee (Gas): <strong>{baseFee.toFixed(2)} Gwei</strong>
      </div>

      <Card className="w-full max-w-2xl shadow-lg bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Ethereum Gas Fee Simulator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-sm">
            Select or enter the <strong>Priority Fee</strong> and{" "}
            <strong>gas units</strong> to calculate the total cost of the
            transaction.
          </p>

          <div className="space-y-2">
            <label className="text-gray-300 text-sm">Priority Fee:</label>
            <Select
              value={priorityFeeOption}
              onValueChange={(value) => {
                setPriorityFeeOption(value);
                if (value !== "custom") {
                  setPriorityFee(PRIORITY_FEE_OPTIONS[value].value);
                }
              }}
            >
              <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {Object.entries(PRIORITY_FEE_OPTIONS).map(([key, option]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="hover:bg-gray-700"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {priorityFeeOption === "custom" && (
              <Input
                type="number"
                placeholder="Enter a custom value (Gwei)"
                value={priorityFee}
                onChange={(e) => setPriorityFee(Number(e.target.value) || 0)}
                className="bg-gray-700 text-white border-gray-600"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 text-sm">Gas Units:</label>
            <Select
              value={gasUnitsOption}
              onValueChange={(value) => {
                setGasUnitsOption(value);
                if (value !== "custom") {
                  setGasUnits(GAS_UNITS_OPTIONS[value].value);
                }
              }}
            >
              <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {Object.entries(GAS_UNITS_OPTIONS).map(([key, option]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="hover:bg-gray-700"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {gasUnitsOption === "custom" && (
              <Input
                type="number"
                placeholder="Enter a custom value (Gas Units)"
                value={gasUnits}
                onChange={(e) => setGasUnits(Number(e.target.value) || 0)}
                className="bg-gray-700 text-white border-gray-600"
              />
            )}
          </div>

          <div className="bg-gray-700 p-3 rounded-md text-sm text-gray-300">
            <strong>Max Fee Formula:</strong>
            <p className="mt-1">
              <code>Max Fee = (Base Fee + Priority Fee) * Gas Units</code>
            </p>
          </div>

          {maxFee !== null && (
            <p className="text-gray-300">
              <strong>Max Fee:</strong> {maxFee.toFixed(6)} ETH (~$
              {ethPrice && !isNaN(ethPrice)
                ? (maxFee * ethPrice).toFixed(2)
                : "0.00"}{" "}
              USD)
            </p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {INFO_CARDS.map((card, index) => (
          <Card key={index} className="shadow-lg bg-gray-800 text-white">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 text-sm space-y-2">
              {card.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
