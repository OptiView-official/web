"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      router.push(`/portfolio/${address}`);
    } else {
      void open();
    }
  }, [address, isConnected, router, open]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-t-primary mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300"></div>
      </div>
    </div>
  );
}
