'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

function useTransactionData(txHash) {
    const [transactionData, setTransactionData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!txHash) return;

        async function fetchData() {
            try {
                const response = await axios.post(
                    'https://backend-etherneitor-production.up.railway.app/getTransactionByHash',
                    {
                        jsonrpc: '2.0',
                        method: 'eth_getTransactionByHash',
                        params: [txHash],
                        id: 1,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setTransactionData(response.data.result);
            } catch (error) {
                console.error('Error fetching transaction:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [txHash]);

    return { transactionData, isLoading };
}

export default useTransactionData;
