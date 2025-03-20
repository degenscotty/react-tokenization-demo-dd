import React from "react"

// Sales information and purchase controls
const SalesInfo = ({
    colors,
    fractionalData,
    quantity,
    handleBuyQuantityChange,
    maxAvailable,
    buyFraction,
    sellFraction,
    tokenId,
    price,
    isPending,
    loading,
}) => (
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
                    onClick={() => buyFraction(tokenId, quantity, price * window.BigInt(quantity))}
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
                    onClick={() => sellFraction(tokenId, quantity)}
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
)

export default SalesInfo
