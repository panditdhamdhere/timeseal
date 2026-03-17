"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Header } from "@/components/Header";
import { CapsuleCard } from "@/components/CapsuleCard";
import { AddETHModal } from "@/components/AddETHModal";
import { useReceivedCapsules, useSentCapsules } from "@/hooks/useCapsules";
import { TIMESEAL_ABI, TIMESEAL_ADDRESS } from "@/lib/abis/timeseal";

export default function CapsulesPage() {
  const { isConnected } = useAccount();
  const [addETHCapsuleId, setAddETHCapsuleId] = useState<bigint | null>(null);

  const { capsules: received, refetch: refetchReceived, isLoading: loadingReceived, error: errorReceived } = useReceivedCapsules();
  const { capsules: sent, refetch: refetchSent, isLoading: loadingSent, error: errorSent } = useSentCapsules();

  const { writeContract: openCapsule, data: openHash } = useWriteContract();
  const { isSuccess: openSuccess } = useWaitForTransactionReceipt({
    hash: openHash,
  });

  useEffect(() => {
    if (openSuccess) {
      refetchReceived();
      refetchSent();
    }
  }, [openSuccess, refetchReceived, refetchSent]);

  const handleOpen = (id: bigint) => {
    openCapsule({
      address: TIMESEAL_ADDRESS,
      abi: TIMESEAL_ABI,
      functionName: "openCapsule",
      args: [id],
    });
  };

  const handleAddETH = (id: bigint) => {
    setAddETHCapsuleId(id);
  };

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

        {!isConnected ? (
          <div className="animate-fade-in-up rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-8 text-center">
            <p className="text-[var(--muted)]">
              Connect your wallet to view your capsules.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {(errorReceived || errorSent) && (
              <div className="animate-fade-in-up rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                <p className="text-sm text-amber-400">
                  Could not load capsules. Make sure you&apos;re on the same network where the contract is deployed (Sepolia or mainnet) and that the contract address is correct in .env.local.
                </p>
                <button
                  onClick={() => { refetchReceived(); refetchSent(); }}
                  className="mt-3 rounded-lg bg-amber-500/20 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/30"
                >
                  Retry
                </button>
              </div>
            )}
            <section className="animate-fade-in-up">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[var(--accent)]">
                  Capsules sent to you
                </h2>
                <button
                  onClick={() => refetchReceived()}
                  disabled={loadingReceived}
                  className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-50"
                >
                  {loadingReceived ? "Loading…" : "Refresh"}
                </button>
              </div>
              {received.length === 0 ? (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 text-center text-[var(--muted)]">
                  <p>No capsules received yet.</p>
                  <p className="mt-2 text-xs opacity-80">Capsules others send to your address will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {received.map((capsule, i) => (
                    <div key={capsule.capsuleId.toString()} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                      <CapsuleCard
                        capsule={capsule}
                        variant="received"
                        onOpen={handleOpen}
                        onAddETH={handleAddETH}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="animate-fade-in-up animate-delay-100">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[var(--accent)]">
                  Capsules you sent
                </h2>
                <button
                  onClick={() => refetchSent()}
                  disabled={loadingSent}
                  className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] disabled:opacity-50"
                >
                  {loadingSent ? "Loading…" : "Refresh"}
                </button>
              </div>
              {sent.length === 0 ? (
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 text-center text-[var(--muted)]">
                  <p>No capsules sent yet.{" "}<Link href="/create" className="text-[var(--accent)] hover:underline">Create one</Link></p>
                  <p className="mt-2 text-xs opacity-80">If you just created one, ensure you&apos;re on the same network (e.g. Sepolia) where you created it.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sent.map((capsule, i) => (
                    <div key={capsule.capsuleId.toString()} className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                      <CapsuleCard
                        capsule={capsule}
                        variant="sent"
                        onAddETH={handleAddETH}
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {addETHCapsuleId !== null && (
          <AddETHModal
            capsuleId={addETHCapsuleId}
            onClose={() => {
              setAddETHCapsuleId(null);
              refetchReceived();
              refetchSent();
            }}
          />
        )}
      </main>
    </div>
  );
}
