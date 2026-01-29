import { useQuery } from "@tanstack/react-query";
import type { UserInfo } from "@/types/api";

interface UserInfoResponse {
  success: boolean;
  data: UserInfo;
  error?: string;
}

export function useUserInfo(address: string | undefined) {
  return useQuery({
    queryKey: ["userInfo", address],
    queryFn: async () => {
      if (!address) {
        throw new Error("Address is required");
      }

      const response = await fetch(`/api/user/info?address=${address}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data: UserInfoResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch user info");
      }

      return data.data;
    },
    enabled: !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
