"use client";
import { Button } from "@/components/ui/button";

export function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg flex flex-wrap justify-center items-center gap-2">
            <Button
                variant="default"
                className="bg-gray-700 text-white"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i}
                    variant={currentPage === i + 1 ? "primary" : "default"}
                    className={currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}
            <Button
                variant="default"
                className="bg-gray-700 text-white"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </div>
    );
}
