import { ArrowUpRight, type LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  variant?: "dark" | "light";
}

export function StatCard({ icon: Icon, label, value, change, variant = "light" }: StatCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`card-payflow flex flex-col gap-5 rounded-2xl border p-4 sm:gap-6 sm:p-5 ${
        isDark
          ? "border-transparent bg-payflow-dark"
          : "border-payflow-light/40 bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            isDark ? "bg-white/10 text-white" : "bg-payflow-light/30 text-payflow-dark"
          }`}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-medium ${
            isDark ? "text-payflow-orange" : "text-emerald-600"
          }`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
          {change}
        </span>
      </div>

      <div>
        <p className={`text-sm ${isDark ? "text-white/60" : "text-payflow-accent"}`}>
          {label}
        </p>
        <p className={`mt-1 text-2xl font-semibold ${isDark ? "text-white" : "text-payflow-dark"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}