import React, { useState, useEffect } from 'react';
const EthDater = require("ethereum-block-by-date");
const { ethers } = require("ethers");

const provider = new ethers.CloudflareProvider();
const dater = new EthDater(provider);

const BlocksData = ({ startDate, endDate, onDataFetch }) => {
  const [blocksData, setBlocksData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blockPromises = [];
        let currentDate = new Date(startDate);

        // Ajuste de fecha de finalización para excluir el último día (hoy)
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

        while (currentDate < adjustedEndDate) {
          const nextDate = new Date(currentDate);
          nextDate.setDate(nextDate.getDate() + 1);

          const blocks = await dater.getEvery(
            "days",
            currentDate.toISOString(),
            nextDate.toISOString(),
            1,
            true,
            false
          );

          blockPromises.push(blocks);
          currentDate = nextDate;
        }

        const blocksData = await Promise.all(blockPromises);
        const flattenedData = blocksData.flat();

        // Filtrar bloques duplicados
        const uniqueBlocks = Array.from(new Set(flattenedData.map(block => block.block)))
          .map(blockId => {
            return flattenedData.find(block => block.block === blockId);
          });

        console.log(uniqueBlocks);
        setBlocksData(uniqueBlocks);
        onDataFetch(uniqueBlocks);  // Llama al callback con los datos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [startDate, endDate]);

  return (
    <></>
  );
};

export default BlocksData;
