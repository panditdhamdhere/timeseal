"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, isAddress } from "viem";
import { TIMESEAL_ABI, TIMESEAL_ADDRESS } from "@/lib/abis/timeseal";

const THEMES = ["Birthday", "Milestone", "Future Self", "Legacy"];

export function CreateCapsuleForm() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [unlockTime, setUnlockTime] = useState("");
  const [theme, setTheme] = useState("Birthday");
  const [ethAmount, setEthAmount] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const {
    writeContract,
    data: hash,
    isPending,
    error,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const minUnlock = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  const minDate = minUnlock.toISOString().slice(0, 10);
  const minTime = minUnlock.toTimeString().slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !message || !unlockDate || !unlockTime) return;
    if (!isAddress(recipient)) {
      alert("Invalid recipient address");
      return;
    }

    const unlockTimestamp = BigInt(
      Math.floor(new Date(`${unlockDate}T${unlockTime}`).getTime() / 1000)
    );
    const oneHour = 60 * 60;
    if (unlockTimestamp < BigInt(Math.floor(Date.now() / 1000) + oneHour)) {
      alert("Unlock time must be at least 1 hour in the future");
      return;
    }

    writeContract({
      address: TIMESEAL_ADDRESS,
      abi: TIMESEAL_ABI,
      functionName: "createCapsule",
      args: [recipient as `0x${string}`, message, unlockTimestamp, theme, isPublic],
      value: ethAmount ? parseEther(ethAmount) : BigInt(0),
    });
  };

  const handleCreateAnother = () => {
    reset();
    setRecipient("");
    setMessage("");
    setUnlockDate("");
    setUnlockTime("");
    setTheme("Birthday");
    setEthAmount("");
    setIsPublic(false);
  };

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
        <p className="text-lg font-medium text-emerald-400">
          Capsule created successfully!
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Your time capsule has been sealed. The recipient can open it after the
          unlock date.
        </p>
        <button
          onClick={handleCreateAnother}
          className="mt-4 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--background)] hover:opacity-90"
        >
          Create Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
    >
      <h2 className="text-xl font-semibold text-[var(--accent)]">
        Seal a Time Capsule
      </h2>

      <div>
        <label className="block text-sm font-medium text-[var(--muted)]">
          Recipient Address
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
          required
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--muted)]">
          Encrypted Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your encrypted message (encrypt before pasting)"
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-[var(--muted)]">
          Encrypt your message with a tool of your choice before pasting.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--muted)]">
            Unlock Date
          </label>
          <input
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            min={minDate}
            required
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--muted)]">
            Unlock Time
          </label>
          <input
            type="time"
            value={unlockTime}
            onChange={(e) => setUnlockTime(e.target.value)}
            min={unlockDate === minDate ? minTime : undefined}
            required
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--muted)]">
          Theme
        </label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--muted)]">
          ETH Amount (optional)
        </label>
        <input
          type="text"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)}
          placeholder="0"
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-4 w-4 rounded border-[var(--border)] bg-[var(--background)] text-[var(--accent)] focus:ring-[var(--accent)]"
        />
        <span className="text-sm text-[var(--muted)]">
          Make this capsule public (visible in gallery)
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-400">{error.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending || isConfirming}
        className="w-full rounded-lg bg-[var(--accent)] py-3 font-medium text-[var(--background)] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending || isConfirming ? "Sealing..." : "Seal Capsule"}
      </button>
    </form>
  );
}
