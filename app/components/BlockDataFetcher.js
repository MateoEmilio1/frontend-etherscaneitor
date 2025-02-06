import { useEffect, useState } from "react";
import { ethers } from "ethers";
import EthDater from "ethereum-block-by-date";

const provider = new ethers.CloudflareProvider();
const dater = new EthDater(provider);

export default function BlockDataFetcher({ daysToFetch, onDataFetched }) {
    const [hasFetchedData, setHasFetchedData] = useState(false);

    useEffect(() => {
        if (!hasFetchedData) {
            const fetchBlocksData = async () => {
                try {
                    const today = new Date();
                    const startDate = new Date(today);
                    startDate.setDate(today.getDate() - daysToFetch);

                    const blockPromises = [];
                    let currentDate = new Date(startDate);
                    const endDate = new Date(today);

                    while (currentDate <= endDate) {
                        const block = await dater.getDate(currentDate.toISOString());
                        blockPromises.push({
                            date: currentDate.toISOString(),
                            block: block.block,
                        });
                        currentDate.setDate(currentDate.getDate() + 1);
                    }

                    onDataFetched(blockPromises);
                    setHasFetchedData(true);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchBlocksData();
        }
    }, [daysToFetch, onDataFetched, hasFetchedData]);

    return null;
}