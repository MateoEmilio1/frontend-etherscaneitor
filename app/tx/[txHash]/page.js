"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

export default function TransactionDetail() {
  const [txHash, setTxHash] = useState("");
  const [transactionData, setTransactionData] = useState(null);

  //Obtengo el txHash del link
  useEffect(() => {
    const currentLink = window.location.href;
    const regex = /\/tx\/(.+)/;
    const match = currentLink.match(regex);
    const hash = match ? match[1] : null;
    console.log(hash);
    setTxHash(hash);
  }, []);
  // TO DO: Hacer petición a Infura con la txnHash
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://backend-etherneitor-production.up.railway.app/getTransactionByHash",
          {
            jsonrpc: "2.0",
            method: "eth_getTransactionByHash",
            params: [txHash],
            id: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setTransactionData(response.data.result);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    }
    fetchData();
  }, [txHash]); // Agregar txHash como dependencia para que la solicitud se realice cuando cambie

  /* Boton copyHashToClipboard */
  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(txHash);
  };

  /* Boton copySenderToClipboard */
  const copySenderToClipboard = () => {
    navigator.clipboard.writeText(transactionData.from);
  };

  /* Boton copyReceiverToClipboard */
  const copyReceiverToClipboard = () => {
    navigator.clipboard.writeText(transactionData.to);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="min-h-screen bg-gray-100 flex justify-center items-center px-5">
      <div className="bg-white rounded-lg shadow-lg p-8 mx-7 max-w-full">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Transaction Detail</h2>
          <hr className="border-t border-gray-300 mb-4" />
          <div className=" gap-4 ">
            <div className=" mx-auto">
              <p className="text-gray-600 ">Transaction Hash:</p>
              <p className="break-all">
                {txHash}
                <button
                  onClick={copyHashToClipboard}
                  className="relative rounded-md ml-5 p-1 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {showTooltip && (
                    <span className="bg-black text-white py-1 px-2 w-44 rounded-lg text-xs absolute top-0 left-1/2 transform -translate-x-1/2 -mt-10 flex items-center">
                      <span>&nbsp; Copy txHash to clipboard</span>
                    </span>
                  )}
                  <FaRegCopy />
                </button>
              </p>
            </div>
            <div className=" gap-4 md:mt-4">
              {transactionData && (
                <div>
                  <div>
                    <p className="text-gray-600">Status:</p>
                    <p className="font-medium">{transactionData.status}</p>{" "}
                    {/* Cambia a transactionData.status */}
                  </div>
                  <div>
                    <p className="text-gray-600">Block Number:</p>
                    <p className="font-medium">{transactionData.blockNumber}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">From:</p>
            {transactionData && (
              <p className="break-all">
                {transactionData.from}
                <button
                  onClick={copySenderToClipboard}
                  className="relative rounded-md ml-5 p-1 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {showTooltip && (
                    <span className="bg-black text-white py-1 px-2 w-44 rounded-lg text-xs absolute top-0 left-1/2 transform -translate-x-1/2 -mt-10 flex items-center">
                      <span>&nbsp; Copy sender to clipboard</span>
                    </span>
                  )}
                  <FaRegCopy />
                </button>
              </p>
            )}
          </div>
          <div>
            <p className="text-gray-600">To:</p>
            {transactionData && (
              <p className="break-all">
                {transactionData.to}
                <button
                  onClick={copyReceiverToClipboard}
                  className="relative rounded-md ml-5 p-1 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {showTooltip && (
                    <span className="bg-black text-white py-1 px-2 w-44 rounded-lg text-xs absolute top-0 left-1/2 transform -translate-x-1/2 -mt-10 flex items-center">
                      <span>&nbsp; Copy sender to clipboard</span>
                    </span>
                  )}
                  <FaRegCopy />
                </button>
              </p>
            )}
          </div>
        </div>
        <hr className="border-t border-gray-300 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Value:</p>
            {transactionData && (
              <p className="font-medium">{transactionData.value}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600">Block Hash:</p>
            {transactionData && (
              <p className="break-all">{transactionData.blockHash}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600">Gas:</p>
            {transactionData && (
              <p className="font-medium">{transactionData.gas}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600">Gas Price:</p>
            {transactionData && (
              <p className="font-medium">{transactionData.gasPrice}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
