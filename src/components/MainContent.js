import React, { useState, useEffect } from "react"
import { useTheme } from "../context/ThemeContext"
import { useMarketNft } from "../hooks/useMarketNft"
import { useAccount } from "wagmi"
import NFTItem from "./NFTItem"

function MainContent() {
    const { colors } = useTheme()
    const { tokenCounter, isPending, price, buyFraction, sellFraction, isConfirmed } =
        useMarketNft()
    const { address } = useAccount()

    // State to store available tokenIds
    const [tokenIds, setTokenIds] = useState([])

    // Effect to get token IDs from tokenCounter
    useEffect(() => {
        if (tokenCounter !== undefined) {
            // Create an array from 0 to tokenCounter-1 for all available NFTs
            const count = Number(tokenCounter)
            if (count > 0) {
                const ids = Array.from({ length: count }, (_, i) => i)
                setTokenIds(ids)
            }
        }
    }, [tokenCounter])

    // Log when transactions are confirmed (for debugging)
    useEffect(() => {
        if (isConfirmed) {
            console.log("MainContent: Transaction confirmed, data should refresh")
        }
    }, [isConfirmed])

    return (
        <div className="my-8">
            <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: colors.text }}>
                NFT Collection Marketplace
            </h1>

            <div className="grid grid-cols-1 gap-8">
                {tokenIds.length === 0 ? (
                    <div
                        style={{
                            backgroundColor: colors.backgroundLight,
                            color: colors.text,
                            borderRadius: "10px",
                            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                        }}
                        className="text-center p-10 animate-pulse"
                    >
                        <div className="text-xl">No NFTs available to display</div>
                        <p className="mt-4 text-sm opacity-70">
                            Connect your wallet and check back later
                        </p>
                    </div>
                ) : (
                    tokenIds.map((tokenId) => (
                        <NFTItem
                            key={tokenId}
                            tokenId={tokenId}
                            address={address}
                            colors={colors}
                            isConfirmed={isConfirmed}
                            isPending={isPending}
                            price={price}
                            buyFraction={buyFraction}
                            sellFraction={sellFraction}
                        />
                    ))
                )}
            </div>

            {isPending && (
                <div
                    className="fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
                    style={{ backgroundColor: colors.backgroundLight, color: colors.text }}
                >
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Transaction in progress...</span>
                </div>
            )}
        </div>
    )
}

export default MainContent
