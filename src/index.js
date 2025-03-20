import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { ThemeProvider, useTheme } from "./context/ThemeContext"
import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "./config/wagmi"
import reportWebVitals from "./reportWebVitals"

function RainbowKitThemeWrapper({ children }) {
    const { isDarkMode, colors } = useTheme()

    return (
        <RainbowKitProvider
            coolMode
            modalSize="compact"
            showRecentTransactions={false}
            disableConnectWallet={false}
            includeWalletIds={["metaMask", "rabby"]}
            appInfo={{
                appName: "Tokenization Demo",
                learnMoreUrl: "/",
            }}
        >
            {children}
        </RainbowKitProvider>
    )
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <RainbowKitThemeWrapper>
                        <App />
                    </RainbowKitThemeWrapper>
                </ThemeProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
