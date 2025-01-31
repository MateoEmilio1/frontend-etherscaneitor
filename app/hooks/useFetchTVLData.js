import { useState, useEffect } from "react";
import axios from "axios";

const useFetchTVLData = () => {
    const [tvlData, setTvlData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTVLData = async () => {
            try {
                const response = await axios.get("https://api.llama.fi/v2/chains");
                const ethData = response.data.find(
                    (chain) => chain.name === "Ethereum"
                );
                setTvlData(ethData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Error fetching data");
                setLoading(false);
            }
        };

        fetchTVLData();
    }, []);

    return { tvlData, loading, error };
};

export default useFetchTVLData;
