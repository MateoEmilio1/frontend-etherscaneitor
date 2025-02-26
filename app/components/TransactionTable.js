"use client";
import Link from "next/link";
import moment from "moment";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TransactionTable({ transactions, address }) {
    const formatAddress = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    return (
        <div className="overflow-x-auto bg-gray-900 rounded-lg">
            <Table className="min-w-full divide-y divide-gray-700 text-white">
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Transaction Hash
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Method
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Block
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Age
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            From
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"></TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            To
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Value
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                            Txn Fee
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-700">
                    {transactions.map((txn) => (
                        <TableRow key={txn.key}>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-blue-300">
                                <Link href={`/tx/${txn.hash}`}>
                                    {txn.hash.slice(0, 12)}...
                                </Link>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                <span className="font-bold">Transfer</span>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-blue-300">
                                {txn.block_number}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                {moment(txn.block_timestamp, "YYYYMMDD").fromNow()}
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-blue-300">
                                <Link href={`/address/${encodeURIComponent(txn.from_address)}`}>
                                    {formatAddress(txn.from_address)}
                                </Link>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                <span className={txn.from_address.toLowerCase() !== address.toLowerCase() ? "text-green-500" : "text-red-500"}>
                                    {txn.from_address.toLowerCase() !== address.toLowerCase() ? "IN" : "OUT"}
                                </span>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap text-blue-300">
                                <Link href={`/address/${encodeURIComponent(txn.to_address)}`}>
                                    {formatAddress(txn.to_address)}
                                </Link>
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                {(txn.value / 10 ** 18).toFixed(5)} ETH
                            </TableCell>
                            <TableCell className="px-6 py-4 whitespace-nowrap">
                                {(txn.gas_price / 10 ** 18).toFixed(12)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
