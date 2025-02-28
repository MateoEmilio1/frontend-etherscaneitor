'use client';

import { FaRegCopy } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";
import useTxHashFromUrl from '../../hooks/useTxHashFromUrl';
import useTransactionData from '../../hooks/useTransactionData';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { useHexToInt } from '../../hooks/useHexToInt';
import { useEthPriceContext } from "@/app/store/useEthPriceContext";
import { useEffect } from "react";

export default function TransactionDetail() {
  const txHash = useTxHashFromUrl();
  const { transactionData, isLoading } = useTransactionData(txHash);
  const { copyToClipboard, showTooltip, setShowTooltip } = useCopyToClipboard();


  const gasPrice = useHexToInt(transactionData?.gasPrice);
  const value = useHexToInt(transactionData?.value);
  const gas = useHexToInt(transactionData?.gas);

  const ethPrice = useEthPriceContext((state) => state.ethPrice);
  const ethPriceLoading = useEthPriceContext((state) => state.isLoading);
  const fetchEthPrice = useEthPriceContext((state) => state.fetchEthPrice);

  useEffect(() => {
    fetchEthPrice();
  }, [fetchEthPrice]);

  const convertGasPrice = (gasPriceInWei) => {
    const gwei = gasPriceInWei / 1e9;  // Convertir de Wei a Gwei
    const eth = gasPriceInWei / 1e18;  // Convertir de Wei a ETH
    return {
      gwei: gwei.toFixed(8), // Limitar a 8 decimales para Gwei
      eth: eth.toFixed(18),  // Limitar a 18 decimales para ETH
    };
  };

  const calculateTransactionValue = (valueInWei) => {
    const valueInEth = valueInWei / 1e18;  // Convertir de Wei a ETH
    const valueInUSD = valueInEth * parseFloat(ethPrice);  // Multiplicar por el precio de ETH
    return valueInUSD.toFixed(2);  // Limitar a 2 decimales para mostrar en USD
  };

  if (ethPriceLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-purple-900">
        <FaSpinner className="animate-spin text-4xl text-white" />
      </div>
    );
  }

  const gasPriceFormatted = convertGasPrice(gasPrice);
  const valueInUSD = calculateTransactionValue(value);

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 flex justify-center items-center px-5">
      <div className="bg-[#222222] rounded-lg shadow-lg p-8 mx-7 max-w-full">
        <div className="mb-8">
          <h2 className="text-lg text-blue-400 font-semibold mb-2">
            Transaction Detail
          </h2>
          <hr className="border-t border-gray-300 mb-4" />
          <div className="gap-4">
            <div className="mx-auto">
              <p className="text-blue-300">Transaction Hash:</p>
              <p className="break-all text-white">
                {txHash}
                <button
                  onClick={() => copyToClipboard(txHash)}
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
            <div className="gap-4 md:mt-4">
              {transactionData && (
                <div>
                  <div>
                    <p className="text-blue-300">Block Number:</p>
                    <p className="font-medium text-white">
                      {transactionData.blockNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-blue-400">From:</p>
            {transactionData && (
              <p className="break-all text-blue-300">
                <Link href={`/address/${encodeURIComponent(transactionData.from)}`}>
                  {transactionData.from}
                </Link>
                <button
                  onClick={() => copyToClipboard(transactionData.from)}
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
            <p className="text-blue-400">To:</p>
            {transactionData && (
              <p className="break-all text-blue-300">
                <Link href={`/address/${encodeURIComponent(transactionData.to)}`}>
                  {transactionData.to}
                </Link>
                <button
                  onClick={() => copyToClipboard(transactionData.to)}
                  className="relative rounded-md ml-5 p-1 hover:bg-gray-300 focus:bg-gray-300 focus:outline-none"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  {showTooltip && (
                    <span className="bg-black text-white py-1 px-2 w-44 rounded-lg text-xs absolute top-0 left-1/2 transform -translate-x-1/2 -mt-10 flex items-center">
                      <span>&nbsp; Copy receiver to clipboard</span>
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
            <p className="text-blue-300">Value:</p>
            {value !== undefined && (
              <p className="font-medium text-white">{valueInUSD} USD</p>
            )}
          </div>
          <div>
            <p className="text-blue-300">Block Hash:</p>
            {transactionData && (
              <p className="break-all text-white">
                {transactionData.blockHash}
              </p>
            )}
          </div>
          <div>
            <p className="text-blue-300">Gas:</p>
            {gas !== undefined && (
              <p className="font-medium text-white">{gas}</p>
            )}
          </div>
          <div>
            <p className="text-blue-300">Gas Price:</p>
            {gasPriceFormatted && (
              <p className="font-medium text-white">
                {gasPriceFormatted.gwei} Gwei ({gasPriceFormatted.eth} ETH)
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
