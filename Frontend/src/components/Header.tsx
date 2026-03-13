"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create" },
  { href: "/capsules", label: "My Capsules" },
  { href: "/gallery", label: "Gallery" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="mx-auto flex h-14 sm:h-16 w-full max-w-[min(1600px,96vw)] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-[var(--accent)] to-amber-400 bg-clip-text text-transparent">
            TimeSeal
          </span>
          <span className="hidden text-sm text-[var(--muted)] sm:inline md:inline">
            — Crypto Time Capsule
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`nav-link px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                } ${isActive ? "active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block [&>div]:!rounded-xl">
            <ConnectButton />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-[var(--border)] bg-[var(--background)]/98 p-4">
          {NAV_LINKS.map(({ href, label }, i) => {
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`nav-link px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 animate-fade-in-up ${
                  isActive
                    ? "text-[var(--accent)] bg-[var(--surface)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                } ${isActive ? "active" : ""}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {label}
              </Link>
            );
          })}
          <div className="mt-2 pt-3 border-t border-[var(--border)] [&>div]:!rounded-xl sm:hidden">
            <ConnectButton />
          </div>
        </nav>
      </div>
    </header>
  );
}
