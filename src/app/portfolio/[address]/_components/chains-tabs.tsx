"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChainsOverview from "./ChainsOverview";
import AssetsTable from "./AssetsTable";
import ProtocolAssets from "./ProtocolAssets";
import NFTCollections from "./NFTCollections";
import Transactions from "./Transactions";
import PortfolioHeader from "./PortfolioHeader";
import { useUserDataContext } from "./context";

interface ChainsTabsProps {
  address: string;
}

export default function ChainsTabs({ address }: ChainsTabsProps) {
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { totalValue } = useUserDataContext();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Refresh all related queries
    await queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    setLastRefreshTime(new Date());
    // Delay closing animation to show rotation effect
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleChainSelect = (chain: string | null) => {
    setSelectedChain(chain);
  };

  return (
    <div className="bg-white">
      <Tabs defaultValue="portfolio">
        <div className="flex flex-col gap-2 border-b border-black sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <TabsList className="pl-3 overflow-x-auto">
            <TabsTrigger
              value="portfolio"
              className="cursor-pointer rounded-[14px] rounded-b-none px-3 py-2 text-sm sm:px-5 sm:py-3 sm:text-base"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="nfts"
              className="cursor-pointer rounded-[14px] rounded-b-none px-3 py-2 text-sm sm:px-5 sm:py-3 sm:text-base"
            >
              NFTs
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="cursor-pointer rounded-[14px] rounded-b-none px-3 py-2 text-sm sm:px-5 sm:py-3 sm:text-base"
            >
              Transactions
            </TabsTrigger>
          </TabsList>
          <div className="flex justify-end px-3 pb-2 sm:px-0 sm:pb-0">
            <PortfolioHeader
              selectedChain={selectedChain}
              onChainSelect={handleChainSelect}
              onRefresh={handleRefresh}
              lastRefreshTime={lastRefreshTime}
              isRefreshing={isRefreshing}
            />
          </div>
        </div>

        <div className="mt-[30px] px-2">
          <TabsContent value="portfolio" className="flex flex-col gap-20">
            <ChainsOverview
              selectedChain={selectedChain}
              onChainSelect={handleChainSelect}
            />
            <AssetsTable selectedChain={selectedChain} />
            <ProtocolAssets selectedChain={selectedChain} totalValue={totalValue} />
          </TabsContent>
          <TabsContent value="nfts">
            <NFTCollections selectedChain={selectedChain} />
          </TabsContent>
          <TabsContent value="transactions">
            <Transactions selectedChain={selectedChain} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
