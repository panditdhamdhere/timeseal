"use client";

import { useState, useEffect } from "react";
import { formatEther } from "viem";
import type { Capsule } from "@/lib/contract";

const THEME_COLORS: Record<string, string> = {
  Birthday: "from-amber-500/20 to-orange-600/20",
  Milestone: "from-violet-500/20 to-purple-600/20",
  "Future Self": "from-cyan-500/20 to-blue-600/20",
  Legacy: "from-emerald-500/20 to-teal-600/20",
  Default: "from-[var(--accent-dim)]/20 to-[var(--accent)]/20",
};

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp) * 1000).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTimeRemaining(seconds: bigint): string {
  const s = Number(seconds);
  if (s <= 0) return "Unlockable now";
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (mins > 0 || parts.length === 0) parts.push(`${mins}m`);
  return `Unlocks in ${parts.join(" ")}`;
}

function useTimeUntilUnlock(unlockTimestamp: bigint) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      const unlock = Number(unlockTimestamp);
      setSeconds(Math.max(0, unlock - now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [unlockTimestamp]);
  return BigInt(seconds);
}

type CapsuleCardProps = {
  capsule: Capsule;
  variant?: "received" | "sent" | "public";
  onOpen?: (id: bigint) => void;
  onAddETH?: (id: bigint) => void;
};

export function CapsuleCard({
  capsule,
  variant = "received",
  onOpen,
  onAddETH,
}: CapsuleCardProps) {
  const timeRemaining = useTimeUntilUnlock(capsule.unlockTimestamp);
  const isUnlockable = !capsule.isOpened && timeRemaining === 0n;
  const themeClass =
    THEME_COLORS[capsule.theme] || THEME_COLORS.Default;
  const ethAmount = formatEther(capsule.ethAmount);

  return (
    <div
      className={`card-hover glass-card bg-gradient-to-br ${themeClass} p-5`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
              #{capsule.capsuleId.toString()}
            </span>
            <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--muted)]">
              {capsule.theme || "Capsule"}
            </span>
            {capsule.isPublic && (
              <span className="rounded-full bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--muted)]">
                Public
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-[var(--muted)]">
            {variant === "received" && "Sent to you"}
            {variant === "sent" && "Sent by you"}
            {variant === "public" && "Public capsule"}
          </p>

          <p className="mt-1 text-sm">
            Unlocks: {formatDate(capsule.unlockTimestamp)}
          </p>

          {!capsule.isOpened && (
            <p
              className={`mt-1 text-sm font-medium ${
                isUnlockable ? "text-emerald-400" : "text-[var(--muted)]"
              }`}
            >
              {capsule.isOpened
                ? "Opened"
                : formatTimeRemaining(timeRemaining)}
            </p>
          )}

          {capsule.ethAmount > 0n && (
            <p className="mt-2 text-lg font-semibold text-[var(--accent)]">
              {ethAmount} ETH
            </p>
          )}
        </div>

        {!capsule.isOpened && (
          <div className="flex flex-col gap-2">
            {isUnlockable && onOpen && (
              <button
                onClick={() => onOpen(capsule.capsuleId)}
                className="btn-primary rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)]"
              >
                Open Capsule
              </button>
            )}
            {onAddETH && (
              <button
                onClick={() => onAddETH(capsule.capsuleId)}
                className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] transition-all duration-200 hover:bg-[var(--surface-hover)] hover:border-[var(--accent-dim)]/50"
              >
                Add ETH
              </button>
            )}
          </div>
        )}

        {capsule.isOpened && (
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
            Opened
          </span>
        )}
      </div>
    </div>
  );
}
