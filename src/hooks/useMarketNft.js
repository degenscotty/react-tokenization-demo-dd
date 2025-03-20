import { useReadContract, useWriteContract, waitForTransactionReceipt } from "wagmi"
import { MarketNftContractABI, CONTRACT_ADDRESS, CHAIN_ID } from "../contract/contractConfig"
import { useState } from "react"

export function useMarketNft() {
    // State for loading
    const [isPending, setIsPending] = useState(false)

    // Write contract functions
    const { writeContract, isPending: isWritePending } = useWriteContract()

    const buyFraction = async (tokenId, amount, value) => {
        setIsPending(true)

        console.log("Attempting to buy fraction with params:", {
            address: CONTRACT_ADDRESS,
            functionName: "buyFraction",
            args: [tokenId, amount],
            chainId: CHAIN_ID,
            value,
        })

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: MarketNftContractABI,
            functionName: "buyFraction",
            args: [tokenId, amount],
            chainId: CHAIN_ID,
            value,
            onSuccess: async (hash) => {
                console.log("Transaction submitted with hash:", hash)
            },
        })
    }

    const sellFraction = async (tokenId, amount) => {
        setIsPending(true)

        console.log("Attempting to sell fraction with params:", {
            address: CONTRACT_ADDRESS,
            functionName: "sellFraction",
            args: [tokenId, amount],
            chainId: CHAIN_ID,
        })

        writeContract({
            address: CONTRACT_ADDRESS,
            abi: MarketNftContractABI,
            functionName: "sellFraction",
            args: [tokenId, amount],
            chainId: CHAIN_ID,
            onSuccess: async (hash) => {
                console.log("Transaction submitted with hash:", hash)
            },
        })
    }

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

    // Function to create a hook for getting token data with a specific tokenId
    const useTokenData = (tokenId, account) => {
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

        // Combined refetch function
        const refetch = async () => {
            if (refetchTokenURI) await refetchTokenURI()
            if (refetchSupply) await refetchSupply()
            if (account && refetchBalance) await refetchBalance()
        }

        return {
            tokenURI,
            fractionalSupply,
            fractionalBalance,
            isLoading: isTokenURILoading || isSupplyLoading || (!!account && isBalanceLoading),
            refetch,
        }
    }

    return {
        tokenCounter: tokenCounter ? Number(tokenCounter) : 0,
        price: priceData || 0n,
        balance: contractBalance || 0n,
        ownerAddress,
        isPending,
        isLoading: isTokenCounterLoading || isPriceLoading || isBalanceLoading || isOwnerLoading,
        useTokenData,
        buyFraction,
        sellFraction,
        refetchData: {
            refetchTokenCounter,
            refetchPrice,
            refetchBalance,
            refetchOwner,
        },
    }
}
