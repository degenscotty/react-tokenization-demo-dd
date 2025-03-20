import React, { useState, useEffect, useCallback } from "react"
import { useTheme } from "../context/ThemeContext"
import { useMarketNft } from "../hooks/useMarketNft"
import PopSkullyImage from "../image/PopSkully_Tag_PP.jpg"
import { useAccount } from "wagmi"

function MainContent() {
    const { colors } = useTheme()
    const { tokenCounter, isPending, price, buyFraction, sellFraction } = useMarketNft()
    const { address } = useAccount()

    const [nftData, setNftData] = useState({
        name: "Loading...",
        description: "Loading...",
        location: "Loading...",
        image: "",
    })
    const [fractionalData, setFractionalData] = useState({
        supply: 0,
        userBalance: 0,
        percentage: 0,
    })

    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)

    // We'll load the first NFT (tokenId 0) by default, if any exist
    const tokenId = 0

    // Use the tokenData hook directly from useMarketNft
    const {
        tokenURI,
        fractionalSupply,
        fractionalBalance,
        isLoading: isTokenDataLoading,
        refetch: refetchTokenData,
    } = useMarketNft().useTokenData(tokenId, address)

    // Calculate max available based on fractional data
    const maxAvailable = fractionalData.supply - fractionalData.userBalance

    const handleBuyQuantityChange = (e) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value >= 1 && value <= maxAvailable) {
            setQuantity(value)
        }
    }

    // Function to handle post-transaction updates
    const handlePostTransaction = useCallback(async () => {
        if (refetchTokenData) {
            await refetchTokenData()
            fetchNftData()
        }
    }, [refetchTokenData])

    const fetchNftData = useCallback(async () => {
        if (tokenId === null) return

        try {
            setLoading(true)

            // Calculate percentage
            const supply = fractionalSupply ? Number(fractionalSupply) : 0
            const userBalance = fractionalBalance ? Number(fractionalBalance) : 0
            const percentage = supply > 0 ? (userBalance * 100) / supply : 0

            setFractionalData({
                supply,
                userBalance,
                percentage: Math.round(percentage),
            })

            // Parse the metadata from tokenURI
            if (tokenURI) {
                try {
                    // This assumes the tokenURI is in the format: data:application/json;base64,<base64-data>
                    const jsonString = atob(tokenURI.split(",")[1])
                    const metadata = JSON.parse(jsonString)

                    setNftData({
                        name: metadata.name || "Unnamed NFT",
                        description: metadata.description || "No description available",
                        location: metadata.location || "No location specified",
                        image: metadata.image || "",
                    })
                } catch (error) {
                    console.error("Error parsing token metadata:", error)
                }
            }
        } catch (error) {
            console.error("Error fetching NFT data:", error)
        } finally {
            setLoading(false)
        }
    }, [tokenId, tokenURI, fractionalSupply, fractionalBalance])

    useEffect(() => {
        if (!isTokenDataLoading && tokenURI) {
            fetchNftData()
        }
    }, [
        tokenId,
        tokenURI,
        fractionalSupply,
        fractionalBalance,
        isTokenDataLoading,
        address,
        fetchNftData,
    ])

    // Reset quantity when maxAvailable changes
    useEffect(() => {
        if (quantity > maxAvailable) {
            setQuantity(Math.max(1, maxAvailable))
        }
    }, [maxAvailable, quantity])

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
            <div className="flex space-x-4 w-full">
                <div
                    style={{ backgroundColor: colors.backgroundLight }}
                    className="flex-2 w-2/3 p-4 rounded-md shadow flex items-center"
                >
                    {loading ? (
                        <div className="w-1/3 h-64 bg-gray-200 animate-pulse rounded-md mr-4"></div>
                    ) : (
                        <img
                            src={nftData.image || PopSkullyImage}
                            style={{
                                borderRadius: "10px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                            alt={nftData.name}
                            className="w-1/3 h-auto mr-4"
                        />
                    )}
                    <div>
                        <h2 style={{ color: colors.text }} className="text-lg font-bold">
                            Name
                        </h2>
                        <p style={{ color: colors.text }} className="text-gray-600">
                            {nftData.name}
                        </p>
                        <h2 style={{ color: colors.text }} className="text-lg font-bold">
                            Description
                        </h2>
                        <p style={{ color: colors.text }} className="text-gray-600">
                            {nftData.description}
                        </p>
                        <h2 style={{ color: colors.text }} className="text-lg font-bold">
                            Location
                        </h2>
                        <p style={{ color: colors.text }} className="text-gray-600">
                            {nftData.location}
                        </p>
                    </div>
                </div>
                <div
                    style={{ backgroundColor: colors.backgroundLight, color: colors.text }}
                    className="flex-1 w-1/3 p-4 rounded-md shadow flex flex-col"
                >
                    <h2 style={{ color: colors.text }} className="text-lg font-bold">
                        Sales Information
                    </h2>
                    <div
                        className="w-full h-1.5 rounded-full"
                        style={{
                            backgroundColor: colors.background,
                        }}
                    >
                        <div
                            className="h-1.5 rounded-full"
                            style={{
                                backgroundColor: colors.accent,
                                width: `${fractionalData.percentage}%`,
                            }}
                        ></div>
                    </div>
                    <h2 style={{ color: colors.text }} className="text-sm">
                        {fractionalData.userBalance} / {fractionalData.supply}
                    </h2>
                    <div className="mt-auto w-full flex flex-col space-y-2">
                        <input
                            type="number"
                            min="1"
                            max={maxAvailable}
                            value={quantity}
                            onChange={handleBuyQuantityChange}
                            className="w-full px-2 py-1 rounded text-center text-sm no-spinner mb-2"
                            style={{
                                backgroundColor: colors.background,
                                color: colors.text,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                        <div className="flex space-x-2">
                            <button
                                style={{
                                    backgroundColor: colors.green,
                                    transition: "transform 0.15s",
                                }}
                                className="text-white font-bold p-2 rounded w-full hover:scale-105"
                                onClick={async () => {
                                    console.log("Buy button clicked", { tokenId, price, quantity })
                                    const hash = await buyFraction(
                                        tokenId,
                                        quantity,
                                        price * window.BigInt(quantity),
                                    )
                                }}
                                disabled={
                                    loading ||
                                    tokenId === null ||
                                    tokenId === undefined ||
                                    isPending ||
                                    maxAvailable <= 0
                                }
                            >
                                BUY
                            </button>
                            <button
                                style={{
                                    backgroundColor: colors.red,
                                    transition: "transform 0.15s",
                                }}
                                className="text-white font-bold p-2 rounded w-full hover:scale-105"
                                onClick={async () => {
                                    console.log("Sell button clicked", {
                                        tokenId,
                                        fractionalData,
                                        quantity,
                                    })
                                    sellFraction(tokenId, quantity)
                                }}
                                disabled={
                                    loading ||
                                    tokenId === null ||
                                    tokenId === undefined ||
                                    fractionalData.userBalance < quantity ||
                                    isPending
                                }
                            >
                                SELL
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainContent
