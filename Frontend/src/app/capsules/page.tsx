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

  const { capsules: received, refetch: refetchReceived } = useReceivedCapsules();
  const { capsules: sent, refetch: refetchSent } = useSentCapsules();

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
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
        >
          ← Back
        </Link>

        {!isConnected ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
            <p className="text-[var(--muted)]">
              Connect your wallet to view your capsules.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <h2 className="mb-4 text-xl font-semibold text-[var(--accent)]">
                Capsules sent to you
              </h2>
              {received.length === 0 ? (
                <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]">
                  No capsules received yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {received.map((capsule) => (
                    <CapsuleCard
                      key={capsule.capsuleId.toString()}
                      capsule={capsule}
                      variant="received"
                      onOpen={handleOpen}
                      onAddETH={handleAddETH}
                    />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-[var(--accent)]">
                Capsules you sent
              </h2>
              {sent.length === 0 ? (
                <p className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center text-[var(--muted)]">
                  No capsules sent yet.{" "}
                  <Link href="/create" className="text-[var(--accent)] hover:underline">
                    Create one
                  </Link>
                </p>
              ) : (
                <div className="space-y-4">
                  {sent.map((capsule) => (
                    <CapsuleCard
                      key={capsule.capsuleId.toString()}
                      capsule={capsule}
                      variant="sent"
                      onAddETH={handleAddETH}
                    />
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
