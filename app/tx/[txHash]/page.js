"use client";

import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";

export default function TransactionDetail() {
  const [txHash, setTxHash] = useState("");
  // TO DO: Hacer petición a Infura con la txnHash
  useEffect(() => {
    const currentLink = window.location.href;
    const regex = /\/tx\/(.+)/;
    const match = currentLink.match(regex);
    const hash = match ? match[1] : null;
    setTxHash(hash);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(txHash);
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
                {/* BOTON COPIAR */}
                <button
                  onClick={copyToClipboard}
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
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium">Success</p>
              </div>
              <div>
                <p className="text-gray-600">Block:</p>
                <p className="font-medium">1234567</p>
              </div>
              <div>
                <p className="text-gray-600">Timestamp:</p>
                <p className="font-medium">2022-04-09 12:34:56</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">From:</p>
            <p className="font-medium">0x1234567890abcdef</p>
          </div>
          <div>
            <p className="text-gray-600">To:</p>
            <p className="font-medium">0xabcdef1234567890</p>
          </div>
        </div>
        <hr className="border-t border-gray-300 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Value:</p>
            <p className="font-medium">1 ETH</p>
          </div>
          <div>
            <p className="text-gray-600">Transaction Fee:</p>
            <p className="font-medium">0.001 ETH</p>
          </div>
          <div>
            <p className="text-gray-600">Gas Price:</p>
            <p className="font-medium">50 Gwei</p>
          </div>
        </div>
      </div>
    </section>
  );
}
