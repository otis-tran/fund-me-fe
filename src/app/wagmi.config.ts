import { createConfig, http  } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected, walletConnect, metaMask, safe } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    walletConnect({ projectId: process.env.WALLETCONNECT_PROJECT_ID as string }),
    metaMask(),
    safe(),
  ],
  transports: {
    [sepolia.id]: http()
  },
})