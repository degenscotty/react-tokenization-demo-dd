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
        style={{
            backgroundColor: colors.backgroundLight,
            color: colors.text,
            borderLeft: `4px solid ${fractionalData.userBalance > 0 ? colors.green : colors.accent}`,
        }}
        className="p-6 rounded-lg shadow-lg"
    >
        <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Ownership Status</h2>
            <div className="flex justify-between text-sm mb-2">
                <span>Your shares: {fractionalData.userBalance}</span>
                <span>Total shares: {fractionalData.supply}</span>
            </div>

            <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-700 bg-opacity-20">
                    <div
                        style={{
                            width: `${fractionalData.percentage}%`,
                            backgroundColor:
                                fractionalData.percentage > 50 ? colors.green : colors.accent,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
                    ></div>
                </div>
                <div className="text-right mt-1 text-xs opacity-70">
                    {fractionalData.percentage}% owned
                </div>
            </div>
        </div>

        <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Trading</h2>
            <div className="bg-gray-800 bg-opacity-10 p-3 rounded-md mb-4">
                <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Quantity</p>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            max={maxAvailable}
                            value={quantity}
                            onChange={handleBuyQuantityChange}
                            className="w-20 px-2 py-1 rounded text-center text-sm no-spinner"
                            style={{
                                backgroundColor: colors.background,
                                color: colors.text,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                        {maxAvailable > 0 && (
                            <div className="text-xs mt-1 opacity-70 text-right">
                                Max: {maxAvailable}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button
                style={{
                    backgroundColor: colors.green,
                    opacity: maxAvailable <= 0 || isPending || loading ? 0.5 : 1,
                    transition: "all 0.2s",
                }}
                className="text-white font-bold py-3 px-4 rounded-md shadow hover:shadow-lg transform hover:scale-[1.02] focus:outline-none"
                onClick={() => buyFraction(tokenId, quantity, price * window.BigInt(quantity))}
                disabled={
                    loading ||
                    tokenId === null ||
                    tokenId === undefined ||
                    isPending ||
                    maxAvailable <= 0
                }
            >
                {isPending ? "Processing..." : "Buy Shares"}
            </button>
            <button
                style={{
                    backgroundColor: colors.red,
                    opacity:
                        fractionalData.userBalance < quantity || isPending || loading ? 0.5 : 1,
                    transition: "all 0.2s",
                }}
                className="text-white font-bold py-3 px-4 rounded-md shadow hover:shadow-lg transform hover:scale-[1.02] focus:outline-none"
                onClick={() => sellFraction(tokenId, quantity)}
                disabled={
                    loading ||
                    tokenId === null ||
                    tokenId === undefined ||
                    fractionalData.userBalance < quantity ||
                    isPending
                }
            >
                {isPending ? "Processing..." : "Sell Shares"}
            </button>
        </div>
    </div>
)

export default SalesInfo
