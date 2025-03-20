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
        <div
            style={{
                backgroundColor: colors.background,
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                margin: "20px auto",
                padding: "40px",
                maxWidth: "1200px",
            }}
            className="main-content flex flex-col items-center justify-center"
        >
            {tokenIds.length === 0 ? (
                <div style={{ color: colors.text }} className="text-center p-8">
                    No NFTs available to display
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

            {isPending && (
                <div className="mt-4 text-sm text-gray-600">
                    Transaction in progress... waiting for confirmation
                </div>
            )}
        </div>
    )
}

export default MainContent
