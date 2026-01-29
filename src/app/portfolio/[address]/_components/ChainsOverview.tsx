"use client";

import Image from "next/image";
import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useUserDataContext } from "./context";
import type { ChainTotalValue } from "@/types/api";

interface ChainsOverviewProps {
  selectedChain?: string | null;
  onChainSelect?: (chain: string | null) => void;
}

export default function ChainsOverview({
  selectedChain,
  onChainSelect,
}: ChainsOverviewProps = {}) {
  const { chainTotalValue, isLoading, totalValue } = useUserDataContext();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-[47px] gap-y-[30px] md:grid-cols-3 lg:grid-cols-5">
        <Skeleton className="h-8 w-4/5 rounded-lg" />
        <Skeleton className="h-8 w-4/5 rounded-lg" />
        <Skeleton className="h-8 w-4/5 rounded-lg" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-y-[30px] md:grid-cols-3 lg:grid-cols-5">
       {chainTotalValue?.map((chain: ChainTotalValue) => (
        <div
          key={chain.name}
          className={`flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-70 ${
            selectedChain === chain.network ? "opacity-100" : ""
          }`}
          onClick={() => onChainSelect?.(selectedChain === chain.network ? null : chain.network)}
        >
          <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
            {chain.icon && chain.icon.trim() !== "" ? (
              <Image
                src={chain.icon}
                alt={chain.name}
                width={40}
                height={40}
                className="h-full w-full flex-shrink-0 object-cover"
                onError={(e) => {
                  //
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-xs text-gray-500">{chain.name[0]?.toUpperCase()}</span>
              </div>
            )}
          </div>
          <div>
            <div className="text-grey-3 text-sm">
              {chain.name}
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-base font-semibold">
                ${formatNumber(chain.totalValueUSD)}
              </div>
              <div className="text-grey text-xs">
                {formatNumber(chain.totalValueUSD / totalValue * 100)}%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
