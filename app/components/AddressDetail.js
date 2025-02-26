"use client";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { fetchAddressData } from "@/app/services/addressService";
import { TransactionTable } from "./TransactionTable";
import { Pagination } from "./Pagination";
import { TransactionFilter } from "./TransactionFilter";

export default function AddressDetail() {
    const [address, setAddress] = useState("");
    const [addressData, setAddressData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 25;
    const [transactionType, setTransactionType] = useState("All");

    useEffect(() => {
        const currentUrl = window.location.href;
        const regex = /\/address\/(.+)/;
        const match = currentUrl.match(regex);
        const extractedAddress = match ? match[1] : "";
        setAddress(extractedAddress);
    }, []);

    useEffect(() => {
        async function getAddressData() {
            if (address) {
                try {
                    const data = await fetchAddressData(address);
                    setAddressData(data);
                } catch {
                    setAddressData(null);
                } finally {
                    setIsLoading(false);
                }
            }
        }
        getAddressData();
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
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-purple-900">
                <div className="bg-white mx-4 p-8 rounded-lg shadow-lg text-center">
                    <p className="text-2xl font-bold mb-4">Error fetching address data.</p>
                    <p>Please make sure the entered data is correct and try again.</p>
                    <p className="mt-4 text-sm">You can update your address in the settings of your dashboard.</p>
                </div>
            </div>
        );
    }

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = addressData.result.slice(indexOfFirstTransaction, indexOfLastTransaction);
    const filteredTransactions = currentTransactions.filter((txn) =>
        transactionType === "All"
            ? true
            : transactionType === "IN"
                ? txn.from_address.toLowerCase() !== address.toLowerCase()
                : txn.from_address.toLowerCase() === address.toLowerCase()
    );
    const totalPages = Math.ceil(addressData.result.length / transactionsPerPage);

    return (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900">
            <div className="p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Address Detail</h1>
                <p className="text-lg text-white break-all">Address: {address}</p>
                <section className="my-6">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-white">
                            Latest 25 from a total of <span className="text-white">{addressData.result.length}</span> transactions
                        </p>
                        <TransactionFilter value={transactionType} onChange={setTransactionType} />
                    </div>
                    <div className="overflow-x-auto">
                        <TransactionTable transactions={filteredTransactions} address={address} />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </section>
            </div>
        </div>
    );
}
