"use client";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border)]/70 bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[min(1600px,96vw)] flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-[var(--muted)] sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} TimeSeal. All rights reserved.
        </p>
        <p className="text-center sm:text-right">
          Built for time‑locked memories onchain.
        </p>
      </div>
    </footer>
  );
}

