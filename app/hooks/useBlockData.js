import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BLOCKS_TO_FETCH } from "@/app/constants/blocksToFetchData";

const provider = new ethers.CloudflareProvider();

export function useBlockData() {
    const [blockData, setBlockData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlocksData = async () => {
            try {
                const latestBlock = await provider.getBlock("latest");
                const latestBlockNumber = latestBlock.number;

                const blockNumbers = [];
                for (let i = 0; i < BLOCKS_TO_FETCH; i++) {
                    blockNumbers.push(latestBlockNumber - i);
                }

                const blocks = await Promise.all(
                    blockNumbers.map((num) => provider.getBlock(num))
                );

                const fetchedBlockData = blocks.map((block) => ({
                    block: block.number,
                    timestamp: block.timestamp,
                    date: new Date(block.timestamp * 1000).toISOString(),
                }));

                setBlockData(fetchedBlockData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlocksData();
    }, []);

    return { blockData, isLoading };
}
