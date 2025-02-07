import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BLOCKS_TO_FETCH } from "@/app/constants/blocksToFetchData";

const provider = new ethers.CloudflareProvider();

export default function BlockDataFetcher({ onDataFetched }) {
    const [hasFetchedData, setHasFetchedData] = useState(false);

    useEffect(() => {
        if (!hasFetchedData) {
            const fetchBlocksData = async () => {
                try {
                    const latestBlock = await provider.getBlock("latest");
                    const latestBlockNumber = latestBlock.number;

                    const blockNumbers = [];
                    for (let i = 0; i < BLOCKS_TO_FETCH; i++) {
                        blockNumbers.push(latestBlockNumber - i);
                    }

                    const blocks = await Promise.all(
                        blockNumbers.map(num => provider.getBlock(num))
                    );

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
