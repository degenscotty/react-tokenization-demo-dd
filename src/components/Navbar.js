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
                backgroundColor: colors.backgroundDark || colors.backgroundLight,
                borderBottom: `1px solid ${colors.border}`,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            className="py-4 w-full"
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
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
                            backgroundColor: colors.accent,
                            color: "#FFFFFF",
                        }}
                        className="text-sm font-medium px-4 py-2 rounded-md transition-transform hover:scale-105 shadow-md"
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
                        style={{
                            backgroundColor: isDarkMode
                                ? "rgba(50, 50, 60, 0.4)"
                                : "rgba(240, 240, 250, 0.7)",
                            color: colors.text,
                        }}
                        onClick={toggleDarkMode}
                        className="p-2 text-sm rounded-md shadow-sm transition-all hover:shadow"
                    >
                        {isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
