"use client";
import React from "react";
import useFetchTVLData from "../hooks/useFetchTVLData";

const CardEthereumTVL = () => {
  const { tvlData, loading, error } = useFetchTVLData();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  if (loading) {
    return (
      <div className="max-w-sm mx-auto rounded-lg p-6">
        <div className="text-white flex flex-wrap">
          <h2 className="text-4xl font-semibold text-center mb-4">
            Ethereum Total Value Locked
          </h2>
          <div className="flex flex-wrap text-xl mb-2 text-center ">
            <span className="ml-10 font-semibold font-mono">TVL:</span>{" "}
            <div className="mt-2 ml-2 rounded-full animate-pulse bg-blue-200 h-4 w-48">
              <span className="h-2 bg-slate-200 rounded col-span-1 text-blue-300"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-sm mx-auto rounded-lg p-6">
      {tvlData ? (
        <div className="text-white">
          <h2 className="text-4xl font-semibold text-center mb-4">
            Ethereum Total Value Locked
          </h2>
          <p className="text-xl mb-2 text-center ">
            <span className="font-semibold font-mono">TVL:</span>{" "}
            {formatCurrency(tvlData.tvl)}
          </p>
        </div>
      ) : (
        <div className="text-center">No data found for Ethereum</div>
      )}
    </div>
  );
};

export default CardEthereumTVL;
