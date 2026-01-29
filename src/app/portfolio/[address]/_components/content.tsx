"use client";
import { Button } from "@/components/ui/button";
import {
  CopySquareIcon,
  GridSquareIcon,
  ArrowSquareIcon,
  TransactionBlocksBadge,
  ActivityBadge,
} from "@/icon/home";
import { AreaChart } from "@/components/ui/chart/area";
import ChainsTabs from "./chains-tabs";
import { formatAddress } from "@/hooks/utils";
import { useUserDataContext } from "./context";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

import { blo } from "blo";
import { UsernameEditor } from "@/components/username-editor";


function WaveChart() {
  return (
    <svg
      className="mt-4 h-[226px] w-full"
      viewBox="0 0 1200 226"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bdf6ff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#eafcff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="wave-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#32e1ff" />
          <stop offset="100%" stopColor="#3be6ff" />
        </linearGradient>
      </defs>
      <path
        d="M10 120 C 120 20, 220 40, 320 80 C 430 130, 520 40, 610 90 C 700 140, 780 210, 860 110 C 960 0, 1060 0, 1190 90"
        fill="none"
        stroke="url(#wave-stroke)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M10 120 C 120 20, 220 40, 320 80 C 430 130, 520 40, 610 90 C 700 140, 780 210, 860 110 C 960 0, 1060 0, 1190 90 L 1190 226 L 10 226 Z"
        fill="url(#wave-fill)"
        opacity="0.9"
      />
    </svg>
  );
}

