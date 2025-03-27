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
                backgroundColor: colors.glass,
                backdropFilter: "blur(10px)",
                borderBottom: `1px solid ${colors.border}`,
                boxShadow: colors.shadow,
                position: "sticky",
                top: 0,
                zIndex: 100,
            }}
            className="py-4 w-full transition-all duration-300"
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <a
                        href="/"
                        style={{
                            color: colors.accent,
                        }}
                        className="text-xl md:text-2xl font-bold transition-colors hover:opacity-80"
                    >
                        NFT Tokenization Demo
                    </a>
                    <button
                        onClick={openModal}
                        style={{
                            backgroundColor: colors.accent,
                            color: "#FFFFFF",
                        }}
                        className="text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md flex items-center space-x-2"
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 4V20M4 12H20"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Create NFT</span>
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
                                ? "rgba(30, 40, 60, 0.4)"
                                : "rgba(240, 245, 255, 0.7)",
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                        }}
                        onClick={toggleDarkMode}
                        className="p-2.5 text-sm rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center justify-center w-10 h-10"
                        aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
