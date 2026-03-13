"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { Header } from "@/components/Header";
import { CreateCapsuleForm } from "@/components/CreateCapsuleForm";

export default function CreatePage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          ← Back
        </Link>

        {!isConnected ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
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
