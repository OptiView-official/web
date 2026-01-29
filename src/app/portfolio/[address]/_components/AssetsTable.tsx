"use client";

import { Table, THead, TR, TD, Divider } from "@/components/ui/table";
import { AssetTitleIcon } from "@/icon";
import { useUserDataContext } from "./context";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import type { TokenData } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";

interface AssetsTableProps {
  selectedChain: string | null;
}

export default function AssetsTable({ selectedChain }: AssetsTableProps) {
  const { walletTokensData, isLoading, totalValue } = useUserDataContext();

  //
  //  selectedChain
  const filteredAssets = walletTokensData
    ?.filter((token) => {
      //
      if ((token.value ?? 0) < 0.1) return false;

      //
      if (selectedChain && token.network !== selectedChain) return false;

      return true;
    })
    .sort((a, b) => (b.value ?? 0) - (a.value ?? 0)) || [];

  // Assets
  const assetsTotalValue = filteredAssets.reduce(
    (sum, token) => sum + (token.value ?? 0),
    0
  );

  if (isLoading) {
    return (
      <div>
        <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3 sm:gap-[15px]">
          <div className="flex items-center gap-3 sm:gap-[15px] text-lg sm:text-2xl font-semibold">
            <AssetTitleIcon className="h-6 w-6 sm:h-auto sm:w-auto" />
            Assets
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 sm:mb-6 flex items-center justify-between gap-3 sm:gap-[15px]">
        <div className="flex items-center gap-3 sm:gap-[15px] text-lg sm:text-2xl font-semibold">
          <AssetTitleIcon className="h-6 w-6 sm:h-auto sm:w-auto" />
          Assets
        </div>
        <div className="text-right">
          <div className="text-lg sm:text-2xl font-semibold">
            ${formatNumber(assetsTotalValue)}
          </div>
        </div>
      </div>

      {filteredAssets.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No assets</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <THead>
                <TD>Asset</TD>
                <TD>Price</TD>
                <TD>Balance</TD>
                <TD>Value</TD>
                <TD>Allocation</TD>
              </THead>
              {filteredAssets.map((token: TokenData, idx: number) => {
                const balance = token.balance ?? 0;
                const price = token.price ?? 0;
                const value = token.value ?? 0;
                //
                const allocation = totalValue > 0 ? (value / totalValue) * 100 : 0;

                return (
                  <div key={`${token.address}-${token.network}-${idx}`}>
                    {idx !== 0 && <Divider />}
                    <TR>
                      <TD className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full overflow-hidden bg-slate-200">
                          {token.tokenMetadata?.logo && (
                            <Image
                              src={token.tokenMetadata.logo}
                              alt={token.tokenMetadata.symbol ?? "Asset"}
                              width={20}
                              height={20}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          )}
                        </div>
                        {token.tokenMetadata?.symbol ?? token.tokenMetadata?.name ?? "Unknown"}
                      </TD>
                      <TD>${formatNumber(price)}</TD>
                      <TD>{formatNumber(balance, { maximumFractionDigits: 6, minimumFractionDigits: 0 })}</TD>
                      <TD>${formatNumber(value)}</TD>
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {filteredAssets.map((token: TokenData, idx: number) => {
              const balance = token.balance ?? 0;
              const price = token.price ?? 0;
              const value = token.value ?? 0;
              const allocation = totalValue > 0 ? (value / totalValue) * 100 : 0;

              return (
                <div
                  key={`${token.address}-${token.network}-${idx}`}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full overflow-hidden bg-slate-200">
                        {token.tokenMetadata?.logo && (
                          <Image
                            src={token.tokenMetadata.logo}
                            alt={token.tokenMetadata.symbol ?? "Asset"}
                            width={24}
                            height={24}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                      </div>
                      <span className="font-medium text-black">
                        {token.tokenMetadata?.symbol ?? token.tokenMetadata?.name ?? "Unknown"}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-black">
                        ${formatNumber(value)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatNumber(balance, { maximumFractionDigits: 6, minimumFractionDigits: 0 })} @ ${formatNumber(price)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-cyan-400"
                          style={{ width: `${Math.min(allocation, 100)}%` }}
                        />
                      </div>
                      <span className="text-grey text-xs">
                        {allocation.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
