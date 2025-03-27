import React, { useState, useEffect, useMemo } from "react"
import { useTokenData } from "../hooks/useMarketNft"
import NFTDisplay from "./NFTDisplay"
import SalesInfo from "./SalesInfo"

// Single NFT item that includes both display and sales info
const NFTItem = ({
    tokenId,
    address,
    colors,
    isConfirmed,
    isPending,
    price,
    buyFraction,
    sellFraction,
}) => {
    const [nftData, setNftData] = useState({
        name: "Loading...",
        description: "Loading...",
        location: "Loading...",
        image: "",
    })
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)

    // Use the separate useTokenData hook directly
    const {
        tokenURI,
        fractionalSupply,
        fractionalBalance,
        isLoading: isTokenDataLoading,
    } = useTokenData(tokenId, address, isConfirmed)

    // Calculate fractional data with useMemo
    const fractionalData = useMemo(() => {
        const supply = fractionalSupply ? Number(fractionalSupply) : 0
        const userBalance = fractionalBalance ? Number(fractionalBalance) : 0
        const percentage = supply > 0 ? Math.round((userBalance * 100) / supply) : 0

        return { supply, userBalance, percentage }
    }, [fractionalSupply, fractionalBalance])

    // Calculate max available once
    const maxAvailable = fractionalData.supply - fractionalData.userBalance

    const handleBuyQuantityChange = (e) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value >= 1 && value <= maxAvailable) {
            setQuantity(value)
        }
    }

    // Effect to update NFT data when token data changes
    useEffect(() => {
        if (!isTokenDataLoading && tokenURI) {
            setLoading(true)
            try {
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
        }
    }, [tokenURI, isTokenDataLoading])

    // Reset quantity when maxAvailable changes
    useEffect(() => {
        if (quantity > maxAvailable) {
            setQuantity(Math.max(1, maxAvailable))
        }
    }, [maxAvailable, quantity])

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 transition-all duration-300 transform hover:translate-y-[-4px]"
            style={{
                opacity: loading ? 0.8 : 1,
            }}
        >
            <div className="lg:col-span-2">
                <NFTDisplay nftData={nftData} loading={loading} colors={colors} />
            </div>
            <div className="lg:col-span-1">
                <SalesInfo
                    colors={colors}
                    fractionalData={fractionalData}
                    quantity={quantity}
                    handleBuyQuantityChange={handleBuyQuantityChange}
                    maxAvailable={maxAvailable}
                    buyFraction={buyFraction}
                    sellFraction={sellFraction}
                    tokenId={tokenId}
                    price={price}
                    isPending={isPending}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default NFTItem
