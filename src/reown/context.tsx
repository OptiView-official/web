'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, bsc } from '@reown/appkit/networks';
import { WagmiProvider } from 'wagmi';
import { wagmiAdapter, projectId } from './config';
import { createQueryClient } from '@/lib/query-client';

const queryClient = createQueryClient();

// Initialize AppKit modal (web component & hooks)
createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, bsc],
  defaultNetwork: mainnet,
  metadata: {
    name: 'optiview',
    description: 'Wallet Connect',
    url: 'https://www.optiview.com',
    icons: ['/favicon.ico']
  },
  features: {
    analytics: true
  },
  themeMode: "light",
  allowUnsupportedChain: true
});

export default function ReownProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}


