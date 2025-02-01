"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useEthPrice from "../hooks/useEthPrice";

const BLOCK_ENDPOINT = "https://mainnet.infura.io/v3/88f4afd4a9444021b9b9eb4c26f5b47b";

export default function GasSimulator() {
  const [baseFee, setBaseFee] = useState(0); // Evita NaN
  const [priorityFee, setPriorityFee] = useState(2); // Default 2 Gwei
  const [priorityFeeOption, setPriorityFeeOption] = useState("medium"); // Opción seleccionada
  const [gasUnits, setGasUnits] = useState(21000); // Default tx gas
  const [gasUnitsOption, setGasUnitsOption] = useState("transfer"); // Opción seleccionada
  const [maxFee, setMaxFee] = useState(null);
  const { ethPrice, isLoading: ethPriceLoading } = useEthPrice(); // Precio de ETH en USD

  // Opciones de Priority Fee
  const priorityFeeOptions = {
    slow: { label: "Lento (1 Gwei)", value: 1 },
    medium: { label: "Medio (2 Gwei)", value: 2 },
    fast: { label: "Rápido (3 Gwei)", value: 3 },
    custom: { label: "Personalizado", value: null },
  };

  // Opciones de Gas Units (basadas en operaciones comunes)
  const gasUnitsOptions = {
    transfer: { label: "Transferencia de ETH (21,000 gas)", value: 21000 },
    approve: { label: "Aprobación de contrato (45,000 gas)", value: 45000 },
    swap: { label: "Swap en Uniswap (100,000 gas)", value: 100000 },
    nftMint: { label: "Mint de NFT (150,000 gas)", value: 150000 },
    custom: { label: "Personalizado", value: null },
  };

  useEffect(() => {
    const fetchBaseFee = async () => {
      try {
        const response = await fetch(BLOCK_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: ["latest", false],
            id: 1,
          }),
        });
        const data = await response.json();
        if (data.result && data.result.baseFeePerGas) {
            console.log('blockfee per gas: ',data.result)
          const baseFeeWei = parseInt(data.result.baseFeePerGas, 16); // Base fee en Wei
          const baseFeeGwei = baseFeeWei / 1e9; // Convertimos a Gwei
          setBaseFee(baseFeeGwei);
        }
      } catch (error) {
        console.error("Error fetching base fee:", error);
      }
    };

    fetchBaseFee();
  }, []);

  const calculateMaxFee = () => {
    if (baseFee === null || isNaN(baseFee)) {
      console.error("Base Fee no disponible.");
      return;
    }

    const maxFeeGwei = (baseFee + priorityFee) * gasUnits; // Max Fee en Gwei
    const maxFeeEth = maxFeeGwei / 1e9; // Convertimos a ETH
    setMaxFee(maxFeeEth);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white p-4 space-y-4">
      
      {/* Sección informativa de Base Fee */}
      <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md shadow-lg">
        Base Fee Actual (Gas) : <strong>{baseFee.toFixed(2)} Gwei</strong>
      </div>

      {/* Contenedor con la Card del simulador */}
      <Card className="w-full max-w-2xl shadow-lg bg-gray-800 text-white">
        <CardHeader>
          <CardTitle>Ethereum Gas Fee Simulator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-400 text-sm">
            Seleccione o ingrese el <strong>Priority Fee</strong> y las <strong>unidades de gas</strong> para calcular el costo total de la transacción.
          </p>

          {/* Dropdown para Priority Fee */}
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">
              Priority Fee:
            </label>
            <Select
              value={priorityFeeOption}
              onValueChange={(value) => {
                setPriorityFeeOption(value);
                if (value !== "custom") {
                  setPriorityFee(priorityFeeOptions[value].value);
                }
              }}
            >
              <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {Object.entries(priorityFeeOptions).map(([key, option]) => (
                  <SelectItem key={key} value={key} className="hover:bg-gray-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {priorityFeeOption === "custom" && (
              <Input
                type="number"
                placeholder="Ingrese un valor personalizado (Gwei)"
                value={priorityFee}
                onChange={(e) => setPriorityFee(Number(e.target.value) || 0)}
                className="bg-gray-700 text-white border-gray-600"
              />
            )}
          </div>

          {/* Dropdown para Gas Units */}
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">
              Gas Units:
            </label>
            <Select
              value={gasUnitsOption}
              onValueChange={(value) => {
                setGasUnitsOption(value);
                if (value !== "custom") {
                  setGasUnits(gasUnitsOptions[value].value);
                }
              }}
            >
              <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
                {Object.entries(gasUnitsOptions).map(([key, option]) => (
                  <SelectItem key={key} value={key} className="hover:bg-gray-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {gasUnitsOption === "custom" && (
              <Input
                type="number"
                placeholder="Ingrese un valor personalizado (Gas Units)"
                value={gasUnits}
                onChange={(e) => setGasUnits(Number(e.target.value) || 0)}
                className="bg-gray-700 text-white border-gray-600"
              />
            )}
          </div>

          {/* Botón para calcular */}
          <Button onClick={calculateMaxFee} className="bg-green-500 hover:bg-green-600 text-white">
            Calcular costo de la transacción
          </Button>

          {/* Fórmula oficial del Max Fee */}
          <div className="bg-gray-700 p-3 rounded-md text-sm text-gray-300">
            <strong>Fórmula del Max Fee:</strong>
            <p className="mt-1">
              <code>Max Fee = (Base Fee + Priority Fee) * Gas Units</code>
            </p>
          </div>

          {/* Resultado del cálculo */}
          {maxFee !== null && (
            <p className="text-gray-300">
              <strong>Max Fee:</strong> {maxFee.toFixed(6)} ETH (~${ethPrice && !isNaN(ethPrice) ? (maxFee * ethPrice).toFixed(2) : "0.00"} USD)
            </p>
          )}
        </CardContent>
      </Card>

      {/* Cards informativas debajo del simulador */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        
        {/* Card informativa: Priority Fee */}
        <Card className="shadow-lg bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>¿Qué es el Priority Fee?</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 text-sm space-y-2">
            <p>El <strong>Priority Fee</strong> es una propina adicional pagada a los validadores para que procesen tu transacción más rápido.</p>
            <p>Se recomienda usar los siguientes valores:</p>
            <ul className="list-disc pl-5">
              <li><strong>Lento:</strong> 1 Gwei</li>
              <li><strong>Medio:</strong> 2 Gwei</li>
              <li><strong>Rápido:</strong> 3 Gwei</li>
            </ul>
          </CardContent>
        </Card>

        {/* Card informativa: Gas Units */}
        <Card className="shadow-lg bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>¿Qué son las Gas Units?</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 text-sm space-y-2">
            <p>Las <strong>unidades de gas</strong> representan el costo computacional de ejecutar una transacción.</p>
            <p>Algunos ejemplos comunes:</p>
            <ul className="list-disc pl-5">
              <li><strong>Transferencia de ETH:</strong> 21,000 gas</li>
              <li><strong>Aprobación de contrato:</strong> 45,000 gas</li>
              <li><strong>Swap en Uniswap:</strong> 100,000 gas</li>
              <li><strong>Mint de NFT:</strong> 150,000 gas</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}