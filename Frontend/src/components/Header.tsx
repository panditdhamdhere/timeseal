"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold text-[var(--accent)]">
            TimeSeal
          </span>
          <span className="hidden text-sm text-[var(--muted)] sm:inline">
            — Crypto Time Capsule
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Home
          </Link>
          <Link
            href="/create"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Create
          </Link>
          <Link
            href="/capsules"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            My Capsules
          </Link>
          <Link
            href="/gallery"
            className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            Gallery
          </Link>
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
