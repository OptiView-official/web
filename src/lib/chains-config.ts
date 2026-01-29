/**
 * Supported Blockchain Configuration Data
 * Contains chain information and native token information
 */

export interface ChainInfo {
  chainId: number;
  chainName: string;
  rpcUrl: string;
  nativeCurrencyName: string;
  blockExplorerUrl: string;
}

export interface TokenInfo {
  chainId: number;
  symbol: string;
  name: string;
}

export interface ChainsData {
  chains: ChainInfo[];
  tokens: TokenInfo[];
}

/**
 * All supported chain configurations
 */
export const CHAINS_CONFIG: ChainsData = {
  chains: [
    {
      chainId: 1,
      chainName: "Ethereum Mainnet",
      rpcUrl: "https://rpc.ankr.com/eth",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://etherscan.io"
    },
    {
      chainId: 42161,
      chainName: "Arbitrum One",
      rpcUrl: "https://arb1.arbitrum.io/rpc",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://arbiscan.io"
    },
    {
      chainId: 43114,
      chainName: "Avalanche C-Chain",
      rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
      nativeCurrencyName: "Avalanche",
      blockExplorerUrl: "https://snowtrace.io"
    },
    {
      chainId: 8453,
      chainName: "Base",
      rpcUrl: "https://mainnet.base.org",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://basescan.org"
    },
    {
      chainId: 80094,
      chainName: "Berachain (Testnet/Artio)",
      rpcUrl: "https://artio.rpc.berachain.com",
      nativeCurrencyName: "BERA Token",
      blockExplorerUrl: "https://artio.beratrail.io"
    },
    {
      chainId: 81457,
      chainName: "Blast",
      rpcUrl: "https://rpc.blast.io",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://blastscan.io"
    },
    {
      chainId: 56,
      chainName: "BNB Smart Chain (BSC)",
      rpcUrl: "https://bsc-dataseed.binance.org",
      nativeCurrencyName: "BNB",
      blockExplorerUrl: "https://bscscan.com"
    },
    {
      chainId: 57073,
      chainName: "Ink (Sepolia Testnet)",
      rpcUrl: "https://rpc-gel-sepolia.inkonchain.com",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://explorer-sepolia.inkonchain.com"
    },
    {
      chainId: 59144,
      chainName: "Linea",
      rpcUrl: "https://rpc.linea.build",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://lineascan.build"
    },
    {
      chainId: 5000,
      chainName: "Mantle",
      rpcUrl: "https://rpc.mantle.xyz",
      nativeCurrencyName: "Mantle",
      blockExplorerUrl: "https://explorer.mantle.xyz"
    },
    {
      chainId: 34443,
      chainName: "Mode",
      rpcUrl: "https://mainnet.mode.network",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://explorer.mode.network"
    },
    {
      chainId: 143,
      chainName: "Monad (Devnet/Testnet)",
      rpcUrl: "https://rpc-devnet.monadinfra.com/rpc",
      nativeCurrencyName: "Monad",
      blockExplorerUrl: "https://explorer.monad.xyz"
    },
    {
      chainId: 10,
      chainName: "Optimism (OP Mainnet)",
      rpcUrl: "https://mainnet.optimism.io",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://optimistic.etherscan.io"
    },
    {
      chainId: 9745,
      chainName: "Plasma (Sanko/Custom)",
      rpcUrl: "https://rpc.sanko.xyz",
      nativeCurrencyName: "DMT",
      blockExplorerUrl: "https://explorer.sanko.xyz"
    },
    {
      chainId: 137,
      chainName: "Polygon PoS",
      rpcUrl: "https://polygon-rpc.com",
      nativeCurrencyName: "POL",
      blockExplorerUrl: "https://polygonscan.com"
    },
    {
      chainId: 534352,
      chainName: "Scroll",
      rpcUrl: "https://rpc.scroll.io",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://scrollscan.com"
    },
    {
      chainId: 146,
      chainName: "Sonic",
      rpcUrl: "https://rpc.soniclabs.com",
      nativeCurrencyName: "Sonic",
      blockExplorerUrl: "https://sonicscan.org"
    },
    {
      chainId: 130,
      chainName: "Unichain (Mainnet)",
      rpcUrl: "https://mainnet.unichain.org",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://unisscan.org"
    },
    {
      chainId: 480,
      chainName: "World Chain",
      rpcUrl: "https://worldchain-mainnet.g.alchemy.com/public",
      nativeCurrencyName: "Ether",
      blockExplorerUrl: "https://worldscan.org"
    }
  ],
  tokens: [
    {
      chainId: 1,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 42161,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 43114,
      symbol: "AVAX",
      name: "Avalanche"
    },
    {
      chainId: 8453,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 80094,
      symbol: "BERA",
      name: "Berachain Token"
    },
    {
      chainId: 81457,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 56,
      symbol: "BNB",
      name: "Binance Coin"
    },
    {
      chainId: 57073,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 59144,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 5000,
      symbol: "MNT",
      name: "Mantle"
    },
    {
      chainId: 34443,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 143,
      symbol: "MON",
      name: "Monad Token"
    },
    {
      chainId: 10,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 9745,
      symbol: "DMT",
      name: "Dream Machine Token"
    },
    {
      chainId: 137,
      symbol: "POL",
      name: "Polygon Ecosystem Token"
    },
    {
      chainId: 534352,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 146,
      symbol: "S",
      name: "Sonic"
    },
    {
      chainId: 130,
      symbol: "ETH",
      name: "Ethereum"
    },
    {
      chainId: 480,
      symbol: "ETH",
      name: "Ethereum"
    }
  ]
};

/**
 * Get chain info by chainId
 * @param chainId Chain ID
 * @returns Chain info, or undefined if not found
 */
export function getChainById(chainId: number): ChainInfo | undefined {
  return CHAINS_CONFIG.chains.find(chain => chain.chainId === chainId);
}

/**
 * Get native token info by chainId
 * @param chainId Chain ID
 * @returns Token info, or undefined if not found
 */
export function getTokenByChainId(chainId: number): TokenInfo | undefined {
  return CHAINS_CONFIG.tokens.find(token => token.chainId === chainId);
}

/**
 * Get list of all chain IDs
 * @returns Array of chain IDs
 */
export function getAllChainIds(): number[] {
  return CHAINS_CONFIG.chains.map(chain => chain.chainId);
}

