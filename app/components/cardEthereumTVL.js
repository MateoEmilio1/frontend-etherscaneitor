"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CardEthereumTVL() {
  const [tvlData, setTvlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVLData = async () => {
      try {
        const response = await axios.get('https://api.llama.fi/v2/chains');
        const ethData = response.data.find(chain => chain.name === 'Ethereum');
        setTvlData(ethData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchTVLData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-sm mx-auto rounded-lg p-6">
      {tvlData ? (
        <div className='text-white '>
          <h2 className="text-4xl font-semibold text-center mb-4">Ethereum Total Value Locked</h2>
          <p className="text-xl mb-2 text-center "><span className="font-semibold font-mono">TVL:</span> {formatCurrency(tvlData.tvl)}</p>
        </div>
      ) : (
        <div className="text-center">No data found for Ethereum</div>
      )}
    </div>
  );
}
