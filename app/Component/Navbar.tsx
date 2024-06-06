"use client"
import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import {
    ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {  mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
 sepolia,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'bank-dapp',
  projectId: 'Ironic',
  chains: [mainnet, polygon, optimism, arbitrum, base,sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient=new QueryClient()
function Navbar() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
    <div className="flex justify-between bg-black text-white py-3 px-5">
        <p className='text-xl mt-2'>Bank Application</p>
        <ConnectButton/>
    </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Navbar