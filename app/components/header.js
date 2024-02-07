"use client"

import { useEffect, useState } from "react";
import axios from "axios";


//import Logo from "../public/assets/logo.png";

export default function Header() {
  const [ethPrice, setEthPrice] = useState("");
  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get(`https://backend-etherneitor.vercel.app/getethprice`, {});
      setEthPrice(response.data.usdPrice);
    };
    getEthPrice();
  });
  return (
    <section className="w-full bg-[#111111]">
      <section className="sm:pl-10 pl-20 flex  items-center text-gray-400 h-12 text-sm border-b border-gray-800 px-12">
        ETH Price:{" "}
        <span className="text-blue-300">${Number(ethPrice).toFixed(2)}</span>
      </section>
      <section className="flex items-center justify-between h-14 border-b border-gray-800 px-11">
        {/* <Image src={Logo} alt="Etherscan Logo" className="w-36 h-auto" /> */}

       
      </section>
    </section>
  );
}
