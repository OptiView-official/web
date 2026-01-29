"use client";

import Image from "next/image";
import { Table, THead, TR, TD, Divider } from "@/components/ui/table";
import { AssetTitleIcon } from "@/icon";
import { useUserDataContext } from "./context";
import type { TokenData } from "@/types/api";

interface TokenAssetsProps {
  address: string;
}

export default function TokenAssets({ address }: TokenAssetsProps) {
  //  context  /api/tokens
  const { tokensData, isLoading } = useUserDataContext();

  if (isLoading) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-[15px] text-2xl font-semibold">
          <AssetTitleIcon />
          Assets
        </div>
        <div className="text-center py-8 text-gray-500">Loading assets...</div>
      </div>
    );
  }

  //  context  tokensData
  const tokens: TokenData[] = tokensData ?? [];

  //
  const tokensByNetwork = tokens.reduce((acc: Record<string, TokenData[]>, token) => {
    const network = token.network ?? 'unknown';
    acc[network] = acc[network] ?? [];
    acc[network].push(token);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-6 flex items-center gap-[15px] text-2xl font-semibold">
        <AssetTitleIcon />
        Assets
      </div>

      {Object.keys(tokensByNetwork).length === 0 ? (
        <div className="text-center py-8 text-gray-500">No assets found</div>
      ) : (
        Object.entries(tokensByNetwork).map(([network, networkTokens]) => (
          <div key={network} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 capitalize">{network.replace('-mainnet', '')} Network</h3>
            <Table>
              <THead>
                <TD>Asset</TD>
                <TD>Price</TD>
                <TD>Balance</TD>
                <TD>Value</TD>
                <TD>Allocation</TD>
              </THead>
              {networkTokens.map((token, idx) => {
                const balance = token.balance ?? 0;
                const price = token.price ?? 0;
                const value = token.value ?? 0;
                const allocation = token.allocation ?? 0;

                return (
                  <div key={`${token.address}-${idx}`}>
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
        ))
      )}
    </div>
  );
}
