"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { CapsuleCard } from "@/components/CapsuleCard";
import { usePublicCapsules } from "@/hooks/useCapsules";

export default function GalleryPage() {
  const { capsules, isLoading, error, refetch } = usePublicCapsules();

  return (
    <div className="relative min-h-screen min-h-[100dvh]">
      <Header />
      <main className="relative z-10 mx-auto w-full max-w-[min(1600px,96vw)] px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← Back
        </Link>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="animate-fade-in-up text-2xl font-bold text-[var(--foreground)]">
              Public Gallery
            </h1>
            <p className="animate-fade-in-up animate-delay-100 mt-2 text-[var(--muted)]">
              Browse time capsules that creators have made public. Only metadata is
              visible—messages stay encrypted until opened by the recipient.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-50"
          >
            {isLoading ? "Loading…" : "Refresh"}
          </button>
        </div>

        {error && (
          <div className="animate-fade-in-up mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <p className="text-sm text-amber-400">
              Could not load gallery. Ensure you&apos;re on the same network as the contract (Sepolia or mainnet).
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-amber-500/20 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/30"
            >
              Retry
            </button>
          </div>
        )}

        {capsules.length === 0 ? (
          <div className="animate-fade-in-up rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-8 text-center">
            <p className="text-[var(--muted)]">
              No public capsules yet. Create one and check &quot;Make public&quot; to
              add it here.
            </p>
            <p className="mt-2 text-xs text-[var(--muted)] opacity-80">
              Only capsules created with &quot;Make this capsule public&quot; checked appear in the gallery.
            </p>
            <Link
              href="/create"
              className="mt-4 inline-block text-[var(--accent)] hover:underline"
            >
              Create Capsule
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {capsules.map((capsule, i) => (
              <div key={capsule.capsuleId.toString()} className="animate-fade-in-up" style={{ animationDelay: `${i * 75}ms` }}>
                <CapsuleCard
                  capsule={capsule}
                  variant="public"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
