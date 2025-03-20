import React from "react"
import { useTheme } from "../context/ThemeContext"
import { useModal } from "../context/ModalContext"
import { ConnectButton } from "@rainbow-me/rainbowkit"

function Navbar() {
    const { isDarkMode, toggleDarkMode, colors } = useTheme()
    const { openModal } = useModal()

    return (
        <nav
            style={{
                backgroundColor: colors.background,
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                marginTop: "20px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                maxWidth: "1200px",
                margin: "20px auto",
                padding: "10px 20px",
            }}
            className="p-2 flex items-center"
        >
            <div className="container mx-4 w-full flex justify-between items-center max-w-full">
                <div className="flex items-baseline space-x-4">
                    <a
                        href="/"
                        style={{ color: colors.text }}
                        className="text-xl font-bold transition-colors hover:opacity-80"
                    >
                        NFT Tokenization Demo
                    </a>
                    <button
                        onClick={openModal}
                        style={{
                            color: colors.accent,
                            backgroundColor: "transparent",
                            border: "none",
                            cursor: "pointer",
                        }}
                        className="text-sm font-medium px-3 py-2 rounded-md transition-colors hover:opacity-80"
                    >
                        Create NFT
                    </button>
                </div>
                <div className="flex items-center justify-end space-x-4 flex-1">
                    <ConnectButton
                        showBalance={true}
                        chainStatus="full"
                        accountStatus={{
                            smallScreen: "avatar",
                            largeScreen: "full",
                        }}
                        label="Connect Wallet"
                    />
                    <button
                        style={{ color: colors.text }}
                        onClick={toggleDarkMode}
                        className="p-2 text-sm"
                    >
                        {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
