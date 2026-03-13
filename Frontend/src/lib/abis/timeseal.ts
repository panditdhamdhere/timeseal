export const TIMESEAL_ABI = [
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "encryptedMessage", type: "string" },
      { name: "unlockTimestamp", type: "uint256" },
      { name: "theme", type: "string" },
      { name: "isPublic", type: "bool" },
    ],
    name: "createCapsule",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "capsuleId", type: "uint256" }],
    name: "openCapsule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "capsuleId", type: "uint256" }],
    name: "addETHToCapsule",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "recipient", type: "address" }],
    name: "getCapsulesByRecipient",
    outputs: [{ name: "capsuleIds", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "sender", type: "address" }],
    name: "getCapsulesBySender",
    outputs: [{ name: "capsuleIds", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPublicCapsules",
    outputs: [{ name: "capsuleIds", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "capsuleId", type: "uint256" }],
    name: "getTimeUntilUnlock",
    outputs: [{ name: "secondsRemaining", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "capsuleId", type: "uint256" }],
    name: "isUnlockable",
    outputs: [{ name: "unlockable", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "capsuleId", type: "uint256" }],
    name: "getCapsule",
    outputs: [
      {
        components: [
          { name: "capsuleId", type: "uint256" },
          { name: "sender", type: "address" },
          { name: "recipient", type: "address" },
          { name: "encryptedMessage", type: "string" },
          { name: "unlockTimestamp", type: "uint256" },
          { name: "ethAmount", type: "uint256" },
          { name: "theme", type: "string" },
          { name: "isOpened", type: "bool" },
          { name: "isPublic", type: "bool" },
          { name: "createdAt", type: "uint256" },
        ],
        name: "capsule",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const TIMESEAL_ADDRESS = (process.env
  .NEXT_PUBLIC_TIMESEAL_ADDRESS as `0x${string}`) ||
  "0x0000000000000000000000000000000000000000";
