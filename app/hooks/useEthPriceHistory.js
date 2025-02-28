import { useState, useEffect } from "react";

export function useEthPriceHistory() {
    const [priceData, setPriceData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=1"
                );
                const data = await response.json();

                const formattedData = data.prices.map(entry => ({
                    date: new Date(entry[0]).toISOString(),
                    price: entry[1],
                }));
                setPriceData(formattedData);
            } catch (error) {
                console.error("Error fetching Ethereum price history:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return { priceData, isLoading };
}
