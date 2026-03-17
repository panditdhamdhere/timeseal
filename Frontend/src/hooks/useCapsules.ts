"use client";

import { useReadContract, useReadContracts, useAccount, useChainId } from "wagmi";
import { TIMESEAL_ABI, TIMESEAL_ADDRESS } from "@/lib/abis/timeseal";
import type { Capsule } from "@/lib/contract";

export function useReceivedCapsules() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: ids, refetch: refetchIds, ...restIds } = useReadContract({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsulesByRecipient",
    args: address ? [address] : undefined,
    chainId: chainId && chainId > 0 ? chainId : undefined,
  });

  const idsArray = ids && Array.isArray(ids) ? ids : [];
  const contracts = idsArray.map((id: bigint) => ({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsule" as const,
    args: [id] as const,
    chainId: chainId && chainId > 0 ? chainId : undefined,
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
  const chainId = useChainId();
  const { data: ids, refetch: refetchIds, ...restIds } = useReadContract({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsulesBySender",
    args: address ? [address] : undefined,
    chainId: chainId && chainId > 0 ? chainId : undefined,
  });

  const idsArray = ids && Array.isArray(ids) ? ids : [];
  const contracts = idsArray.map((id: bigint) => ({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsule" as const,
    args: [id] as const,
    chainId: chainId && chainId > 0 ? chainId : undefined,
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
  const chainId = useChainId();
  const { data: ids, refetch: refetchIds, ...restIds } = useReadContract({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getPublicCapsules",
    chainId: chainId && chainId > 0 ? chainId : undefined,
  });

  const idsArray = ids && Array.isArray(ids) ? ids : [];
  const contracts = idsArray.map((id: bigint) => ({
    address: TIMESEAL_ADDRESS,
    abi: TIMESEAL_ABI,
    functionName: "getCapsule" as const,
    args: [id] as const,
    chainId: chainId && chainId > 0 ? chainId : undefined,
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

  return { capsules, ids: idsArray, refetch: refetchIds, ...restIds };
}
