"use client";

import * as React from "react";
import { Area, AreaChart as RAreaChart, Tooltip, XAxis } from "recharts";

export type AreaPoint = { x: number; y: number };

export function AreaChart({
  data,
  height = 226,
  stroke = "#32e1ff",
  fillFrom = "#bdf6ff",
  fillTo = "#ffffff",
  className = "w-full",
}: {
  data: AreaPoint[];
  height?: number;
  stroke?: string;
  fillFrom?: string;
  fillTo?: string;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ height }}>
      {width > 0 ? (
        <RAreaChart width={width} height={height} data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fillFrom} stopOpacity={0.8} />
              <stop offset="60%" stopColor={fillFrom} stopOpacity={0.35} />
              <stop offset="100%" stopColor={fillTo} stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="x" hide />
          <Tooltip cursor={{ stroke: "transparent" }} />
          <Area
            type="natural"
            dataKey="y"
            stroke={stroke}
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#chart-fill)"
          />
        </RAreaChart>
      ) : null}
    </div>
  );
}


