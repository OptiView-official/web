"use client";

import Image from "next/image";
import { Table, THead, TR, TD, Divider } from "@/components/ui/table";
import { AssetTitleIcon } from "@/icon";
import { useUserDataContext } from "./context";
import type { ChainTokenData, TokenData } from "@/types/api";
import { formatNumber } from "@/lib/utils";

interface ChainTokenAssetsProps {
  selectedChain?: string | null;
}

export default function ChainTokenAssets({ selectedChain }: ChainTokenAssetsProps = {}) {
  const { chainTokenData, isLoading } = useUserDataContext();

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-[15px] text-2xl font-semibold">
          <AssetTitleIcon />
          Assets
        </div>
        <div className="space-y-8">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //
  const filteredChainData = selectedChain
    ? chainTokenData?.filter((data) => data.network === selectedChain) || []
    : chainTokenData || [];

  return (
    <div>
      <div className="mb-6 flex items-center gap-[15px] text-2xl font-semibold">
        <AssetTitleIcon />
        Chain Assets
      </div>

      {filteredChainData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No assets found</div>
      ) : (
        <div className="space-y-8">
          {filteredChainData.map((chainData: ChainTokenData) => {
            if (chainData.tokens.length === 0) return null;

            return (
              <div key={chainData.network} className="space-y-4">
                {/* Chain header */}
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    {chainData.networkIcon && chainData.networkIcon.trim() !== "" ? (
                      <Image
                        src={chainData.networkIcon}
                        alt={chainData.networkName}
                        width={24}
                        height={24}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-full">
                        <span className="text-xs text-gray-500">{chainData.networkName[0]?.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold capitalize">
                    {chainData.networkName} Network
                  </h3>
                  <div className="text-sm text-gray-500">
                    Total: ${formatNumber(chainData.totalValue)}
                  </div>
                </div>

                {/* Token table */}
                <Table>
                  <THead>
                    <TD>Asset</TD>
                    <TD>Price</TD>
                    <TD>Balance</TD>
                    <TD>Value</TD>
                    <TD>Allocation</TD>
                  </THead>
                  {chainData.tokens.map((token: TokenData, idx: number) => {
                    const balance = token.balance ?? 0;
                    const price = token.price ?? 0;
                    const value = token.value ?? 0;
                    const allocation = token.allocation ?? 0;

                    return (
                      value >= 0.1 && <div key={`${token.address}-${idx}`}>
                        {idx !== 0 && <Divider />}
                        <TR>
                          <TD className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-slate-200 overflow-hidden">
                              <Image
                                src={token.tokenMetadata?.logo ?? "/images/portfolio/ethereum.png"}
                                alt={token.tokenMetadata?.symbol ?? "Unknown"}
                                width={20}
                                height={20}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            {token.tokenMetadata?.symbol ?? token.tokenMetadata?.name ?? 'Unknown'}
                          </TD>
                          <TD>${price.toFixed(2)}</TD>
                          <TD>{balance.toFixed(6)}</TD>
                          <TD>${value.toFixed(2)}</TD>
                          <TD>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full bg-cyan-400"
                                  style={{ width: `${Math.min(allocation, 100)}%` }}
                                />
                              </div>
                              <span className="text-grey text-xs">
                                {allocation.toFixed(1)}%
                              </span>
                            </div>
                          </TD>
                        </TR>
                      </div>
                    );
                  })}
                </Table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
