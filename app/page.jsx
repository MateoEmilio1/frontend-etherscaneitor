
import SearchComp from "./components/search.js";
import MainDataBoard from "@/app/components/mainDataBoard"

export default function Home() {
  return (
    <>
      <section className="main flex flex-col items-center min-h-screen bg-[#161616]">
        <SearchComp />
        <MainDataBoard />
      </section>
    </>
  );
}
