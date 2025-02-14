import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-96 bg-gradient-to-r from-blue-900 to-purple-900">
            <FaSpinner className="animate-spin text-4xl text-white" />
        </div>
    );
}