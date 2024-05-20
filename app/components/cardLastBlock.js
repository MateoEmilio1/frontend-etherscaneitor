"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CardLastBlock() {
  const [blockNumber, setBlockNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastBlockNumber = async () => {
      try {
        //En local usar: http://localhost:5001/getEthLastBlockNumber
        //Prod:https://backend-etherneitor-production.up.railway.app/getEthLastBlockNumber

        //const response = await axios.post('http://localhost:5001/getEthLastBlockNumber');
        const response = await axios.post('https://backend-etherneitor-production.up.railway.app/getEthLastBlockNumber');
        const lastBlockNumber = parseInt(response.data.result, 16); // Convert hex to decimal
        setBlockNumber(lastBlockNumber);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching last block number');
        setLoading(false);
      }
    };

    fetchLastBlockNumber();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-sm mx-auto xl:mt-32 2xl:mt-20 rounded-lg p-6 text-white text-center font-mono">
      <h2 className="text-2xl font-semibold text-center mb-4">Ethereum Last Block Number</h2>
      {blockNumber !== null ? (
        <p className="text-lg mb-2 "><span className="font-semibold">Last Block Number:</span> {blockNumber}</p>
      ) : (
        <div className="text-center">No block number data available</div>
      )}
    </div>
  );
}
