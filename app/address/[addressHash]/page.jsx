"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import styles from "@/styles/home.module.css";
import { FaSpinner } from 'react-icons/fa';


export default function AddressDetail() {
  const [address, setAddress] = useState("");
  const [addressData, setAddressData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 25;

  useEffect(() => {
    // Obtener la dirección de Ethereum de la URL usando una expresión regular
    const currentUrl = window.location.href;
    const regex = /\/address\/(.+)/;
    const match = currentUrl.match(regex);
    const extractedAddress = match ? match[1] : null;
    setAddress(extractedAddress);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://backend-etherneitor-production.up.railway.app/address`,
          {
            params: { address: address },
          }
        );
        setAddressData(response.data);
      } catch (error) {
        console.error("Error fetching address data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (address) {
      fetchData();
    }
  }, [address]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-purple-900">
      <FaSpinner className="animate-spin text-4xl text-white" />
    </div>
    );
  }

  if (!addressData) {
    return (
      <div className=" flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="bg-white mx-4 p-8 rounded-lg shadow-lg text-center">
          <p className="text-2xl font-bold mb-4">Error fetching address data.</p>
          <p>Please make sure the entered data is correct and try again.</p>
          <p className="mt-4 text-sm">You can update your address in the settings of your dashboard.</p>
        </div>
      </div>
    );
    
  }
  //Logica Paginacion

  // Calcular índices para la paginación
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  // Filtrar transacciones para la página actual
  const currentTransactions = addressData.result.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(addressData.result.length / transactionsPerPage);

  // Función para cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className=" bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Address Detail</h1>
        <p className="text-lg text-white break-all">Address: {address}</p>

        {/* Renderizar información de todas las transacciones */}
        <section className={styles.searchResults}>
          <p className={styles.amountOfTransactions}>
            Latest 25 from a total of{" "}
            <span className="text-white">{addressData.result.length}</span>{" "}
            transactions
          </p>
          <div className="overflow-x-auto">
            <table
              className={`${styles.txnSection} min-w-full divide-y divide-gray-200`}
            >
              <thead>
                <tr className={styles.txnTitle}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Hash
                  </th>
                  <th className="pl-11 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="pl-20 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Block
                  </th>
                  <th className="pl-24 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="pl-28 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="pl-44 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="pl-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
                  </th>
                  <th className="pl-24 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="pl-28 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Txn Fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentTransactions.map((txn) => (
                  <tr className={styles.txn} key={txn.key}>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-300">
                      <Link href={`/tx/${txn.hash}`}>
                        {txn.hash.slice(0, 12)}...
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={styles.transfer}>Transfer</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-300">
                      {txn.block_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {moment(txn.block_timestamp, "YYYYMMDD").fromNow()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  text-blue-300">
                      {/* FROM */}
                      <Link
                        href={`/address/${encodeURIComponent(
                          txn.from_address
                        )}`}
                      >
                        {txn.from_address.slice(0, 6)}...
                        {txn.from_address.slice(36)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`${
                          txn.from_address.toLowerCase() !==
                          address.toLowerCase()
                            ? styles.inTxn
                            : styles.outTxn
                        }`}
                      >
                        {txn.from_address.toLowerCase() !==
                        address.toLowerCase()
                          ? "IN"
                          : "OUT"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-300">
                      {/* TO */}
                      <Link
                        href={`/address/${encodeURIComponent(
                          txn.from_address
                        )}`}
                      >
                        {txn.to_address.slice(0, 6)}...
                        {txn.to_address.slice(36)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {(txn.value / 10 ** 18).toFixed(5)} ETH
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {(txn.gas_price / 10 ** 18).toFixed(12)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination py-5 text-white flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-blue-400 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Previous
              </button>
              {/* Crear botones de páginas */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none ${
                    currentPage === i + 1 ? "bg-blue-400" : "bg-gray-500"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-blue-400 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