export default function Content() {
  const { totalValue, address, isOwner } = useUserDataContext();
  const { disconnect } = useDisconnect();
  const [showQR, setShowQR] = useState(false);
  const [qrPosition, setQrPosition] = useState({ x: 0, y: 0 });
  const userInfo = null;

  const change24h = null;

  //
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Copied");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  //
  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setQrPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setShowQR(true);
  };

  const handleMouseLeave = () => {
    setShowQR(false);
  };

  //
  const handleDisconnect = () => {
    disconnect();
    toast.success("Wallet disconnected");
  };

  const cardList = [
    {
      title: "Total Balance",
      value: `$${formatNumber(totalValue)}`,
      bg: "/images/balance_bg.png",
      img: "/images/balance.svg",
      percentage: "",
    },
    {
      title: "24h Change",
      value: change24h
        ? `${change24h.isPositive ? "+" : ""}$${formatNumber(Math.abs(change24h.value))}`
        : netCurveLoading
        ? "Loading..."
        : "-",
      bg: "/images/change_bg.png",
      img: "/images/change.svg",
      percentage: change24h
        ? `${change24h.isPositive ? "+" : ""}${formatNumber(Math.abs(change24h.percentage))}%`
        : "+0.00%",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-[50px] p-4 pb-[80px] font-medium">
      {isOwner && (
        <div className="mt-1 text-[24px] font-medium text-black">
          My Portfolio
        </div>
      )}
      {/* Username */}
      <div className="grid grid-cols-1 gap-4 rounded-xl p-4 md:grid-cols-2">
        <div className="flex items-center">
          <div className="h-[50px] w-[50px] sm:h-[67px] sm:w-[67px] rounded-full overflow-hidden">
            <img
              src={blo(address as `0x${string}`)}
              alt="avatar"
              className="h-full w-full"
            />
          </div>
          <div className="mr-4 ml-3 sm:mr-[66px] sm:ml-[17px] flex-1">
            {isOwner ? (
              <UsernameEditor
                address={address}
                currentDisplayName={userInfo?.displayName || null}
                usernameChangeCount={userInfo?.usernameChangeCount || 0}
                onSuccess={() => {
                  // Success callback
                }}
              />
            ) : (
              <div className="text-sm font-semibold text-black sm:text-[16px]">
                {userInfo?.displayName || "Username"}
              </div>
            )}
            <div className="text-sm font-medium text-gray-600 sm:text-[16px]">
              {formatAddress(address)}
            </div>
          </div>
          <div className=" flex items-center gap-2 sm:gap-3">
            <CopySquareIcon
              className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-70 sm:h-7 sm:w-7"
              onClick={handleCopyAddress}
            />

            <GridSquareIcon
              className="relative h-6 w-6 cursor-pointer transition-opacity hover:opacity-70 sm:h-7 sm:w-7"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isOwner && (
              <>
                <ArrowSquareIcon
                  className="h-6 w-6 cursor-pointer transition-opacity hover:opacity-70 sm:h-7 sm:w-7"
                  onClick={handleDisconnect}
                />
              </>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <div className="inline-flex flex-1 items-end justify-end gap-1">
            {/* <div className="font-keep-calm justify-start text-xl font-medium text-black sm:text-2xl">
              ${formatNumber(totalValue)}
            </div> */}
            {/* <div className="justify-start font-keep-calm text-sm font-medium text-green-500">
              +15.15%
            </div> */}
          </div>

          {/* <div className="mr-[30px] ml-[56px] flex items-center gap-2.5">
            <TransactionBlocksBadge />
            <div className="justify-start font-keep-calm text-base font-medium text-black">
              Transaction Blocks
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ActivityBadge />
            <div className="justify-start font-keep-calm text-base font-medium text-black">
              Activity
            </div>
          </div> */}
        </div>
      </div>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cardList.map((card) => (
          <div
            key={card.title}
            className="relative rounded-xl border border-slate-200 bg-white py-6 pl-6 font-medium sm:py-[33px] sm:pl-[62px]"
            style={{
              backgroundImage: `url(${card.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={card.img}
              alt={card.title}
              className="absolute top-[50%] right-4 h-12 w-12 translate-y-[-50%] sm:right-[60px] sm:h-auto sm:w-auto"
            />
            <div className="text-xs text-slate-500 sm:text-sm">
              {card.title}
            </div>
            <div className="mt-2 text-lg font-semibold sm:text-2xl">
              {card.value}
            </div>
            <div
              className={`mt-1 text-xs ${
                card.title === "24h Change" && change24h
                  ? change24h.isPositive
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-green-600"
              }`}
            >
              {card.percentage}
            </div>
          </div>
        ))}
      </section>

      {/* Performance + AI advisor */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-[#E7E7E7] bg-white p-4 pb-0 lg:col-span-2">
          <div className="mt-4 mb-4 flex flex-col justify-between gap-4 sm:mt-[25px] sm:mb-[27px] sm:flex-row sm:items-end">
            <div>
              <div className="text-lg font-semibold sm:text-2xl">
                Portfolio Performance
              </div>
              <div className="text-grey text-sm sm:text-base">Last 24 Hours</div>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-lg font-semibold sm:text-2xl">
                ${formatNumber(totalValue)}
              </div>
              <div
                className={`text-xs ${
                  change24h
                    ? change24h.isPositive
                      ? "text-green-600"
                      : "text-red-600"
                    : "text-green-600"
                }`}
              >
                {change24h
                  ? `${change24h.isPositive ? "+" : ""}${formatNumber(Math.abs(change24h.percentage))}%`
                  : "+0.00%"}
              </div>
            </div>
          </div>
          <div className="h-[180px] sm:h-[226px]">
            <AreaChart
              data={[]}
              height={180}
            />
          </div>
        </div>
        <div className="rounded-xl border border-[#E7E7E7] bg-white p-4">
          <div className="text-sm text-black sm:text-base">
            AI Financial Advisor
          </div>
          <div className="text-grey mt-2 text-xs sm:text-sm">
            Your AI is ready to help. Ask for portfolio analysis, market trends,
            or financial advice.
          </div>
          <div className="mt-4 mb-4 flex flex-col gap-3 rounded-2xl bg-zinc-100 px-3 py-4 sm:mt-[23px] sm:mb-[29px] sm:px-4 sm:py-5">
            <div className="font-keep-calm justify-start text-xs font-medium text-neutral-500 sm:text-sm">
              {`"What are the top 3 performing assets this month?"`}
            </div>
            <span className="h-px w-full bg-zinc-200"></span>
            <div className="font-keep-calm justify-start text-xs font-medium text-neutral-500 sm:text-sm">
              {`"Should I rebalance my portfolio based on current trends?"`}
            </div>
          </div>
          <Link href="/ai-chatbot" className="cursor-pointer">
            <Button className="w-full cursor-pointer" size="primary">
              Start Chatting
            </Button>
          </Link>
        </div>
      </section>

      {/* Chains */}
      <ChainsTabs address={address} />

      {/* QR Code Popover */}
      {showQR && (
        <div
          className="fixed z-50 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
          style={{
            left: qrPosition.x - 100,
            top: qrPosition.y - 120,
            transform: "translateX(-50%)",
          }}
          onMouseEnter={() => setShowQR(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-center">
            <div className="mb-2 text-sm font-medium text-gray-700">
              Wallet Address QR
            </div>
            <div className="flex justify-center">
              <QRCodeSVG
                value={address}
                size={128}
                level="M"
                includeMargin={true}
              />
            </div>
            <div className="mt-2 w-[200px] text-center text-xs break-all text-gray-500">
              {address}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
