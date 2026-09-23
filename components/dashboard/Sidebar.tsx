"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Users,
  BarChart3,
  Settings,
  ArrowRight,
  MoreHorizontal,
  X,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const WORKSPACE_LINKS: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/payments", label: "Payments", icon: CreditCard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

const MANAGE_LINKS: NavLink[] = [{ href: "/settings", label: "Settings", icon: Settings }];

export interface SidebarUser {
  name: string;
  initials: string;
  subtitle: string;
}

interface SidebarProps {
  user?: SidebarUser;
  /** Whether the mobile drawer is open. Ignored at the lg breakpoint, where the sidebar is always visible. */
  open?: boolean;
  /** Called when the drawer should close — backdrop click, close button, or a nav link tap on mobile. */
  onClose?: () => void;
}

const DEFAULT_USER: SidebarUser = {
  name: "Adaeze Okafor",
  initials: "AO",
  subtitle: "Sage & Finch Studio",
};

/** True if the current path is this link's own route or a sub-route of it (e.g. /invoices/new). */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavSection({
  title,
  links,
  pathname,
  onNavigate,
}: {
  title: string;
  links: NavLink[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-0.5 px-3">
      <p className="px-3 pb-2 text-[11px] font-medium tracking-wide text-white/40">{title}</p>
      {links.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm sm:py-2 transition-colors ${
              active ? "bg-white/10 font-medium text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {label}
            </span>
            {active && <span className="h-1.5 w-1.5 rounded-full bg-payflow-orange" />}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar({ user = DEFAULT_USER, open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop — mobile/tablet only, closes the drawer on tap */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar-payflow fixed inset-y-0 left-0 z-40 flex h-[118vh] w-72 max-w-[85vw] shrink-0 flex-col justify-between py-6 transition-transform duration-200 ease-out sm:w-64
          lg:static lg:z-auto lg:w-60 lg:max-w-none lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div>
          <div className="flex items-center justify-between px-6">
            <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-payflow-orange">
                <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-[17px] font-semibold text-white">
                pay<span className="text-payflow-orange">flow</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>

          <div className="mt-10">
            <NavSection title="Workspace" links={WORKSPACE_LINKS} pathname={pathname} onNavigate={onClose} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <NavSection title="Manage" links={MANAGE_LINKS} pathname={pathname} onNavigate={onClose} />

          {/* User profile footer */}
          <div className="flex items-center gap-2.5 border-t border-white/10 px-6 pt-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white">
              {user.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="truncate text-xs text-white/50">{user.subtitle}</p>
            </div>
            <button
              aria-label="Account menu"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
