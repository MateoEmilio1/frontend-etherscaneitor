"use client";

import React from "react";
import useFetchTotalNodes from "../hooks/useFetchTotalNodes";

export default function CardNodesCount() {
  const { totalNodes, loading, error } = useFetchTotalNodes();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-wrap text-lg mb-2">
          <span className="ml-4 font-semibold">Total Nodes:</span>
          <div className="mt-3 ml-2 rounded-full animate-pulse bg-blue-200 h-2 w-12" />
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    if (!totalNodes) {
      return <div className="text-center">No nodes count data available</div>;
    }

    return (
      <p className="text-lg mb-2">
        <span className="font-semibold">Total Nodes:</span>{" "}
        {totalNodes.TotalNodeCount}
      </p>
    );
  };

  return (
    <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-9 rounded-lg p-6 text-white text-center font-mono">
      <h2 className="text-2xl font-semibold mb-4">Total Nodes Count</h2>
      {renderContent()}
    </div>
  );
}
