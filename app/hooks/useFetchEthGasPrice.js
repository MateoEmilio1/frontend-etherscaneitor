import { useState, useEffect } from "react";
import axios from "axios";

// Hook personalizado para obtener el precio del gas de Ethereum
const useFetchEthGasPrice = () => {
    const [gasPrice, setGasPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGasPrice = async () => {
            try {
                // En local usar: http://localhost:5001/getEthGasPrice
                // Prod: https://backend-etherneitor-production.up.railway.app/getEthGasPrice

                // const response = await axios.post("http://localhost:5001/getEthGasPrice");
                const response = await axios.post(
                    "https://backend-etherneitor-production.up.railway.app/getEthGasPrice"
                );

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

    return { gasPrice, loading, error };
};

export default useFetchEthGasPrice;
