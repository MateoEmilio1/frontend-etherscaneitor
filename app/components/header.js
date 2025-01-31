"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const [ethPrice, setEthPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEthPrice = async () => {
      try {
        const response = await axios.get(
          "https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace"
        );
        const priceData = response.data[0];
        const precioReal = priceData.price.price * 10 ** priceData.price.expo;
        setEthPrice(precioReal.toFixed(1));
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el precio de ETH:", error);
      }
    };

    getEthPrice();
  }, []);

  return (
    <div className="flex items-center gap-x-6 text-sm text-gray-300">
      <span>ETH Price:</span>
      {isLoading ? (
        <div className="h-3 w-14 animate-pulse bg-gray-500 rounded-full"></div>
      ) : (
        <span className="text-blue-400">${ethPrice}</span>
      )}
    </div>
  );
}
