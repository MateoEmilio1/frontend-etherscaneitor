import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/home.module.css";

import Header from "./components/header";
import SearchComp from "./components/search.js";
import SessionComp from "./components/sessionComp";

export default function Home() {
  return (
    <>
      {/*   <Head>
      <title>Etherscan Search</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <h1 className="text-white">hola</h1>
    </Head> */}
      <section className="main flex flex-col items-center min-h-screen bg-[#161616]">
        <Header />
        <SearchComp />
      </section>
    </>
  );
}
