"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface Segment {
  label: string;
  value: number;
  color: string;
}

const DEFAULT_SEGMENTS: Segment[] = [
  { label: "Paid", value: 18, color: "#7393B3" },
  { label: "Sent", value: 11, color: "#FF9620" },
  { label: "Overdue", value: 4, color: "#36454F" },
  { label: "Draft", value: 3, color: "#B2BEB5" },
];

export function InvoiceHealthDonut({ segments = DEFAULT_SEGMENTS }: { segments?: Segment[] }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="card-payflow flex h-full flex-col rounded-2xl border border-payflow-light/40 bg-white p-4 sm:p-6">
      <p className="text-sm font-medium text-payflow-dark">Invoice health</p>

      <div className="relative mx-auto mt-2 h-44 w-44 sm:h-52 sm:w-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="label"
              innerRadius="72%"
              outerRadius="100%"
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {segments.map((s) => (
                <Cell key={s.label} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-payflow-dark sm:text-3xl">{total}</span>
          <span className="text-xs text-payflow-accent">active invoices</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-y-3">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-payflow-dark/70">{s.label}</span>
            <span className="ml-auto font-medium text-payflow-dark">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}