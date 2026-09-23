"use client";

import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";

export function MobileTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-payflow-light/40 bg-white px-4 py-3 lg:hidden">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-payflow-dark/70 transition-colors hover:bg-payflow-light/20"
      >
        <Menu className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <Link href="/dashboard" className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-payflow-orange">
          <ArrowRight className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
        </span>
        <span className="text-[15px] font-semibold text-payflow-dark">
          pay<span className="text-payflow-orange">flow</span>
        </span>
      </Link>
    </div>
  );
}