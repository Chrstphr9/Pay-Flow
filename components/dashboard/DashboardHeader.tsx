"use client";

import { Search, Bell, ChevronDown } from "lucide-react";

function formatToday() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function DashboardHeader({
  userName,
  initials,
}: {
  userName: string;
  initials: string;
}) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-payflow-light/40 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div className="min-w-0">
        <p className="text-xs font-medium text-payflow-accent">{formatToday()}</p>
        <h1 className="mt-0.5 truncate text-lg font-semibold text-payflow-dark sm:text-xl">
          Good morning, {userName}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full text-payflow-dark/60 transition-colors hover:bg-payflow-light/30 hover:text-payflow-dark"
        >
          <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>
        <button
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-payflow-dark/60 transition-colors hover:bg-payflow-light/30 hover:text-payflow-dark"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </button>

        <div className="hidden h-6 w-px bg-payflow-light/50 sm:block" />

        <button className="flex items-center gap-2 rounded-full pl-0.5 pr-1 transition-colors hover:bg-payflow-light/20">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-payflow-light/40 text-sm font-medium text-payflow-dark">
            {initials}
          </span>
          <span className="hidden text-sm font-medium text-payflow-dark sm:inline">{userName}</span>
          <ChevronDown className="hidden h-4 w-4 text-payflow-dark/50 sm:block" />
        </button>
      </div>
    </header>
  );
}