import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import EthDater from "ethereum-block-by-date"; // Use import for consistency

const provider = new ethers.CloudflareProvider(); // Ensure this provider is configured correctly
const dater = new EthDater(provider);

const BlockData = ({ startDate, endDate, onDataFetch }) => {
  const [blocksData, setBlocksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data has already been fetched
        if (blocksData.length > 4) {
          return; // Return early to avoid making additional requests
        }

        const blockPromises = [];
        let currentDate = new Date(startDate);
        const adjustedEndDate = new Date(endDate);
        currentDate.setDate(currentDate.getDate() + 2);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        // Use a for loop for 1 to 4 iterations
        for (let i = 0; i < 4; i++) {
          if (currentDate >= adjustedEndDate) break; // Stop if the date exceeds the end date

          const block = await dater.getDate(currentDate.toISOString());
          blockPromises.push(block);

          // Move to the next day
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setBlocksData(blockPromises);
        onDataFetch(blockPromises); // Call the callback with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate, onDataFetch, blocksData]); // Add blocksData to the dependency array

  return <></>;
};

export default BlockData;