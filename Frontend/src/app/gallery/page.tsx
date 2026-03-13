"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { CapsuleCard } from "@/components/CapsuleCard";
import { usePublicCapsules } from "@/hooks/useCapsules";

export default function GalleryPage() {
  const { capsules } = usePublicCapsules();

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

        <h1 className="animate-fade-in-up mb-2 text-2xl font-bold text-[var(--foreground)]">
          Public Gallery
        </h1>
        <p className="animate-fade-in-up animate-delay-100 mb-8 text-[var(--muted)]">
          Browse time capsules that creators have made public. Only metadata is
          visible—messages stay encrypted until opened by the recipient.
        </p>

        {capsules.length === 0 ? (
          <div className="animate-fade-in-up rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-8 text-center">
            <p className="text-[var(--muted)]">
              No public capsules yet. Create one and check &quot;Make public&quot; to
              add it here.
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
