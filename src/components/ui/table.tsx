import * as React from "react";

export function Table({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="min-w-[720px] md:min-w-full overflow-hidden rounded-xl border border-[#DEDEDE] bg-white">
        {children}
      </div>
    </div>
  );
}

export function THead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`grid grid-cols-5 bg-[#F4F6F8] px-4 py-3 text-sm md:text-base text-black ${className}`}>{children}</div>;
}

export function TR({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`grid grid-cols-5 items-center px-4 py-4 text-xs md:text-sm text-grey ${className}`}>{children}</div>;
}

export function TD({ children, className = "", childrenFallback }: { children?: React.ReactNode; className?: string; childrenFallback?: React.ReactNode }) {
  return <div className={className}>{children ?? childrenFallback ?? null}</div>;
}

export function Divider() {
  return <div className="h-px w-full bg-[#ECEEF1]" />;
}


