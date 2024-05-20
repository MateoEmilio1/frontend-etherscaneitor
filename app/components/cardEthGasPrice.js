"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EthGasPrice() {
  const [gasPrice, setGasPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGasPrice = async () => {
      try {
        //En local usar: http://localhost:5001/getEthGasPrice
        //Prod:https://backend-etherneitor-production.up.railway.app/getEthGasPrice

        //const response = await axios.post("http://localhost:5001/getEthGasPrice");
        
        const response = await axios.post("https://backend-etherneitor-production.up.railway.app/getEthGasPrice");

        const gasPriceInWei = parseInt(response.data.result, 16); // Convert hex to decimal
        const gasPriceInGwei = gasPriceInWei / 1e9; // Convert wei to gwei
        setGasPrice(gasPriceInGwei);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching gas price");
        setLoading(false);
      }
    };

    fetchGasPrice();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-20 rounded-lg p-6 text-white text-center font-mono">
      <h2 className="text-2xl font-semibold mb-4">Ethereum Gas Price</h2>
      {gasPrice !== null ? (
        <p className="text-lg mb-2">
          <span className="font-semibold ">Gas Price:</span>{" "}
          {gasPrice.toFixed(2)} Gwei
        </p>
      ) : (
        <div className="text-center">No gas price data available</div>
      )}
    </div>
  );
}
