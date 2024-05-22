import { Separator } from "@/components/ui/separator";
import BlockHistoryChart from "@/app/components/blockHistoryChart";
import CardEthereumTVL from "./cardEthereumTVL";
import CardEthGasPrice from "./cardEthGasPrice";
import CardLastBlock from "./cardLastBlock";
import CardNodesCount from "./cardNodesCount";

export default function DataBoard() {
  return (
    <div className="pt-10 ">
      {/* Desktop */}
      <div className="hidden xl:block justify-center w-full  ">
        <div className="bg-dark-tremor-brand-inverted shadow-xl rounded-xl mx-10 px-6 pt-8 flex">
          <div>
            <div className="space-y-1">
              <CardEthereumTVL />
            </div>
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm text-white">
              <div className="mt-10">
                <CardEthGasPrice />
              </div>
              <Separator className="h-44 mt-44" orientation="vertical" />
              <div className="mt-16">
                {" "}
                <CardLastBlock />
              </div>
              <Separator className="h-44 mt-44" orientation="vertical" />
              <div className="mt-20">
                <CardNodesCount />
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-4 " />
          <BlockHistoryChart />
        </div>
      </div>
      {/* Responsive */}
      <div className="xl:hidden flex-col flex items-center justify-center mx-auto ">
        <div className="bg-dark-tremor-brand-inverted rounded-xl  px-6  mb-10 flex">
          <div className="mx-auto">
            <CardEthereumTVL />

            <Separator className="my-4" />

            <CardEthGasPrice />

            <Separator className="my-4" />

            <CardLastBlock />

            <Separator className="my-4" />

            <CardNodesCount />

            <Separator className="my-4 " />
            <BlockHistoryChart />
          </div>
        </div>
      </div>
    </div>
  );
}
