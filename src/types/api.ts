export interface TokenData {
  address: string;
  network: string;
  tokenAddress: null;
  tokenBalance: string;
  tokenMetadata: { symbol: string; decimals: number; name: string; logo: string };
  tokenPrices: { currency: string; value: string; lastUpdatedAt: string }[];
  balance?: number;
  price?: number;
  value?: number;
  usdPrice?: string;
  allocation?: number;
}

export interface TokensResponse {
  data: {
    pageKey: string | null;
    tokens: TokenData[];
    totalValue?: number;
  };
}

export interface ChainTotalValue {
  name: string;
  network: string;
  icon: string | null;
  symbol: string;
  decimals: number;
  totalValueUSD: number;
}

export interface ChainTokenData {
  network: string;
  networkName: string;
  networkIcon: string | null;
  totalValue: number;
  tokens: TokenData[];
}

export interface ProcessedTokensResponse {
  data: {
    pageKey: string | null;
    tokens: TokenData[];
    totalValue: number;
    chainTotalValue: ChainTotalValue[];
    chainTokenData: ChainTokenData[];
  };
}

export interface NFTData {
  contract: {
    address: string;
    name: string | null;
    symbol: string | null;
    totalSupply: string | null;
    tokenType: "ERC721" | "ERC1155";
    contractDeployer: string;
    deployedBlockNumber: number;
    openSeaMetadata?: {
      floorPrice: number;
      collectionName: string;
      collectionSlug: string;
      safelistRequestStatus: string;
      imageUrl: string | null;
      description: string | null;
      externalUrl: string | null;
      twitterUsername: string | null;
      discordUrl: string | null;
      bannerImageUrl: string | null;
      lastIngestedAt: string;
    };
    isSpam: boolean;
    spamClassifications: string[];
  };
  tokenId: string;
  tokenType: "ERC721" | "ERC1155";
  name: string | null;
  description: string | null;
  tokenUri: string | null;
  image: {
    cachedUrl: string | null;
    thumbnailUrl: string | null;
    pngUrl: string | null;
    contentType: string | null;
    size: number | null;
    originalUrl: string | null;
  };
  animation: {
    cachedUrl: string | null;
    contentType: string | null;
    size: number | null;
    originalUrl: string | null;
  };
  raw: {
    tokenUri: string | null;
    metadata: Record<string, unknown>;
    error: string | null;
  };
  collection: {
    name: string;
    slug: string;
    externalUrl: string | null;
    bannerImageUrl: string | null;
  };
  mint: {
    mintAddress: string | null;
    blockNumber: number | null;
    timestamp: string | null;
    transactionHash: string | null;
  };
  owners: unknown;
  timeLastUpdated: string;
  balance: string;
  acquiredAt: {
    blockTimestamp: string | null;
    blockNumber: number | null;
  };
}

export interface NFTsResponse {
  ownedNfts: NFTData[];
  totalCount: number;
  validAt: {
    blockNumber: number;
    blockHash: string;
    blockTimestamp: string;
  };
  pageKey: string | null;
}

export interface DeFiPosition {
  id: string;
  token0: {
    symbol: string;
    address: string;
  };
  token1: {
    symbol: string;
    address: string;
  };
  liquidity: string;
  tickLower: number;
  tickUpper: number;
  fee: number;
}

export interface DeFiResponse {
  positions: DeFiPosition[];
}

export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface PointsHistoryItem {
  id: number;
  pointsChange: number;
  pointsBefore: number;
  pointsAfter: number;
  reason: string;
  relatedAddress: string | null;
  timestamp: string;
}

export interface PointsHistoryResponse {
  total: number;
  page: number;
  limit: number;
  history: PointsHistoryItem[];
}

export interface UserInfo {
  address: string;
  totalPoints: number;
  isFirstConnected: boolean;
  firstConnectTime: string | null;
  referrer: string | null;
  displayName: string | null;
  usernameChangeCount: number;
  stats: {
    totalCheckIns: number;
    totalAIInteractions: number;
    totalReferrals: number;
    rank: number;
  };
}

export interface FirstConnectResponse {
  pointsAwarded: number;
  totalPoints: number;
  referralBonus?: {
    received: boolean;
    points: number;
    referrerAddress: string;
  };
}

export interface CheckInResponse {
  pointsAwarded: number;
  totalPoints: number;
  checkInDate: string;
  consecutiveDays: number;
  totalCheckIns: number;
  nextCheckInAvailable: string;
}

export interface CheckInStatusResponse {
  hasCheckedInToday: boolean;
  lastCheckInDate: string | null;
  consecutiveDays: number;
  totalCheckIns: number;
  nextCheckInAvailable: string;
  calendar?: Array<{
    date: string;
    checked: boolean;
  }>;
}

export interface AIInteractionResponse {
  pointsAwarded: number;
  totalPoints: number;
  todayCount: number;
  remainingToday: number;
  totalInteractions: number;
  nextReset: string;
}

export interface AIInteractionStatusResponse {
  todayCount: number;
  remainingToday: number;
  totalInteractions: number;
  nextReset: string;
}

export interface ReferralBindResponse {
  inviteeAddress: string;
  referrerAddress: string;
  inviteePointsAwarded: number;
  referrerPointsAwarded: number;
}

export interface ReferralValidateResponse {
  isValid: boolean;
  referrerAddress: string | null;
  expiresAt: string | null;
}

export interface ReferralMyCodesResponse {
  codes: Array<{
    id: number;
    code: string;
    createdAt: string;
  }>;
  totalInvitees: number;
}

export interface ChainInfo {
  chainId: number;
  chainName: string;
  rpcUrl: string;
  nativeCurrencyName: string;
  blockExplorerUrl: string;
}

export interface NativeTokenInfo {
  chainId: number;
  symbol: string;
  name: string;
}

export interface BlockchainInfoResponse {
  chains: ChainInfo[];
  tokens: NativeTokenInfo[];
  totalChains: number;
  totalTokens: number;
}
