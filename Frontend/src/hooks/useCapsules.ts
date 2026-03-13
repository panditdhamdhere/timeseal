"use client";

import { useReadContract, useReadContracts } from "wagmi";
import { useAccount } from "wagmi";
import { TIMESEAL_ABI, TIMESEAL_ADDRESS } from "@/lib/abis/timeseal";
import type { Capsule } from "@/lib/contract";

export function useReceivedCapsules() {
  const { address } = useAccount();
  const { data: ids, refetch: refetchIds, ...restIds } = useReadContract({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsulesByRecipient",
    args: address ? [address] : undefined,
  });

  const idsArray = ids && Array.isArray(ids) ? ids : [];
  const contracts = idsArray.map((id: bigint) => ({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsule" as const,
    args: [id] as const,
  }));

  const { data: capsulesData, refetch: refetchCapsules } = useReadContracts({
    contracts,
    query: { enabled: contracts.length > 0 },
  });

  const capsules: Capsule[] = [];
  if (capsulesData && contracts.length > 0) {
    capsulesData.forEach((result) => {
      if (result.status === "success" && result.result) {
        capsules.push(result.result as unknown as Capsule);
      }
    });
  }

  const refetch = () => {
    refetchIds?.();
    refetchCapsules();
  };

  return { capsules, ids: idsArray, refetch, ...restIds };
}

export function useSentCapsules() {
  const { address } = useAccount();
  const { data: ids, refetch: refetchIds, ...restIds } = useReadContract({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsulesBySender",
    args: address ? [address] : undefined,
  });

  const idsArray = ids && Array.isArray(ids) ? ids : [];
  const contracts = idsArray.map((id: bigint) => ({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsule" as const,
    args: [id] as const,
  }));

  const { data: capsulesData, refetch: refetchCapsules } = useReadContracts({
    contracts,
    query: { enabled: contracts.length > 0 },
  });

  const capsules: Capsule[] = [];
  if (capsulesData && contracts.length > 0) {
    capsulesData.forEach((result) => {
      if (result.status === "success" && result.result) {
        capsules.push(result.result as unknown as Capsule);
      }
    });
  }

  const refetch = () => {
    refetchIds?.();
    refetchCapsules();
  };

  return { capsules, ids: idsArray, refetch, ...restIds };
}

export function usePublicCapsules() {
  const { data: ids, refetch: refetchIds, ...restIds } = useReadContract({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getPublicCapsules",
  });

  const idsArray = ids && Array.isArray(ids) ? ids : [];
  const contracts = idsArray.map((id: bigint) => ({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsule" as const,
    args: [id] as const,
  }));

  const { data: capsulesData } = useReadContracts({
    contracts,
    query: { enabled: contracts.length > 0 },
  });

  const capsules: Capsule[] = [];
  if (capsulesData && contracts.length > 0) {
    capsulesData.forEach((result) => {
      if (result.status === "success" && result.result) {
        capsules.push(result.result as unknown as Capsule);
      }
    });
  }

  return { capsules, ids: idsArray, ...restIds };
}
