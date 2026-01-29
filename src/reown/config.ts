import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  bsc,
  mainnet,
  base,
  arbitrum,
  optimism,
  polygon,
  xLayer,
  bscTestnet,
} from "@reown/appkit/networks";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
}

// Supported Chains: BNB Chain (Default), Ethereum, Base, Arbitrum, Optimism, Polygon, X Layer, BNB Testnet
export const networks = [bsc, mainnet, base, arbitrum, optimism, polygon, xLayer, bscTestnet];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;


