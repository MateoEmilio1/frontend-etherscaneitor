import styles from "@/styles/home.module.css";
import moment from "moment";
import React, { useState } from "react";
import Link from "next/link";

export default function SearchResults(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 25;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = props.result.result.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(
    props.result.result.length / transactionsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className={styles.searchResults}>
      <p className={styles.amountOfTransactions}>
        Latest 25 from a total of{" "}
        <span className="text-white">{props.result.result.length}</span>{" "}
        transactions
      </p>
      <div className="overflow-x-auto">
        <table
          className={`${styles.txnSection} min-w-full divide-y divide-gray-200`}
        >
          <thead>
            <tr className={styles.txnTitle}>
              <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction Hash
              </th>
              <th className="pl-11 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th className="pl-20 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Block
              </th>
              <th className="pl-24 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="pl-28 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="pl-44 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              <th className="pl-12 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="pl-24 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="pl-28 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Txn Fee
              </th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {currentTransactions.map((txn) => {
              return (
                <tr className={styles.txn} key={txn.key}>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-300">
                    <Link href={`/tx/${txn.hash}`}>{txn.hash.slice(0, 12)}...</Link>
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
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {txn.from_address.slice(0, 6)}...
                    {txn.from_address.slice(36)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`${
                        txn.from_address.toLowerCase() !==
                        props.result.searchInput.toLowerCase()
                          ? styles.inTxn
                          : styles.outTxn
                      }`}
                    >
                      {txn.from_address.toLowerCase() !==
                      props.result.searchInput.toLowerCase()
                        ? "IN"
                        : "OUT"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-blue-300">
                    {txn.to_address.slice(0, 8)}...{txn.to_address.slice(34)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {(txn.value / 10 ** 18).toFixed(5)} ETH
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-white">
                    {(txn.gas_price / 10 ** 18).toFixed(12)}
                  </td>
                </tr>
              );
            })}
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
  );
}
