"use client";

import { useMemo, useState, type FormEvent } from "react";

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const checks = useMemo(
    () => ({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    }),
    [password]
  );

  const passwordsMatch =
    confirmPassword.length > 0 && confirmPassword === password;
  const allValid =
    checks.length && checks.uppercase && checks.number && passwordsMatch;
  const canSubmit = fullName && email && allValid && agreed && !submitting;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    // Replace with your real sign-up call, e.g. POST to /api/register
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log({ fullName, email, password });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
      <div>
        <label
          htmlFor="fullName"
          className="mb-[7px] block text-xs font-semibold tracking-wide text-foreground"
        >
          Full name <span className="text-payflow-orange">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          autoComplete="name"
          placeholder="Adaeze Okafor"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input-payflow"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-[7px] block text-xs font-semibold tracking-wide text-foreground"
        >
          Work email <span className="text-payflow-orange">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-payflow"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-[7px] block text-xs font-semibold tracking-wide text-foreground"
        >
          Password <span className="text-payflow-orange">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-payflow pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-payflow-blue"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-muted p-4">
        <p className="mb-2 text-sm font-semibold text-foreground">
          Password guidance
        </p>
        <ul className="flex flex-col gap-1.5">
          <GuidanceItem met={checks.length}>At least 8 characters</GuidanceItem>
          <GuidanceItem met={checks.uppercase}>One uppercase letter</GuidanceItem>
          <GuidanceItem met={checks.number}>One number</GuidanceItem>
        </ul>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-[7px] block text-xs font-semibold tracking-wide text-foreground"
        >
          Confirm password <span className="text-payflow-orange">*</span>
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            required
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`input-payflow pr-11 ${
              confirmPassword.length > 0 && !passwordsMatch
                ? "border-destructive focus:ring-destructive"
                : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-payflow-blue"
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {confirmPassword.length > 0 && !passwordsMatch && (
          <p className="mt-1.5 text-xs text-destructive">Passwords don&apos;t match</p>
        )}
      </div>

      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#FF9620]"
        />
        <span>
          I agree to PayFlow&apos;s{" "}
          <a href="/terms" className="font-medium text-foreground underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="font-medium text-foreground underline">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="btn-payflow-primary mt-1 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Creating workspace…" : "Create workspace"}
        <ArrowRightIcon />
      </button>

      <div className="my-1 flex items-center gap-3 text-[12.5px] text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or sign up with
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => console.log("google oauth")}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={() => console.log("github oauth")}
          className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
        >
          <GithubIcon />
          GitHub
        </button>
      </div>

      <p className="mt-1 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-foreground underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

function GuidanceItem({
  met,
  children,
}: {
  met: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-2 text-sm">
      <span
        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-colors ${
          met
            ? "border-payflow-orange bg-payflow-orange text-white"
            : "border-payflow-light bg-transparent"
        }`}
      >
        {met && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span className={met ? "text-foreground" : "text-muted-foreground"}>
        {children}
      </span>
    </li>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a21.6 21.6 0 015.06-6.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a21.6 21.6 0 01-2.87 3.94M14.12 14.12a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
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

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29A11.94 11.94 0 000 12c0 1.92.46 3.74 1.29 5.38l3.98-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}