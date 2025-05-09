"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {sepolia, mainnet} from "@wagmi/core/chains";

export default getDefaultConfig({
  appName: "TSender",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia, mainnet],
  ssr: false
})