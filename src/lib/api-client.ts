import { apiClient } from "./axios";
import type {
  TokensResponse,
  NFTsResponse,
  DeFiResponse,
  ApiResponse,
  FirstConnectResponse,
  UserInfo,
  PointsHistoryResponse,
  ReferralBindResponse,
  ReferralValidateResponse,
  ReferralMyCodesResponse,
  CheckInResponse,
  CheckInStatusResponse,
  AIInteractionResponse,
  AIInteractionStatusResponse,
} from "@/types/api";

// NFT-related APIs
export const nftApi = {
  // Fetch user NFTs via Alchemy
  getByOwner: async (params: {
    owner: string;
    network: "eth-mainnet" | "bnb-mainnet";
    withMetadata?: boolean;
    pageSize?: number;
    pageKey?: string;
    orderBy?: "transferTime" | "tokenId";
    excludeFilters?: string[];
    includeFilters?: string[];
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("owner", params.owner);
    searchParams.set("network", params.network);

    if (params.withMetadata !== undefined) {
      searchParams.set("withMetadata", params.withMetadata.toString());
    }
    if (params.pageSize) {
      searchParams.set("pageSize", params.pageSize.toString());
    }
    if (params.pageKey) {
      searchParams.set("pageKey", params.pageKey);
    }
    if (params.orderBy) {
      searchParams.set("orderBy", params.orderBy);
    }
    if (params.excludeFilters) {
      params.excludeFilters.forEach(filter => {
        searchParams.append("excludeFilters[]", filter);
      });
    }
    if (params.includeFilters) {
      params.includeFilters.forEach(filter => {
        searchParams.append("includeFilters[]", filter);
      });
    }

    const response = await apiClient.get<NFTsResponse>(`/api/nfts?${searchParams.toString()}`);
    return response.data;
  },

  // Fetch user NFTs via Moralis with pricing info
  getWithPrice: async (params: {
    address: string;
    chain?: string;
    limit?: number;
    exclude_spam?: boolean;
    days?: number;
  }) => {
    const searchParams = new URLSearchParams();
    searchParams.set("address", params.address);
    if (params.chain) searchParams.set("chain", params.chain);
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.exclude_spam !== undefined) {
      searchParams.set("exclude_spam", params.exclude_spam.toString());
    }
    if (params.days) searchParams.set("days", params.days.toString());

    const response = await apiClient.get<NFTsResponse>(`/api/nfts/wallet?${searchParams.toString()}`);
    return response.data;
  },
};

// Token-related APIs
export const tokenApi = {
  // Batch-fetch token data across multiple addresses and chains
  getTokens: async (params: {
    addresses: Array<{
      address: string;
      networks: string[];
    }>;
    withMetadata?: boolean;
    withPrices?: boolean;
    includeNativeTokens?: boolean;
    includeErc20Tokens?: boolean;
  }) => {
    const response = await apiClient.post<TokensResponse>("/api/tokens", params);
    return response.data;
  },
};

// DeFi protocol APIs (mock data)
export const defiApi = {
  // Uniswap V2 LP Tokens
  getUniswapV2LPTokens: async (_address: string) => {
    // Return mock data to avoid missing-route errors
    return {
      positions: []
    } as DeFiResponse;
  },

  // Uniswap V3 Positions
  getUniswapV3Positions: async (_address: string) => {
    return {
      positions: []
    } as DeFiResponse;
  },

  // Aave V2 Positions
  getAaveV2Positions: async (_address: string) => {
    return {
      positions: []
    } as DeFiResponse;
  },

  // Aave V3 Positions
  getAaveV3Positions: async (_address: string) => {
    return {
      positions: []
    } as DeFiResponse;
  },

  // PancakeSwap V3 Positions
  getPancakeV3Positions: async (_address: string) => {
    return {
      positions: []
    } as DeFiResponse;
  },
};

// Points System APIs
export const pointsApi = {
  // First Connect Wallet
  firstConnect: async (params: { address: string }): Promise<ApiResponse<FirstConnectResponse>> => {
    const response = await apiClient.post<ApiResponse<FirstConnectResponse>>(
      "/api/user/first-connect",
      params
    );
    return response.data;
  },

  // Query User Info
  getUserInfo: async (params: { address: string }): Promise<ApiResponse<UserInfo>> => {
    const response = await apiClient.get<ApiResponse<UserInfo>>(
      `/api/user/info?address=${encodeURIComponent(params.address)}`
    );
    return response.data;
  },

  // Query Points History
  getPointsHistory: async (params: {
    address: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<PointsHistoryResponse>> => {
    const searchParams = new URLSearchParams();
    searchParams.set("address", params.address);
    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());

    const response = await apiClient.get<ApiResponse<PointsHistoryResponse>>(
      `/api/user/points-history?${searchParams.toString()}`
    );
    return response.data;
  },

  // Bind Referrer
  bindReferral: async (params: {
    inviteeAddress: string;
    referrerAddress: string;
  }): Promise<ApiResponse<ReferralBindResponse>> => {
    const response = await apiClient.post<ApiResponse<ReferralBindResponse>>(
      "/api/referral/bind",
      params
    );
    return response.data;
  },

  // Validate Referrer
  validateReferrer: async (params: { address: string }): Promise<ApiResponse<ReferralValidateResponse>> => {
    const response = await apiClient.get<ApiResponse<ReferralValidateResponse>>(
      `/api/referral/validate-referrer?address=${encodeURIComponent(params.address)}`
    );
    return response.data;
  },

  // Query My Invite Codes
  getMyCodes: async (params: { address: string }): Promise<ApiResponse<ReferralMyCodesResponse>> => {
    const response = await apiClient.get<ApiResponse<ReferralMyCodesResponse>>(
      `/api/referral/my-codes?address=${encodeURIComponent(params.address)}`
    );
    return response.data;
  },

  // Daily Check-in
  checkIn: async (params: { address: string }): Promise<ApiResponse<CheckInResponse>> => {
    const response = await apiClient.post<ApiResponse<CheckInResponse>>(
      "/api/checkin",
      params
    );
    return response.data;
  },

  // Query Check-in Status
  getCheckInStatus: async (params: { address: string }): Promise<ApiResponse<CheckInStatusResponse>> => {
    const response = await apiClient.get<ApiResponse<CheckInStatusResponse>>(
      `/api/checkin/status?address=${encodeURIComponent(params.address)}`
    );
    return response.data;
  },

  // Record AI Interaction
  recordAIInteraction: async (params: { address: string }): Promise<ApiResponse<AIInteractionResponse>> => {
    const response = await apiClient.post<ApiResponse<AIInteractionResponse>>(
      "/api/ai-interaction",
      params
    );
    return response.data;
  },

  // Query AI Interaction Status
  getAIInteractionStatus: async (params: { address: string }): Promise<ApiResponse<AIInteractionStatusResponse>> => {
    const response = await apiClient.get<ApiResponse<AIInteractionStatusResponse>>(
      `/api/ai-interaction/status?address=${encodeURIComponent(params.address)}`
    );
    return response.data;
  },
};

// Blockchain information APIs
export const blockchainApi = {
  // Get all blockchain information and native token information
  getAllInfo: async () => {
    const response = await apiClient.get<ApiResponse<{
      chains: Array<{
        chainId: number;
        chainName: string;
        rpcUrl: string;
        nativeCurrencyName: string;
        blockExplorerUrl: string;
      }>;
      tokens: Array<{
        chainId: number;
        symbol: string;
        name: string;
      }>;
      totalChains: number;
      totalTokens: number;
    }>>('/api/blockchain/info');
    return response.data;
  },
};
