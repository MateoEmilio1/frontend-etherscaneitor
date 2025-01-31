'use client'

import { useEffect, useState } from "react";
import axios from "axios";

const useEthPrice = () => {
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

    return { ethPrice, isLoading };
};

export default useEthPrice;
