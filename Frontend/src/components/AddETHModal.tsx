"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { TIMESEAL_ABI, TIMESEAL_ADDRESS } from "@/lib/abis/timeseal";

type AddETHModalProps = {
  capsuleId: bigint;
  onClose: () => void;
};

export function AddETHModal({ capsuleId, onClose }: AddETHModalProps) {
  const [amount, setAmount] = useState("");

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    writeContract({
      address: TIMESEAL_ADDRESS,
      abi: TIMESEAL_ABI,
      functionName: "addETHToCapsule",
      args: [capsuleId],
      value: parseEther(amount),
    });
  };

  if (isSuccess) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <div
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-center text-emerald-400 font-medium">
            ETH added successfully!
          </p>
          <button
            onClick={onClose}
            className="mt-4 w-full rounded-lg bg-[var(--accent)] py-2 text-[var(--background)]"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-[var(--accent)]">
          Add ETH to Capsule #{capsuleId.toString()}
        </h3>
        <div className="mt-4">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in ETH"
            required
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error.message}</p>}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-[var(--border)] py-2 text-[var(--foreground)]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending || isConfirming}
            className="flex-1 rounded-lg bg-[var(--accent)] py-2 text-[var(--background)] disabled:opacity-50"
          >
            {isPending || isConfirming ? "Adding..." : "Add ETH"}
          </button>
        </div>
      </form>
    </div>
  );
}
