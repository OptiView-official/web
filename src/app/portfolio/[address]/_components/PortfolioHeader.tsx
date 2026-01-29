"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RefreshIcon, SelectDownIcon } from "@/icon";
import { useUserDataContext } from "./context";
import type { ChainTotalValue } from "@/types/api";

interface PortfolioHeaderProps {
  selectedChain: string | null;
  onChainSelect: (chain: string | null) => void;
  onRefresh: () => void;
  lastRefreshTime: Date | null;
  isRefreshing?: boolean;
}

export default function PortfolioHeader({
  selectedChain,
  onChainSelect,
  onRefresh,
  lastRefreshTime,
  isRefreshing = false,
}: PortfolioHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { chainTotalValue, allChainsCount } = useUserDataContext();

  //
  const getTimeAgo = (date: Date | null): string => {
    if (!date) return "";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Updating data";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  //
  const getSelectedChainName = (): string => {
    if (!selectedChain) return "All chain";
    const chain = chainTotalValue?.find((c) => c.network === selectedChain);
    return chain?.name ?? "All chain";
  };

  //
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChainClick = (chain: ChainTotalValue | null) => {
    onChainSelect(chain ? chain.network : null);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex items-center gap-4 text-sm sm:gap-8">
      {/*  */}
      <div className="flex items-center gap-2">
        {lastRefreshTime && (
          <span className="hidden text-grey-3 sm:inline">{getTimeAgo(lastRefreshTime)}</span>
        )}
        <RefreshIcon
          className={`cursor-pointer transition-opacity hover:opacity-70 ${isRefreshing ? "animate-spin" : ""}`}
          onClick={onRefresh}
        />
      </div>

      {/*  */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex cursor-pointer items-center gap-1 rounded-[14px] rounded-b-none bg-[#F7F7F7] px-3 py-2 text-xs transition-colors hover:bg-[#E8E8E8] sm:gap-2 sm:px-[19px] sm:py-[12px] sm:text-sm"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="max-w-[80px] truncate sm:max-w-none">{getSelectedChainName()}</span>
          <SelectDownIcon
            className={`h-3 w-3 flex-shrink-0 transition-transform sm:h-4 sm:w-4 ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </div>

        {/*  */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 w-[280px] max-h-[400px] rounded-[14px] rounded-t-none bg-white shadow-lg overflow-hidden flex flex-col sm:w-[500px] sm:max-h-[600px]">
            {/*  -  */}
            <div className="overflow-y-auto p-2 sm:p-4">
              {/*  -  */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {/* All chain  */}
                <div
                  className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition-all hover:bg-[#F5F5F5] border-2 sm:gap-3 sm:px-4 sm:py-3 ${
                    !selectedChain
                      ? "bg-[#EFF6FF] border-[#35E7FF]"
                      : "bg-white border-transparent hover:border-[#E8E8E8]"
                  }`}
                  onClick={() => handleChainClick(null)}
                >
                  <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 sm:h-8 sm:w-8">
                    <span className="text-[10px] font-medium text-gray-600 sm:text-xs">All</span>
                  </div>
                  <div className="text-xs font-medium flex-1 sm:text-sm">All Chain</div>
                </div>

                {/*  */}
                {chainTotalValue?.map((chain: ChainTotalValue) => (
                  <div
                    key={chain.network}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition-all hover:bg-[#F5F5F5] border-2 sm:gap-3 sm:px-4 sm:py-3 ${
                      selectedChain === chain.network
                        ? "bg-[#EFF6FF] border-[#35E7FF]"
                        : "bg-white border-transparent hover:border-[#E8E8E8]"
                    }`}
                    onClick={() => handleChainClick(chain)}
                  >
                    <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full sm:h-8 sm:w-8">
                      {chain.icon && chain.icon.trim() !== "" ? (
                        <Image
                          src={chain.icon}
                          alt={chain.name}
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-full">
                          <span className="text-[10px] text-gray-500 font-medium sm:text-xs">
                            {chain.name[0]?.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-medium flex-1 truncate sm:text-sm">{chain.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/*  */}
            {allChainsCount > 0 && (
              <div className="border-t border-gray-200 px-2 py-2 bg-[#F7F7F7] flex items-center gap-2 sm:px-4 sm:py-3">
                <span className="text-[10px] text-gray-500 sm:text-xs">
                  {allChainsCount} chains supported
                </span>
                {/* <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg> */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
