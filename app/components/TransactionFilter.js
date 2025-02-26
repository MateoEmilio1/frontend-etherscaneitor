"use client";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { FaFilter } from "react-icons/fa";

export function TransactionFilter({ value, onChange }) {
    return (
        <div className="flex items-center bg-gray-800 mb-4 rounded-md px-2 py-1 max-h-[36px]">
            <FaFilter className="text-white" />
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="bg-gray-800 text-white border-none ml-2">
                    {value}
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="IN">IN</SelectItem>
                    <SelectItem value="OUT">OUT</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
