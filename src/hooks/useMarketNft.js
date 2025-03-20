import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { MarketNftContractABI, CONTRACT_ADDRESS, CHAIN_ID } from "../contract/contractConfig"
import { useState, useEffect, useCallback } from "react"

// Move the token data hook outside to avoid recreation
export function useTokenData(tokenId, account, isConfirmed) {
    const [shouldRefetch, setShouldRefetch] = useState(false)

    const {
        data: tokenURI,
        isLoading: isTokenURILoading,
        refetch: refetchTokenURI,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: MarketNftContractABI,
        functionName: "tokenURI",
        args: [tokenId],
        chainId: CHAIN_ID,
    })

    const {
        data: fractionalSupply,
        isLoading: isSupplyLoading,
        refetch: refetchSupply,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: MarketNftContractABI,
        functionName: "getFractionalSupply",
        args: [tokenId],
        chainId: CHAIN_ID,
    })

    const {
        data: fractionalBalance,
        isLoading: isBalanceLoading,
        refetch: refetchBalance,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: MarketNftContractABI,
        functionName: "getFractionalBalance",
        args: [tokenId, account],
        chainId: CHAIN_ID,
        enabled: !!account,
    })

    // Force a refetch when isConfirmed changes to true
    useEffect(() => {
        if (isConfirmed) {
            setShouldRefetch(true)
        }
    }, [isConfirmed])

    // Perform the actual refetch
    useEffect(() => {
        if (shouldRefetch) {
            console.log("Refetching token data for tokenId:", tokenId)
            if (refetchTokenURI) refetchTokenURI()
            if (refetchSupply) refetchSupply()
            if (account && refetchBalance) refetchBalance()
            setShouldRefetch(false)
        }
    }, [shouldRefetch, refetchTokenURI, refetchSupply, refetchBalance, tokenId, account])

    return {
        tokenURI,
        fractionalSupply,
        fractionalBalance,
        isLoading: isTokenURILoading || isSupplyLoading || (!!account && isBalanceLoading),
    }
}

export function useMarketNft() {
    // State for loading
    const [isPending, setIsPending] = useState(false)

    // Write contract functions
    const { writeContract, isPending: isWritePending, data: hash } = useWriteContract()

    // Wait for transaction receipt
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
        chainId: CHAIN_ID,
    })

    // Read contract data
    const {
        data: tokenCounter,
        isLoading: isTokenCounterLoading,
        refetch: refetchTokenCounter,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: MarketNftContractABI,
        functionName: "getTokenCounter",
        chainId: CHAIN_ID,
    })

    const {
        data: priceData,
        isLoading: isPriceLoading,
        refetch: refetchPrice,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: MarketNftContractABI,
        functionName: "getPrice",
        chainId: CHAIN_ID,
    })

    const {
        data: contractBalance,
        isLoading: isBalanceLoading,
        refetch: refetchBalance,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: MarketNftContractABI,
        functionName: "getBalance",
        chainId: CHAIN_ID,
    })

    const {
        data: ownerAddress,
        isLoading: isOwnerLoading,
        refetch: refetchOwner,
    } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: MarketNftContractABI,
        functionName: "getOwner",
        chainId: CHAIN_ID,
    })

    // Refetch all data
    const refetchAllData = useCallback(() => {
        console.log("Refetching all contract data")
        if (refetchTokenCounter) refetchTokenCounter()
        if (refetchPrice) refetchPrice()
        if (refetchBalance) refetchBalance()
        if (refetchOwner) refetchOwner()
    }, [refetchTokenCounter, refetchPrice, refetchBalance, refetchOwner])

    // Refetch data when transaction is confirmed
    useEffect(() => {
        if (isConfirmed) {
            console.log("Transaction confirmed, refreshing data")
            refetchAllData()
            setIsPending(false)
        }
    }, [isConfirmed, refetchAllData])

    const buyFraction = async (tokenId, amount, value) => {
        setIsPending(true)
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: MarketNftContractABI,
                functionName: "buyFraction",
                args: [tokenId, amount],
                chainId: CHAIN_ID,
                value,
            })
            // Refetching will be handled by the useEffect
        } catch (error) {
            console.error("Error buying fraction:", error)
            setIsPending(false)
        }
    }

    const sellFraction = async (tokenId, amount) => {
        setIsPending(true)
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: MarketNftContractABI,
                functionName: "sellFraction",
                args: [tokenId, amount],
                chainId: CHAIN_ID,
            })
            // Refetching will be handled by the useEffect
        } catch (error) {
            console.error("Error selling fraction:", error)
            setIsPending(false)
        }
    }

    const mintNft = async (name, description, location, imageUri, fractions) => {
        setIsPending(true)
        try {
            await writeContract({
                address: CONTRACT_ADDRESS,
                abi: MarketNftContractABI,
                functionName: "mintNft",
                args: [name, description, location, imageUri, fractions],
                chainId: CHAIN_ID,
            })
            // Refetching will be handled by the useEffect
        } catch (error) {
            console.error("Error minting NFT:", error)
            setIsPending(false)
        }
    }

    return {
        tokenCounter: tokenCounter ? Number(tokenCounter) : 0,
        price: priceData || 0n,
        balance: contractBalance || 0n,
        ownerAddress,
        isPending: isPending || isWritePending || isConfirming,
        isLoading:
            isTokenCounterLoading ||
            isPriceLoading ||
            isBalanceLoading ||
            isOwnerLoading ||
            isConfirming,
        isConfirmed,
        buyFraction,
        sellFraction,
        mintNft,
        refetchAllData,
    }
}
