import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Default stale time 5 minutes
        staleTime: 5 * 60 * 1000,
        // Default GC time 10 minutes
        gcTime: 10 * 60 * 1000,
        // Retry count
        retry: 3,
        // Retry delay
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // Do not refetch on window focus
        refetchOnWindowFocus: false,
        // Refetch on reconnect
        refetchOnReconnect: true,
      },
      mutations: {
        // Retry count
        retry: 1,
      },
    },
  });
