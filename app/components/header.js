"use client";

import useEthPrice from "../hooks/useEthPrice";

export default function Header() {
  const { ethPrice, isLoading } = useEthPrice();

  return (
    <div className="flex items-center gap-x-6 text-sm text-gray-300">
      <span>ETH Price:</span>
      {isLoading ? (
        <div className="h-3 w-14 animate-pulse bg-gray-500 rounded-full"></div>
      ) : (
        <span className="text-blue-400">${ethPrice}</span>
      )}
    </div>
  );
}
