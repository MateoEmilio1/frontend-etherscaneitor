"use client";

import React from "react";
import useFetchLastBlockNumber from "../hooks/useFetchLastBlockNumber";

export default function CardLastBlock() {
  const { blockNumber, loading, error } = useFetchLastBlockNumber();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-lg mb-2 flex flex-wrap">
          <span className="ml-4 font-semibold">Last Block Number:</span>
          <div className="mt-3 ml-2 rounded-full animate-pulse bg-blue-200 h-2 w-12" />
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (blockNumber !== null) {
      return (
        <p className="text-lg mb-2">
          <span className="font-semibold">Last Block Number:</span>{" "}
          {blockNumber}
        </p>
      );
    }

    return <div className="text-center">No block number data available</div>;
  };

  return (
    <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-9 rounded-lg p-6 text-white text-center font-mono">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Ethereum Last Block Number
      </h2>
      {renderContent()}
    </div>
  );
}
