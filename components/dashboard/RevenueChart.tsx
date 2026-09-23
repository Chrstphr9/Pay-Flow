"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";

interface RevenuePoint {
  month: string;
  value: number;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      value: number;
      [key: string]: unknown;
    }>;
    label?: string;
  }

const DEFAULT_DATA: RevenuePoint[] = [
  { month: "Jul", value: 2_950_000 },
  { month: "Aug", value: 3_420_000 },
  { month: "Sep", value: 2_610_000 },
  { month: "Oct", value: 3_980_000 },
  { month: "Nov", value: 3_310_000 },
  { month: "Dec", value: 4_260_000 },
  { month: "Jan", value: 3_720_000 },
  { month: "Feb", value: 4_140_000 },
  { month: "Mar", value: 4_390_000 },
  { month: "Apr", value: 4_610_000 },
  { month: "May", value: 3_090_000 },
  { month: "Jun", value: 4_820_500 },
];

const RANGE_OPTIONS = ["Last 12 months", "Last 6 months", "This year"];

function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-payflow-light/50 bg-white px-3 py-2 shadow-sm">
      <p className="text-xs text-payflow-accent">{label}</p>
      <p className="text-sm font-semibold text-payflow-dark">
        {formatNaira(payload[0].value)}
      </p>
    </div>
  );
}

export function RevenueChart({ data = DEFAULT_DATA }: { data?: RevenuePoint[] }) {
  const [range, setRange] = useState(RANGE_OPTIONS[0]);
  const total = data[data.length - 1]?.value ?? data.reduce((s, d) => s + d.value, 0);
  const currentMonth = data[data.length - 1]?.month ?? "";

  return (
    <div className="card-payflow rounded-2xl border border-payflow-light/40 bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <p className="text-sm font-medium text-payflow-dark">Revenue trend</p>

        <div className="relative">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="appearance-none rounded-lg border border-payflow-light/50 bg-white py-1.5 pl-3 pr-8 text-xs font-medium text-payflow-dark outline-none focus:border-payflow-accent"
          >
            {RANGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-payflow-dark/50" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xl font-semibold text-payflow-dark sm:text-2xl">
            {formatNaira(total)}
          </p>
          <p className="mt-0.5 text-xs text-emerald-600">Collected revenue ↑ 18.4%</p>
        </div>
        <p className="text-xs text-payflow-accent">{currentMonth} 2024</p>
      </div>

      <div className="mt-6 h-44 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="28%">
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#7393B3" }}
            />
            <Tooltip cursor={{ fill: "#B2BEB520" }} content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={entry.month}
                  fill={index === data.length - 1 ? "#FF9620" : "#B2BEB570"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}