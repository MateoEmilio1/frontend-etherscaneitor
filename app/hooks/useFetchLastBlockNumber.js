import { useState, useEffect } from "react";
import axios from "axios";

// Hook personalizado para obtener el número del último bloque de Ethereum
const useFetchLastBlockNumber = () => {
    const [blockNumber, setBlockNumber] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLastBlockNumber = async () => {
            try {
                // En local usar: http://localhost:5001/getEthLastBlockNumber
                // Prod: https://backend-etherneitor-production.up.railway.app/getEthLastBlockNumber

                // const response = await axios.post('http://localhost:5001/getEthLastBlockNumber');
                const response = await axios.post(
                    "https://backend-etherneitor-production.up.railway.app/getEthLastBlockNumber"
                );
                const lastBlockNumber = parseInt(response.data.result, 16); // Convert hex to decimal
                setBlockNumber(lastBlockNumber);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Error fetching last block number");
                setLoading(false);
            }
        };

        fetchLastBlockNumber();
    }, []);

    return { blockNumber, loading, error };
};

export default useFetchLastBlockNumber;
