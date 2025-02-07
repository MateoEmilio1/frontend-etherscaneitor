import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BLOCKS_TO_FETCH } from "@/app/constants/config";

const provider = new ethers.CloudflareProvider();

export default function BlockDataFetcher({ onDataFetched }) {
    const [hasFetchedData, setHasFetchedData] = useState(false);

    useEffect(() => {
        if (!hasFetchedData) {
            const fetchBlocksData = async () => {
                try {
                    // 1. Obtener el bloque más reciente
                    const latestBlock = await provider.getBlock("latest");
                    const latestBlockNumber = latestBlock.number;

                    // 2. Calcular los números de bloque deseados
                    const blockNumbers = [];
                    for (let i = 0; i < BLOCKS_TO_FETCH; i++) {
                        blockNumbers.push(latestBlockNumber - i);
                    }

                    // 3. Solicitar los bloques en paralelo (se agruparán en un solo batch)
                    const blocks = await Promise.all(
                        blockNumbers.map(num => provider.getBlock(num))
                    );

                    // Formateamos la data (por ejemplo, bloque, timestamp y fecha en ISO)
                    const blockData = blocks.map(block => ({
                        block: block.number,
                        timestamp: block.timestamp,
                        date: new Date(block.timestamp * 1000).toISOString(),
                    }));

                    onDataFetched(blockData);
                    setHasFetchedData(true);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchBlocksData();
        }
    }, [onDataFetched, hasFetchedData]);

    return null;
}
