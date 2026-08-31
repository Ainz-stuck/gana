"use client";

import { FormEvent, useState } from "react";

type AuthMode = "login" | "register";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M4 6.5h16v11H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m4.5 7 7.5 6 7.5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <rect
        x="4.5"
        y="10"
        width="15"
        height="10"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 10V7.5a4 4 0 0 1 8 0V10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="m4 4 16 16M10.6 10.6a2 2 0 0 0 2.8 2.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.7 6.8C4.9 8.1 3.8 10 3.2 12c1.4 4 4.5 6.5 8.8 6.5 1.6 0 3-.4 4.2-1.1M9.9 5.7c.7-.2 1.4-.2 2.1-.2 4.3 0 7.4 2.5 8.8 6.5-.4 1.1-1 2.1-1.7 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        d="M3.2 12c1.4-4 4.5-6.5 8.8-6.5s7.4 2.5 8.8 6.5c-1.4 4-4.5 6.5-8.8 6.5S4.6 16 3.2 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Page() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isRegistering = mode === "register";

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setSubmitted(false);
    setShowPassword(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f7f8fc] p-3 sm:p-6 lg:p-8 text-slate-900">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] border border-slate-100 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left Side: Branding & Hero Info (Visible on Desktop / Tablets lg+) */}
        <section className="relative hidden overflow-hidden bg-[#172554] p-8 sm:p-10 lg:flex lg:flex-col lg:justify-between xl:p-14 text-white">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-400/20 blur-2xl" />
          <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
          
          <div className="relative">
            <div className="mb-10 sm:mb-14 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-[#172554] shadow-md shadow-blue-950/20">
                <span className="text-xl font-black">G</span>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                  GANA Group
                </span>
                <span className="block text-[11px] text-blue-200/80 font-medium">
                  Global Agri-food, Networking & Automotive
                </span>
              </div>
            </div>
            
            <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              
            </p>
            <h1 className="max-w-md text-3xl font-semibold leading-tight tracking-[-0.03em] xl:text-4xl">
              One platform. Three industries. Endless possibilities
            </h1>
            <p className="mt-4 max-w-sm text-sm sm:text-base leading-relaxed text-blue-100/80">
              Empowering GANA Group’s Food Manufacturing, Hardware Services, and Automotive divisions with a connected workspace designed for better management, collaboration, and operational excellence.
            </p>
          </div>

          <div className="relative mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 sm:p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-1.5">
              {[0, 1, 2].map((item) => (
                <span key={item} className="h-2 w-2 rounded-full bg-white/40" />
              ))}
            </div>
            <div className="space-y-2.5">
              <div className="h-2 w-2/3 rounded-full bg-white/70" />
              <div className="h-2 w-full rounded-full bg-white/20" />
              <div className="h-2 w-5/6 rounded-full bg-white/20" />
              <div className="flex gap-2 pt-1.5">
                <div className="h-8 flex-1 rounded-lg bg-blue-300/60" />
                <div className="h-8 w-1/3 rounded-lg bg-white/15" />
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Auth Form */}
        <section className="flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-12 md:px-12 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-sm sm:max-w-md">
            {/* Mobile Header Logo */}
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#172554] text-white shadow-sm">
                <span className="text-lg font-black">G</span>
              </div>
              <div>
                <span className="block text-base font-bold tracking-tight text-slate-900 leading-tight">
                  GANA Group
                </span>
                <span className="block text-[11px] text-slate-500 font-medium">
                  Global Agri-food, Networking & Automotive
                </span>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <p className="mb-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600">
                Welcome to GANA
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                {isRegistering ? "Create your account" : "Welcome back"}
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
                {isRegistering
                  ? "Start organizing your work in a few simple steps."
                  : "Enter your details to access your workspace."}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div
              className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1"
              role="tablist"
              aria-label="Authentication mode"
            >
              {(["login", "register"] as AuthMode[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={mode === item}
                  onClick={() => switchMode(item)}
                  className={`rounded-lg px-3 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold capitalize transition-all ${
                    mode === item
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {item === "login" ? "Log in" : "Register"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {isRegistering && (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Alex Morgan"
                    className="h-11 sm:h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 sm:px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <MailIcon />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    className="h-11 sm:h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 sm:pl-12 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                  {!isRegistering && (
                    <button
                      type="button"
                      className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <LockIcon />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      isRegistering ? "new-password" : "current-password"
                    }
                    required
                    minLength={8}
                    placeholder="••••••••"
                    className="h-11 sm:h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 sm:pl-12 pr-11 sm:pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  >
                    <EyeIcon hidden={!showPassword} />
                  </button>
                </div>
              </div>
              
              {isRegistering ? (
                <label
                  key="terms-agreement-field"
                  className="flex items-start gap-2.5 sm:gap-3 text-xs leading-5 text-slate-500 cursor-pointer"
                >
                  <input
                    key="terms-checkbox"
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(event) => setAgreeTerms(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded accent-blue-600"
                  />{" "}
                  <span>
                    I agree to the{" "}
                    <button
                      type="button"
                      className="font-semibold text-slate-700 underline underline-offset-2 hover:text-blue-600"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-semibold text-slate-700 underline underline-offset-2 hover:text-blue-600"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
              ) : (
                <label
                  key="remember-me-field"
                  className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-500 cursor-pointer"
                >
                  <input
                    key="remember-checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                  Remember me
                </label>
              )}

              <button
                type="submit"
                className="h-11 sm:h-12 w-full rounded-xl bg-[#172554] text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-950/10 transition hover:-translate-y-0.5 hover:bg-blue-900 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              >
                {isRegistering ? "Create account" : "Log in"}{" "}
                <span className="ml-1">→</span>
              </button>

              {submitted && (
                <p className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-xs sm:text-sm font-medium text-emerald-700 border border-emerald-200/60">
                  Demo submitted successfully. Connect this form to your auth
                  provider.
                </p>
              )}
            </form>

            {/* Switch Mode Footer */}
            <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-500">
              {isRegistering
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => switchMode(isRegistering ? "login" : "register")}
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                {isRegistering ? "Log in" : "Register now"}
              </button>
            </p>

            <p className="mt-8 sm:mt-10 text-center text-[11px] sm:text-xs text-slate-400">
              © 2026 GANA Group. Built for focused teams.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

