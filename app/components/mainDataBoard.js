import { Separator } from "@/components/ui/separator";
import BlockHistoryChart from "@/app/components/blockHistoryChart";
import CardEthereumTVL from "./cardEthereumTVL";
import CardEthGasPrice from "./cardEthGasPrice";
import CardLastBlock from "./cardLastBlock";
import CardNodesCount from "./cardNodesCount";
import EthPriceChart from "./ethPriceChart";

export default function DataBoard() {
  return (
    <div className="pt-10 flex justify-center">
      <div className="bg-dark-tremor-brand-inverted shadow-xl rounded-xl mx-10 px-6 pt-8 mb-12 xl:pb-4 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <CardEthereumTVL />

          <Separator className="my-4" />

          <div className="flex flex-col md:flex-row items-stretch">
            <div className="flex-1">
              <CardEthGasPrice />
            </div>

            <div>
              <Separator orientation="vertical" className="hidden md:block mx-4" />
              <Separator orientation="horizontal" className="block md:hidden my-4" />
            </div>

            <div className="flex-1">
              <CardLastBlock />
            </div>

            <div>
              <Separator orientation="vertical" className="hidden md:block mx-4" />
              <Separator orientation="horizontal" className="block md:hidden my-4" />
            </div>

            <div className="flex-1">
              <CardNodesCount />
            </div>
          </div>
        </div>

        <div className="pt-10 flex justify-center items-center">
          <div className="w-full max-w-full">
            <EthPriceChart className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
