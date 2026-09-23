import { Wallet, FileText, Landmark, Users, UserPlus, Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InvoiceHealthDonut } from "@/components/dashboard/InvoiceHealthDonut";
import Link  from "next/link";

export const metadata = {
  title: "Dashboard — PayFlow",
};

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader userName="Adaeze" initials="AO" />

      <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-payflow-orange">
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date())}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-payflow-dark sm:text-2xl">
              Your business at a glance
            </h2>
            <p className="mt-1 text-sm text-payflow-accent">
              Keep invoices moving and stay close to the numbers that matter.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="btn-payflow-outline flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium">
              <UserPlus className="h-4 w-4" strokeWidth={1.75} />
              Add customer
            </button>
            <Link href='/dashboard/invoices/new'>
            <button className="btn-payflow-primary flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium">
              <Plus className="h-4 w-4" strokeWidth={2} />
              Create invoice
            </button>
            </Link>
          </div>
        </div>

        {/* Stat cards — 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={Wallet}
            label="Total revenue"
            value="₦4.82m"
            change="+18.4%"
            variant="dark"
          />
          <StatCard
            icon={FileText}
            label="Outstanding invoices"
            value="₦2.14m"
            change="+6.2%"
          />
          <StatCard
            icon={Landmark}
            label="Payments received"
            value="₦3.68m"
            change="+12.7%"
          />
          <StatCard
            icon={Users}
            label="Active customers"
            value="48"
            change="+4.8%"
          />
        </div>

        {/* Charts — stacked until xl, then revenue takes 2/3 */}
        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RevenueChart />
          </div>
          <InvoiceHealthDonut />
        </div>
      </main>
    </>
  );
}