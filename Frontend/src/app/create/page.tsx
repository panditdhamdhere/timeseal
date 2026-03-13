"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { Header } from "@/components/Header";
import { CreateCapsuleForm } from "@/components/CreateCapsuleForm";

export default function CreatePage() {
  const { isConnected } = useAccount();

  return (
    <div className="relative min-h-screen min-h-[100dvh]">
      <Header />
      <main className="relative z-10 mx-auto w-full max-w-[min(800px,96vw)] px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          ← Back
        </Link>

        {!isConnected ? (
          <div className="animate-fade-in-up rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-8 text-center">
            <p className="text-[var(--muted)]">
              Connect your wallet to create a time capsule.
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Use the Connect Wallet button in the header.
            </p>
          </div>
        ) : (
          <CreateCapsuleForm />
        )}
      </main>
    </div>
  );
}
