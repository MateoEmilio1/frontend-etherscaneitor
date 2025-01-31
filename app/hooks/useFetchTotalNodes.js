import { useState, useEffect } from "react";
import axios from "axios";

// Hook personalizado para obtener el conteo total de nodos
const useFetchTotalNodes = () => {
    const [totalNodes, setTotalNodes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalNodesCount = async () => {
            try {
                // En local usar: http://localhost:5001/getTotalNodesCount
                // Prod: https://backend-etherneitor-production.up.railway.app/getTotalNodesCount
                const response = await axios.get(
                    "https://backend-etherneitor-production.up.railway.app/getTotalNodesCount"
                );
                // const response = await axios.get('http://localhost:5001/getTotalNodesCount');
                setTotalNodes(response.data.totalNodesCount);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Error fetching total nodes count");
                setLoading(false);
            }
        };

        fetchTotalNodesCount();
    }, []);

    return { totalNodes, loading, error };
};

export default useFetchTotalNodes;
