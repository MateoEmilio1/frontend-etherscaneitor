import { useState, useEffect } from "react";

const BACKEND_ENDPOINT = "https://backend-etherneitor-production.up.railway.app/getLastBlock";

export default function useBaseFee() {
    const [baseFee, setBaseFee] = useState(0);

    useEffect(() => {
        const fetchBaseFee = async () => {
            try {

                const response = await fetch(BACKEND_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();

                if (data.block && data.block.baseFeePerGas) {

                    const baseFeeWei = parseInt(data.block.baseFeePerGas, 16);
                    const baseFeeGwei = baseFeeWei / 1e9;
                    setBaseFee(baseFeeGwei);
                }
            } catch (error) {
                console.error("Error fetching base fee:", error);
            }
        };

        fetchBaseFee();
    }, []);

    return baseFee;
}
