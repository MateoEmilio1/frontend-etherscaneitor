"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CardNodesCount() {
  const [totalNodes, setTotalNodes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalNodesCount = async () => {
      try {
        //En local usar: http://localhost:5001/getTotalNodesCount
        //Prod:https://backend-etherneitor-production.up.railway.app/getTotalNodesCount

        const response = await axios.get(
          "https://backend-etherneitor-production.up.railway.app/getTotalNodesCount"
        );
        //const response = await axios.get('http://localhost:5001/getTotalNodesCount');
        setTotalNodes(response.data.totalNodesCount);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching total nodes count");
        setLoading(false);
      }
    };

    fetchTotalNodesCount();
  }, []);

  if (loading) {
    return (
      <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-9 rounded-lg p-6 text-white text-center font-mono">
        <h2 className="text-2xl font-semibold  mb-4">Total Nodes Count</h2>

        <div>
          <div className="flex flex-wrap text-lg mb-2">
            <span className=" ml-4 font-semibold">Total Nodes:</span>{" "}
            <div className="mt-3 ml-2 rounded-full animate-pulse bg-blue-200 h-2 w-12">
              <span className=" h-2 bg-slate-200 rounded col-span-1 text-blue-300"></span>
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
    <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-9 rounded-lg p-6 text-white text-center font-mono">
      <h2 className="text-2xl font-semibold  mb-4">Total Nodes Count</h2>
      {totalNodes ? (
        <div>
          <p className="text-lg mb-2">
            <span className="font-semibold">Total Nodes:</span>{" "}
            {totalNodes.TotalNodeCount}
          </p>
        </div>
      ) : (
        <div className="text-center">No nodes count data available</div>
      )}
    </div>
  );
}
