"use client";

import { useEffect, useState } from "react";
import axios from "axios";

//import Logo from "../public/assets/logo.png";

export default function EthPrice() {
  const [ethPrice, setEthPrice] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const getEthPrice = async () => {
      try {
        const response = await axios.get(
          "https://hermes.pyth.network/api/latest_price_feeds?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace"
        );
        const priceData = response.data[0]; // Obtener los datos del precio
        const precioReal = priceData.price.price * 10 ** priceData.price.expo; // Calcular el Precio Real
        setEthPrice(precioReal.toFixed(1)); // Redondear el precio a 2 decimales y establecerlo en el estado
        setIsLoading(false); // Cambiar el estado de carga a falso cuando se obtiene el precio
      } catch (error) {
        console.error("Error al obtener el precio de ETH:", error);
      }
    };

    getEthPrice();
  }, []);

  return (

    <section className="pl-5 sm:pl-10 w-full flex justify-start items-center text-gray-400 pt-2 h-12 text-sm  sm:px-12">
      {isLoading ? (
        <>
          ETH Price:{" "}
          <div className="ml-2 rounded-full animate-pulse bg-blue-200 h-2 w-12">
            <span className=" h-2 bg-slate-200 rounded col-span-1 text-blue-300"></span>
          </div>
        </>
      ) : (
        <>
          ETH Price: <span className="ml-2 text-blue-300">${ethPrice}</span>
        </>
      )}
    </section>
  );
}
