export type Capsule = {
  capsuleId: bigint;
  sender: `0x${string}`;
  recipient: `0x${string}`;
  encryptedMessage: string;
  unlockTimestamp: bigint;
  ethAmount: bigint;
  theme: string;
  isOpened: boolean;
  isPublic: boolean;
  createdAt: bigint;
};
