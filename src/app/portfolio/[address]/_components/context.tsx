"use client";
import { supportedChains } from "@/lib/config";
import { createContext, useContext, useMemo } from "react";
import type {
  ChainTotalValue,
  TokenData,
  ChainTokenData,
} from "@/types/api";
import { useAccount } from "wagmi";

interface UserDataContextType {
  isOwner: boolean;
  tokensData: TokenData[] | undefined;
  walletTokensData: TokenData[] | undefined;
  isLoading: boolean;
  totalValue: number;
  address: string;
  chainTotalValue: ChainTotalValue[];
  chainTokenData: ChainTokenData[];
  allChainsCount: number;
}

export const UserDataContext = createContext<UserDataContextType>({
  isOwner: false,
  tokensData: undefined,
  walletTokensData: undefined,
  isLoading: false,
  totalValue: 0,
  address: "",
  chainTotalValue: [],
  chainTokenData: [],
  allChainsCount: 0,
});

export const UserDataProvider = ({
  children,
  address,
}: {
  children: React.ReactNode;
  address: string;
}) => {
  const { address: accountAddress } = useAccount();

  const isLoading = false;
  const isOwner = accountAddress?.toLowerCase() === address.toLowerCase();

  // Mock data for demonstration
  const { tokensData, walletTokensData, chainTotalValue, chainTokenData, totalValue, allChainsCount } = useMemo(() => {
    // Return empty mock data
    return {
      tokensData: [] as TokenData[],
      walletTokensData: [] as TokenData[],
      chainTotalValue: supportedChains.map((chain) => ({
        ...chain,
        totalValueUSD: 0,
      })),
      chainTokenData: supportedChains.map((chain) => ({
        network: chain.network,
        networkName: chain.name,
        networkIcon: chain.icon,
        totalValue: 0,
        tokens: [],
      })),
      totalValue: 0,
      allChainsCount: supportedChains.length,
    };
  }, [address]);

  return (
    <UserDataContext.Provider
      value={{
        isOwner,
        tokensData,
        walletTokensData,
        isLoading,
        totalValue,
        address,
        chainTotalValue,
        chainTokenData,
        allChainsCount,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserDataContext must be used within UserDataProvider");
  }
  return context;
};
