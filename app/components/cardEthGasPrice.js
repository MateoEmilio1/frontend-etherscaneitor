"use client";

import React from "react";
import useFetchEthGasPrice from "../hooks/useFetchEthGasPrice";

const EthGasPrice = () => {
  const { gasPrice, loading, error } = useFetchEthGasPrice();

  if (loading) {
    return (
      <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-20 rounded-lg p-6 text-white text-center font-mono">
        <h2 className="text-2xl font-semibold mb-4">Ethereum Gas Price</h2>

        <div className="flex flex-wrap text-lg mb-2">
          <span className="ml-4 font-semibold">Gas Price:</span>{" "}
          <div className="mt-3 ml-2 rounded-full animate-pulse bg-blue-200 h-2 w-12">
            <span className="h-2 bg-slate-200 rounded col-span-1 text-blue-300"></span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-20 rounded-lg p-6 text-white text-center font-mono">
      <h2 className="text-2xl font-semibold mb-4">Ethereum Gas Price</h2>
      {gasPrice !== null ? (
        <p className="text-lg mb-2">
          <span className="font-semibold">Gas Price:</span>{" "}
          {gasPrice.toFixed(2)} Gwei
        </p>
      ) : (
        <div className="text-center">No gas price data available</div>
      )}
    </div>
  );
};

export default EthGasPrice;
