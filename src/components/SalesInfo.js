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
            backgroundColor: colors.cardBg,
            color: colors.text,
            borderRadius: "16px",
            boxShadow: colors.shadow,
        }}
        className="p-6 rounded-lg flex flex-col h-full justify-between transform transition-all duration-300"
    >
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-3 flex items-center">
                    <span
                        style={{
                            color: colors.accent,
                        }}
                    >
                        Ownership Status
                    </span>
                    <div
                        className="ml-2 px-2 py-0.5 text-xs rounded-full"
                        style={{
                            backgroundColor:
                                fractionalData.userBalance > 0 ? colors.green : colors.accent,
                            color: "white",
                            opacity: 0.9,
                        }}
                    >
                        {fractionalData.userBalance > 0 ? "Owner" : "Available"}
                    </div>
                </h2>
                <div
                    className="flex justify-between text-sm mb-3 p-3 rounded-md"
                    style={{ backgroundColor: colors.cardHighlight }}
                >
                    <div className="flex flex-col">
                        <span className="text-xs opacity-70 mb-1">Your shares</span>
                        <span className="font-semibold">{fractionalData.userBalance}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs opacity-70 mb-1">Total shares</span>
                        <span className="font-semibold">{fractionalData.supply}</span>
                    </div>
                </div>

                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span
                                className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
                                style={{
                                    backgroundColor:
                                        fractionalData.percentage > 50
                                            ? colors.green
                                            : colors.accent,
                                    color: "white",
                                    opacity: 0.9,
                                }}
                            >
                                {fractionalData.percentage}% owned
                            </span>
                        </div>
                    </div>
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
                </div>
            </div>

            <div className="mb-6">
                <h2
                    className="text-lg font-bold mb-3"
                    style={{
                        color: colors.accent,
                    }}
                >
                    Trading
                </h2>
                <div
                    className="p-4 rounded-lg mb-4"
                    style={{ backgroundColor: colors.cardHighlight }}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium mb-1">Quantity</p>
                            <p className="text-xs opacity-70">Select number of shares</p>
                        </div>
                        <div className="relative">
                            <div
                                className="flex items-center bg-opacity-30 rounded-lg"
                                style={{ backgroundColor: colors.background }}
                            >
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-l-lg transition-colors"
                                    style={{
                                        backgroundColor: colors.background,
                                        color: colors.text,
                                        borderRight: `1px solid ${colors.border}`,
                                    }}
                                    onClick={() =>
                                        handleBuyQuantityChange({
                                            target: { value: Math.max(1, quantity - 1) },
                                        })
                                    }
                                    disabled={quantity <= 1}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 12H4"
                                        ></path>
                                    </svg>
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max={maxAvailable}
                                    value={quantity}
                                    onChange={handleBuyQuantityChange}
                                    className="w-12 text-center bg-transparent text-sm py-1 focus:outline-none"
                                    style={{
                                        color: colors.text,
                                        appearance: "none",
                                        MozAppearance: "textfield",
                                    }}
                                />
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-r-lg transition-colors"
                                    style={{
                                        backgroundColor: colors.background,
                                        color: colors.text,
                                        borderLeft: `1px solid ${colors.border}`,
                                    }}
                                    onClick={() =>
                                        handleBuyQuantityChange({
                                            target: { value: Math.min(maxAvailable, quantity + 1) },
                                        })
                                    }
                                    disabled={quantity >= maxAvailable}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6v12m6-6H6"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            {maxAvailable > 0 && (
                                <div className="text-xs mt-1.5 opacity-70 text-right">
                                    Max available: {maxAvailable}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
            <button
                style={{
                    background:
                        loading ||
                        tokenId === null ||
                        tokenId === undefined ||
                        isPending ||
                        maxAvailable <= 0
                            ? "#8a8a8a" // Grey color when disabled
                            : colors.green,
                    transition: "all 0.3s",
                }}
                className="text-white font-bold py-3.5 px-4 rounded-xl shadow hover:shadow-lg transform hover:scale-[1.02] focus:outline-none flex items-center justify-center"
                onClick={() => buyFraction(tokenId, quantity, price * window.BigInt(quantity))}
                disabled={
                    loading ||
                    tokenId === null ||
                    tokenId === undefined ||
                    isPending ||
                    maxAvailable <= 0
                }
            >
                {isPending ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    <>
                        <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                        Buy Shares
                    </>
                )}
            </button>
            <button
                style={{
                    background:
                        loading ||
                        tokenId === null ||
                        tokenId === undefined ||
                        fractionalData.userBalance < quantity ||
                        isPending
                            ? "#8a8a8a" // Grey color when disabled
                            : colors.red,
                    transition: "all 0.3s",
                }}
                className="text-white font-bold py-3.5 px-4 rounded-xl shadow hover:shadow-lg transform hover:scale-[1.02] focus:outline-none flex items-center justify-center"
                onClick={() => sellFraction(tokenId, quantity)}
                disabled={
                    loading ||
                    tokenId === null ||
                    tokenId === undefined ||
                    fractionalData.userBalance < quantity ||
                    isPending
                }
            >
                {isPending ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    <>
                        <svg
                            className="w-4 h-4 mr-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                        </svg>
                        Sell Shares
                    </>
                )}
            </button>
        </div>
    </div>
)

export default SalesInfo
