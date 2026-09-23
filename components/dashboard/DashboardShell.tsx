"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileTopBar } from "@/components/dashboard/MobileTopBar";

/**
 * Wraps every (dashboard) route in the sidebar + mobile drawer state.
 * Lives at the layout level so any page — dashboard, invoices, invoices/new, etc. —
 * gets the responsive shell without re-implementing the open/close logic.
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-payflow-light/10">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <MobileTopBar onMenuClick={() => setSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}