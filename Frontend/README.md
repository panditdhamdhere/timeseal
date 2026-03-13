# TimeSeal Frontend

A Next.js frontend for the TimeSeal crypto time capsule smart contract. Create time-locked messages and optional ETH for future recipients.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Wagmi** + **Viem** for blockchain interaction
- **RainbowKit** for wallet connection

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and add your values:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get a free project ID at [WalletConnect Cloud](https://cloud.walletconnect.com/)
- `NEXT_PUBLIC_TIMESEAL_ADDRESS` - The deployed TimeSeal contract address

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Features

- **Create Capsules** - Seal encrypted messages and optional ETH for recipients
- **My Capsules** - View capsules sent to you and ones you've sent
- **Open Capsules** - Unlock capsules after the unlock date (recipients only)
- **Add ETH** - Top up unopened capsules with additional ETH
- **Public Gallery** - Browse capsules creators made public

## Supported Chains

- Base
- Base Sepolia (testnet)

Edit `src/lib/wagmi.ts` to add or change chains.
