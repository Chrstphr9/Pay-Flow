import type { Metadata } from "next";
import SignUpForm from "./register";

export const metadata: Metadata = {
  title: "Create your workspace — PayFlow",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-5">
      <div className="grid w-full max-w-[900px] grid-cols-1 overflow-hidden rounded-2xl bg-card shadow-2xl md:grid-cols-[1fr_1.15fr]">
        {/* Left brand panel */}
        <div className="sidebar-payflow hidden flex-col justify-between p-9 md:flex">
          <div className="flex items-center gap-2.5">
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-payflow-orange text-white">
              <ArrowRightIcon />
            </div>
            <div className="text-lg font-bold tracking-tight">
              pay<span className="text-payflow-orange">flow</span>
            </div>
          </div>

          <div>
            <p className="mb-3.5 text-[12.5px] font-bold tracking-wide text-payflow-orange">
              Money, made clear.
            </p>
            <p className="max-w-[30ch] text-[14.5px] leading-relaxed text-white/80">
              PayFlow keeps every invoice, payment and customer conversation in
              one calm workspace.
            </p>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="mb-2.5 text-xs font-bold tracking-wide text-payflow-orange">
            Start free today
          </p>
          <h1 className="mb-2 text-[28px] leading-tight text-card-foreground">
            Make invoicing feel lighter.
          </h1>
          <p className="mb-7 text-sm text-muted-foreground">
            Your first workspace takes less than two minutes.
          </p>

          <SignUpForm />
        </div>
      </div>
    </main>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}