import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sonicBlazeTestnet, sepolia } from "wagmi/chains"
import { http } from "wagmi"

export const config = getDefaultConfig({
    appName: "My NFT Demo",
    projectId: "c97eb70c76cfaf70843c247241dfbe76", // Get one at https://cloud.walletconnect.com
    chains: [sonicBlazeTestnet, sepolia],
    transports: {
        [sonicBlazeTestnet.id]: http(),
        [sepolia.id]: http(),
    },
})
