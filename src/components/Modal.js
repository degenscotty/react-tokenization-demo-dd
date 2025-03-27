import React from "react"
import { useTheme } from "../context/ThemeContext"
import { useMarketNft } from "../hooks/useMarketNft"

const Modal = ({ isOpen, onClose, onSubmit, formData, handleInputChange, isSubmitting }) => {
    const { colors } = useTheme()
    const { isPending, isConfirmed } = useMarketNft()

    if (!isOpen) return null

    // Transaction status message
    const getStatusMessage = () => {
        if (isSubmitting && isPending) {
            return "Transaction in progress... Please confirm in your wallet and wait for confirmation."
        } else if (isSubmitting && isConfirmed) {
            return "Transaction confirmed! Your NFT has been created."
        } else if (isSubmitting) {
            return "Preparing transaction..."
        }
        return null
    }

    const statusMessage = getStatusMessage()

    return (
        <div
            className="modal fixed inset-0 flex items-center justify-center z-50"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(8px)",
            }}
            onClick={onClose}
        >
            <div
                className="modal-content w-full max-w-md transform transition-all duration-300 scale-100"
                style={{
                    backgroundColor: colors.cardBg,
                    borderRadius: "16px",
                    boxShadow: colors.shadow,
                    border: `1px solid ${colors.border}`,
                    animation: "modalFadeIn 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2
                            style={{
                                color: colors.accent,
                            }}
                            className="text-2xl font-bold"
                        >
                            Create NFT
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-all"
                            disabled={isSubmitting}
                            style={{
                                backgroundColor: colors.cardHighlight,
                                color: colors.textSecondary,
                            }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {statusMessage && (
                        <div
                            style={{
                                padding: "12px",
                                marginBottom: "20px",
                                backgroundColor: isConfirmed ? colors.green : colors.accent,
                                color: "white",
                                borderRadius: "8px",
                            }}
                            className="flex items-center shadow-md"
                        >
                            {isConfirmed ? (
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="animate-spin w-5 h-5 mr-2"
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
                            )}
                            <span>{statusMessage}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label style={{ color: colors.text }} className="text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter NFT name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                                className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all border border-solid"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label style={{ color: colors.text }} className="text-sm font-medium">
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Enter a description for your NFT"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                                className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all border border-solid"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label style={{ color: colors.text }} className="text-sm font-medium">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Enter asset location"
                                value={formData.location}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                                className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all border border-solid"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label style={{ color: colors.text }} className="text-sm font-medium">
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="imageUrl"
                                placeholder="Enter image URL"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                                className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all border border-solid"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label style={{ color: colors.text }} className="text-sm font-medium">
                                Number of Fractions
                            </label>
                            <input
                                type="number"
                                name="fractions"
                                placeholder="Number of shares to create"
                                value={formData.fractions}
                                onChange={handleInputChange}
                                style={{
                                    width: "100%",
                                    backgroundColor: colors.background,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                                className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all border border-solid"
                                required
                                min="1"
                            />
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="submit"
                                style={{
                                    background: isSubmitting
                                        ? `rgba(${parseInt(colors.green.slice(5, 8))}, ${parseInt(colors.green.slice(10, 13))}, ${parseInt(colors.green.slice(15, 18))}, 0.7)`
                                        : colors.green,
                                    color: "white",
                                    cursor: isSubmitting ? "not-allowed" : "pointer",
                                    opacity: isSubmitting ? 0.7 : 1,
                                }}
                                className="flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
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
                                        Creating...
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
                                        Create NFT
                                    </>
                                )}
                            </button>
                            <button
                                onClick={onClose}
                                type="button"
                                style={{
                                    background: isSubmitting
                                        ? `rgba(${parseInt(colors.red.slice(5, 8))}, ${parseInt(colors.red.slice(10, 13))}, ${parseInt(colors.red.slice(15, 18))}, 0.7)`
                                        : colors.red,
                                    color: "white",
                                    cursor: isSubmitting ? "not-allowed" : "pointer",
                                    opacity: isSubmitting ? 0.7 : 1,
                                }}
                                className="py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx="true">{`
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    )
}

export default Modal
