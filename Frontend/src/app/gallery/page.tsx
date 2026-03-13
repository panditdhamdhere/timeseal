"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { CapsuleCard } from "@/components/CapsuleCard";
import { usePublicCapsules } from "@/hooks/useCapsules";

export default function GalleryPage() {
  const { capsules } = usePublicCapsules();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          ← Back
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-[var(--foreground)]">
          Public Gallery
        </h1>
        <p className="mb-8 text-[var(--muted)]">
          Browse time capsules that creators have made public. Only metadata is
          visible—messages stay encrypted until opened by the recipient.
        </p>

        {capsules.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
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
            {capsules.map((capsule) => (
              <CapsuleCard
                key={capsule.capsuleId.toString()}
                capsule={capsule}
                variant="public"
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
