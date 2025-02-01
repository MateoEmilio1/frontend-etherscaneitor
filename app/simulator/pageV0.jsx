"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useEthPrice from "../hooks/useEthPrice";

const BLOCK_ENDPOINT = "https://mainnet.infura.io/v3/88f4afd4a9444021b9b9eb4c26f5b47b";

export default function GasSimulator() {
  const [baseFee, setBaseFee] = useState(0); // Evita NaN
  const [priorityFee, setPriorityFee] = useState(2); // Default 2 Gwei
  const [gasUnits, setGasUnits] = useState(21000); // Default tx gas
  const [maxFee, setMaxFee] = useState(null);
  const { ethPrice, isLoading: ethPriceLoading } = useEthPrice(); // Precio de ETH en USD

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
        Base Fee Actual: <strong>{baseFee.toFixed(2)} Gwei</strong>
      </div>

      {/* Contenedor con la Card del simulador + Cards informativas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* Card principal: Simulador */}
        <Card className="col-span-2 w-full shadow-lg bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Ethereum Gas Fee Simulator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-400 text-sm">
              Ingrese el <strong>Priority Fee</strong> y las <strong>unidades de gas</strong> para calcular el costo total de la transacción.
            </p>

            <Input
              type="number"
              placeholder="Ej: 2 (Priority Fee en Gwei)"
              value={priorityFee}
              onChange={(e) => setPriorityFee(Number(e.target.value) || 0)}
              className="bg-gray-700 text-white border-gray-600"
            />

            <Input
              type="number"
              placeholder="Ej: 21000 (Gas Units)"
              value={gasUnits}
              onChange={(e) => setGasUnits(Number(e.target.value) || 0)}
              className="bg-gray-700 text-white border-gray-600"
            />

            <Button onClick={calculateMaxFee} className="bg-green-500 hover:bg-green-600 text-white">
              Calcular costo de la transacción
            </Button>

            {maxFee !== null && (
              <p className="text-gray-300">
                <strong>Max Fee:</strong> {maxFee.toFixed(6)} ETH (~${ethPrice && !isNaN(ethPrice) ? (maxFee * ethPrice).toFixed(2) : "0.00"} USD)
              </p>
            )}
          </CardContent>
        </Card>

        {/* Card informativa: Priority Fee */}
        <Card className="shadow-lg bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>¿Qué es el Priority Fee?</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 text-sm space-y-2">
            <p>El <strong>Priority Fee</strong> es una propina adicional pagada a los validadores para que procesen tu transacción más rápido.</p>
            <p>Se recomienda usar al menos <strong>2 Gwei</strong>, pero puedes aumentarlo si deseas una confirmación más rápida.</p>
          </CardContent>
        </Card>

        {/* Card informativa: Gas Units */}
        <Card className="shadow-lg bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>¿Qué son las Gas Units?</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300 text-sm space-y-2">
            <p>Las <strong>unidades de gas</strong> representan el costo computacional de ejecutar una transacción.</p>
            <p>El valor mínimo es <strong>21,000 gas</strong> para transacciones simples, pero contratos inteligentes pueden requerir más.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
